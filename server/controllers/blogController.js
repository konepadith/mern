//communicate database / operation database
const Blogs = require("../models/blogs")

const slugify = require("slugify")
const { v4: uuidv4 } = require("uuid")

//contact to database
module.exports.blogs = async (req, res, next) => {
  try {
    const blogs = await Blogs.find({}).exec();
    res.json(blogs);
  } catch (error) {
    console.error(error);

    // Respond with a 500 status and an error message
    res.status(500).json({ error: "An error occurred while fetching the documents" });
  }
}
module.exports.create = async (req, res, next) => {

  try {
    const { title, content, author } = req.body;
    let slug = title+" "+uuidv4(1);

    // if (!slug) slug = uuidv4();
    // Validate Data
    switch (true) {
      case !title:
        return res.status(400).json({ error: "Please input a title" });
      case !content:
        return res.status(400).json({ error: "Please input content" });
    }

    // Create a new blog document
    const blog = await Blogs.create({ title, content, author, slug });
    res.json(blog);
  } catch (error) {
    // Handle errors, such as a duplicate title
    res.status(400).json({ error: "Title is already in use" });
  }
}
module.exports.singleBlog = async (req, res, next) => {

  try {
    const { slug } = req.params;
    // Use `await` with `findOne` to wait for the query to complete
    const blog = await Blogs.findOne({ slug }).exec();

    if (blog) {
      // If a document is found, respond with the document as JSON
      res.json(blog);
    } else {
      // If no document is found, you can handle it as needed
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    // Handle any errors that may occur during the operation
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred while retrieving the document" });
  }
}
module.exports.remove = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const deletedBlog = await Blogs.findOneAndDelete({ slug }).exec();

    if (deletedBlog) {
      res.json({ message: "Delete Successful" });
    } else {
      res.status(404).json({ message: "Document not found" });
    }
  } catch (error) {
    console.error({ "DeleteError": error });
    res.status(500).json({ message: "An error occurred while deleting the document" });
  }
}

module.exports.update=async(req,res,next)=>{
  try {
    const { slug } = req.params;
    const { title, content, author } = req.body;

    // Validation
    if (!title || !content || !author) {
      res.status(400).json({ message: "Missing required fields" });
    }

    // Update with { new: true } option to return the modified document
    const updateBlog = await Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true }).exec();

    if (updateBlog) {
      res.json({ message: "Update Successful", updatedBlog: updateBlog });
    } else {
      res.status(400).json({ message: "An error occurred while updating the document" });
    }
  } catch (error) {
    console.error({ UpdateError: error });
    res.status(500).json({ message: "An error occurred while updating the document" });
  }
}