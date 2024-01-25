const zod = require("zod");

const validateSignUp = (req, res, next) => {
  const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
    firstName: zod.string(),
    lastName: zod.string(),
  });

  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      success: false,
      message: "Incorrect Inputs please enter all fields",
      suggestions:
        "1. Username should be valid email 2.Password length must be greter than 8 3. All fields are mandatory[username,password,firstName,lastName]",
    });
  }
  next();
};

const validateSignIn = (req, res, next) => {
  const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8),
  });

  const { success, error } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      success: false,
      message: "Incorrect Inputs please enter all fields",
      suggestions:
        "1. Username should be valid email 2.Password length must be greter than 8",
    });
  }
  next();
};

module.exports = {
  validateSignUp,
  validateSignIn,
};
