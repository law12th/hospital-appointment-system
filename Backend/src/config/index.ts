import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  posgres_user: process.env.POSTGRES_USER,
  postgres_host: process.env.POSTGRES_HOST,
  postgres_port: process.env.POSTGRES_PORT,
  postgres_database: process.env.POSTGRES_DATABASE,
  postgres_password: process.env.POSTGRES_PASSWORD,
  jwt_secret: process.env.JWT_SECRET,
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  sendgrid_user_details_template_id:
    process.env.SENDGRID_USER_DETAILS_TEMPLATE_ID,
  email: process.env.EMAIL,
};

export { config };
