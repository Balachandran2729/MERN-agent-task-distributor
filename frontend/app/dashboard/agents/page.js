"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const res = await fetch("http://localhost:5000/api/agents");
    const data = await res.json();
    setAgents(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Agent added successfully!");
      setForm({ name: "", email: "", mobile: "", password: "" });
      fetchAgents();
    } else {
      toast.error("Error adding agent");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-xl font-bold text-primary mb-4">Manage Agents</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Mobile (+91...)"
          className="border p-2 rounded"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />
        <input
          placeholder="Password"
          type="password"
          className="border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="col-span-2 bg-primary text-white p-2 rounded hover:bg-secondary">
          Add Agent
        </button>
      </form>

      <h3 className="text-lg font-semibold">Agents List</h3>
      <ul className="mt-4 space-y-2">
        {agents.map((a, i) => (
          <li key={i} className="p-3 border rounded bg-gray-50">
            {a.name} - {a.email} - {a.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
}
