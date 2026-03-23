import { LoaderCircle, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { UrlInputBox } from "./UrlinputBox";
import { TableView } from "./Table";
import toast from "react-hot-toast";
import { Navbar } from "./Navbar";

export const HeroSection = () => {
  const [fileName, setfileName] = useState("No file choosen");
  const [file, setfile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);

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
    setloading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
      if (!response.ok) {
        console.log("Error in fetching data")
        return;
      }
      const data = await response.json();
      console.log("Data", data);
      setfile(null);
      toast.success("File upload successfull")
      setfileName("No file choosen")
      setloading(false);
    } catch (error) {
      console.log(`Error`, error);
      setloading(false);
      toast.error("File upload failed")
      setfileName("No file choosen")
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
    <div className=" w-full ">
      <Navbar />
      <div className="w-full md:px-60 px-6 flex flex-col justify-center gap-4 text-center md:text-left mt-10 mb-6">
        <p className="text-white text-4xl font-bold">Share your files via R2</p>
        <p className="text-gray-400 md:text-xl text-lg">
          Upload a file — get a link. Stored on Cloudflare R2.
        </p>
      </div>
      {!loading ? (
        <div className="w-full  flex justify-center p-5">
          <div className="md:w-2/3  w-full flex justify-center h-77  flex-col items-center gap-5 bg-[#161616] rounded-xl border border-green-500/30 shadow-[inset_0_0_30px_rgba(34,197,94,0.15)] ">
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
              className="py-2 px-5 hover:bg-[#e57519] border text-white border-green-300 rounded-lg"
              onClick={HandleButtonClick}
            >
              {file ? "Upload file" : "Choose file"}
            </button>{" "}
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center p-5">
          <div className="md:w-2/3  w-full flex justify-center h-77  flex-col items-center gap-5 bg-[#161616] rounded-xl border border-green-500/30 shadow-[inset_0_0_30px_rgba(34,197,94,0.15)] ">
            <LoaderCircle className="h-15 animate-spin" />
            <p className="text-lg text-gray-400">Uploading...</p>
          </div>
        </div>
      )}
      <div className="flex justify-center  flex-col w-full items-center bg-[#0f0f0f]">
        <div className="flex items-center my-4 gap-4 w-2/3">
          <div className="grow border-t border-green-300"></div>
          <p className="text-sm text-gray-400">or paste a URL to fetch</p>
          <div className="grow border-t  border-green-300"></div>
        </div>
        <UrlInputBox />
        <TableView />
      </div>
    </div>
  );
};
