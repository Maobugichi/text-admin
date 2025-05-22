import { useEffect, useState , useContext } from "react"
import Input from "./components/input"
import Form from "./components/form"
import Button from "./components/button"
import { useNavigate , Link } from "react-router-dom"
import Toast from "./components/toast"
import { handleChange , handleFormSubmit } from "./utils"
import { ShowContext } from "./components/context"
const Auth = () => {
     const myContext = useContext(ShowContext)
     if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
     const { setUserData } = myContext;
     const [ data , setData ] = useState<any>({
        email:'',
        username:'',
        password:''
    });
    const [ show , setShow ] = useState<boolean>(false);
    const [ err , setErr ] = useState<string>('');
    const [ showLoader , setShowLoader ] = useState<boolean>(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            const timeout = setTimeout(() => {
                 setShow(false)
            }, 2000);
             return () => clearTimeout(timeout) 
        }       
    },[show])
    return(
      <div className="h-[100vh] grid place-items-center relative overflow-hidden">
       <Toast
        show={show}
        errorMssg={err}
        color="bg-red-200 border-red-700"
       /> 
        <Form
          onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/adminAuth', method:"POST", 
            onSuccess: (res) => {
                setUserData(res.data)
                navigate('/postkeys/1')
            },
            onError: (err) => {
                    console.log(err.response.data.message)
                    setErr(err?.response?.data?.message || err.response.data)
                    setShow(true)
                    setShowLoader(false)
                    setData({
                        email:'',
                        username:'',
                        password:''
                    })
            },
            })}}
         header="Enter Your Details"
         height="h-[370px] pt-5"
        >
          
            <Input placeholder="enter email" value={data.email} name="email" handleChange={(e) => handleChange(e, setData)} type="email"/>
            <Input placeholder="enter username" value={data.username} name="username"  handleChange={(e) => handleChange(e, setData)} type="text"/>
            <Input placeholder="enter password" value={data.password} name="password"  handleChange={(e) => handleChange(e, setData)} type="password"/>
             <Button
              content="Submit"
              type="submit"
              showLoader={showLoader}
            />
              <label className="text-[10px] w-[60%] mx-auto">
                password requires at least one uppercase , one lowercase and one number   
             </label>
            <p className="flex gap-2 justify-center">Already have an account?
                <Link to="/login/1">
                  <span  className="underline text-sm text-blue-600">Login</span>
                </Link>
            </p>
            
        </Form>
    </div>   
    )
}

export default Auth