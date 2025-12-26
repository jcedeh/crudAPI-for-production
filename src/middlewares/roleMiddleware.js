
export const authorizeRole = (...roles)=> {
   try{
     return (req, res, next)=> {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({messsage: "you are not allowed"});
        }
        next();
    }
   }
   catch(err){
    console.error(err)
    res.status(500).json({message: "internal server error", err});
   }
}