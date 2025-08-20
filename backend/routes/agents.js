const express = require('express');
const Agent = require('../models/Agent');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const agentExists = await Agent.findOne({ email });

    if (agentExists) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    const agent = await Agent.create({
      name,
      email,
      mobile,
      password,
    });

    res.status(201).json({
      _id: agent._id,
      name: agent.name,
      email: agent.email,
      mobile: agent.mobile,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', protect, async (req, res) => {
  try {
    const agents = await Agent.find({}).select('-password');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;