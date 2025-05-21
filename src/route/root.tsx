import { useState } from "react"
import SideNav from "../components/nav/sideNav"
import { Outlet } from "react-router-dom"
const Root = () => {
    const [ isShow , setIsShow ] = useState<boolean>(false)
    return(
        <main>
            <SideNav
             setIsShow={setIsShow}
            />
            <div className="h-[100vh] grid place-items-center">
                <Outlet/>
            </div>
        </main>
    )
}

export default Root