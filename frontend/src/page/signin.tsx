import { useRef } from "react";
import { Button } from "../components/button";
import { BottomWarning } from "../components/buttonwarning";
import { Heading } from "../components/heading";
import { InputBox } from "../components/input";
import { SubHeading } from "../components/subheading";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Signin() {

  const usernameRef=useRef<HTMLInputElement>(null);
  const passwordRef=useRef<HTMLInputElement>(null);
  const navigate=useNavigate();
     
  async function tokengeneration() {
   const username=usernameRef.current?.value;
   const password=passwordRef.current?.value;
   try {
   const response=await axios.post(BACKEND_URL + "/user/signin",{
    username,
    password
   })


   const jwt=response.data.token
   localStorage.setItem("token",jwt);
   navigate('/dashboard');

  }
  catch(error:any) {
    alert("invalid credential..")
  }
     
}


     return <div className="bg-slate-300 h-screen flex justify-center">
       <div className="flex flex-col justify-center">
         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
           <Heading label={"Sign In"} />
           <SubHeading label={"Enter your credential to access your account"} />
           <InputBox reference={usernameRef} placeholder="John" label={"Email"} />
           <InputBox reference={passwordRef} placeholder="12345" label={"password"} />
           <div className="pt-4">
             <Button onClick={tokengeneration} label={"Sign In"} />
           </div>
           <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
         </div>
       </div>
     </div>
}