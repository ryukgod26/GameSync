import jwt from 'jsonwebtoken';

//This is a MiddleWare function to authenticate Json Web Token
//I did not knew how to use json web token.So I learned this from youtube an ai.
//So don't think this code is written by ai I just learned how to uset jwt but the xode is written by me.

function authenticateToken(req,res,next){
//Getting the Auth Header
console.log("test");
const authHeader = req.header['authorization'];
//if(!authHeader){
//return res.json({'message':'Please Log In First'});

//}
//checking if authHeader is null and if not split it ans get the token.
console.log(authHeader);
const token = authHeader && authHeader.split(' ')[1];

//Checking if token is null.
if(token == null){
return res.json({"message":"Please Login First"});
}

jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{

if(err){
console.log("Error Occured : " + err);
return res.json({"message" : "Server Error Occurred"});

}

//If token is valid
req.user = user;
next();
});

}

export default authenticateToken;
