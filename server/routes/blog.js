const express = require("express")
const router = express.Router()
const {create,blogs,singleBlog,remove,update} = require("../controllers/blogController")
const {requireLogin} = require("../controllers/authController")

router.get('/blogs',blogs)
router.post('/create',requireLogin,create)
router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',requireLogin,remove)
router.put('/blog/:slug',requireLogin,update)

module.exports = router