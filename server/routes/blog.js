const express = require("express")
const router = express.Router()
const {create,blogs,singleBlog,remove} = require("../controllers/blogController")

router.get('/blogs',blogs)
router.post('/create',create)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',remove)

module.exports = router