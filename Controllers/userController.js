

import asyncHandler from "../Middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

import User from "../models/userModel.js";
import { authenticateUser,generateTokenResponse, createUser,} from '../Service/service.js'


// @desc Auth & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
        generateTokenResponse(res, user);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
});
// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password,isAdmin} = req.body;
    const user = await createUser(name,email,password,isAdmin)
        generateTokenResponse(res,user);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
});

export{
    authUser,
    registerUser,
}

