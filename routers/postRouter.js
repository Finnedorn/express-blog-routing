const path = require("path");
const fs = require("fs");
const express = require("express");
// importo il metodo di routing di express
const router = express.Router();
// importo il file con le funzioni del controller
const postController = require("../controllers/postController.js");

router.get("/", postController.index);

router.get("/:slug", postController.show);

// router.get("/:slug/download");

router.get("/create", postController.create);


module.exports = router;