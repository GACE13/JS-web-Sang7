module.exports = theFunc => (req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
};

/*
    Một middleware function trong ExpressJS được sử dụng để xử lý các hàm bất đồng bộ (asynchronous function) 
trong ứng dụng Express.

    Middleware function này sẽ nhận đối số là một hàm bất đồng bộ và trả về một middleware function. 
Middleware function trả về sẽ được sử dụng để xử lý yêu cầu HTTP bằng cách gọi hàm bất đồng bộ được truyền
vào và sử dụng Promise.resolve để đảm bảo rằng hàm được giải quyết (resolve) đúng cách.

    Nếu hàm bất đồng bộ trả về một promise rejected (thất bại), chúng ta sẽ sử dụng phương thức catch để bắt 
lỗi đó và chuyển nó đến middleware function tiếp theo bằng cách gọi hàm next với đối số là đối tượng lỗi 
(error object). Điều này giúp cho ứng dụng của chúng ta tránh được việc dừng đột ngột khi có lỗi trong 
quá trình xử lý.
*/