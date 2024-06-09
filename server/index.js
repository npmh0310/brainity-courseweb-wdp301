var express = require('express');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var cors = require('cors');
var cookieParser = require('cookie-parser');

const passport = require('passport');
const cookieSession = require('cookie-session');

const authRoute = require('./routes/auth');
const courseRoute = require('./routes/course');
const sectionRouter = require('./routes/section');
const lessonRoute = require('./routes/lesson');
const categoryRoute = require('./routes/category');
const userChapterProgressRoute = require('./routes/userChapterProgress');
const teacherRequestRoute = require('./routes/teacherRequest');
const oauth2Route = require('./routes/oauth2');
require('./utils/auth/passport');
var jwt = require('jsonwebtoken');
const cartRoute = require('./routes/cart');



dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
}

// DB connect
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB connect successful.');
    } catch (err) {
        console.log('MongoDB connect fail');
    }
};

// for testing
app.get("/", (req, res) => {
    res.send("api is working")
})

// Oauth cookie
app.use(
    cookieSession({
        maxAge: 15 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
    passport.authenticate('google',
        {
            scope: ['profile', 'email']
        })
);

app.get('/auth/google/callback',
    (req, res, next) => {
        passport.authenticate(

            'google',

            { successRedirect: 'http://localhost:3000/', failureRedirect: '/login', failureMessage: true },

            async (error, user, info) => {
                if (error) {
                    return res.send({ message: error.message });
                }
                console.log(user)
                if (user) {
                    try {
                        const token = jwt.sign(
                            { id: user._id, role: user.role },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "15d" }
                        )

                        console.warn("hihi")
                        // your success code
                        return res
                            .cookie('accessToken', token, {
                                httpOnly: true,
                                expires: token.expiresIn
                            })
                            .status(200)
                            // .send({
                            //     user: user,
                            //     message: 'Login Successful'
                            // })
                            .redirect("http://localhost:3000/")
                            ;
                    } catch (error) {
                        // error msg 
                        return res.send({ message: error.message });
                    }
                }
            })(req, res, next);
    });

/// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/section', sectionRouter)
app.use('/api/v1/lesson', lessonRoute)
app.use('/api/v1/userChapterProgress', userChapterProgressRoute)
app.use('/api/v1/teacherRequest', teacherRequestRoute)
app.use('/api/v1/cart', cartRoute)

//Oauth2
app.use('/auth', oauth2Route)



app.listen(port, () => {
    connect()
    console.log('server listening on port ', port)
})
