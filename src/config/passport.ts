// Importing: Dependencies.
import passport from "passport";
import { BasicStrategy } from "passport-http";
import bcrypt from "bcrypt";

// Importing: Repositories.
import UserRepository from "../repositories/user.repository";

// Defining repository.
const userRepository = new UserRepository();

// Defining local strategy.
passport.use(
  new BasicStrategy(async (email, password, done) => {
    try {
      // Retrieving user.
      const user = await userRepository.findUserByEmail(email);

      // Checking if user exists.
      if (!user) {
        return done(null, false);
      }

      // Checking if password is correct.
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false);
      }

      // Returning user.
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Exporting passport.
export default passport;
