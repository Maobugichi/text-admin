import { useState } from "react"
import Input from "./input"
import axios from "axios"
import { handleChange } from "../utils"
import Form from "./form"
import Button from "./button"

const UpdateKeys = () => {
    const [ data , setData ] = useState<any>({
        key:'',
        service:''
    })
    const [ showLoader , setShowLoader ] = useState<boolean>(false)
    
    async function submitForm(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { key , service } = data;
        if (key !== '' && service !== '') {
            setShowLoader(true)
            const response = axios.patch('https://textflex-axd2.onrender.com/api/update-keys',data)
            console.log((await response).data)
            setShowLoader(false)
            setData({
              key:'',
              service:''
            })
        }
    }
    return(
        <Form
         onSubmit={submitForm}
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