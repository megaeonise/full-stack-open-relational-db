const errorHandler = (
  error: any,
  _req: any,
  res: any,
  next: (arg0: any) => void
) => {
  console.error(error.message);
  res.json({
    error: error.message.split("\n"),
  });
  next(error);
};
module.exports = errorHandler;
