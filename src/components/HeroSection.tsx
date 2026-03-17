import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";

export const HeroSection = () => {
  const [fileName, setfileName] = useState("No file choosen");
  const [file, setfile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(fileName);
    const picked = e.target.files?.[0];
    if (!picked) return;
    setfile(picked);
    setfileName(picked?.name);
  };
  const UploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`http://localhost:5000/api/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP ERROR ${response}`);
      }
      console.log("File upload successful");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(`Error`, error);
    }
  };

  const HandleButtonClick = () => {
    if (!file) {
      fileInputRef.current?.click();
    } else {
      UploadFile();
    }
  };

  return (
    <div className="px-45 w-full">
      <div className="w-full  flex flex-col h-50  justify-center   gap-4">
        <p className="text-white text-4xl font-bold">Share your files via R2</p>
        <p className="text-gray-600 text-2xl">
          Upload a file — get a link. Stored on Cloudflare R2.
        </p>
      </div>
      <div className="w-full h-77 bg-[#161616] rounded-xl border border-green-500/30 shadow-[inset_0_0_30px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center gap-5">
        <Upload className="bg-[#161616] text-green-400 w-8 h-8" />
        <p className="text-lg font-bold text-white">Drop a file here</p>
        <p className="text-md  text-gray-400">
          or click to pick from your computer
        </p>
        <input
          type="file"
          ref={fileInputRef}
          id="fileInput"
          className="hidden"
          onChange={handleChange}
        />
        <p className="text-sm text-gray-400">{fileName}</p>
        <button
          className="py-2 px-5 hover:bg-green-600 border rounded-lg"
          onClick={HandleButtonClick}
        >
          {file  ? "Upload file" : "Choose file"}
        </button>
      </div>
    </div>
  );
};
