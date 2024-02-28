
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        requied: true,
        unique: true,
    },
    password: {
        type: String,
        requied: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true,
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
};
console.log(userSchema.methods.matchPassword)

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
        return; // Return early if password is not modified
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next(); // Call next() after the password has been hashed
    } catch (error) {
        console.error('Error hashing password:', error);
        next(error); // Pass the error to the next middleware
    }
});



const User = mongoose.model("User", userSchema);
export default User



