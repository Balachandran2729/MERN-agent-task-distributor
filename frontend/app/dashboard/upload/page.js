"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function UploadPage() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("File uploaded and distributed!");
    } else {
      toast.error("Invalid file or server error");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-xl font-bold text-primary mb-4">Upload CSV</h2>
      <form onSubmit={handleUpload} className="flex items-center gap-4">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
