import { useState } from "react";

export const UrlInputBox = () => {
  const [url, seturl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seturl(e.target.value);
  };
  const HandleDownload = async () => {
    if (!url) return;
    try {
      const response = await fetch(`${url}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP ERROR ${response}`);
      }
      console.log("File download successful");
      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition");
      const match = disposition?.match(/filename="(.+)"/);
      const filename = match?.[1] ?? "download";

      // create a temporary anchor and click it
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      a.click();

      // clean up
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log(`Error`, error);
    }
  };
  return (
    <div className="w-full flex justify-center gap-4">
      <div className="w-2/3 bg-[#111] text-lg border border-green-700 rounded-lg p-4 flex items-center gap-3 focus:outline-1 focus:outline-blue-500 focus-within:outline-1 focus-within:outline-blue-500">
        <input
          className="w-full border-none focus:outline-none"
          type="url"
          onChange={handleChange}
          placeholder="https://example.com/file-to-upload"
        />
      </div>
      <div>
        <button
          onClick={HandleDownload}
          className="py-4 px-7 text-lg font-bold hover:bg-green-600 border rounded-lg"
        >
          fetch & Upload
        </button>
      </div>
    </div>
  );
};
