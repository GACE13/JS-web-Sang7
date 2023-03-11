const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema
({
    name:
    {
        type:String,
        required:[true,"Vui lòng nhập tên của bạn."],
        maxLength:[30,"Tên không thể quá 30 kí tự."],
        minLength:[4,"Tên nên có trên 4 kí tự."]
    },
    email:
    {
        type:String,
        required:[true,"Vui lòng nhập email."],
        unique:true,
        validate:[validator.isEmail, "Vui lòng nhập đúng chuẩn Email."],
    },
    password:
    {
        type:String,
        required:[true,"Vui lòng nhập mật khẩu."],
        minLength:[8, "Mật khẩu phải có trên 8 kí tự."],
        select: false,
    },
    avatar:
    {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:
    {
        type:String,
        default:"user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save",async function(next){

    if(this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
})

//JWT Token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);