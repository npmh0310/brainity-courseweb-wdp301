var mongoose = require('mongoose')

const teacherRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        isApproved: {
            type: String,
            required: true,
            enum: ['Pending', 'Confirmed', 'Rejected'],
            default: 'Pending'
        },
        fileUrl: String,
    },
    { timestamps: true }
);

var TeacherRequest = mongoose.model("TeacherRequest", teacherRequestSchema);
module.exports = TeacherRequest;
