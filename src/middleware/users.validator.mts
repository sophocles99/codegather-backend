import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateCreateUser = [
  check("user.email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address"),
  check("user.password")
    .trim()
    .notEmpty()
    .withMessage("Password must be included")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be between 8 and 20 characters long"),
  check("user.first_name")
    .trim()
    .notEmpty()
    .withMessage("First name must be included"),
  check("user.last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name must be included"),
  check("user.username")
    .trim()
    .notEmpty()
    .withMessage("Username must be included")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters long"),
  check("user.date_of_birth")
    .trim()
    .notEmpty()
    .withMessage("Date of birth must be included")
    .isDate()
    .withMessage("Date of birth must be a valid date"),
  check("user.location")
    .trim()
    .notEmpty()
    .withMessage("Location must be included"),
  check("user.avatar")
    .optional()
    .trim()
    .isURL()
    .withMessage("Avatar link must be a valid URL"),
  check("user.bio")
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Bio must be no longer than 255 characters long"),
  check("user.coding_languages")
    .optional()
    .isArray()
    .withMessage("Coding languages must be in an array"),
  check("user.coding_languages.*")
    .optional()
    .isString()
    .withMessage("Each coding language must be a string"),
  check("user.interests")
    .optional()
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Interests must be no longer than 255 characters long"),
];

const catchValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.status(400).send({ success: false, msg: error });
};

const validateUserSignIn = [
  check("user.email")
    .trim()
    .isEmail()
    .withMessage("Email and password are required"),
  check("user.password")
    .trim()
    .notEmpty()
    .withMessage("Email and password are required"),
];

export { validateCreateUser, validateUserSignIn, catchValidationErrors };
