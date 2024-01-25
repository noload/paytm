const { Router } = require("express");
const router = Router();
const { validateSignUp, validateSignIn } = require("./validation");
const { User } = require("../db");
const { createHash, validatePassword } = require("../hashing");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const zod = require("zod");

router.post("/signup", validateSignUp, async (req, res) => {
  try {
    const isUserExist = await User.findOne({
      username: req.body.username,
    });
    if (isUserExist) {
      res.status(411).json({
        success: false,
        message: "Email already taken.!!!",
        data: [],
        err: {},
      });
    }

    const hashedPassword = await createHash(req.body.password);

    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = user._id;

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    //if all right send response
    res.status(200).json({
      userId,
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User Not created",
      err: error.message,
    });
    throw error;
  }
});

router.post("/signin", validateSignIn, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "User Not exist try another email",
    });
  }

  const validate = await validatePassword(req.body.password, user.password);

  if (!validate) {
    return res.status(500).json({
      success: false,
      message: "Password Is Incorrect",
    });
  }
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.status(200).json({
    success: true,
    message: "Logged successfully",
    token,
  });
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Fetched all user successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
      data: {},
    });
  }
});

router.put("/user/:userId", authMiddleware, async (req, res) => {
  const updateBody = zod.object({
    password: zod.string().min(8).optional(),
    firstName: zod.string().min(4).optional(),
    lastName: zod.string().min(4).optional(),
  });
  const { success, error } = updateBody.safeParse(req.body);

  if (!success) {
    let message = "";
    const { issues } = error;
    issues.map((issue) => {
      message += issue.path[0] + " " + issue.message + " | ";
    });

    return res.status(400).json({
      success: false,
      message,
    });
  }

  const updatData = req.body;
  console.log(updatData.password);
  const password = await createHash(updatData.password);
  updatData.password = password;
  console.log(updatData.password);

  try {
    await User.updateOne(
      {
        _id: req.params.userId,
      },
      updatData
    );
    return res.json({
      userId: updatData._id,
      success: true,
      message: "Updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Not able to Updated ",
    });
    console.log(error);
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  console.log(filter);
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  console.log(users);
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
