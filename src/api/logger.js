// error logging function
// export function validationError(request, h, error) {
//     console.log(error.message);
// }

// export function validationError(request, h, error) {
//     console.log(error.message);
//     return h.response({
//       statusCode: 400,
//       error: "Bad Request",
//       message: "Validation error",
//     }).code(400);
// }

// export function validationError(request, h, error) {
//   console.log(error.message);
//   throw h.response({
//     statusCode: 400,
//     error: "Bad Request",
//     message: "Validation error",
//   }).takeover();
// }

export function validationError(request, h, error) {
  console.log(error.message);
  throw new Error("Validation error");
}
