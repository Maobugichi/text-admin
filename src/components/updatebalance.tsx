import { useState , useEffect } from "react"
import Toast from "./toast"
import Button from "./button"
import Form from "./form"
import Input from "./input"
import { handleFormSubmit , handleChange } from "../utils"

const UpdateBalance = () => {
    const [ showLoader , setShowLoader ] = useState<boolean>(false)
    const [ data , setData ] = useState({
     user_email:"",
     amount:''
    })

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
       <div className={`h-[100vh] grid place-items-center top-10 relative overflow-hidden w-full `}>
        <Toast
         show={show}
         errorMssg={err}
         color='bg-green-200 border-green-700'
        />
        <Form
          onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/admin/update-balance', method:'PATCH',
            onSuccess: (res) => {
                console.log('Form success:', res);
                setErr(res.message)
                setShow(true)
            },
            onError: (err) => {
                console.log('Form error:', err);
            },
            })}}
            header=" Update user balance"
            height="h-[250px]"
        >
            <Input placeholder="enter user's_email" name="user_email" handleChange={(e) => handleChange(e, setData)} type="email" value={data.user_email}/>
            <Input placeholder="enter amount" name="amount" type="number" handleChange={(e) => handleChange(e, setData)} value={data.amount}/>
            <Button
             content="submit"
             type="submit"
             showLoader={showLoader}
            />
        </Form>
        </div>  
    )
}

export default UpdateBalance