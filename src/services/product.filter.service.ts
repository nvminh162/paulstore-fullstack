import { prisma } from "config/client";

export const getProductsWithFilter = async (
  page: number,
  pageSize: number,
  factory: string,
  target: string,
  price: string,
  sort: string
) => {
  //build where query
  let whereClause: any = {};

  if (factory) {
    const factoryInput = factory.split(",");
    whereClause.factory = {
      in: factoryInput,
    };
  }

  if (target) {
    const targetInput = target.split(",");
    whereClause.target = {
      in: targetInput,
    };
  }

  if (price) {
    const priceInput = price.split(",");
    // ["duoi-10-trieu", "10-15-trieu", "15-20-trieu", "tren-20-trieu"]

    const priceCondition = [];

    for (let i = 0; i < priceInput.length; i++) {
      if (priceInput[i] === "duoi-10-trieu") {
        priceCondition.push({ price: { lt: 10000000 } });
      }
      if (priceInput[i] === "10-15-trieu") {
        priceCondition.push({ price: { gte: 10000000, lte: 15000000 } });
      }
      if (priceInput[i] === "15-20-trieu") {
        priceCondition.push({ price: { gte: 15000000, lte: 20000000 } });
      }
      if (priceInput[i] === "tren-20-trieu") {
        priceCondition.push({ price: { gt: 20000000 } });
      }
    }

    whereClause.OR = priceCondition;
  }

  //build sort query
  let orderByClause: any = {};
  if (sort) {
    if (sort === "gia-tang-dan") {
      orderByClause = {
        price: "asc",
      };
    }
    if (sort === "gia-giam-dan") {
      orderByClause = {
        price: "desc",
      };
    }
  }

  const skip = (page - 1) * pageSize;
  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      skip: skip,
      take: pageSize,
      where: whereClause,
      orderBy: orderByClause,
    }),
    prisma.product.count({ where: whereClause }),
  ]);
  const totalPages = Math.ceil(count / pageSize);
  return { products, totalPages };
};
