  import axios from "axios";
  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>,setState:React.Dispatch<React.SetStateAction<any>> ) {
        const { name , value } = e.target;
        setState((prev:any) => ({
            ...prev,
            [name]:value
        }))
 }

 const checkAuth =  () => {
   try {
      const storedUserData = localStorage.getItem("userData");
      
      if (!storedUserData) return null;
      const userData = JSON.parse(storedUserData);
      if (!userData || Object.keys(userData).length === 0) {
        return null;
      } else {
        return true;
      }
    } catch (err) {
      console.log('auth error:', err);
      return null;
    }
}

type SubmitOptions<T> = {
  e: React.FormEvent<HTMLFormElement>;
  data: T;
  setShowLoader: (loading: boolean) => void;
  setData?: (emptyData: T) => void;        
  endpoint: string;
  method: 'POST' | 'PATCH' | 'PUT';      
  onSuccess?: (responseData: any) => void;
  onError?: (err: any) => void;
};

 async function handleFormSubmit<T extends Record<string, any>>({
  e,
  data,
  setShowLoader,
  setData,
  endpoint,
  method,
  onSuccess,
  onError
}: SubmitOptions<T>) {
  e.preventDefault();

  const isAllFilled = Object.values(data).every(value => value !== '');

  if (!isAllFilled) return;

  try {
    setShowLoader(true);

    const apiUrl = `https://api.textflex.net/${endpoint}`
    const response = await axios({
      url: apiUrl,
      method,
      data,
    });

    console.log('Response:', response.data);
    onSuccess?.(response.data);

    if (setData) {
      const cleared = Object.fromEntries(Object.keys(data).map(k => [k, '']));
      setData(cleared as T);
    }
  } catch (err) {
    console.error('Form submit error:', err);
    onError?.(err);
  } finally {
    setShowLoader(false);
  }
}


 export { handleChange , checkAuth , handleFormSubmit }