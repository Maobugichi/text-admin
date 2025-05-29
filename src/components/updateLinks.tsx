import Button from "./button"
import Form from "./form"
import Input from "./input"
import { useState } from "react"
import { handleChange , handleFormSubmit } from "../utils"


const  UpdateLinks = () => {
     const [ data,setData ] = useState<any>({
            name:'',
            link:'',
           
     })
     const [ showLoader ,  setShowLoader ] = useState<boolean>(false);  
    return(
         <Form
         onSubmit={(e) => { handleFormSubmit({e,data,setShowLoader,setData,endpoint: 'api/link-update', method:"POST", 
            onSuccess: (res) => {
                console.log('Form success:', res);
                setData({
                  key:'',
                  service:''
                })
            },
            onError: (err) => {
                console.log('Form error:', err);
                setData({
                  name:'',
                  link:''
                })
            },
            })}}
         header="update ad"
         height='h-fit min-h-[420px]'    
        >
              <Input placeholder="enter link name" name="name" value={data.name} type="text"  handleChange={(e) => handleChange(e, setData)}/>
              <Input placeholder="enter identifier" name="identifier" value={data.link} type="text"  handleChange={(e) => handleChange(e, setData)}/>
             
              <Button
               content="Submit"
               showLoader={showLoader}
               type="submit"
              />
        </Form>
    )
}