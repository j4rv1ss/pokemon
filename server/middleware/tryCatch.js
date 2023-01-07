export default (asyncAwaitError)=>(req,res,next)=>{
    Promise.resolve(asyncAwaitError(req,res,next)).catch(next)
}