//communicate database / operation database
const Blogs = require("../models/blogs")

const slugify = require("slugify")
const {v4: uuidv4 }= require("uuid")

//contact to database
module.exports.blogs =async (req,res,next)=>{
    try {
        const blogs = await Blogs.find({}).exec();
        res.json(blogs)
      } catch (error) {
        console.error(error);
      }
}
module.exports.create=async (req,res,next)=>{
    
        try {
          const {title,content,author} = req.body
    let slug = slugify(title)

    if(!slug)slug=uuidv4();
    //validate Data
    switch(true){
        case !title:
            return res.status(400).json({error:"please input title"})
            break;
        case !content:
            return res.status(400).json({error:"please input content"})
            break;   
    }
            const blogs = await Blogs.create({title,content,author,slug});
            res.json(blogs)
          } catch (error) {
            res.status(400).json({error:"Title is already exit"})
          } 
}
module.exports.singleBlog=async(req,res,next)=>{
 
  try {
    const {slug} = req.params
    const blog = await Blogs.findOne({slug}).exec()
    res.json(blog)
  } catch (error) {
    console.error(error);
    }
}
