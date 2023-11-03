
const slugify = require("slugify")

//contact to database
exports.create=(req,res)=>{
    const {title,content,author,slugname} = req.body
    const slug = slugify(slugname)
    res.json({
        data: {title,content,author,slug}
    })
}