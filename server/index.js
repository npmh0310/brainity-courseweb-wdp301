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
const keys = require('./utils/auth/key');
require('./utils/auth/passport');



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
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
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

app.get('/auth/google/callback', passport.authenticate('google'));

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




app.listen(port, () => {
    connect()
    console.log('server listening on port ', port)
})
