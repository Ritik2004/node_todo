
import mongoose from 'mongoose'

export const connectDb = () => {
   // console.log(process.env.MONGO_URI);

    mongoose.connect(process.env.MONGO_URI, {
    dbName:"backendapi"
})
.then((c)=> console.log(`Database Connected ${c.connection.host} `))
.catch(()=> console.log("Error in connecting"))
}