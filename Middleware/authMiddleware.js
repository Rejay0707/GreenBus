import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import Ticket from '../models/ticketModel.js';
import Joi from 'joi';

//Protect routes
const protect=asyncHandler(async(req,res,next)=>{
    let token;

    //Read the JWT from the cookie
    token =req.cookies.jwt;
    // console.log(token)

    if(token){
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decoded);
            req.user=await User.findById(decoded.userId).select('-password');
            
            next();
        } catch (error) {
            console.log(error)
                res.status(401).json({
                    "message":"Authentication failed. Please sign in again."
                })
            }
    }else{
        res.status(401).json({
            "message":"Authentication failed. No token provided."
        })
    }
})

//check user
const checkUserDetails = (req,res,next) => {
    const user_id = userId(req)
    const id = req.params.id
    if(id === user_id){
        next();
    } else {
        return res.status(404).json({
            message: "User ID Not Found"
        })
    }
}

// Admin middleware
const admin=(req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        next();
    }else{
        res.status(401).json({
            "message":"Not authorized as admin"})
    }
}

// // Get user Id
const userId = (req) => {
    const token = req.cookies.jwt;

    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.userId;
    } catch (error) {
        console.log('Error verifying JWT:', error);
        return null;
    }
};

// Register User(validation)
const register = (data) => {
    const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean(),
    });
    return schema.validate(data);
};

// Login User(validation)
const login = (data) => {
    const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    });
    return schema.validate(data);
};


//Verify that the correct user is logged in to access the ticket.
const checkAuthDetails = async (req, res, next) => {
    const user_id = userId(req)
    const ticket = req.params.id
    

    try{
        const user = await Ticket.findById(ticket);
        if(!user){
            return res.status(404).json({
                message: "Ticket Not Found"
            })
        }
        if(user.user_id != user_id){
            return res.status(404).json({
                message: "User Ticket Not Found"
            })
        } else{
            next();
        }
    } catch (error){
        return res.status(404).json({
            message: "Invalid Ticket ID"
        })
    }
    

}




export { protect, admin, userId ,register,login,checkUserDetails,checkAuthDetails};

