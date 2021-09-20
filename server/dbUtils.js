const mysql = require('mysql2/promise');
const uuid = require('uuid');
require('dotenv').config();

let connection = null;

(async () => {
    connection = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    });
})();

const dbUtils = {
    addUser: async ({login, nickname, password}) => {
        let id = uuid.v4();
        let answer = await connection.execute(
            `INSERT INTO User (_id, login, password, photo_path, nickname)
            SELECT * FROM (SELECT ? as _id, ? as login, ? as password, null as photo_path, ? as nickname) AS tmp
            WHERE NOT EXISTS (
                SELECT login FROM User WHERE login = ? or nickname = ?
            ) LIMIT 1;`,
            [id, login, password, nickname, login, nickname]
        );

        return { id, answer, login, nickname }
    },

    getUser: async ({login, password}) => {
        return await connection.execute(
            `Select * from User where login = ? and password = ?`,
            [login, password]
        );
    },

    getUserNickname: async (id) => {
        return await connection.execute(
            `Select (nickname) from User where _id = ?`,
            [id]
        );
    },

    setToken: async (id, deathDate, ip) => {
        let token = uuid.v4();
        let answer = await connection.execute(
            `Replace into Token (body, user_id, death_date, ip) values (?, ?, ?, ?);`,
            [token, id, deathDate, ip]
        );

        return token;
    },

    getUserByToken: async (token) => {
        return await connection.execute(
            `select * from token left join user on token.user_id = user._id where body = ?;`,
            [token]
        );
    },

    dropToken: async (token) => {
        return await connection.execute(
            `delete from Token where body = ?;`,
            [token]
        );
    }
}

// const connection = await dbCon.getConnection();
// try {
//   await connection.query('START TRANSACTION');
//   await query('INSERT INTO `tbl_activity_log` (dt, tm,userid,username,activity) VALUES(?,?,?,?,?)',
//                     ['2019-02-21', '10:22:01', 'S', 'Pradip', 'RAhul3']);
//   await dbCon.query('INSERT INTO `tbl_activity_log` (dt, tm,userid,username,activity) VALUES(?,?,?,?,?)', ['2019-02-21', '10:22:01', 'S', 'Pradip','this is test and the valid out put is this and then']);
//   await connection.release();
// } catch(e) {
//   await connection.query('ROLLBACK');
//   await connection.release();
// }

module.exports = dbUtils;
