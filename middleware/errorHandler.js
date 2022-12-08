function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal server error";
  console.log(error);

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "Unauthorized":
      status = 401;
      message = "Please login first";
      break;
    case "Invalid_input":
      status = 401;
      message = "Invalid email or password";
      break;
    case "Not_found":
      status = 404;
      message = "Data not found";
      break;
    case "Forbidden":
      status = 403;
      message = "You dont have permission to access";
    case "Already exists":
      status = 400;
      message = "This Product already exists in your cart";

    default:
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
