import mongoose from "mongoose"

export const connectDatabase = () =>{
    mongoose.connect(process.env.MONGOURI)
    .then(()=>{console.log("mongodb is conected")})
    .catch((error)=>{console.log(error.message)})
}