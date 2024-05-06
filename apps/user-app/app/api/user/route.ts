import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (session.user) {
      return NextResponse.json({
        user: session.user,
      });
    }
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      {
        status: 403,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      {
        status: 403,
      }
    );
  }
};
