const { formatEmoji } = require('@discordjs/builders');

const emojis = [
    '844224919888855102', '844224920044044309', '844224920471863296',
    '844224920959451196', '844226892499910707', '844616349372252203',
    '844617059141025792', '844781903844474901', '844941565801529374',
    '844941566560436236', '844941568304611418', '844941569634729985',
    '844941571044278282', '844941572679794688', '844941573422186497',
    '846010906806321182', '847969092271079425', '847969190220136538',
    '847969311594250251', '851048981224357919', '855458224135340090',
    '860711173821300776', '861173197177487390', '861173209319735326',
    '861635410480463893', '863748172755763271', '865897503894011904',
    '868372919942799410', '869947345264074823', '869947345498959912',
    '873548267961581578', '875912850646925332', '879010314396516372',
    '880859874496491540', '917044782608572497', '917044970974769243',
    '917044998065750097', '917045021662912522', '917045036871454771',
    '917045049521471488', '917045102805913612', '917396366823661579',
    '931850783924834346', '946365270736371772', '947141121111367711',
    '947144610210267136', '948477194424950805', '949289745618444358',
    '953950635500376094', '953950717092184075', '953950818502058034',
    '953950910986477568', '953950976564412448', '953954566829903902',
    '954000447939690497', '954002095286153237', '954332590184202320',
    '956859927442370570', '956860029137477653', '958721506177855528',
    '958721543641370704', '959605379396939776', '972482081995251762',
    '972503751598411846', '987362614663348234',
];

function slotRand() {
    return Math.floor(Math.random() * (emojis.length - 1));
}

function getSlotEmoji(key) {
    return formatEmoji(emojis[key]);
}

function slotGui(vertical, beside) {
    let text = '';
    const rand = [];

    // タテ
    for (let i = 0; i < vertical; i++) {
        for (let y = 0; y < beside; y++) {
            const r = slotRand();
            rand.push(r);
            text += getSlotEmoji(r);
        }

        text += '\n';
    }

    return {
        text: text,
        rand: rand,
    };
}

/**
 *
 * @param {Array<{ text: string, rand: number }>} text
 * @param {number} vertical
 * @param {number} beside
 */
function resultCheck(text, vertical, beside) {
    let count = 0;

    // シンプルでいい
    if (vertical === 1 && beside === 3) {
        if (text.rand[0] === text.rand[1] && text.rand[0] === text.rand[2]) count++;
    }
    // まあ普通
    else if (vertical === 3 && beside === 3) {
        // 横1
        if (text.rand[0] === text.rand[1] && text.rand[0] === text.rand[2]) count++;
        // 横2
        if (text.rand[3] === text.rand[4] && text.rand[3] === text.rand[5]) count++;
        // 横3
        if (text.rand[6] === text.rand[7] && text.rand[6] === text.rand[8]) count++;
        // 縦1
        if (text.rand[0] === text.rand[3] && text.rand[0] === text.rand[6]) count++;
        // 縦2
        if (text.rand[1] === text.rand[4] && text.rand[1] === text.rand[7]) count++;
        // 縦3
        if (text.rand[2] === text.rand[5] && text.rand[2] === text.rand[8]) count++;
        // 斜め1
        if (text.rand[0] === text.rand[4] && text.rand[0] === text.rand[8]) count++;
        // 斜め2
        if (text.rand[2] === text.rand[4] && text.rand[2] === text.rand[6]) count++;
    }
    // not not
    else if (vertical === 3 && beside === 5) {
        // 0
        // 5
        // 10

        // 横1
        if (text.rand[0] === text.rand[1] && text.rand[0] === text.rand[2] && text.rand[0] === text.rand[3] && text.rand[0] === text.rand[4]) {
            count++;
        }
        // 横2
        if (text.rand[5] === text.rand[6] && text.rand[5] === text.rand[7] && text.rand[5] === text.rand[8] && text.rand[5] === text.rand[9]) {
            count++;
        }
        // 横3
        if (text.rand[10] === text.rand[11] && text.rand[10] === text.rand[12] && text.rand[10] === text.rand[13] && text.rand[10] === text.rand[14]) {
            count++;
        }
        // 三角1
        if (text.rand[0] === text.rand[6] && text.rand[0] === text.rand[12] && text.rand[0] === text.rand[8] && text.rand[10] === text.rand[4]) {
            count++;
        }
        // 三角2
        if (text.rand[10] === text.rand[6] && text.rand[10] === text.rand[2] && text.rand[10] === text.rand[8] && text.rand[10] === text.rand[14]) {
            count++;
        }
        // まる
        if (text.rand[0] === text.rand[1] && text.rand[0] === text.rand[2] && text.rand[0] === text.rand[3] && text.rand[0] === text.rand[4] && text.rand[0] === text.rand[11] && text.rand[0] === text.rand[12] && text.rand[0] === text.rand[13] && text.rand[0] === text.rand[14] && text.rand[0] === text.rand[5] && text.rand[0] === text.rand[9]) {
            count++;
        }
    }

    return count;
}

module.exports = {
    slotRand,
    getSlotEmoji,
    slotGui,
    resultCheck,
};