import { Request, Response } from "express";
import { handleGetAllUsers, handleGetUserById } from "services/api.service";
import { deleteUserById, registerNewUser, updateUserById } from "services/auth.service";
import { addProductToCart } from "services/cart.service";
import {
  RegisterSchema,
  TRegisterSchema,
} from "src/validation/register.schema";

export const postAddProductToCartAPI = async (req: Request, res: Response) => {
  const { quantity, productId } = req.body;
  const user = req.user;

  const currentSum = req?.user?.sumCart ?? 0;
  const newSum = currentSum + +quantity;

  await addProductToCart(+quantity, +productId, user);

  res.status(200).json({
    data: newSum,
  });
};

export const getAllUsersAPI = async (req: Request, res: Response) => {
  const users = await handleGetAllUsers();
  res.status(200).json({ data: users });
};

export const getUserByIdAPI = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await handleGetUserById(+id);
  res.status(200).json({ data: user });
};

export const createUserAPI = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body as TRegisterSchema;
  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    //error
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`
    );

    res.status(400).json({
      errors,
    });
    return;
  }
  await registerNewUser(fullName, email, password);
  res.status(201).json({
    data: "Create user success",
  });
};

export const updateUserByIdAPI = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, address, phone } = req.body;

  await updateUserById(+id, fullName, address, phone);
  
  res.status(200).json({
    data: "Update user success",
  });
};

export const deleteUserByIdAPI = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteUserById(+id);

  res.status(200).json({
    data: "Delete user success",
  });
};
