import { prisma } from "config/client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if(countUser === 0) {
        await prisma.user.createMany({
            data: [
                {
                    username: "nvminh162.com",
                    password: "root",
                    accountType: "SYSTEM"
                }
            ]
        })
    } else {
        console.log("Already init data!");
    }
};

export default initDatabase;
