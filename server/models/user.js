const { request } = require('express');
var mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            default: "user",
        },
        address: {
            type: String,
            required: true            
        },
        gender: {
            type: Boolean,
            required: true
        },
        phoneNumber: {
            type: String,
        },
        avatar: {
            type: String,
        },
        isPremium: {
            type: Boolean,
            default: false
        },
        bio: {
            type: String,
            required: true
        },
        coursesEnrolled: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }]
    },
    { timestamps: true }
);

var User = mongoose.model("User", userSchema);
module.exports = User;
