require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
});

require('./models/EmojiUses')(sequelize, Sequelize.DataTypes);
require('./models/Levels')(sequelize, Sequelize.DataTypes);
require('./models/Polls')(sequelize, Sequelize.DataTypes);
require('./models/Speakers')(sequelize, Sequelize.DataTypes);
require('./models/Words')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);