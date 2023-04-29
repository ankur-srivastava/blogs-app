import Blog from '../models/blogModel.js'

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
}

const getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).json({ message: 'Blog not found' })
    }
}

const createBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
        userName: req.body.userName
    })
    const newBlog = await blog.save()
    res.status(201).json(newBlog)
}

const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        blog.title = req.body.title || blog.title
        blog.content = req.body.content || blog.content
        const updatedBlog = await blog.save()
        res.json(updatedBlog)
    } else {
        res.status(404).json({ message: 'Blog not found' })
    }
}

const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        await blog.remove()
        res.json({ message: 'Blog removed' })
    } else {
        res.status(404).json({ message: 'Blog not found' })
    }
}

export { getBlogs, getBlog, createBlog, updateBlog, deleteBlog }
