import {  Image, Link2, Settings , LayoutDashboardIcon, } from 'lucide-react';
import List from '../listItem';
import { Link } from 'react-router-dom';
interface NavProps {
    closeNav?: () => void
}

const NavItems:React.FC<NavProps> = ({ closeNav }) => {
    const navItems = [
        {
            icon:<LayoutDashboardIcon size={17}/>,
            text:'Dashboard',
            link:'/dashboard/1'
        },
        
        {
            icon:<Image size={17}/>,
            text:'Post ad',
            link:'/postimg/1'
        },
        {
            icon:<Link2 size={17}/>,
            text:'Update ad',
            link:'/updateimg/1'
        },
        {
            icon:<Settings size={17}/>,
            text:'view API',
            link:'/showapi/1'
        },
       
       
    ]

   

    const items = navItems.map(item => (
        <Link to={item.link}>
           <List
            className="flex h-10 items-center  gap-2 rounded-sm mx-auto w-[80%]"
            onClick={closeNav}
           >
            {item.icon} {item.text}
           </List>
        </Link>
        
    ))

    return(
        <ul className=' h-[80%] flex flex-col gap-1 cursor-pointer'>
            {items}
        </ul>
    )
}

export default NavItems