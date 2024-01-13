import jwt from 'jsonwebtoken';

const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},"abc123",{
        expiresIn:'30d'
    });
    

    //Set JWT as HTTP-Only cookie
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:'strict',
        maxAge:30*24*60*60*1000//30 days
    });
};


export default generateToken;