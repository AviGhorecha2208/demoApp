import { store } from '../Store/Store';

export const getAccessToken = () => {
  return store.getState().Auth.tokenData?.access_token || '';
};

export const getRefreshToken = () => {
  console.log(store.getState().Auth.tokenData, 'store.getState().Auth.tokenData');
  return store.getState().Auth.tokenData?.refresh_token || '';
};
