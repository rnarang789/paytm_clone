import express from "express";
import prisma from "@repo/db/client";

const app = express();

app.post("/hdfcWebhook", async (req, res) => {
  // zod validation

  try {
    const paymentInfo = {
      token: req.body.token,
      userId: req.body.userId,
      amount: req.body.amount,
      status: req.body.status,
    };

    await prisma.balances.update({
      where: {
        userId: paymentInfo.userId,
      },
      data: {
        amount: {
          increment: paymentInfo.amount,
        },
      },
    });

    await prisma.onRampTransactions.update({
      where: {
        token: paymentInfo.token,
      },
      data: {
        status: paymentInfo.status,
      },
    });

    res.json({
      message: "captured",
    });
  } catch (error) {
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
