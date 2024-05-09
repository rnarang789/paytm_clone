"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const createOnRampTransaction = async (provider: string, amount: number) => {
  const session = await getServerSession(authOptions);
  if (!session.user) {
    return {
      message: "Unauthenticated Request",
    };
  }
  // Ideally we should get this token from bank through web-hook server
  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransactions.create({
    data: {
      status: "Processing",
      token: token,
      provider: provider,
      amount: amount * 100,
      startTime: new Date(),
      userId: session.user.id,
    },
  });

  return {
    message: "Request Done",
  };
};
export default createOnRampTransaction;
