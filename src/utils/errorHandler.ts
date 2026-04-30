import { ERROR_CODE_MAP } from '../enums/error';
import { AppError, ErrorCode } from '../types/error';

export async function parseGithubError(response: Response): Promise<AppError> {
  let message = `HTTP ${response.status}`;
  try {
    const body = await response.json();
    message = body.message ?? message;
  } catch {}

  const code: ErrorCode =
    ERROR_CODE_MAP[response.status] ??
    (response.status >= 500 ? 'SERVER_ERROR' : 'UNKNOWN_ERROR');

  return new AppError(code, message, response.status);
}
