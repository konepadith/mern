//communicate database / operation database
const Blogs = require("../models/blogs")

const slugify = require("slugify")

//contact to database
module.exports.find =async function find(req,res,next){
    try {
        const blogs = await Blogs.find({}).exec();
        res.json(blogs)
      } catch (error) {
        console.error(error);
      }
}
module.exports.create=async function create(req,res,next){
    const {title,content,author} = req.body
    const slug = slugify(title)

    //validate Data
    switch(true){
        case !title:
            return res.status(400).json({error:"please input title"})
            break;
        case !content:
            return res.status(400).json({error:"please input content"})
            break;   
    }
    //Record data
    // Blogs.create({title,content,author,slug}).then((blog,err)=>{
    //     if (err) {  
    //                 res.status(400).json({error:err})
    //             }
    //     res.json(blog)})
        try {
            const blogs = await Blogs.create({title,content,author,slug});
            res.json(blogs)
          } catch (error) {
            res.status(400).json({error:error})
          }
}

