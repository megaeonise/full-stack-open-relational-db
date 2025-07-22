const errorHandler = (
  error: { message: any },
  _request: any,
  _response: any,
  next: (arg0: any) => void
) => {
  console.error(error.message);
  console.log("hello where is error");
  next(error);
};
module.exports = errorHandler;
