import { Download } from "lucide-react"

export const Navbar = () => {
    return (
        <div className="w-full bg-[#0f0f0f] p-2 align-middle shadow-2xl shadow- shadow-green-500/50 px-3">
            <div className="font-bold text-green-300 text-xl p-2 flex gap-2">
                <Download className="bg-blue-500 rounded-md p-1 " />R2Share
            </div>
        </div>
    )
} 