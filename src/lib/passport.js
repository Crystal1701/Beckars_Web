const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.registrarse', new LocalStrategy({
    usernameField: ''
}));


//Link
//https://www.youtube.com/watch?v=qJ5R9WTW0_E
//2:21:49 / 3:47:22
//
//user:root
//pass:123456
//localhost:3306
//.