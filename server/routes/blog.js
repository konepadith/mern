const express = require("express")
const router = express.Router()
const {create,blogs,singleBlog,remove,update} = require("../controllers/blogController")

router.get('/blogs',blogs)
router.post('/create',create)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',remove)
router.put('/blog/:slug',update)

module.exports = router