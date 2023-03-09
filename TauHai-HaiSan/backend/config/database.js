const mongoose = require("mongoose");

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_URI,
        {   useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        }).then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        }).catch((err)=>{
            console.error(err);
        })
}

/*
    Hàm connectDatabase sử dụng mongoose.connect() để kết nối tới MongoDB server. 
    mongoose.connect() nhận vào hai đối số: địa chỉ của MongoDB database và các tùy chọn liên quan đến việc kết nối. 
    Trong đó, địa chỉ của MongoDB database được lấy từ biến môi trường process.env.DB_URI thông qua module dotenv.

    Các tùy chọn trong đối số thứ hai của mongoose.connect() có nghĩa như sau:
        useNewUrlParser: true: sử dụng trình phân tích URL mới cho các chuỗi kết nối.
        useUnifiedTopology: true: sử dụng một công nghệ kết nối mới cho các phiên bản MongoDB mới nhất.
        useCreateIndex: true: sử dụng phương thức createIndex() thay vì phương thức ensureIndex().
        
    Nếu kết nối thành công, sẽ in ra thông báo "MongoDB connected with server: <host>" với host là địa chỉ của MongoDB server.

    Nếu kết nối thất bại, sẽ in ra lỗi tương ứng.
*/

module.exports = connectDatabase