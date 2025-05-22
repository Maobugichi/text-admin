import Input from "./input"
import Form from "./form"
import { useEffect, useState } from "react"
import Button from "./button"
import { handleChange , handleFormSubmit } from "../utils"
import Toast from "./toast"
const PostKeys = () => {
    const [ data , setData ] = useState<any>({
        key:'',
        service:''
    })
    const [ showLoader ,  setShowLoader ] = useState<boolean>(false)
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
       <div className="w-full relative">
        <Toast
         show={show}
         errorMssg={err}
         color='bg-green-300 border-green-700'
        />
        <Form 
         onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/keys', method:"POST", 
            onSuccess: (res) => {
                console.log('Form success:', res);
                setErr(res.message);
                setShow(true)
                setData({
                  key:'',
                  service:''
                })
            },
            onError: (err) => {
                console.log('Form error:', err);
                setData({
                  key:'',
                  service:''
                })
            },
            })}}
         header="Enter Api key & Service"
         height="h-[250px]"
        >
            <Input placeholder="enter api key" value={data.key} name="key" handleChange={(e) => handleChange(e, setData)} type="text"/>
            <Input placeholder="enter service" value={data.service} name="service" handleChange={(e) => handleChange(e, setData)} type="text"/>
            <Button
             content="submit"
             type="submit"
             showLoader={showLoader}
            />
        </Form>
       </div>  
    )
}

export default PostKeys