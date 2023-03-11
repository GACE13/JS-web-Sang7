const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");

// Register a User
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    
    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:
        {
            public_id:"this is a sample id",
            url:"profilepicUrl",
        }
    });

    sendToken(user,201,res);
});

// Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHander("Xin vui lòng nhập Email và Password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Email và Password không hợp lê!!!",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Mật khẩu không đúng!!!",401))
    }

    sendToken(user,200,res);
});

// Logout user
exports.logout = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message: "Thoát ra thành công",
    });
})