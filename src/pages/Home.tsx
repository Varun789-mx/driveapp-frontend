import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"

export const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="  h-screen flex bg-[#0f0f0f]  ">
              <HeroSection/>
            </div>
        </div>
    )
}