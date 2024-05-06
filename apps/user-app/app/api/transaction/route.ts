import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const inputs = {
      //TODO:: update these fields according to right data
      userId: "1",
      amount: 20000,
      webhookUrl: "http://localhost/3003/hdfcWebhook",
    };

    const result = await jwt.sign(inputs, "privateKey");
    return NextResponse.json({
      message: "JWT CREATED",
      token: result,
    });
  } catch (error) {
    return NextResponse.json({
      message: "ERROR",
    });
  }
};
