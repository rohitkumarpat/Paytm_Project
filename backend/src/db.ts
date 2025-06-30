        import mongoose, { model, Schema } from "mongoose"
    import { number } from "zod"

        mongoose.connect("")

        const userschema=new Schema ({
            username:{type:String ,require:true,trim:true},
            password:{type:String ,require:true},
            firstName:{type:String,require:true,trim:true},
            lastName:{type:String,require:true,trim:true}
        })

        export const usermodel=model("users",userschema)

        const accountschema=new Schema({
            userid:{type:mongoose.Types.ObjectId,ref:'users',require:true},
            balance:{type:Number,require:true}
        })

        export const accountmodel=model("account",accountschema);