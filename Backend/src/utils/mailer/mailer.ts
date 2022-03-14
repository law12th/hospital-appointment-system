import sgMail from "@sendgrid/mail";
import { config } from "../../config";
import { logger } from "../logging/logger";

sgMail.setApiKey(config.sendgrid_api_key!);

const sendUserDetailsLink = (
  email: string,
  first_name: string,
  last_name: string,
  password: string
) => {
  const message = {
    from: config.email!,
    to: email!,
    templateId: config.sendgrid_user_details_template_id!,
    dynamic_template_data: {
      first_name,
      last_name,
      password,
      email,
    },
  };

  sgMail
    .send(message)
    .then(() => logger.info("email sent"))
    .catch((err) => logger.error(`email not sent: ${err}`));
};

export { sendUserDetailsLink };
