export function handleValidationError(res, error) {
  return res.status(400).json({ message: error.details[0].message });
}
