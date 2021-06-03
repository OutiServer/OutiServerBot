const time = new Date();
const log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        app: { type: 'file', filename: `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}.log` }
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' }
    }
})
const logger = log4js.getLogger();
logger.level = 'all'

module.exports = {
    info: function (message) {
        logger.info(message);
    },

    debug: function (message) {
        logger.debug(message);
    },

    error: function (message) {
        logger.error(message);
    },

    fatal: function (message) {
        logger.fatal(message);
    },
}