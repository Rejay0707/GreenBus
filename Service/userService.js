
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";
import { registerUser,checkUser,authUser } from "../Controllers/userController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { register,login } from "../middleware/authMiddleware.js";

const generateTokenResponse = (res, user) => {
    generateToken(res, user._id);
    };
// For login
// const authenticateUser = async (email, password) => {
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//         return user;
//     } else {
//         throw new Error("Invalid email or password");
//     }
//     };
// const authenticateUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await authUser(email, password);
//         generateTokenResponse(res, user);
//         res.status(200).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin,
//         });
// });

//for login
const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { error } = login(req.body);
    if (error){
        console.log(error)
        return res.status(400).json({
            message: error.message
        });
    }
    

    try {
        const user = await authUser(email, password)
        if(user) {
            
            generateToken(res, user._id);
    
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Invalid email or password"})
    }
});



    
    //for register

    const createUser = asyncHandler (async (req, res) => {
        
        const { name, email, password, isAdmin } = req.body;
        
        const { error } =  register(req.body)
    
        if (error){
            console.log(error)
            return res.status(400).json({
                message : error.message
            });
        }
    
        try {
            const userExists = await checkUser(email)
    
            if (userExists){
                return await res.status(400).json({
                    "message" : "User already Exists"
                })
            }
            const user =await registerUser(name, email, password, isAdmin);
    
                generateToken(res, user._id)
    
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                })
        } catch (error) {
            res.status(401).json({
                
                "message": "registration failed please try again later"
            })
        } 
    });

    
    //get user
    const getUser = async (req) => {
        const user = await User.findById(req.params.id);
        if (user) {
            return user;
        } else {
            throw new Error("User not found");
        }
        };
    export {
        authenticateUser,
        generateTokenResponse,
        createUser,
        getUser,
    }
    

    