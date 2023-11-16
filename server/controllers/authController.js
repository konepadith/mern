const jwt = require("jsonwebtoken");
const { expressjwt: expressjwt } = require('express-jwt');

module.exports.login=async(req,res,next)=>{
    const {username,password}=req.body
    if (password === process.env.PASSWORD) {
        const token=jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'1d'})
        return res.json({token,username})
    }else{
        res.status(400).json({error:"wrong password"})
    }
    try {
        res.json({
            username:username,
            password:password
        })
    } catch (error) {
        
    }
}
// exports.requireLogin = expressJwt({
//     secret: process.env.JWT_SECRET,
//     algorithms: ["HS256"]
// });
exports.requireLogin=expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})