const express = require('express');
const router = express.Router();
const EntityController = require("../Controller/EntityController")

router.get("/allEntity", EntityController.getAllEntityCount)

module.exports = router