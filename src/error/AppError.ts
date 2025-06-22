export interface AppError extends Error {
  statusCode: number;
  isAppError: true;
}

export function createAppError(message: string, statusCode = 400): AppError {
  const error = new Error(message) as Partial<AppError>;
  error.isAppError = true;
  error.statusCode = statusCode;
  return error as AppError;
}
