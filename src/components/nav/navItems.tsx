import {
    Home,
    MessageCircle, 
    Hash, 
    Phone,
    
  } from 'lucide-react';
import List from '../listItem';
import { Link } from 'react-router-dom';
interface NavProps {
    closeNav?: () => void
}

const NavItems:React.FC<NavProps> = ({ closeNav }) => {
    const navItems = [
        {
            icon:<Home size={17}/>,
            text:'Post Keys',
            link:'/postimg/1'
        },
        {
            icon:<MessageCircle size={17}/>,
            text:'Post Image',
            link:'/postkeys/1'
        },
        {
            icon:<Hash size={17}/>,
            text:'Post Url',
            link:'/updateimg/1'
        },
        {
            icon:<Phone size={17}/>,
            text:'Update API',
            link:'/updatekeys/1'
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