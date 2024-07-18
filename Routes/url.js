const express = require("express");
const {GenerateNewShortURL,GetAnalytics,HandleRedirect}= require('../Controllers/url')

const router = express.Router();

router.post('/', GenerateNewShortURL);

router.get('/analytics/:shortId',GetAnalytics);

router.get('/:shortId',HandleRedirect );
module.exports = router;