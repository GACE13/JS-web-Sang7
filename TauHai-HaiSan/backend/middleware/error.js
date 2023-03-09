const ErrorHander = require("../utils/errorhander");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Máy chủ nội bộ đang bị lỗi";

    res.status(err.statusCode).json
    ({
        success:false,
        message:err.message,
    })
}