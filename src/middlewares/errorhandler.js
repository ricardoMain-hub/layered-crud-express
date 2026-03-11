// Centralized Error Handling
const errorHandling = (err, req, res, next) => {
  console.log(err.stack);
  req.status(500).json({
    status: 500,
    message: "Something went wrong",
    error: err.message,
  });
};

export default errorHandling;
