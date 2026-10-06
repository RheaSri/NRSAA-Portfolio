
import DeviceSection from "../components/DeviceSection"
import Footer from "../components/Footer"
import { MorphSection } from "../components/MorphSection"
import { Navbar } from "../components/Navbar"
import NRSAAArchitecture from "../components/NRSAAArchitecture"
import { PlatformSection } from "../components/PlatformSection"


export const Technology=()=>{
    return <div id="technology" className="min-h-screen bg-background text-foreground overflow-x-hidden ">

    
        {/* Navbar */}
            <Navbar /> 
        {/* Main Content */}
        <main>
            <MorphSection />
            <DeviceSection />
            <NRSAAArchitecture />
            <PlatformSection />
           
        </main> 

        {/* Footer*/}
        <Footer />


    </div>

}