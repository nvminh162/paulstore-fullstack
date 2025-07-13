import { prisma } from "config/client";
import { name } from "ejs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserSumCart, getUserWithRoleById } from "services/auth.service";
import { comparePassword, handleGetAUserById } from "services/user.service";

const configPassportLocal = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, async function verify(
      req,
      username,
      password,
      callback
    ) {
      const { session } = req as any;
      if (session?.messages?.length) {
        session.messages = [];
      }

      //check user exist in database
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        // throw new Error(`Username ${username} not found`);
        return callback(null, false, {
          message: `Username invalid`,
        });
      }

      //compare password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        // throw new Error(`Invalid password`);
        return callback(null, false, { message: `Invalid password` });
      }

      return callback(null, user as any); //(1)
    })
  );

  // run continue (1)
  passport.serializeUser(function (user: any, callback) {
    callback(null, { id: user.id, username: user.username });
  });

  //F5 alway has user
  passport.deserializeUser(async function (user: any, callback) {
    const { id, username } = user;
    //query to database
    const userInDB: any = await getUserWithRoleById(id);
    const cartInDB: any = await getUserSumCart(id);

    return callback(null, { ...userInDB, sumCart: cartInDB });
  });
};

export default configPassportLocal;
