import { Upload } from "lucide-react"

export const HeroSection = () => {
    return (
        <div className="px-45 w-full">
            <div className="w-full  flex flex-col h-50  justify-center   gap-4">
                <p className="text-white text-4xl font-bold">Share your files via R2</p>
                <p className="text-gray-600 text-2xl">Upload a file — get a link. Stored on Cloudflare R2.</p>

            </div>
            <div className="w-full h-77 bg-[#161616] rounded-xl border border-green-500/30 shadow-[inset_0_0_30px_rgba(34,197,94,0.15)] flex flex-col items-center justify-center gap-5">
                <Upload className="bg-[#161616] text-green-400 w-8 h-8" />
                <p className="text-lg font-bold text-white">Drop a file here</p>
                <p className="text-md  text-gray-400">or click to pick from your computer</p>
                <input
                    type="file"
                    className="bg-transparent  text-lg text-gray-500
                    file:border file:border-green-300
                        file:rounded-xl file:ml-10 file:py-2 file:px-4
                        file:text-white 
                        file:cursor-pointer file:text-lg
                        hover:file:bg-green-600"
                />    </div>
        </div>
    )
}