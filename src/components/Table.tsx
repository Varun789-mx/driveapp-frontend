import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import axios from "axios";

export interface Urls {
    id: number;
    key: string;
    short_url: string;
    downloads: number;
    timeStamp: Date;
}

export const TableView = () => {
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [urlarray, seturlarray] = useState<Urls[]>([]);

    const GetLinks = async () => {
        try {
            const Links = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/getlinks`,
                {
                    withCredentials: true,
                },
            );
            if (Links.status !== 200) {
                alert("Error while fetching your links");
            }
            seturlarray(Links.data.data);
            console.log(Links);
            localStorage.setItem("Urls", JSON.stringify(Links.data.data));
        } catch (error) {
            console.log("Error in getting links", error);
        }
    };

    useEffect(() => {
        GetLinks();
        const intervals = setInterval(() => {
            GetLinks();
        }, 10000);
        return () => clearInterval(intervals);

    }, []);

    const handleCopy = (id: number, url: string) => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_BACKEND_URL}/api/download/?short_id=${url}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };
    return (
        <>
            <div className="w-full mt-6 overflow-x-auto rounded-xl border border-white/10 backdrop-blur-sm">
                {urlarray && urlarray.length > 0 ? (
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-widest">
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Shorten URL</th>
                                <th className="px-6 py-4 font-medium">Name</th>
                                <th className="px6 py-4 font-medium text-center">Downloads</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urlarray.map((row: Urls) => (
                                <tr
                                    key={row.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group"
                                >
                                    <td className="px-6 py-4 text-gray-300 whitespace-nowrap">
                                        {new Date(row.timeStamp).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={row.short_url}
                                                className="text-purple-400 hover:text-purple-300 transition-colors duration-150 truncate max-w-45 block"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {import.meta.env.VITE_BACKEND_URL}/api/download/?short_id={row.short_url}
                                            </a>
                                            <button
                                                onClick={() => handleCopy(row.id, row.short_url)}
                                                title="Copy link"
                                                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-all duration-200 ${copiedId === row.id
                                                    ? "bg-purple-600/40 border-purple-400/60 text-purple-200"
                                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-purple-600/20 hover:border-purple-500/40 hover:text-purple-300"
                                                    }`}
                                            >
                                                {copiedId === row.id ? (
                                                    <>
                                                        <Check className="w-3 h-3" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p

                                            className="text-gray-200 hover:text-white transition-colors duration-150 truncate max-w-65 block"
                                            rel="noreferrer"
                                        >
                                            {row.key.split("_")[0]}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/20 text-purple-300 border border-purple-500/30">
                                            {row.downloads}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};