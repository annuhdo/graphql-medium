const util = require("util");
const parseXML = util.promisify(require("xml2js").parseString);
const axios = require("axios");

const mediumAPI = "https://medium.com/feed/";

async function getMediumFeed(username) {
  try {
    const api = `${mediumAPI}@${username}`;
    let mediumFeed = await axios(api);
    mediumFeed = await parseXML(mediumFeed.data);
    return mediumFeed;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getMediumFeed
};
