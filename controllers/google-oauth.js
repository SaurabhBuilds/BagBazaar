const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  // Find or create the user in your database
  const email = profile.emails[0].value;

  // Check if the user exists in the database
  let user = await User.findOne({ email });
  if (!user) {
    // If user doesn't exist, create a new one
    user = new User({
      fullname: profile.displayName,
      email: email,
      googleId: profile.id
    });
    await user.save();
  }
  
  // Generate JWT token for the user
  const token = generateJWT(user);
  
  // Call done with user details
  done(null, user);
}));
