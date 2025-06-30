import { useRef } from "react"
import { Button } from "../components/button"
import { BottomWarning } from "../components/buttonwarning"
import { Heading } from "../components/heading"
import { InputBox } from "../components/input"
import { SubHeading } from "../components/subheading"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import z from "zod"

const signupSchema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: "Password must be at least 2 characters" }),
  firstName: z.string().min(2, { message: "First name is too short" }),
  lastName: z.string().min(2, { message: "Last name is too short" }),
});

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const firstnameRef = useRef<HTMLInputElement>(null)
  const lastnameRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  async function enter() {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const firstName = firstnameRef.current?.value || "";
    const lastName = lastnameRef.current?.value || "";

    const result = signupSchema.safeParse({
      username,
      password,
      firstName,
      lastName
    });

    if (!result.success) {
      alert(result.error.errors[0].message);
      return;
    }

    try {
      await axios.post(BACKEND_URL + "/user/signup", {
        username,
        password,
        firstName,
        lastName
      });

      alert("Sign Up successfully");
      navigate('/signin');
    } catch (e) {
      alert("Signup failed. Try again later.");
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox reference={firstnameRef} placeholder="John" label={"First Name"} />
          <InputBox reference={lastnameRef} placeholder="Doe" label={"Last Name"} />
          <InputBox reference={usernameRef} placeholder="rohit@gmail.com" label={"Email"} />
          <InputBox reference={passwordRef} placeholder="123456" label={"Password"} />

          <div className="pt-4">
            <Button onClick={enter} label={"Sign up"} />
          </div>
          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}
