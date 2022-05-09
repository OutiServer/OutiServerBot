const { mkdirSync, existsSync, writeFileSync } = require('fs');
const { default: axios } = require('axios');
const rpc = axios.create({ baseURL: process.env.VOICEVOXAPI_URL, proxy: false });
const { joinVoiceChannel, createAudioPlayer, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');

class SpeakerClient {
    /**
     * @param {import('./Bot')} client
     * @param {string} guildId
     * @param {string} textChannelId
     * @param {string} voiceChannelId
     * @param {import('@discordjs/voice').DiscordGatewayAdapterCreator} voiceAdapterCreator
     */
    constructor(client, guildId, textChannelId, voiceChannelId, voiceAdapterCreator) {
        this.client = client;

        /**
         * 読み上げを行なっているギルドID
         *
         * @type {string}
         */
        this.guildId = guildId;

        this.voiceChannelId = voiceChannelId;

        /**
         * 読み上げるチャンネルID配列
         *
         * @type {Array<string>}
         */
        this.speakerChannelIds = [textChannelId];

        /**
         * VC接続オブジェクト
         *
         * @type {import('@discordjs/voice').VoiceConnection}
         */
        this.connection = joinVoiceChannel({
            channelId: voiceChannelId,
            guildId: guildId,
            adapterCreator: voiceAdapterCreator,
        });

        /**
         * 読み上げキュー
         *
         * @type {Array<string>}
         */
        this.speakQueue = [];

        /**
         * @type {import('@discordjs/voice').AudioPlayer}
         */
        this.player = createAudioPlayer();

        this.player.on(AudioPlayerStatus.Idle, () => {
            this.play();
        });
    }

    /**
     * 読み上げを停止する
     */
    stop() {
        this.player.stop();
        this.connection.destroy();

        for (const channelId of this.speakerChannelIds) {
            this.client.channels.cache.get(channelId).send('読み上げを終了しました');
        }
    }

    /**
     *
     * @param {string} text
     * @param {string} messageId
     * @param {number} speakerId
     */
    async addSpearkQueue(text, messageId, speakerId = 0) {
        if (!this.connection) return;

        if (!existsSync('dat/voices')) {
            mkdirSync('dat/voices');
        }

        if (!existsSync(`dat/voices/${this.guildId}`)) {
            mkdirSync(`dat/voices/${this.guildId}`);
        }

        text = text
            .replace(/https?:\/\/\S+/g, 'URL省略')
            .replace(/<a?:.*?:\d+>/g, '絵文字省略')
            .replace(/<@!?.*?>/g, 'メンション省略')
            .replace(/<#.*?>/g, 'メンション省略')
            .replace(/<@&.*?>/g, 'メンション省略');

        const audioQuery = await rpc.post(`audio_query?text=${encodeURI(text)}&speaker=${speakerId}`);
        const synthesis = await rpc.post(`synthesis?speaker=${speakerId}`, JSON.stringify(audioQuery.data), {
            responseType: 'arraybuffer',
            headers: {
                'accept': 'audio/wav',
                'Content-Type': 'application/json',
            },
        });

        writeFileSync(`dat/voices/${this.guildId}/${messageId}.wav`, new Buffer.from(synthesis.data), 'binary');

        this.speakQueue.push(messageId);
        if (this.player.state.status === AudioPlayerStatus.Idle) {
            this.play();
        }
    }

    async play() {
        if (this.speakQueue.length < 1) return;

        const messageId = this.speakQueue.shift();
        const resource = createAudioResource(`dat/voices/${this.guildId}/${messageId}.wav`);
        this.player.play(resource);
        this.connection.subscribe(this.player);
    }

    /**
     *
     * @returns {Promise<Array<{ name: string, speaker_uuid: string, styles: Array<{ id: number, name: string }> }>>}
     */
    static async getSpeakers() {
        const speakers = await rpc.get('speakers');
        if (speakers.status !== 200) return [];

        return speakers.data;
    }

    /**
     * 
     * @param {string} surface 
     * @param {string} pronunciation 
     * @param {number} accentType 
     * 
     * @returns {number}
     */
    static async addWord(surface, pronunciation, accentType) {
        const result = await rpc.post(`user_dict_word?surface=${encodeURI(surface)}&pronunciation=${encodeURI(pronunciation)}&accent_type=${accentType}`);

        return result.status;
    }

    /**
     * 
     * @param {string} wordUUID 
     * 
     * @returns {number}
     */
    static async removeWord(wordUUID) {
        const result = await rpc.delete(`user_dict_word/${wordUUID}`);

        return result.status;
    }

    /**
     * 
     * @returns {Array<{ key: string, value: { surface: string, cost: number, part_of_speech: string, part_of_speech_detail_1: string, part_of_speech_detail_2: string, part_of_speech_detail_3: string, inflectional_type: string, inflectional_from: string, stem: string, yomi: string, pronunciation: string, accent_type: number, mora_count: number, accent_associative_rule: string } }>}
     */
    static async wordList() {
        const words = await rpc.get('user_dict');
        if (words.status !== 200) return {};

        return Object.entries(words.data).map(([key, value]) => ({ 'key': key, 'value': value }));
    }
}

module.exports = SpeakerClient;