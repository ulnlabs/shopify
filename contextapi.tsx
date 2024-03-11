"use client"
import { createContext,useState} from "react";
//if some types are not seen here they are mentioned in the global.d.ts file

export const ContextData=createContext<contextData >({
    formData:{
        name:"",
        mobile:"",
        email:"",
        gst:"",
        tax:"",
        due:"",
        state:"",
        city:"",
        pincode:"",
        address:""
    },
    setFormData:()=>{}
})

const ContextContent=({children}:children)=>{
    const [formData, setFormData] = useState<customerAdd>({
        name: "",
        mobile: "",
        email: "",
        gst: "",
        tax: "",
        due: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
      });
      
return(
    <>
    <ContextData.Provider value={{formData,setFormData}}>
        {children}
    </ContextData.Provider>
    </>
)
}
export default ContextContent