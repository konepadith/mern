// Title, Content, Author, slug(url)
// Url without slugify  code= install postman -> install%postman
// Url with slugify  code= install postman -> install-postman

const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        content:{
            type:{},
            required:true //require value
        },
        author:{
            type:String,
            default:"Admin"
        },
        slug:{
            type:String,
            lowercase:true,
            unique:true //have only 01 value
        }
},{timestamps:true})

module.exports = mongoose.model("Blogs",blogSchema)