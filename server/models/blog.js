var mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        content: {
            type: String,
            required: true
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
        comments: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            content: String
        }
        ,
        imgUrl: {
            type:String
        }
    },
    { timestamps: true }
);

var Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
