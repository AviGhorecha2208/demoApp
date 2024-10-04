import { HttpStatusCode } from 'axios';

export interface CommonApiResponse<T> {
  data: T;
  status_code: HttpStatusCode;
  message: string;
  status: number;
  status_text: string | null | undefined;
}
