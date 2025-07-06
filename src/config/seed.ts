import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "./constants";

const initDatabase = async () => {
  const countRole = await prisma.role.count();
  const countUser = await prisma.user.count();

  if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin có quyền thao tác tất cả hệ thống",
        },
        {
          name: "USER",
          description: "User bị giới hạn một số tính năng",
        },
      ],
    });
    console.log("Role: Data initialized successfully!");
  } else {
    console.log("Role: Already init data!");
  }

  const adminRole = await prisma.role.findFirst({
    where: { name: "ADMIN" },
  });

  if (!adminRole) {
    throw new Error("ADMIN role not found. Database initialization failed.");
  }

  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "nvminh162@gmail.com",
          password: await hashPassword("nvminh162"),
          fullName: "Nguyen Van Minh",
          address: "137/2 TBG, An Nhon, TP HCM",
          phone: "0353 999 798",
          accountType: ACCOUNT_TYPE.SYSTEM,
          roleId: adminRole.id,
        },
        {
          username: "admin@gmail.com",
          password: await hashPassword("admin"),
          fullName: "Nguyen Van Minh",
          address: "137/2 TBG, An Nhon, TP HCM",
          phone: "0353 999 798",
          accountType: ACCOUNT_TYPE.SYSTEM,
          roleId: adminRole.id,
        },
      ],
    });
    console.log("User: Data initialized successfully!");
  } else {
    console.log("User: Already init data!");
  }
};

export default initDatabase;
