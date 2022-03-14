const validate = (values) => {
  let errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "first name is required";
  }
  if (!values.lastName.trim()) {
    errors.lastName = "last name is required";
  }
  if (!values.email) {
    errors.email = "email is required";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    errors.email = "invalid email address";
  }
  if (!values.password) {
    errors.password = "password is required";
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
      values.password
    )
  ) {
    errors.password = "weak password";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "confirm password is required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "passwords do not match";
  }

  return errors;
};

export default validate;
