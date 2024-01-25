const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");
const router = Router();

router.get("/balance/:userId", authMiddleware, async (req, res) => {
  try {
    const user = await Account.findOne({
      userId: req.params.userId,
    });
    res.status(200).json({
      success: true,
      message: "Successfully fetched account balance",
      user: user,
      err: {},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Not able fetch account balance",
      user: {},
      err: error.message,
    });
  }
});

router.post("/transfer/:userId", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  //from account detail
  const account = await Account.findOne({ userId: req.params.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Insufficient  balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Invalid  account",
    });
  }

  //   transfer money

  await Account.updateOne(
    { userId: req.params.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  res.status(200).json({
    success: true,
    message: "Transfered successfully",
  });
});

module.exports = router;
