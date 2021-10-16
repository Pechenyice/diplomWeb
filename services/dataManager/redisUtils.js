const redis = require("redis");
const client = redis.createClient({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT
});

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on("error", function (error) {
    console.error(error);
});

client.on('connect', function () {
    console.log('Redis client connected');
});

const redisUtils = {
    getTypes: async () => {
        let types = await getAsync('types');
        return JSON.parse(types);
    },

    setTypes: async (types) => {
        setAsync('types', JSON.stringify(types))
        .catch((err) => {
            console.log(err);
        });
    },

    getCategories: async () => {
        let categories = await getAsync('categories');
        return JSON.parse(categories);
    },

    setCategories: async (categories) => {
        setAsync('categories', JSON.stringify(categories))
        .catch((err) => {
            console.log(err);
        });
    },
}

module.exports = redisUtils;
