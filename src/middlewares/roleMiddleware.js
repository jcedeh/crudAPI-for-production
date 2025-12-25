
export const authorizeRole = (...roles)=> {
   try{
     return (req, res, next)=> {
        if(roles !== 'admin') {
            return res.status(401).json({messsage: "you are not allowed"});
        }
        next();
    }
   }
   catch(err){
    console.error(err)
    res.status(500).json({message: "internal server error", err});
   }
}