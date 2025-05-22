import { useState } from "react"
import Button from "./button"
import Form from "./form"
import Input from "./input"
import { handleFormSubmit , handleChange } from "../utils"

const UpdateBalance = () => {
    const [ showLoader , setShowLoader ] = useState<boolean>(false)
    const [ data , setData ] = useState({
     user_email:"",
     amount:""
    })
    return(
        <Form
          onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/admin/update-balance', method:'PATCH',
            onSuccess: (res) => {
                console.log('Form success:', res);
            },
            onError: (err) => {
                console.log('Form error:', err);
            },
            })}}
            header="Enter details to update user balance"
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
    )
}

export default UpdateBalance