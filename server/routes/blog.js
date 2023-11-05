const express = require("express")
const router = express.Router()
const {create,find} = require("../controllers/blogController")

router.get('/',find)
router.post('/create',create)

module.exports = router