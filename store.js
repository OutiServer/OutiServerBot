const DeepProxy = require('proxy-deep')
const fs = require('fs').promises
const { dirname } = require('path')
const mkdirp = require('mkdirp')

/**
 * data store
 * @param {string} path
 * @param {object} _default
 *
 * @see {@link https://scrapbox.io/discordjs-japan/更新したら自動で保存されるオブジェクトのサンプル|Scrapbox}
 */
module.exports = async (path, _default = {}) => {
    const data = await fs
        .readFile(path)
        .then(file => JSON.parse(file))
        .catch(async () => {
            await mkdirp(dirname(path))
            await fs.writeFile(path, JSON.stringify(_default, null, 2))
            return _default
        })
    const save = debounce(data => fs.writeFile(path, data), 10)

    return new DeepProxy(data, {
        get(target, key, receiver) {
            const val = Reflect.get(target, key, receiver)
            if (typeof val === 'object' && val !== null) {
                return this.nest(val)
            } else {
                return val
            }
        },
        async set(target, key, value, receiver) {
            Reflect.set(target, key, value, receiver)
            save(JSON.stringify(this.rootTarget, null, 2))
            return true
        },
    })
}

const debounce = (fn, interval) => {
    let timerId
    return (...args) => {
        clearTimeout(timerId)
        timerId = setTimeout(() => fn(...args), interval)
    }
}