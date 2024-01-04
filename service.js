import User from "./models/userModel";
import generateToken from "./utils/generateToken";

// Generate Token
const generateTokenResponse = (res, user) => {
    generateToken(res, user._id);
    };
    // For login
    const authenticateUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return user;
    } else {
        throw new Error("Invalid email or password");
    }
    };
    // For Register
    const createUser = async (name, email, password) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        return user;
    } else {
        throw new Error("Invalid user data");
    }
    };
    // User Profile
    const userProfile = async (req) => {
    const user = await User.findById(req.user._id);
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
        userProfile,
    }