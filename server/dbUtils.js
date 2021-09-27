const mysql = require("mysql2/promise");
const uuid = require("uuid");
require("dotenv").config();

let connection = null;

(async () => {
	connection = await mysql.createConnection({
		host: process.env.DBHOST,
		user: process.env.DBUSER,
		password: process.env.DBPASS,
		database: process.env.DBNAME,
	});
})();

const dbUtils = {
	addUser: async ({ login, nickname, password }) => {
		let id = uuid.v4();
		let answer = await connection.execute(
			`INSERT INTO User (_id, login, password, photo_path, nickname)
            SELECT * FROM (SELECT ? as _id, ? as login, ? as password, null as photo_path, ? as nickname) AS tmp
            WHERE NOT EXISTS (
                SELECT login FROM User WHERE login = ? or nickname = ?
            ) LIMIT 1;`,
			[id, login, password, nickname, login, nickname]
		);

		return { id, answer, login, nickname };
	},

	getUser: async ({ login, password }) => {
		return await connection.execute(
			`Select * from User where login = ? and password = ?;`,
			[login, password]
		);
	},

	getUserNickname: async (id) => {
		return await connection.execute(
			`Select (nickname) from User where _id = ?;`,
			[id]
		);
	},

	initTypes: async (types) => {
		await connection.execute("delete from Type;", []);

		for (let t of types) {
			connection.execute("insert into Type(_id, name) values(?, ?);", [
				t.id,
				t.name,
			]);
		}
	},

	initCategories: async (categories) => {
		await connection.execute("delete from Category;", []);

		for (let c of categories) {
			connection.execute(
				"insert into Category(_id, name) values(?, ?);",
				[c.id, c.name]
			);
		}
	},

	createBusiness: async (id) => {
		let bId = uuid.v4();
		await connection.execute(
			`insert into business(_id, user_id) values (?, ?);`,
			[bId, id]
		);

		return bId;
	},

	createIncome: async (edId, data) => {
		connection.execute(
			`insert into income(_id, edition_id, profit, description) values (?, ?, ?, ?);`,
			[uuid.v4(), edId, data.profit, data.description]
		);
	},

	createExpence: async (edId, data) => {
		connection.execute(
			`insert into expence(_id, edition_id, salary, electricity, amortization, materials, maintenance, description) values (?, ?, ?, ?, ?, ?, ?, ?);`,
			[
				uuid.v4(),
				edId,
				data.salary,
				data.electricity,
				data.amortization,
				data.materials,
				data.maintenance,
				data.description,
			]
		);
	},

	createEdition: async function (bId, { data }) {
		let edId = uuid.v4();
		let result = await connection.execute(
			`insert into edition(_id, business_id, category_id, type_id, name, description, creation_date) values (?, ?, ?, ?, ?, ?, ?);`,
			[
				edId,
				bId,
				data.category,
				data.type,
				data.name,
				data.description,
				Date.now(),
			]
		);

		this.createIncome(edId, data.incomings);
		this.createExpence(edId, data.spendings);

		return edId;
	},

	getEditionById: async (eId) => {
		return await connection.execute(
			`
            select
                (
                select
                    count(_id) 
                from
                    likes 
                where
                    edition_id = ?) as likes,
                    (
                        select
                            count(_id) 
                        from
                            dislikes 
                        where
                            edition_id = ?
                    )
                    as dislikes,
                    e._id,
                    e.business_id,
                    e.category_id,
                    e.type_id,
                    e.name,
                    e.description,
                    e.creation_date,
                    i.profit as profit,
                    i.description as incomeDescription,
                    ex.salary as salary,
                    ex.electricity as electricity,
                    ex.amortization as amortization,
                    ex.materials as materials,
                    ex.maintenance as maintenance,
                    ex.description as expenceDescription 
                from
                    edition e 
                    left join
                        income i 
                        on e._id = i.edition_id 
                    left join
                        expence ex 
                        on e._id = ex.edition_id 
                where
                    e._id = ?;
            `,
			[eId, eId, eId]
		);
	},

	getBusinessEditions: async (bId) => {
		return await connection.execute(
			`select _id from edition where business_id = ? order by creation_date;`,
			[bId]
		);
	},

	getBusinessOwner: async (bId) => {
		return await connection.execute(
			`select user_id from business where _id = ?;`,
			[bId]
		);
	},

	getBusinessById: async function (bId, owner = null) {
		let ownerId = owner;

		if (!ownerId) {
			ownerId = await this.getBusinessOwner(bId);
			ownerId = ownerId[0][0].user_id;
		}

		let answer = {
			id: bId,
			owner: ownerId,
		};

		let [editions, eFields] = await this.getBusinessEditions(bId);

		let editionsData = [];

		for (let e of editions) {
			let currentEdition = await this.getEditionById(e._id);
			let editionObject = currentEdition[0][0];
			editionsData.unshift(
				Object.assign(
					{},
					{
						id: editionObject._id,
						content: {
							name: editionObject.name,
							description: editionObject.description,
							category: parseInt(editionObject.category_id),
							type: parseInt(editionObject.type_id),
							likes: editionObject.likes,
							dislikes: editionObject.dislikes,
							created: editionObject.creation_date,
							income: {
								profit: editionObject.profit,
								description: editionObject.incomeDescription,
							},
							expence: {
								description: editionObject.expenceDescription,
								salary: editionObject.salary,
								electricity: editionObject.electricity,
								amortization: editionObject.amortization,
								materials: editionObject.materials,
								maintenance: editionObject.maintenance,
							},
						},
					}
				)
			);
		}

		answer["editions"] = editionsData;

		return answer;
	},

	getPlan: async (bId, eId) => {
		let res = await connection.execute(
			`SELECT e._id,
                    (select count(_id) from likes where edition_id = ?) as likes, 
                    (select count(_id) from dislikes where edition_id = ?) as dislikes,
                    e.business_id,
                    e.category_id,
                    e.type_id,
                    e.name,
                    e.description,
                    e.creation_date,
                    i.profit AS profit,
                    i.description AS incomeDescription,
                    ex.salary AS salary,
                    ex.electricity AS electricity,
                    ex.amortization AS amortization,
                    ex.materials AS materials,
                    ex.maintenance AS maintenance,
                    ex.description AS expenceDescription,
                    b.user_id AS user_id
            FROM edition e
            LEFT JOIN income i ON e._id = i.edition_id
            LEFT JOIN expence ex ON e._id = ex.edition_id
            LEFT JOIN business b ON e.business_id = b._id
            WHERE e._id = ?`,
			[eId, eId, eId]
		);

		let editionObject = res[0][0];

		return Object.assign(
			{},
			{
				name: editionObject.name,
				owner: editionObject.user_id,
				description: editionObject.description,
				category: parseInt(editionObject.category_id),
				type: parseInt(editionObject.type_id),
				likes: editionObject.likes,
				dislikes: editionObject.dislikes,
				created: editionObject.creation_date,
				income: {
					profit: editionObject.profit,
					description: editionObject.incomeDescription,
				},
				expence: {
					description: editionObject.expenceDescription,
					salary: editionObject.salary,
					electricity: editionObject.electricity,
					amortization: editionObject.amortization,
					materials: editionObject.materials,
					maintenance: editionObject.maintenance,
				}
			}
		);
	},

	getBusinessesByOwnerId: async (owner) => {
		return await connection.execute(
			`select _id from business where user_id = ?;`,
			[owner]
		);
	},

	getOwnerBusinesses: async function (owner) {
		let [result, fields] = await this.getBusinessesByOwnerId(owner);

		let businesses = [];

		for (let r of result) {
			let b = await this.getBusinessById(r._id);
			businesses.push(b);
		}

		return businesses;
	},

	getAllEditionsForBusinessesFiltration: async (offset, count) => {

		//order by + filters

		return await connection.execute(
			`select * from edition a where not exists (select * from edition b where a.business_id = b.business_id and b.creation_date > a.creation_date) limit ? offset ?;`,
			[count, offset]
		);
	},

	getBusinessesWithFilters: async function (filters) {
		let [result, fields] = await this.getAllEditionsForBusinessesFiltration(
			filters.offset,
			filters.count
		);

		let businesses = [];

		for (let r of result) {
			let b = await this.getBusinessById(r.business_id);
			businesses.push(b);
		}

		return businesses;
	},

	getComments: async (params) => {
		let [result, fields] = await connection.execute(
			`select * from comment where edition_id=? order by creation_date limit ? offset ?;`,
			[params.edId, params.count, params.offset]
		);

		let comments = [];

		console.log(params.count, params.offset, result)

		for (let r of result) {
			let [users, fields] = await connection.execute(
				`select * from user where _id=?;`,
				[r.user_id]
			);
			comments.push(Object.assign({}, {
				id: r._id,
				created: r.creation_date,
				text: r.text,
				author: {
					id: r.user_id,
					nickname: users[0].nickname
				}
			}));
		}

		console.log('comments', comments)

		return comments;
	},

	createComment: async (data, user) => {
		console.log(data)
		let id = uuid.v4();
		let created = Date.now();
		let comment = null;
		let [result, fields] = await connection.execute(
			`insert into comment(_id, edition_id, user_id, text, creation_date) values (?, ?, ?, ?, ?);`,
			[id, data.eId, user, data.comment, created]
		);

		return { id, created, text: data.comment }
	},

	updateNickname: async (id, nickname) => {
		return await connection.execute(
			`update user set nickname = ? where _id = ?;`,
			[nickname, id]
		);
	},

	updatePassword: async (id, oldPass, pass) => {
		return await connection.execute(
			`update user set password = ? where _id in (select _id from (select * from user) as tmp where tmp._id = ? and tmp.password = ?);`,
			[pass, id, oldPass]
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
		return await connection.execute(`delete from Token where body = ?;`, [
			token,
		]);
	},
};

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
