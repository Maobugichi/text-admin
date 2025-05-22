import { useState } from "react"
import Form from "./form"
import Input from "./input"
import { handleFormSubmit } from "../utils"
import Button from "./button"
import { handleChange } from "../utils"
const PostImg = () => {
    const [ data , setData ] = useState<any>({
        image_url:'',
        content:''
    });
    const [ showLoader ,  setShowLoader ] = useState<boolean>(false);
    
    return(
        <Form
         onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/admin-img',method:'POST', 
            onSuccess: (res) => {
                console.log('Form success:', res);
            },
            onError: (err) => {
                console.log('Form error:', err);
            },
            })}}
         header="Enter image Url"
         height="h-[250px]"
        >
            <Input placeholder="enter text" name="content" value={data.content} handleChange={(e) => handleChange(e, setData)} type="text"/>
            <Input placeholder="enter url" name="image_url" value={data.image_url} handleChange={(e) => handleChange(e, setData)} type="text"/>
            <Button
             content="Submit"
             type="submit"
             showLoader={showLoader}
            />
        </Form>
    )
}

export default PostImg