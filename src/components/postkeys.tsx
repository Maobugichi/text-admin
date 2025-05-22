import Input from "./input"
import Form from "./form"
import { useState } from "react"
import Button from "./button"
import { handleChange , handleFormSubmit } from "../utils"
const PostKeys = () => {
    const [ data , setData ] = useState<any>({
        key:'',
        service:''
    })
    const [ showLoader ,  setShowLoader ] = useState<boolean>(false)

    

    return(
        <Form 
         onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/keys', method:"POST", 
            onSuccess: (res) => {
                console.log('Form success:', res);
            },
            onError: (err) => {
                console.log('Form error:', err);
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
    )
}

export default PostKeys