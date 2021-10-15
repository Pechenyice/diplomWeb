const mysql = require("mysql2/promise");
const uuid = require("uuid");
require("dotenv").config();

let connection = null;

(async () => {
	try {
		connection = await mysql.createConnection({
			host: process.env.DBHOST,
			user: process.env.DBUSER,
			password: process.env.DBPASS,
			database: process.env.DBNAME,
		});
		console.log("SUCCESSFUL CONNECTION TO BD");
	} catch (e) {
		console.log("FAILED CONNECT TO BD, TRY AGAIN");
		try {
			connection = await mysql.createConnection({
				host: process.env.DBHOST,
				user: process.env.DBUSER,
				password: process.env.DBPASS,
				database: process.env.DBNAME,
			});
		} catch (e) {
			console.log("FAILED CONNECT TO BD AGAIN", e);
		}
	}
	
})();

const dbUtils = {
	addUser: async ({ login, nickname, password }) => {
		let id = uuid.v4();
		try {
			let answer = await connection.execute(
				`INSERT INTO user (_id, login, password, photo_path, nickname)
            SELECT * FROM (SELECT ? as _id, ? as login, ? as password, null as photo_path, ? as nickname) AS tmp
            WHERE NOT EXISTS (
                SELECT login FROM user WHERE BINARY login = ? or BINARY nickname = ?
            ) LIMIT 1;`,
				[id, login, password, nickname, login, nickname]
			);
		} catch {
			return { id, answer: null, login, nickname };
		}

		return { id, answer, login, nickname };
	},

	getUser: async ({ login, password }) => {
		try {
			return await connection.execute(
				`Select * from user where BINARY login = ? and BINARY password = ?;`,
				[login, password]
			);
		} catch (e) {
			console.log(e);
			return null;
		}
	},

	getUserNickname: async (id) => {
		try {
			return await connection.execute(
				`Select (nickname) from user where _id = ?;`,
				[id]
			);
		} catch {
			return null;
		}
	},

	initTypes: async (types) => {
		try {
			await connection.execute("delete from type;", []);

			for (let t of types) {
				connection.execute("insert into type(_id, name) values(?, ?);", [
					t.id,
					t.name,
				]);
			}
		} catch (e) {
			console.log('failed update TYPES');
		}
	},

	initCategories: async (categories) => {
		try {
			await connection.execute("delete from category;", []);

			for (let c of categories) {
				connection.execute(
					"insert into category(_id, name) values(?, ?);",
					[c.id, c.name]
				);
			}
		} catch (e) {
			console.log('failed update CATEGORIES');
		}
	},

	createBusiness: async (id) => {
		let bId = uuid.v4();
		try {
			await connection.execute(
				`insert into business(_id, user_id) values (?, ?);`,
				[bId, id]
			);
		} catch {
			return null;
		}

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
		try {
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
		} catch {
			return null;
		}

		return edId;
	},

	getEditionById: async (eId, user = null) => {
		return user ?
			await connection.execute(
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
                    ) as dislikes,
                    (select _id from likes where edition_id = ? and user_id = ?) as liked,
                    (select _id from dislikes where edition_id = ? and user_id = ?) as disliked,
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
				[eId, eId, eId, user, eId, user, eId]
			) :
			await connection.execute(
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
		try {
			return await connection.execute(
				`select user_id, nickname from business left join user on business.user_id = user._id where business._id = ?;`,
				[bId]
			);
		} catch {
			return null;
		}
	},

	deletePlan: async (bId) => {
		try {
			return await connection.execute(
				`delete from business where business._id = ?;`,
				[bId]
			);
		} catch {
			return null;
		}
	},

	getBusinessById: async function (bId, owner = null, user = null) {
		let ownerId = owner;
		let ownerNickname = null;

		if (!ownerId) {
			ownerId = await this.getBusinessOwner(bId);
			ownerNickname = ownerId[0][0].nickname;
			ownerId = ownerId[0][0].user_id;
		}

		let answer = {
			id: bId,
			owner: ownerId,
			ownerNickname,
		};

		let [editions, eFields] = await this.getBusinessEditions(bId);

		let editionsData = [];

		for (let e of editions) {
			let currentEdition = await this.getEditionById(e._id, user);
			let editionObject = currentEdition[0][0];
			editionsData.push(
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
							liked: editionObject.liked,
							disliked: editionObject.disliked,
						},
					}
				)
			);
		}

		editionsData.reverse();

		answer["editions"] = editionsData;

		return answer;
	},

	getPlan: async (bId, eId, user) => {
		try {
			let res = await connection.execute(
				`SELECT e._id,
						(select count(_id) from likes where edition_id = ?) as likes, 
						(select count(_id) from dislikes where edition_id = ?) as dislikes,
						(select _id from likes where edition_id = ? and user_id = ?) as liked,
						(select _id from dislikes where edition_id = ? and user_id = ?) as disliked,
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
						b.user_id AS user_id,
						u.nickname AS ownerNickname
				FROM edition e
				LEFT JOIN income i ON e._id = i.edition_id
				LEFT JOIN expence ex ON e._id = ex.edition_id
				LEFT JOIN business b ON e.business_id = b._id
				LEFT JOIN user u ON b.user_id = u._id
				WHERE e._id = ?`,
				[eId, eId, eId, user, eId, user, eId]
			);

			let editionObject = res[0][0];

			return Object.assign(
				{},
				{
					name: editionObject.name,
					owner: editionObject.user_id,
					ownerNickname: editionObject.ownerNickname,
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
					liked: editionObject.liked,
					disliked: editionObject.disliked,
				}
			);
		} catch {
			return null;
		}
	},

	getBusinessesByOwnerId: async (owner) => {
		return await connection.execute(
			`select _id from business where user_id = ?;`,
			[owner]
		);
	},

	getLikedBusinessesByOwnerId: async (owner) => {
		return await connection.execute(
			`select b._id from likes l left join edition e on l.edition_id = e._id left join business b on e.business_id = b._id where l.user_id = ? group by b._id, e.creation_date order by e.creation_date;`,
			[owner]
		);
	},

	getDislikedBusinessesByOwnerId: async (owner) => {
		return await connection.execute(
			`select b._id from dislikes d left join edition e on d.edition_id = e._id left join business b on e.business_id = b._id where d.user_id = ? group by b._id, e.creation_date order by e.creation_date;`,
			[owner]
		);
	},

	createLike: async (data, uId) => {
		try {
			let [deletion, _d] = await connection.execute(
				`delete from dislikes where user_id = ? and edition_id = ?;`,
				[uId, data.eId]
			);

			[deletion, _d] = await connection.execute(
				`delete from likes where user_id = ? and edition_id = ?;`,
				[uId, data.eId]
			);

			let [insertion, _i] = await connection.execute(
				`insert into likes(_id, user_id, edition_id) values (?, ?, ?);`,
				[uuid.v4(), uId, data.eId]
			);
		} catch {
			return false;
		}

		return true;
	},

	dropLike: async (data, uId) => {
		try {
			let [deletion, _d] = await connection.execute(
				`delete from likes where user_id = ? and edition_id = ?;`,
				[uId, data.eId]
			);
		} catch {
			return false;
		}
		return true;
	},

	createDislike: async (data, uId) => {
		try {
			let [deletion, _d] = await connection.execute(
				`delete from likes where user_id = ? and edition_id = ?;`,
				[uId, data.eId]
			);

			[deletion, _d] = await connection.execute(
				`delete from dislikes where user_id = ? and edition_id = ?;`,
				[uId, data.eId]
			);

			let [insertion, _i] = await connection.execute(
				`insert into dislikes(_id, user_id, edition_id) values (?, ?, ?);`,
				[uuid.v4(), uId, data.eId]
			);
		} catch {
			return false;
		}

		return true;
	},

	dropDislike: async (data, uId) => {
		try {
			let [deletion, _d] = await connection.execute(
				`delete from dislikes where user_id = ? and edition_id = ?;`,
				[uId, data.eId]
			);
		} catch {
			return false;
		}

		return true;
	},

	getOwnerBusinesses: async function (owner) {
		let businesses = [];
		try {
			let [result, fields] = await this.getBusinessesByOwnerId(owner);

			for (let r of result) {
				let b = await this.getBusinessById(r._id);
				businesses.push(b);
			}
		} catch {
			return null;
		}

		return businesses;
	},

	getOwnerLikedBusinesses: async function (owner) {
		let businesses = [];

		try {
			let [result, fields] = await this.getLikedBusinessesByOwnerId(owner);

			for (let r of result) {
				let b = await this.getBusinessById(r._id);
				businesses.push(b);
			}
		} catch (e) {
			console.log(e);
			return null;
		}

		return businesses;
	},

	getOwnerDislikedBusinesses: async function (owner) {
		let businesses = [];

		try {
			let [result, fields] = await this.getDislikedBusinessesByOwnerId(owner);

			for (let r of result) {
				let b = await this.getBusinessById(r._id);
				businesses.push(b);
			}
		} catch (e) {
			console.log(e);
			return null;
		}

		return businesses;
	},

	getAllEditionsForBusinessesFiltration: async (offset, count, name, sort, category, type) => {
		//order by + filters

		sort = +sort;
		category = +category;
		type = +type;

		const SORT_ENUM = {
			0: 'order by creation_date desc',
			1: 'order by creation_date',
			2: 'order by li+di desc'
		}

		const FILTER_CATEGORY = category === -1 ? '' : 'category_id = ? and';
		const FILTER_TYPE = type === -1 ? '' : 'type_id = ? and';

		let values = [];

		if (category !== -1) values.push(category + '');
		if (type !== -1) values.push(type + '');

		let query = `select a.*, (select count(_id) from likes where edition_id = a._id) as li, (select count(_id) from dislikes where edition_id = a._id) as di from edition a where ${FILTER_CATEGORY} ${FILTER_TYPE} name like ? and not exists (select * from edition b where a.business_id = b.business_id and b.creation_date > a.creation_date) ${SORT_ENUM[sort]} limit ? offset ?;`;
		let filler = values.concat([`%${name}%`, count, offset]);

		return await connection.execute(
			query,
			filler
		);
	},

	getAllBusinessEditions: async (bId) => {
		let editions = [];

		try {
			let [result, fields] = await connection.execute(
				`select * from edition where business_id=?;`,
				[bId]
			);

			for (let r of result) {
				editions.push(
					Object.assign(
						{},
						{
							id: r._id,
							content: {
								category: r.category,
								created: r.creation_date,
								description: r.description,
								name: r.name,
							},
						}
					)
				);
			}
		} catch {
			return null;
		}

		return editions;
	},

	getBusinessesWithFilters: async function (filters, user = null) {
		let businesses = [];

		try {
			let [result, fields] = await this.getAllEditionsForBusinessesFiltration(
				filters.offset,
				filters.count,
				filters.f_pattern,
				filters.f_sort,
				filters.f_category,
				filters.f_type
			);

			for (let r of result) {
				let b = await this.getBusinessById(r.business_id, null, user);
				businesses.push(b);
			}
		} catch {
			return null;
		}

		return businesses;
	},

	getComments: async (params) => {
		let comments = [];
		try {
			let [result, fields] = await connection.execute(
				`select * from comment where edition_id=? order by creation_date limit ? offset ?;`,
				[params.edId, params.count, params.offset]
			);

			for (let r of result) {
				let [users, fields] = await connection.execute(
					`select * from user where _id=?;`,
					[r.user_id]
				);
				comments.push(
					Object.assign(
						{},
						{
							id: r._id,
							created: r.creation_date,
							text: r.text,
							author: {
								id: r.user_id,
								nickname: users[0].nickname,
							},
						}
					)
				);
			}
		} catch {
			return null;
		}

		return comments;
	},

	createComment: async (data, user) => {
		let id = uuid.v4();
		let created = Date.now();
		let comment = null;
		try {
			let [result, fields] = await connection.execute(
				`insert into comment(_id, edition_id, user_id, text, creation_date) values (?, ?, ?, ?, ?);`,
				[id, data.eId, user, data.comment, created]
			);
		} catch {
			return null;
		}

		return { id, created, text: data.comment };
	},

	updateNickname: async (id, nickname) => {
		try {
			return await connection.execute(
				`update user set nickname = ? where _id = ?;`,
				[nickname, id]
			);
		} catch {
			return null;
		}
	},

	updatePassword: async (id, oldPass, pass) => {
		try {
			return await connection.execute(
				`update user set password = ? where _id in (select _id from (select * from user) as tmp where tmp._id = ? and BINARY tmp.password = ?);`,
				[pass, id, oldPass]
			);
		} catch {
			return null;
		}
	},

	setToken: async (id, deathDate, ip) => {
		let token = uuid.v4();
		let answer = await connection.execute(
			`Replace into token (body, user_id, death_date, ip) values (?, ?, ?, ?);`,
			[token, id, deathDate, ip]
		);

		return token;
	},

	getUserByToken: async (token) => {
		try {
			return await connection.execute(
				`select * from token left join user on token.user_id = user._id where body = ?;`,
				[token]
			);
		} catch (e) {
			console.log(e);
			return null;
		}
	},

	dropToken: async (token) => {
		return await connection.execute(`delete from token where body = ?;`, [
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
