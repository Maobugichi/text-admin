import './App.css'
import { HashRouter , Route, Routes , Navigate } from 'react-router-dom'
import Auth from './auth'
import { ContextProvider } from './components/context'
import Root from './route/root'
import PostImg from './components/postimg'
import PostKeys from './components/postkeys'
import { checkAuth } from './utils'
import UpdateKeys from './components/updatekeys'
import UpdateImage from './components/updateimage'

function App() {
  return (
    <ContextProvider>
    <HashRouter>
      <Routes>
         <Route path="auth/:1" element={<Auth />} /> 
          <Route path="login/:1" element={<Auth />} /> 
          <Route path="/" element={<Root />}>
            <Route index element={<Navigate to={checkAuth() ? "postimg/1" :"auth/1"} />} />
            <Route path="postimg/:id" element={<PostImg/>}/>
            <Route path="postkeys/:id" element={<PostKeys/>}/>
            <Route path="updateimg/:id" element={<UpdateImage/>}/>
            <Route path="updatekeys/:id" element={<UpdateKeys/>}/>
          </Route>
      </Routes>
    </HashRouter>
   </ContextProvider> 
  )
}

export default App
