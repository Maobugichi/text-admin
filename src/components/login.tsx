import axios from "axios";
import Form from "./form"
import Input from "./input"
import { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShowContext } from "./context";
import { handleChange } from "../utils";

const Login = () => {
    const navigate = useNavigate()
    const myContext = useContext(ShowContext)
    if (!myContext) throw new Error("ShowContext must be used within a ContextProvider");
    const { setUserData } = myContext;
     const [ data , setData ] = useState<any>({
            email:'',
            username:'',
            password:''
        });

        async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
           e.preventDefault();
           const response = await axios.post('https://textflex-axd2.onrender.com/api/admin-login')
           console.log(response.data)
            setUserData(response.data)
            navigate('/')
        }
    return(
        <Form
         onSubmit={handleSubmit}
         header="Enter Your details to login"
         height="h-[350px]"
        >
            <Input placeholder="enter email" value={data.email} name="email"  handleChange={(e) => handleChange(e, setData)} type="email"/>
            <Input placeholder="enter password" value={data.password} name="password"  handleChange={(e) => handleChange(e, setData)} type="password"/>
        </Form>
    )
}

export default Login