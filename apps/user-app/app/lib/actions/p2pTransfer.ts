"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

const p2pTransfer = async (amount: number, phoneNumber: string) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return {
      message: "Unauthenticated Request",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: { mobile_number: phoneNumber },
  });
  if (!toUser) {
    return { message: "User does not exist" };
  }

  await prisma.$transaction(async (tx) => {
    // This is done to lock the db row so that multiple requests cannnot be send
    // It happens bcz
    //   1. postgress(in general SQL only ) does not support default locks while doing transaction unlike mongodb or sqllite
    //  2. We are calling raw query bcz prisma does not give any function for locking th db
    // 3. In mongoDb what happens is while a transaction in progress if another request comes mongodb reverts the transaction.

    await tx.$queryRaw`SELECT * FROM "Balances" WHERE "userId" = ${userId} FOR UPDATE;`;

    const balance = await tx.balances.findFirst({
      where: { userId: userId },
    });
    if (!balance || balance.amount < amount) {
      return { message: "Insufficient balance" };
    }

    await tx.balances.update({
      where: { userId: userId },
      data: { amount: { decrement: amount } },
    });

    await tx.balances.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.p2pTransfers.create({
      data: {
        amount: amount,
        timeStamp: new Date(),
        fromUserId: userId,
        toUserId: toUser.id,
      },
    });
  });
  return {
    message: "Transfer Success"
  }
};

export default p2pTransfer;
