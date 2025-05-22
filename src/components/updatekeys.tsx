import { useState } from "react"
import Input from "./input"
import { handleChange , handleFormSubmit } from "../utils"
import Form from "./form"
import Button from "./button"

const UpdateKeys = () => {
    const [ data , setData ] = useState<any>({
        key:'',
        service:''
    })
    const [ showLoader , setShowLoader ] = useState<boolean>(false)
    
    
    return(
        <Form
         onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/update-keys', method:"PATCH", 
            onSuccess: (res) => {
                console.log('Form success:', res);
            },
            onError: (err) => {
                console.log('Form error:', err);
            },
            })}}
         header="Update API keys"
         height="h-[350px]"
        >
            <Input placeholder="enter API key" name="key" value={data.key} type="text"  handleChange={(e) => handleChange(e, setData)}/>
            <Input placeholder="enter service name" name="service" value={data.service} type="text"  handleChange={(e) => handleChange(e, setData)}/>
            <Button
             content="Submit"
             type="submit"
             showLoader={showLoader}
            />
        </Form>
    )
}

export default UpdateKeys