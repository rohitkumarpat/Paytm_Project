import { Appbar } from "../components/appbar";
import { Balance } from "../components/balance";
import { Users } from "../components/user";

export default function Dashboard() {
    
    return (
        <div>
            <Appbar />
            <Balance value={122} />
            <br />
            <Users />
        </div>
    )
}