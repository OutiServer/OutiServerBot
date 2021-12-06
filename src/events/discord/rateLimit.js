const bot = require('../../utils/Bot');
const debug = require('../../functions/logs/debug');

/**
 * @param {bot} client
 * @param {{ timeout: number, limit: number, method: string, path: string, route: string }} rateLimitInfo
 */

module.exports = async (client, rateLimitInfo) => {
    console.warn(`レート制限がかかりました\nTimeOut: ${rateLimitInfo.timeout}ms\nリクエスト最大数: ${rateLimitInfo.limit}\nHTTPmethod: ${rateLimitInfo.method}\nRequestPash: ${rateLimitInfo.path}\nroute: ${rateLimitInfo.route}`);
    debug(client, `レート制限がかかりました\nTimeOut: ${rateLimitInfo.timeout}ms\nリクエスト最大数: ${rateLimitInfo.limit}\nHTTPmethod: ${rateLimitInfo.method}\nRequestPash: ${rateLimitInfo.path}\nroute: ${rateLimitInfo.route}`);
};