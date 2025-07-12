import { prisma } from "config/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { comparePassword } from "services/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async function verify(
      username,
      password,
      callback
    ) {
      //check user exist in database
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        // throw new Error(`Username ${username} not found`);
        return callback(null, false, {
          message: `Username ${username} not found`,
        });
      }

      //compare password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        // throw new Error(`Invalid password`);
        return callback(null, false, { message: `Invalid password` });
      }

      return callback(null, user); //(1)
    })
  );

  // run continue (1)
  passport.serializeUser(function (user: any, callback) {
    process.nextTick(function () {
      callback(null, { id: user.id, username: user.username });
    });
  });

  //F5 alway has user
  passport.deserializeUser(function (user, callback) {
    process.nextTick(function () {
      return callback(null, user);
    });
  });
};

export default configPassportLocal;
