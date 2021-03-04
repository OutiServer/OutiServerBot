const textToSpeech = require('@google-cloud/text-to-speech');
const { Readable } = require('stream');

async function textToSpeechReadableStream(text) {
    const request = {
        input: { text },
        voice: {
            languageCode: 'ja-JP',
            name: 'ja-JP-Wavenet-A'
        },
        audioConfig: {
            audioEncoding: 'OGG_OPUS',
            speakingRate: 1.2
        }
    };

    const [response] = await textclient.synthesizeSpeech(request);
    const stream = new Readable({ read() { } });
    stream.push(response.audioContent);

    return stream;
}
const textclient = new textToSpeech.TextToSpeechClient({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    }
});

(async function main() {
    client.on('voiceStateUpdate', () => {
        const conn = client.voice.connections.get(process.env.DISCORD_GUILD_ID);
        if (conn && conn.channel && conn.channel.members.array().length < 2) {
            conn.disconnect();
        }
    });
    client.on('message', async (message) => {
        if (message.author.bot || !message.guild) return
        const guild = message.guild;
        const channel = message.member.voice.channel;
        if (
            !message.member.voice.selfMute || guild.id !== process.env.DISCORD_GUILD_ID ||
            !channel || message.channel.id !== process.env.DISCORD_SOURCE_CHANNEL_ID
        ) {
            return;
        }
        const text = message
            .content
            .replace(/https?:\/\/\S+/g, 'URL省略')
            .replace(/<a?:.*?:\d+>/g, '絵文字省略')
            .replace(/<@!?.*?>/g, 'メンション省略')
            .replace(/<#.*?>/g, 'メンション省略')
            .replace(/<@&.*?>/g, 'メンション省略')
            .slice(0, 50);
        if (!text) { return; }
        if (channel.members.array().length < 1) { return; }
        const currentConnection = client.voice.connections.get(process.env.DISCORD_GUILD_ID);
        const shouldMove = !currentConnection || currentConnection.channel.id !== channel.id;
        const conn = shouldMove ? await channel.join() : currentConnection;
        conn.play(await textToSpeechReadableStream(text), { highWaterMark: 6, bitrate: 'auto' })
    });
})().catch((e) => console.error(e));