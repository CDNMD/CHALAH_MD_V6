const axios = require('axios');

const getBuffer = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'get',
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Requests': 1
            },
            responseType: 'arraybuffer',
            ...options
        });
        return res.data;
    } catch (e) {
        console.error('Error in getBuffer:', e);
        return null;
    }
};

const getGroupAdmins = (participants) => {
    return participants
        .filter(participant => participant.admin !== null)
        .map(admin => admin.id);
};

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const h2k = (eco) => {
    const suffixes = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
    let magnitude = Math.floor(Math.log10(Math.abs(eco)) / 3) || 0;
    let scale = Math.pow(10, magnitude * 3);
    let formatted = (eco / scale).toFixed(1);
    return formatted.replace(/\.0$/, '') + suffixes[magnitude];
};

const isUrl = (url) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/gi.test(url);
};

const Json = (string) => {
    try {
        return JSON.stringify(string, null, 2);
    } catch (e) {
        console.error('Error in Json function:', e);
        return null;
    }
};

const runtime = (seconds) => {
    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor((seconds % (3600 * 24)) / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);
    return `${d > 0 ? d + " days, " : ""}${h > 0 ? h + " hours, " : ""}${m > 0 ? m + " minutes, " : ""}${s > 0 ? s + " seconds" : ""}`;
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const fetchJson = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'GET',
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        });
        return res.data;
    } catch (err) {
        console.error('Error in fetchJson:', err);
        return null;
    }
};

module.exports = { 
    getBuffer, 
    getGroupAdmins, 
    getRandom, 
    h2k, 
    isUrl, 
    Json, 
    runtime, 
    sleep, 
    fetchJson 
};
