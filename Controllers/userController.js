

import asyncHandler from "../middleware/asyncHandler.js";

import User from "../models/userModel.js";
import { getUser } from "../Service/userService.js";



// @desc Auth & get token
// @route POST /api/users/login
// @access Public
//For login
const authUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return user;
    } else {
        throw new Error("Invalid email or password");
    }
    };
// @desc Register user
// @route POST /api/users
// @access Public

//For register

const registerUser = async (name, email, password, isAdmin) => {
    const user = await User.create({
        name,email,password, isAdmin
    });
    return user
}


//check User
const checkUser = async (email)=> {
    const user = await User.findOne({email})

    if(user){
        return user
    }
}

// @desc Get User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
    const user = await getUser(req);
        res.status(200).json(user);
});
export{
    authUser,
    registerUser,
    getUserByID,
    checkUser
}

