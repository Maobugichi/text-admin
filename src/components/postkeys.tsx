import Input from "./input"
import Form from "./form"
import { useState } from "react"
import Button from "./button"
import axios from "axios"
import { handleChange } from "../utils"
const PostKeys = () => {
    const [ data , setData ] = useState<any>({
        key:'',
        service:''
    })
    const [ showLoader ,  setShowLoader ] = useState<boolean>(false)

    

    async function postKeys(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const { key , service } = data;
        setShowLoader(true)
        if (key !== '' && service !== '') {
            const response = await axios.post('https://textflex-axd2.onrender.com/api/keys', data)
            console.log(response)
            setShowLoader(false)
        }
    }
    return(
        <Form 
         onSubmit={postKeys}
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