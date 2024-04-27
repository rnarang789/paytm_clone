import { PrismaClient } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
const client = new PrismaClient();

export const GET = async (req: NextRequest) => {
  await client.user.create({
    data: {
      email: "email.com",
      password: "pass",
      mobile_number: "2312123123",
    },
  });

  return NextResponse.json({
    message: "USER CREATED",
  });
};
