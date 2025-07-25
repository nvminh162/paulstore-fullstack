import { prisma } from "config/client";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string
) => {
  return await prisma.user.create({
    data: {
      name: fullName,
      email: email,
      address: address,
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

const handleUpdateUser = async (
  id: string,
  fullName: string,
  email: string,
  address: string
) => {
  return await prisma.user.update({
    where: {
      id: +id, //convert string to number : (+string => number)
    },
    data: {
      name: fullName,
      email: email,
      address: address,
    },
  });
};

export {
  handleCreateUser,
  handleGetAllUsers,
  handleDeleteUser,
  handleGetAUserById,
  handleUpdateUser,
};
