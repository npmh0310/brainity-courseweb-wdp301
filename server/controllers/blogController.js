
const Blog = require('../models/blog')
const Course = require('../models/course')


const createBlog = async (req, res) => {
    const userId = req.user.id;
    const newBlog = new Blog(req.body)
    newBlog.author = userId;

    try {
        const savedBlog = await newBlog.save()

        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedBlog
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again"
        })
    }
}

const getBlogById = async (req, res) => {
    const blogId = req.params.id;

    try {
        const getBlogById = await Blog.findById(blogId).populate(
            {
                path: "author",
                select: "name avatar"
            }
        ).populate("categories")

        res.status(200).json({
            success: true,
            message: "Successfully get Blog",
            data: getBlogById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get Blog. Try again"
        })
    }
}

// const getBlogByUserId = async (req, res) => {
//     // const userId = req.user.id;
//     try {
//         // const bloguser = await Blog.find({author: userId})

//         res.status(200).json({
//             success: true,
//             message: "Successfully get Blog",
//             data: bloguser
//         })
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get Blog. Try again"
//         })
//     }
// }

const deleteBlogById = async (req, res) => {
    const blogId = req.params.id;

    try {
        const deleteBlogById = await Blog.findByIdAndDelete(blogId)

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
            data: deleteBlogById
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete. Try again"
        })
    }
}

const getAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find().populate(
            {
                path: "author",
                select: "name avatar"
            }
        );
        blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.status(200).json({
            blogs: blogs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get all. Try again"
        })
    }
}

const getBlogByUser = async (req, res) => {
    const userId = req.user.id
    try {
        const blogs = await Blog.find({ author: userId }).populate(
            {
                path: "author",
                select: "name avatar"
            }
        )
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({
            message: "Failed to get all. Try again"
        })
    }
}

// Comment
const addComment = async (req, res) => {
    try {
        const { id } = req.params; 
        const userId = req.user.id;
        const { content } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        blog.comments.push({ user : userId, content });
        await blog.save();
        const updatedBlog = await Blog.findById(id).populate(
            {
                path: "comments.user",
                select: "username"
            }
        );
        res.status(201).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const blog = await Blog.findById(id).populate(
            {
                path: "comments",
                populate : {
                    path: "user",
                    model: "User"
                }
            }
        ); // Adjust the 'name' field as per your User model
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json(blog.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateComment = async (req, res) => {
    try {
        const { id, commentId } = req.params; // Blog ID and Comment ID
        const { content } = req.body;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const comment = blog.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.content = content;
        await blog.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteComment = async (req, res) => {
    try {
        const { id, commentId } = req.params; // Blog ID and Comment ID

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        const comment = blog.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Remove the comment using the pull method
        blog.comments.pull(commentId);
        await blog.save();

        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBlog,
    deleteBlogById,
    getBlogById,
    getAllBlog,
    getBlogByUser,
    addComment,
    getComments,
    updateComment,
    deleteComment
}