export interface ScreenParams {
  Dashboard: any;
}

export type ErrorWithMessage = {
  message: string;
  error?: string;
};

export interface GeneralState {
  isLoading: boolean;
}
