const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Vui lòng nhập tên sản phẩm."],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Vui lòng nhập thông tin sản phẩm."]
    },
    price:{
        type:Number,
        required:[true,"Vui lòng nhập giá sản phẩm."],
        maxLength:[10,"Giá sản phẩm không thể vượt quá 10 chữ số."]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Vui lòng nhập thể loại của sản phẩm đó."],

    },
    Stock:{
        type:Number,
        required:[true,"Vui lòng nhập số lượng của sản phẩm đó."],
        maxLength:[4, "Số lượng của sản phẩm đó không được vượt quá 10."],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createAt:{
        type:Date,
        default:Date.now
    }
})



module.exports = mongoose.model("Products", productSchema);