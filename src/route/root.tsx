import { useState } from "react"
import SideNav from "../components/nav/sideNav"
import { Outlet } from "react-router-dom"
import Header from "../components/header"
const Root = () => {
    const [ isShow , setIsShow ] = useState<boolean>(false)
    return(
        <main>
            <Header
             setIsShow={setIsShow}
            />
            <SideNav
             setIsShow={setIsShow}
             show={isShow}
            />
            <div className="h-[100vh] grid place-items-center">
                <Outlet/>
            </div>
        </main>
    )
}

export default Root