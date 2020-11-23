require('dotenv').config();
const { getUserByProviderId, createUser } = require('../users/data');

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
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_SECRET_CLIENT,
			callbackURL: 'http://localhost:4000/fb/login/callback',
			profileFields: ['id', 'displayName'],
		},
		async (accessToken, _, profile, done) => {
			const user = await getUserByProviderId(profile.id, 'facebook');
			if (!user) {
				createUser(profile.displayName, profile.id);
			}
			return done(null, { ...profile, token: accessToken });
		}
	)
);
