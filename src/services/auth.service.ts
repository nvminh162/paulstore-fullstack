import { prisma } from "config/client";
import { comparePassword, hashPassword } from "./user.service";
import { ACCOUNT_TYPE } from "config/constants";

export const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { username: email },
  });

  if (user) return true;
  return false;
};

export const registerNewUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const newPassword = await hashPassword(password);

  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  if (userRole) {
    await prisma.user.create({
      data: {
        username: email,
        password: password,
        fullName: fullName,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id,
      },
    });
  } else {
    throw new Error("User Role không tồn tại!");
  }
};

export const getUserWithRoleById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id: +id },
    include: {
      role: true,
    },
    omit: {
      password: true
    }
  });
};
