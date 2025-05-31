import './App.css'
import { HashRouter , Route, Routes , Navigate } from 'react-router-dom'
import Auth from './auth'
import { ContextProvider } from './components/context'
import Root from './route/root'
import PostImg from './components/postimg'
import PostKeys from './components/postkeys'
import { checkAuth } from './utils'
import UpdateImage from './components/updateimage'
import Login from './components/login'
import UpdateBalance from './components/updatebalance'
import Dashboard from './components/dashboard'
import ShowBalance from './showBalance'
import ShowOrders from './components/showOrders'
import ShowUsers from './components/showusers'
import ShowApi from './components/showapi'
import 'react-loading-skeleton/dist/skeleton.css';
import MoneyOut from './components/moneyOut'
import Notifications from './components/notifs'
import Deposits from './components/deposits'
import EmailForm from './components/email'
import AdminLinks from './components/services'
import RateEditor from './components/editrate'

function App() {
  return (
    <ContextProvider>
    <HashRouter>
      <Routes>
         <Route path="auth/:1" element={<Auth />} /> 
          <Route path="login/:1" element={<Login />} /> 
          <Route path="/" element={<Root />}>
            <Route index element={<Navigate to={checkAuth() ?  "dashboard/1" : "auth/1" } />} />
            <Route path="dashboard/:id" element={<Dashboard/>}/>
            <Route path="postimg/:id" element={<PostImg/>}/>
            <Route path="postkeys/:id" element={<PostKeys/>}/>
            <Route path="updateimg/:id" element={<UpdateImage/>}/>
            <Route path="showapi/:id" element={<ShowApi/>}/>  
            <Route path="showbalance/:id" element={<ShowBalance/>}/>
             <Route path="showorders/:id" element={<ShowOrders/>}/>
             <Route path="users/:id" element={<ShowUsers/>}/>
            <Route path="notifs/:id" element={<Notifications/>}/>
             <Route path="deposits/:id" element={<Deposits/>}/>
             <Route path="email/:id" element={<EmailForm/>}/>
             <Route path="links/:id" element={<AdminLinks/>}/>
             <Route path="rate/:id" element={<RateEditor/>}/>
            <Route path="updatebalance/:id" element={<UpdateBalance/>}/>
            <Route path="moneyout/:id" element={<MoneyOut/>}/>
          </Route>
      </Routes>
    </HashRouter>
   </ContextProvider> 
  )
}

export default App
