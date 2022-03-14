import { Request, Response } from "express";
import { pool } from "../database";
import { logger } from "../utils";

const approveAppointmentDate = async (req: Request, res: Response) => {
  const { patient_id } = req.body;

  try {
    await pool.query(
      "UPDATE appointments SET approval = 'yes' WHERE doctor_id = $1 AND patient_id = $1 RETURNING *",
      [req.params.id, patient_id],
      (error) => {
        if (error) throw error;

        res.status(200).send(`${patient_id} date approved`);
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

const changeAppointmentDate = async (req: Request, res: Response) => {
  const { newDate, patient_id } = req.body;

  try {
    await pool.query(
      "UPDATE appointments SET appointment_date = $1 WHERE doctor_id = $2 AND patient_id = $3 RETURNING *",
      [newDate, req.params.id, patient_id],
      (error) => {
        if (error) throw error;

        res.status(200).send("appointment date changed");
      }
    );
  } catch (err) {
    logger.error(err);
  }
};

const showAppointments = async (req: Request, res: Response) => {
  try {
    await pool.query(
      "SELECT appointment_date FROM appointments WHERE doctor_id = $1",
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

export { approveAppointmentDate, changeAppointmentDate, showAppointments };
