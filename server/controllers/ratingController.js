const Rating = require('../models/rating')
const User = require('../models/user')
const Course = require('../models/course')

const createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const {  coursesId, rate } = req.body;

        // Check if the user is enrolled in the course
        const isEnrolled = await User.findOne({ _id: userId, coursesEnrolled: { $in: coursesId } });

        if (!isEnrolled) {
            return res.status(400).json({ error: 'User is not enrolled in the course' });
        }

        // Create a new rating instance
        const newRating = new Rating({
            userId,
            coursesId,
            rate
        });

        // Save the new rating to the database
        await newRating.save();

        return res.status(201).json({ message: 'Rating created successfully' }, {data: newRating});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


const getAvgRatingByCourseId = async (courseId) => {
    try {
        // Find all ratings for the specified course
        const ratings = await Rating.find({ courses: courseId });

        if (ratings.length === 0) return 0; 
        
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rate, 0);

        // Calculate the average rating
        const avgRating = totalRating / ratings.length;

        return avgRating;
    } catch (error) {
        console.error(error);
        return -1; // Return -1 if an error occurs
    }
};

module.exports = {
    createRating,
    getAvgRatingByCourseId
}




