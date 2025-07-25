import Form from "./form"
import Input from "./input"
import { useState , useContext , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShowContext } from "./context";
import { handleChange , handleFormSubmit } from "../utils";
import Button from "./button";
import Toast from "./toast";

const Login = () => {
    const navigate = useNavigate()
    const myContext = useContext(ShowContext)
    if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
    const { setUserData } = myContext;
     const [ data , setData ] = useState<any>({
            email:'',
     });
    const [ showLoader , setShowLoader ] = useState<boolean>(false)
    const [ show , setShow ] = useState<boolean>(false);
    const [ err , setErr ] = useState<string>('');
       
    useEffect(() => {
            if (show) {
                const timeout = setTimeout(() => {
                     setShow(false)
                }, 2000);
                 return () => clearTimeout(timeout) 
            }       
        },[show])
    return(
       <div className=" h-screen grid place-items-center relative">
       <Toast
        show={show}
        errorMssg={err}
        color="bg-red-200 border-red-700"
       />  
        <Form
          onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/admin-login', method:"POST", 
            onSuccess: (res) => {
                console.log('Form success:', res);
                setUserData(res.data)
                navigate('/dashboard/1')
            },
            onError: (err) => {
                console.log('Form error:', err);
                 setErr(err?.response?.data?.message || err.response.data)
                 setShow(true)
                 setShowLoader(false)
            },
            })}}
         header="Enter Your details to login"
         height="h-[350px]"
        >
            <Input placeholder="enter email" value={data.email} name="email"  handleChange={(e) => handleChange(e, setData)} type="email"/>
            <Input placeholder="enter password" value={data.password} name="password"  handleChange={(e) => handleChange(e, setData)} type="password"/>
            <Button
             content="Submit"
             type="submit"
             showLoader={showLoader}
            />
        </Form>
        </div>
    )
}

export default Login