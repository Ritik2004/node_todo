import mongoose from "mongoose"
const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
   isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'User',//here we will put what we have named the collection
       required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
})

const Task = mongoose.model("Task", schema)

export default Task