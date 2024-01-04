import asyncHandler from "../Middleware/asyncHandler";
import generateToken from "../utils/generateToken";
import {authenticateUser,
generateTokenResponse,
createUser,
userProfile} from '../service.js'

// @desc Auth & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authenticateUser(email, password);

    
    generateTokenResponse(res, user);

        res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        });
    } catch (error) {
    console.error('Error in authUser:', error);
        if (error.message === 'User not found') {
        res.status(404).json({ error: 'User not found' });
    } 
    }
});
// @desc Register user
// @route POST /api/users
// @access Public
const registerUser=asyncHandler(async(req,res)=>{
    try {
        const{name,email,password}=req.body;
        const user=await createUser(name,email,password)

        generateTokenResponse(res,user)
    } catch (error) {
        
    }
})