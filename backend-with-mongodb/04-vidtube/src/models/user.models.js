
    import mongoose, { Schema } from "mongoose";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";

    const userSchema = new Schema(
        {
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
                index: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
                index: true
            },
            fullname: {
                type: String,
                required: true,
                trim: true,
                index: true
            },
            avatar: {
                type: String,
                required: true
            },
            coverImage: {
                type: String,
            },
            watchHistory: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Video"
                }
            ],
            password: {
                type: String,
                required: [true, "Password is required"],
            },
            refreshToken: {
                type: String
            }
        },
        { timestamps: true }
    );

    // Encrypt password
    userSchema.pre("save", async function (next) {
        if (!this.modified("password")) return next(); // run the below code only if password is modified
        this.password = bcrypt.hash(this.password, 10);
        next();
    });

    // Compare password with the one in the database
    userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    // Generate access token 
    userSchema.methods.generate = function (){
        // short lived access token
        return jwt.sign( { 
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname, 
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }    
        );
    }

    // Generate refresh token with exactly same structure as access token
    userSchema.methods.generateRefreshToken = function () {
        return jwt.sign( { 
            _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }    
        );
    }

    const User = mongoose.model("User", userSchema);
    export default User;

