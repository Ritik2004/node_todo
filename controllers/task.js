import Task from '../models/task.js'
export const newTask = async (req,res,next) => {

  try{
    const{ title, description } = req.body;
          
    await Task.create({
  
      title,
      description,
      //we will get infromation of user in req.user because we
      //have applied isAunthenticate function, when it will run 
      //successfully it will call the next() and information
      //is stored in req.user
  
      user: req.user
    })
     res.status(201).json({
      success:true,
      message: "Task added success"
     })
  }catch(error){
       next(error)
  }
}

export const getMyTask = async (req, res, next) => {
 try{
      
    //req.user will give information of user and
    //with this we will take user id
    const userid = req.user._id; 

    //we will find the user whose id is userid
    const tasks = await Task.find({user: userid})
  
    res.status(200).json({
        success: true,
        tasks,
    })
 }catch(error){
     next(error)
 }
}

export const updateTask = async (req, res, next) => {
  
  //here we are passing dynamic url in routes 
  //which will contain id which we get through req.params
   //const id = req.params;

  try{
    const task = await Task.findById(req.params.id)
    if(!task) return next(new Error("Invalid id"));
 
     task.isCompleted = !task.isCompleted;
     await task.save();
     
     res.status(200).json({
         success: true,
         message: "Task updated"
        
     })
  }
  catch(error){
      next(error)
  }
}

export const deleteTask = async (req, res, next) => {

   try{
        //const id = req.params;
    const task = await Task.findById(req.params.id)
    //this next will call the error middleware which we have passe in 
    //app.js
    if(!task) return next(new Error("Invalid id"));
    await task.deleteOne();
 
   res.status(200).json({
       success: true,
       message: "Task deleted"
       
   })
   }
   catch(error){
      next(error)
   }
}