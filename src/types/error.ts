export type ErrorCode =
  | 'NETWORK_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'RATE_LIMITED'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    public message: string,
    public status?: number,
    public originalError?: any,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
