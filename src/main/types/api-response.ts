import { ApiResponseStatus } from '@main/types/api-response-status'

export interface ApiResponse<Resource> {
  code: number,
  status: ApiResponseStatus,
  data?: Resource,
  message?: string,
  stack?: string,
  errors?: string[],
}