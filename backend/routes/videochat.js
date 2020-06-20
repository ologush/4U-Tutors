var express = require('express');
var router = express.Router();

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
require('dotenv').config();

const MAX_ALLOWED_SESSION_DURATION = 600;

const twilioAccountSid = "AC8d375bf13d9b646c025c81e3dbdcbb55";
const twilioApiKeySID = "SK966cf784b93e9e190d48fbe05961b51d";
const twilioApiKeySecret = "xtOBNbBdqoZ7eMVJUTkr22ifug1C35p2";

router.get('/token', (req, res) => {

    console.log(twilioAccountSid);
    const { identity, roomName } = req.query;

    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
        ttl: MAX_ALLOWED_SESSION_DURATION,
    });

    token.identity = identity;
    const videoGrant = new VideoGrant({ room: roomName });

    token.addGrant(videoGrant);

    res.send(token.toJwt());
    console.log('issued token for: ' + identity + 'for room: ' + roomName);
}); 

module.exports = router;