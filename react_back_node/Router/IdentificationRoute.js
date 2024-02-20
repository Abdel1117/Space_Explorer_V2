const express = require('express');
const router = express.Router();
const tokenChecker = require('../Functions/authChecker/tokenChecker');
const refreshTokenController = require('../Controller/refreshTokenController');

router.get("/check", tokenChecker);
router.get("/refreshToken", refreshTokenController.handleRefreshToken);


module.exports = router