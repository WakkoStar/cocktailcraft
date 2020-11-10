const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser((user, done) => {
	done(null, user);
});
passport.use(
	new FacebookStrategy(
		{
			clientID: '3414086628815718',
			clientSecret: '5195d57de550fb6997801da9e047f92c',
			callbackURL: 'http://localhost:4000/login/callback',
			profileFields: ['id', 'displayName', 'photos'],
		},
		(accessToken, refreshToken, profile, done) => {
			return done(null, { ...profile, token: accessToken });
		}
	)
);
