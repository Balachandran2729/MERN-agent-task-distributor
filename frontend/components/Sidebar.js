import Link from "next/link";
import { FaUsers, FaUpload, FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-secondary text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 hover:text-accent">
          <FaHome /> Dashboard
        </Link>
        <Link href="/dashboard/agents" className="flex items-center gap-2 hover:text-accent">
          <FaUsers /> Agents
        </Link>
        <Link href="/dashboard/upload" className="flex items-center gap-2 hover:text-accent">
          <FaUpload /> Upload CSV
        </Link>
      </nav>
    </div>
  );
}
