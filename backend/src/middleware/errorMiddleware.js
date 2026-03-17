const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    success: false,
    errors: err.errors || undefined,
  });
};

export default errorMiddleware;
