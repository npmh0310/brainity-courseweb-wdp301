var mongoose = require('mongoose')

const teacherRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            // required: true
        },
        isApproved: {
            type: Boolean,
            default: false
        }
    }
);

var TeacherRequest = mongoose.model("TeacherRequest", teacherRequestSchema);
module.exports = TeacherRequest;
