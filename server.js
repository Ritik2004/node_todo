import { app } from "./app.js";
import { connectDb } from "./data/database.js";

connectDb();

app.listen(process.env.PORT, (req,res)=>{
    console.log(`server working on port: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
})