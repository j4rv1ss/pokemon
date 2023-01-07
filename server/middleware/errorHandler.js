export default (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"
return res.status(err.statusCode).json({status:false, message:err.message})

}