import { ErrorCode } from '../types/error';

export const ERROR_CODE_MAP: Record<number, ErrorCode> = {
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  422: 'VALIDATION_ERROR',
  429: 'RATE_LIMITED',
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
  UNAUTHORIZED: '인증이 필요합니다. GitHub 토큰을 확인해주세요.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  RATE_LIMITED: 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  SERVER_ERROR: 'GitHub 서버 오류입니다. 잠시 후 다시 시도해주세요.',
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
};
