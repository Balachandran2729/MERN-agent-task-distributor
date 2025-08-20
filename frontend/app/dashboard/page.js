"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    else {
      try {
        jwtDecode(token); 
      } catch (err) {
        router.push("/");
      }
    }
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Admin Panel</p>
      </div>
    </div>
  );
}
