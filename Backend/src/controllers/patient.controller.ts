import { Request, Response } from "express";
import { pool } from "../database";
import { logger } from "../utils";
import { Password } from "../utils";

const createAccount = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    await pool.query(
      "INSERT INTO users (first_name, last_name, email, password, role_id) VALUES ($1, $2, $3, $4, 3) RETURNING *",
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

const selectDate = async (req: Request, res: Response) => {
  const { date, doctor_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO  appointments (appointment_date, doctor_id, patient_id) VALUES ($1, $2, $3) RETURNING *",
      [date, doctor_id, req.params.id],
      (error) => {
        if (error) throw error;

        res.status(200).send("created appointment date");
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

const getAppointments = async (req: Request, res: Response) => {
  try {
    await pool.query(
      "SELECT appointment_id, first_name, last_name, appointment_date, approval FROM appointments JOIN users ON appointments.doctor_id = users.id WHERE patient_id = $1",
      [req.params.id],
      (error, result) => {
        if (error) throw error;

        res.status(200).json(result.rows[0]);
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

export { createAccount, selectDate, getAppointments };
