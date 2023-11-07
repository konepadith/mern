const express = require("express")
const router = express.Router()
const {create,blogs,singleBlog} = require("../controllers/blogController")

router.get('/blogs',blogs)
router.post('/create',create)
router.get('/blog/:slug',singleBlog)

module.exports = router