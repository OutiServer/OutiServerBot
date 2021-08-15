const bot = require('../Utils/Bot');

/**
 * 
 * @param {bot} client 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

module.exports = (client, req, res, next) => {
    const levels = client.db.prepare('SELECT * FROM levels ORDER BY allxp DESC LIMIT 10;').all();
    const users = levels.map(level => {
        const user = client.users.cache.get(level.user);
        if (!user) return undefined;
        return user.tag;
    })

    res.render('index', { levels: levels, users: users });
}
