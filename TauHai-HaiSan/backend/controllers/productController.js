const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");


//Create Product 
exports.createProduct = catchAsyncErrors(async(req,res)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });

});

// Get all product
exports.getAllProducts = catchAsyncErrors( async(req,res) => {

    const products = await Product.find();

    res.status(200).json(
        {
            success:true,
            products
        }
    );

});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Không tìm thấy sản phẩm!!!",404));
    }

    product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
    );

    res.status(200).json({
        success:true,
        product
    });
});

// Get Product details
exports.getProdcutDetails = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product)
    {
        return next(new ErrorHander("Không tìm thấy sản phẩm!!!",404));
    };

    res.status(200).json
    ({
        success:true,
        product
    });
});

// Delete product
exports.deleteProduct = catchAsyncErrors( async(req,res,next)=>{
    
    const product = await Product.findById(req.params.id);

    if(!product)
    {
        return next(new ErrorHander("Không tìm thấy sản phẩm!!!",404));
    }

    await product.remove();

    res.status(200).json
    ({
        success:true,
        message:"Sản phẩm đã xóa thành công."
    });

});