import jwt from 'jsonwebtoken';

export const auth = (req, res, next)=> {
    try {
        //extract token from request
        const token = req.header('Authorization').replace('Bearer ', '');
        
    
        //check token validity
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
    
        req.user = {id: decoded.id,  role: decoded.role};
        console.log(req.user)
        next();
        
       
    }
    catch(err) {
        res.status(400).json({message: "invalid token"});
    }

}