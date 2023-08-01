import connection from "../config/connectDB";

let getHomePage = (req, res) => {
    let data = [];
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            // console.log('check results: ', results);
            for (let i = 0; i < results.length; i++) {
                let target = {};
                Object.assign(target, results[i])
                data.push(target);
            }
            // console.log('check data : ', data);
            // results.map((row) => {
            //     data.push({
            //         id: row.id,
            //         email: row.email,
            //         address: row.address,
            //         firstName: row.firstName,
            //         lastName: row.lastName
            //     })
            // })
            return res.render('index.ejs', { dataUser: JSON.stringify(data) });
        }
    )
}

module.exports = {
    getHomePage
}