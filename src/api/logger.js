
export function validationError(request, h, error) {
  console.log(error.message);
  throw new Error("Validation error");
}
