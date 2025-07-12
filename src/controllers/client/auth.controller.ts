import { Request, Response } from "express";
import { registerNewUser } from "services/auth.service";
import {
  RegisterSchema,
  TRegisterSchema,
} from "src/validation/register.schema";

export const getRegisterPage = (req: Request, res: Response) => {
  res.render("client/auth/register", {
    errors: [],
    oldData: { fullName: "", email: "", password: "", confirmPassword: "" },
  });
};

export const postRegister = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } =
    req.body as TRegisterSchema;
  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    //error
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`
    );

    const oldData = {
      fullName,
      email,
      password,
      confirmPassword,
    };

    return res.render("client/auth/register", {
      errors,
      oldData,
    });
  }

  //success
  await registerNewUser(fullName, email, password);
  return res.redirect("/login");
};

export const getLoginPage = (req: Request, res: Response) => {
  const { session } = req as any;
  const messages = session?.messages ?? [];

  res.render("client/auth/login", { messages });
};
