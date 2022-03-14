import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../database";
import { BadRequestError, logger, Password } from "../utils";

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await pool.query(
      "SELECT password FROM users WHERE email = $1",
      [email],
      (error, result) => {
        if (error) {
          throw new BadRequestError("invalid credentials");
        }

        const passwordMatch = Password.compare(
          result.rows[0].password,
          password
        );

        if (!passwordMatch) throw new BadRequestError("invalid credentials");

        pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email],
          (error, result) => {
            if (error) {
              throw new BadRequestError("invalid credentials");
            }

            const role_id = result.rows[0].role_id;
            const first_name = result.rows[0].first_name;

            const userJwt = jwt.sign(
              {
                id: result.rows[0].id,
                email: result.rows[0].email,
                role_id,
              },
              config.jwt_secret!
            );

            req.session = {
              jwt: userJwt,
            };

            res.status(200).json({ userJwt, role_id, first_name });
          }
        );
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

export { signin };
