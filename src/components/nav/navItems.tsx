import {   Link2, Settings , LayoutDashboardIcon,Bell , Download, Mail, LineChart  } from 'lucide-react';
import List from '../listItem';
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';
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
            icon:<Link2 size={17}/>,
            text:'Update ad',
            link:'/updateimg/1'
        },
        {
            icon:<Settings size={17}/>,
            text:'view API',
            link:'/showapi/1'
        },
        {
            icon:<Bell size={17}/>,
            text:'notifications',
            link:'/notifs/1'
        },
        {
            icon:<Download size={17}/>,
            text:'total deposits',
            link:'/deposits/1'
        },
        {
            icon:<Mail size={17}/>,
            text:'bulk email',
            link:'/email/1'
        },
       {
            icon:<Link2 size={17}/>,
            text:'social links',
            link:'/links/1'
        },
        {
            icon:<LineChart size={17}/>,
            text:'rate',
            link:'/rate/1'
        },
        {
            icon:<Tag size={17}/>,
            text:'costs',
            link:'/costs/1'
        }
       
       
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