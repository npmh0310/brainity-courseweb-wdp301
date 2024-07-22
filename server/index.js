var express = require('express');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const path = require("path");

const passport = require('passport');
const cookieSession = require('cookie-session');

const authRoute = require('./routes/auth');
const courseRoute = require('./routes/course');
const sectionRouter = require('./routes/section');
const lessonRoute = require('./routes/lesson');
const categoryRoute = require('./routes/category');
const userChapterProgressRoute = require('./routes/userChapterProgress');
const teacherRequestRoute = require('./routes/teacherRequest');
const oauth2Route = require('./routes/configs/oauth2');
require('./utils/auth/passport');
var jwt = require('jsonwebtoken');
const cartRoute = require('./routes/cart');
const favouriteRoute = require('./routes/favourite');
const ratingRoute = require('./routes/rating');
const notificationRoute = require('./routes/notification');
const cloudinaryRoute = require('./routes/configs/cloudinary');
const blogRoute = require('./routes/blog')

const checkout = require('./routes/checkout');

// const zalopayRoute = require('./routes/zaloPay');
const vnpayRoute = require("./routes/VNpay");

const userRouter = require("./routes/user");
const multerRoute = require('./routes/configs/multer');

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: true,
  credentials: true,
};

// DB connect
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connect successful.");
  } catch (err) {
    console.log("MongoDB connect fail");
  }
};
/// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// for testing
app.get("/", (req, res) => {
  res.send("api is working");
});

// Su dung middleware de bind io object
app.use((req, res, next) => {
  res.io = io;
  next();
});

// Oauth cookie
app.use(
  cookieSession({
    maxAge: 15 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
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

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/section', sectionRouter)
app.use('/api/v1/lesson', lessonRoute)
app.use('/api/v1/userChapterProgress', userChapterProgressRoute)
app.use('/api/v1/teacherRequest', teacherRequestRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/favourite', favouriteRoute)
app.use('/api/v1/cloudinary', cloudinaryRoute)
app.use('/api/v1/rating', ratingRoute)

app.use('/api/v1/checkout', checkout)
// app.use('/api/v1/payment', zalopayRoute)
app.use('/api/v1/vnpay', vnpayRoute)

app.use('/api/v1/user' , userRouter)
app.use('/api/v1/notification', notificationRoute)
app.use('/api/v1/blogs', blogRoute)

app.use('/multer', multerRoute)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Oauth2
app.use("/auth", oauth2Route);

const server = app.listen(port, () => {
  connect();
  console.log("server listening on port ", port);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin and my frontend port = 5173
    methods: ["GET", "POST"], // Allow these HTTP methods
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected`);
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  socket.on("joinRoom", (room) => {
    socket.join(room); // Join the client to the specified room
    console.log(`User joined room: ${room}`);
  });
});
