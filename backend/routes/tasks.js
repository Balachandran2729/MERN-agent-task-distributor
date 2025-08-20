const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const Task = require('../models/Task');
const Agent = require('../models/Agent');
const { protect } = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only CSV and Excel files are allowed.'));
    }
  }
});
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    let workbook;

    // Read file based on extension
    workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Validate data structure
    if (data.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'File is empty' });
    }

    const requiredColumns = ['FirstName', 'Phone', 'Notes'];
    const firstRow = data[0];
    const missingColumns = requiredColumns.filter(col => !(col in firstRow));

    if (missingColumns.length > 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ 
        message: `Missing required columns: ${missingColumns.join(', ')}` 
      });
    }

    // Get all agents
    const agents = await Agent.find({});
    console.log('Total agents found:', agents.length);
    console.log('Agents:', agents.map(a => ({id: a._id, name: a.name})));
    
    if (agents.length === 0) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'No agents found. Please add agents first.' });
    }

    // Use minimum of 5 agents or available agents
    const numAgents = Math.min(5, agents.length);
    console.log('Using', numAgents, 'agents for distribution');
    
    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Distribute tasks
    const tasksToCreate = [];
    for (let i = 0; i < data.length; i++) {
      const taskData = data[i];
      const agentIndex = i % numAgents; // This ensures fair distribution
      const assignedAgent = agents[agentIndex];
      
      console.log(`Task ${i + 1} assigned to agent ${agentIndex + 1}: ${assignedAgent.name}`);
      
      tasksToCreate.push({
        firstName: taskData.FirstName,
        phone: taskData.Phone,
        notes: taskData.Notes,
        agent: assignedAgent._id
      });
    }

    // Insert all tasks at once
    await Task.insertMany(tasksToCreate);
    console.log('Inserted', tasksToCreate.length, 'tasks');

    // Remove uploaded file
    fs.unlinkSync(filePath);

    res.json({ 
      message: 'Tasks distributed successfully',
      totalTasks: data.length,
      agentsUsed: numAgents,
      distribution: agents.slice(0, numAgents).map((agent, index) => ({
        agent: agent.name,
        tasksAssigned: tasksToCreate.filter(t => t.agent.toString() === agent._id.toString()).length
      }))
    });
  } catch (error) {
    console.error('Upload error:', error);
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error during file upload: ' + error.message });
  }
});

router.get('/agent/:agentId', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ agent: req.params.agentId })
      .populate('agent', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate('agent', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;