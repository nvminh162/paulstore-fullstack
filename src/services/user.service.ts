import { prisma } from "config/client";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

const handleGetAllUsers = async () => {
  return prisma.user.findMany();
};

const handleGetAUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
};

const handleCreateUser = async (
  email: string,
  password: string,
  fullName: string,
  address: string,
  phone: string,
  accountType: string,
  avatar: string,
  role: string,
) => {
  return await prisma.user.create({
    data: {
      username: email,
      password: await hashPassword(password),
      fullName: fullName,
      address: address,
      phone: phone,
      accountType: accountType,
      avatar: avatar,
      roleId: +role,
    },
  });
};

const handleDeleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id: +id,
    },
  });
};

const handleUpdateUser = async (
  id: string,
  email: string,
  password: string | null,
  fullName: string,
  address: string,
  phone: string,
  accountType: string,
  avatar: string | null,
  role: string,
) => {
  // Prepare update data
  const updateData: any = {
    username: email,
    fullName: fullName,
    address: address,
    phone: phone,
    accountType: accountType,
    roleId: +role,
  };

  // Only update password if a new one is provided
  if (password) {
    updateData.password = await hashPassword(password);
  }

  // Only update avatar if a new one is provided
  if (avatar) {
    updateData.avatar = avatar;
  }

  return await prisma.user.update({
    where: {
      id: +id, //convert string to number : (+string => number)
    },
    data: updateData,
  });
};

const handleGetAllRole = async () => {
  return prisma.role.findMany();
};

export {
  handleCreateUser,
  handleGetAllUsers,
  handleDeleteUser,
  handleGetAUserById,
  handleUpdateUser,
  handleGetAllRole,
};
