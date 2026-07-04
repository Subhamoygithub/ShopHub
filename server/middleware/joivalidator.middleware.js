const ValidatorMiddleware = (Schema)=>(req,res,next)=>{
    const {error} = Schema.validate(req.body,{abortEarly:false})
    if(error){
        return res.status(400).json({
            msg:"Validattion failed",
            details:error.details.map((d)=>d.message),
        });
    }
    next();
};
module.exports = ValidatorMiddleware;