const passport = require('passport');


const googleAuthenticate = async (req,res,next) => {
    passport.authenticate('google',
        {
            scope: ['profile', 'email']
        })
}

const googleAuthenticateCallback = async (req,res,next) => {
    passport.authenticate(

        'google',

        { failureRedirect: '/login', failureMessage: true }, 
        
        async (error, user , info) => {
        if (error){
            return res.send({ message:error.message });
        }
        if (user){
            try {
                console.warn("hihi")
            // your success code
                return res.status(200).send({
                    user: user,
                    message:'Login Successful' 
                });
            } catch (error) {
            // error msg 
                return res.send({ message: error.message });
            }
        }
        })(req,res,next);
}

module.exports = {
    googleAuthenticate,
    googleAuthenticateCallback,
}