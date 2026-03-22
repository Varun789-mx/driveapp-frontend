import { useState } from "react";
import toast from "react-hot-toast";

export const UrlInputBox = () => {
  const [url, seturl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const localUrl = e.target.value;
    try {
      const parsed = new URL(localUrl);
      if (parsed.protocol !== 'http:' && parsed.protocol != 'https:') {
        throw new Error("Invalid protocol");
      }
      seturl(e.target.value);
    } catch (error) {
      toast.error("Invalid url")
    }
  };
  const HandleDownload = async () => {
    if (!url) return;
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        credentials: "include",
      })
      if (!response.ok) {
        toast.error('Not-found')
      }
      const blob = await response.blob();
      const Url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = Url;
      a.download = `NEW_DOC_${(new Date).getUTCMilliseconds()}`
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(Url);
      a.remove();
    } catch (error) {
      console.log(`Error`, error);
    }
  };
  return (
    <div className=" md:w-2/3 w-full flex justify-center   gap-2">
      <div className="w-full flex flex-col md:flex-row justify-center gap-3 bg-[#111] text-lg border border-green-700 rounded-lg p-2 focus:outline-1 focus:outline-blue-500 focus-within:outline-1 focus-within:outline-blue-500">
        <input
          className="text-white w-full placeholder:placeholder-gray-500 rounded-3xl  placeholder:text-xl outline-none"
          type="url"
          onChange={handleChange}
          placeholder="https://example.com/file-to-upload"
        />
      </div>
      <div>
        <button
          onClick={HandleDownload}   
          className="text-lg w-full font-bold p-2 hover:bg-green-600 text-white border-green-300  focus-within:bg-green-600 border rounded-lg"
        >
          fetch & Upload
        </button>
      </div>
    </div>
  );
};