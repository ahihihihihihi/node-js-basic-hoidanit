import pool from "../config/connectDB";
import multer from 'multer';

let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute(`select * from users`);
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(`insert into users (firstName,lastName,email,address) values (?,?,?,?)`, [firstName, lastName, email, address]);
    return res.redirect('/');
}

let getDeleteUser = async (req, res) => {
    let userId = req.params.id;
    await pool.execute(`delete from users where id = ?`, [userId]);
    return res.redirect('/');
}

let getEditUser = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from users where id = ?`, [userId]);
    return res.render('editUser.ejs', { dataUser: user[0] })
}

let updateUser = async (req, res) => {
    let { id, firstName, lastName, email, address } = req.body;
    await pool.execute(`update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?`, [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="200"><hr /><a href="/upload">Upload another image</a>`);
}

let handleUploadMultipleFiles = async (req, res) => {
    // console.log('check files: ', req.files);
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="200" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);

}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    getDeleteUser,
    getEditUser,
    updateUser,
    getUploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles,
}