/*
need this because the default middleware for express is an HTML page, but here we are just creating an API to be  consumed by the frontend

PSA : "next" parameter is the callback that fire off to run the next piece of middleware after this is done

- 1st middleware is to handle error to catch all routes that does not exist
- 2nd middleware is to catch all errors that occur in our routes
*/

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(400);
  next(error);
};

// see that this middleware is also taking error as the first parameter, if you do this express will know that this is your error handler
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //  checking if its a mongoose "cast" error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  // sending back response
  res.status(statusCode).json({
    message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
