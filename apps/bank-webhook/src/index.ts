import express from "express";
import prisma from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  // TODO::: zod validation
  // TODO::: BANK should ideally send us a secret so we know this is sent by them
  // TODO::: need a check that run this only if onRampTransaction is processing

  try {
    const paymentInfo = {
      token: req.body.token,
      userId: req.body.userId,
      amount: req.body.amount,
      status: req.body.status,
    };

    if (req.body.status === "Success") {
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
    }

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
    console.log(error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
