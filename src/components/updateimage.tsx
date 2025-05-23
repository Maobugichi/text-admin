import { useState } from "react"
import { handleChange } from "../utils"
import Input from "./input"
import Form from "./form"
import Button from "./button"
import axios from "axios"

const UpdateImage = () => {
    const [ data,setData ] = useState<any>({
        identifier:'',
        content:'',
        link:''
    })
    const [file, setFile] = useState<any>(null);
    const [preview, setPreview] = useState<any>('');
  
    const [ showLoader ,  setShowLoader ] = useState<boolean>(false);

   const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
   
    if (!files || files.length === 0) return;
    const file = Array.from(files);
     console.log(file[0])
    setFile(file);
    setPreview(file.map((file) => URL.createObjectURL(file)));
   };
    
   
  const handleUpload = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return alert('No file selected');

    const formData = new FormData();
    file.forEach((file:any) => formData.append('images', file));
     formData.append('content', data.content);
    formData.append('link', data.link);
    formData.append('identifier', data.identifier); 
    try {
        console.log(formData)
        setShowLoader(true)
         const res = await axios.post('https://textflex-axd2.onrender.com/api/admin/update', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
       console.log(res)
        setData({
         identifier:'',
        content:'',
        link:''
       })
       setFile(null)
       setPreview('')
      setShowLoader(false)
      alert('Image uploaded and saved!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };
    return(
        <Form
         onSubmit={handleUpload}
         header="update ad"
         height='h-fit min-h-[420px]'    
        >
              <Input placeholder="enter text" name="content" value={data.content} type="text"  handleChange={(e) => handleChange(e, setData)}/>
              <Input placeholder="enter identifier" name="identifier" value={data.identifier} type="text"  handleChange={(e) => handleChange(e, setData)}/>
                <div>
                     {preview !== '' && <img src={preview} alt="ad img" /> }
                </div>
                <input className="bg-white w-[90%] border border-solid border-gray-400 rounded-md mx-auto" type="file" accept="image/*" onChange={handleFileChange} />
              <Input placeholder="enter link" name="link" value={data.link} type="text"  handleChange={(e) => handleChange(e, setData)}/>
              <Button
               content="Submit"
               showLoader={showLoader}
               type="submit"
              />
        </Form>
    )
}

export default UpdateImage