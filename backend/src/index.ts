import express from "express"
import { userrouter } from "./routes/user";
import cors from "cors"
import { accountrouter } from "./routes/account";
const app=express()

app.use(express.json());
app.use(cors()); 

app.use('/api/v1/user',userrouter)
app.use('/api/v1/account',accountrouter)



app.listen(3000);