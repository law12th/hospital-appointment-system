import { Request, Response, NextFunction } from "express";
import { Password } from "../utils";
import { logger } from "../utils";
import { pool } from "../database";
import { sendUserDetailsLink } from "../utils";

const createAdmin = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ($1, $2, $3, $4, 1) RETURNING *",
      [first_name, last_name, email, Password.toHash(password)],
      (error, result) => {
        if (error) return res.send("email already in use");

        res.status(201).json(result.rows[0]);
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

const addDoctor = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ($1, $2, $3, $4, 2) RETURNING *",
      [first_name, last_name, email, Password.toHash(password)],
      (error) => {
        if (error) throw error;

        sendUserDetailsLink(email, first_name, last_name, password);
        res.status(200).send("added a doctor");
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

const removeDoctor = async (req: Request, res: Response) => {
  const { doctor_id } = req.body;

  try {
    await pool.query(
      "DELETE FROM users WHERE id = $1",
      [doctor_id],
      (error, result) => {
        if (error) throw error;

        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

const getDoctors = async (req: Request, res: Response) => {
  try {
    await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE role_id = 2",
      (error, result) => {
        if (error) throw error;

        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

export { addDoctor, removeDoctor, getDoctors, createAdmin };
