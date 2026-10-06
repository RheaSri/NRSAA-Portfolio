import { AboutSection } from "../components/AboutSection"
import Footer from "../components/Footer"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"

export const Home=()=>{
    return <div id="hero" className="min-h-screen bg-background text-foreground overflow-x-hidden ">

        {/* Navbar */}
            <Navbar /> 
        {/* Main Content */}
        <main>
            <HeroSection />
            <AboutSection />     
        </main> 

        {/* Footer*/}
        <Footer />


    </div>

}