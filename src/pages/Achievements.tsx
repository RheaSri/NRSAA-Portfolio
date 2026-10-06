import Footer from "../components/Footer"
import { Navbar } from "../components/Navbar"
import Recognition from "../components/Recognition"



export const Achievement=()=>{
    return(     
    <div id="project" className="min-h-screen bg-background text-foreground overflow-x-hidden ">
        {/* Navbar */}
        <Navbar /> 
                
        {/* Main Content */}
        <main>
            <Recognition />      
                
        </main> 

        {/* Footer*/}
        <Footer />

    </div>
    )
}