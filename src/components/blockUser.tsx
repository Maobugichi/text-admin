import { useState } from "react"
import Form from "./form"
import Input from "./input"
import { handleChange } from "../utils"
import Button from "./button"
import axios from "axios"
const BlockUser = () => {
 const [ data ,  setData ] = useState<any>({
    email:''
 })
 const [ showLoader ,  setShowLoader ] = useState<boolean>(false);  

 async function blockUser(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowLoader(true)
    const { email } = data
    if (!data.email) return;
    const res = await axios.post(`https://api.textflex.net/api/block-user/` ,{ userEmail: email})
    setShowLoader(false)
    console.log(res.data)
    setData({
        email:''
    })
 }
    return(
        <Form
         onSubmit={blockUser}
         header="block user"
         height='h-fit min-h-[320px]' 
        >
            <Input placeholder="enter email" name="email" value={data.email} type="email"  handleChange={(e) => handleChange(e, setData)}/>
            <Button
              content="Submit"
               showLoader={showLoader}
              type="submit"
            />
        </Form>
    )
}

export default BlockUser