import pool from "../config/connectDB";

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

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
}