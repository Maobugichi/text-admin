import { useState } from "react"
import { handleChange , handleFormSubmit } from "../utils"
import Input from "./input"
import Form from "./form"
import Button from "./button"

const UpdateImage = () => {
    const [ data,setData ] = useState<any>({
        image_url:'',
        id:''
    })
    const [ showLoader ,  setShowLoader ] = useState<boolean>(false);

    
    return(
        <Form
         onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/admin/update', method:"PATCH", 
            onSuccess: (res) => {
                console.log('Form success:', res);
            },
            onError: (err) => {
                console.log('Form error:', err);
            },
            })}}
         header="update image url"
         height='h-[250px]'    
        >
              <Input placeholder="enter img url" name="image_url" value={data.image_url} type="text"  handleChange={(e) => handleChange(e, setData)}/>
              <Input placeholder="enter img id" name="id" value={data.id} type="text"  handleChange={(e) => handleChange(e, setData)}/>
              <Button
               content="Submit"
               showLoader={showLoader}
               type="submit"
              />
        </Form>
    )
}

export default UpdateImage