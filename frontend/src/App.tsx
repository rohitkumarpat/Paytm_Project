import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Signup} from "./page/signup";
import Dashboard from "./page/dashboard";
import Signin from "./page/signin";
import { SendMoney } from "./page/sendmoney";

export default function App() {
    return <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element={<SendMoney />} />
    </Routes>
    </BrowserRouter>
}