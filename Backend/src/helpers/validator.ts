import { body } from "express-validator";

const signupRules = () => {
  return [
    body("first_name")
      .notEmpty()
      .isAlpha()
      .toLowerCase()
      .withMessage("invalid first name"),
    body("last_name")
      .notEmpty()
      .isAlpha()
      .toLowerCase()
      .withMessage("invalid last name"),
    body("email").isEmail().normalizeEmail().withMessage("invalid email"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters"),
  ];
};

const signinRules = () => {
  return [
    body("email").isEmail().normalizeEmail().withMessage("invalid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password must not be empty"),
  ];
};

export { signupRules, signinRules };
