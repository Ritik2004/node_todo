
import mongoose from 'mongoose'

export const connectDb = () => {
   // console.log(process.env.MONGO_URI);

    mongoose.connect(process.env.MONGO_URI, {
    dbName:"backendapi"
})
.then(()=> console.log("Database Connected"))
.catch(()=> console.log("Error in connecting"))
}