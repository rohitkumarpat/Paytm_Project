import { useEffect, useState } from "react";
import { InputBox } from "./input";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserType {
  firstName: string;
  lastName: string;
  _id: string;
}

export const Users = () => {

  const [users, setUsers] = useState([]);
  const [filter,setfilter]=useState("");

  const token=localStorage.getItem("token")

   useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter,{
          headers:{
            token:token
          }
        })
            .then(response => {
                setUsers(response.data.users)
            })
    }, [filter])
  

  return (
    <div className="p-4">
      <div className="text-lg font-semibold mb-4">Users</div>

      <div className="mb-4">
        <InputBox onChange={(e)=>{
          setfilter(e.target.value);
        }}
           
        label="Search" placeholder="Search users..." />
      </div>

      <div className="space-y-4">
         {users.map(user => <User user={user} />)}
      </div>
    </div>
  );
};

interface UserProps {
  user: UserType;
}

function User({ user }: UserProps) {
    const navigate=useNavigate();
  
  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex items-center">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-4 text-xl font-medium">
          {user.firstName[0]}
        </div>
        <div className="text-base">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="w-36">
      <Button onClick={()=>{
  navigate('/send?id='   + user._id + "&name=" + user.firstName)
        }} label="Send Money" />
      </div>
    </div>
  );
}
