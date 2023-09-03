import userModel from "../../../../DB/model/user.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";




export const updateUser=asynchandlier(async(req,res,next)=>{


   const user= await userModel.findByIdAndUpdate({_id:req.user._id},{$set:req.body},{new:true}).select("email userName")
   if (!user) {
    next (new Error("user not found or fail to update"))
   } else {
    res.status(404).json({message:"user updated",user})
    
   }
   
   










})




export const deleteUser=asynchandlier(async(req,res,next)=>{
    
     const {id}=req.params
    const user= await userModel.findByIdAndDelete(id).select("email userName")
    if (!user) {
     next (new Error("user not found or fail to deldte"))
    } else {
     res.status(404).json({message:"user has been deleted",user})
    }
     
    })


    export const getUsers=asynchandlier(async(req,res,next)=>{
    
        
       const users= await userModel.find({}).select("email userName")
       if (!users) {
        next (new Error("users not found "))
       } else {
        res.status(404).json({message:"users",users})
       }
        
       })