import { useState , useContext } from "react"
import SideNav from "../components/nav/sideNav"
import { Outlet } from "react-router-dom"
import Header from "../components/header"
import { ShowContext } from "../components/context"
const Root = () => {
    const [ isShow , setIsShow ] = useState<boolean>(false)
    const myContext = useContext(ShowContext)
    if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
    const { theme , setTheme } = myContext
    return(
        <main className={`${theme ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
            <Header
             setIsShow={setIsShow}
             theme={theme}
             setTheme={setTheme}
            />
            <SideNav
             setIsShow={setIsShow}
             show={isShow}
            />
            <div className={`h-fit grid place-items-center ${theme ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                <Outlet/>
            </div>
        </main>
    )
}

export default Root