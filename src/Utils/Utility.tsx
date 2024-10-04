import Toast, { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';
import { Colors } from './Colors';
import { scale, verticalScale, widthPx } from './Responsive';
import { Fonts } from '../Assets/Fonts/Fonts';
import { CommonStylesFn } from './CommonStyles';
import { Platform } from 'react-native';
import { ErrorWithMessage } from '../Interfaces/CommonTypes';
import moment from 'moment';
import { ToastType } from './Const';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import RNFS from 'react-native-fs';
import _ from 'lodash';

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.green, height: verticalScale(70), width: widthPx(80) }}
      contentContainerStyle={{ paddingHorizontal: scale(10) }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.bold),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3.5, Colors.green)}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.error, height: verticalScale(70), width: widthPx(80) }}
      contentContainerStyle={{
        paddingHorizontal: scale(10),
      }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.bold),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3.5, Colors.error)}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text2NumberOfLines={2}
      style={{ borderLeftColor: Colors.black, height: verticalScale(70) }}
      contentContainerStyle={{ paddingHorizontal: scale(10) }}
      text1Style={[
        CommonStylesFn.text(3, Colors.black, Fonts.bold),
        Platform.OS === 'ios' && { marginBottom: verticalScale(5) },
      ]}
      text2Style={CommonStylesFn.text(3, Colors.black, Fonts.bold)}
    />
  ),
};

export const DirectoryPath =
  Platform.OS === 'ios' ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath;

export const showToast = (type: ToastType, title: string, subTitle?: string) => {
  return Toast.show({
    type,
    text1: title ?? 'Something went wrong',
    ...(subTitle && { text2: subTitle }),
  });
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

const hasErrorKey = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof (error as Record<string, unknown>).error === 'string'
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;
  if (hasErrorKey(maybeError)) return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

const getErrorMessage = (error: unknown) => {
  return toErrorWithMessage(error).message;
};

const formateDate = (inputDate: string) => {
  const formattedDate = moment(inputDate, 'DD-MM-YYYY').format('DD/MM/YYYY');
  return formattedDate;
};

const getCameraPermission = (functionToCall: () => void) => {
  return new Promise<boolean>((resolve, reject) => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    });

    if (!permission) {
      console.error('Permission not defined for the current platform');
      resolve(false);
      return;
    }

    request(permission)
      .then((requestResult) => {
        if (requestResult === RESULTS.GRANTED) {
          functionToCall();
          resolve(requestResult === RESULTS.GRANTED);
        }
        reject(requestResult);
      })
      .catch((error) => {
        console.log('Error requesting permission:', error);
        reject(false);
      });
  });
};

const getReadStoragePermission = (functionToCall: () => void) => {
  return new Promise<boolean>((resolve, reject) => {
    const permission = Platform.select({
      android:
        Number(Platform.Version) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    });

    if (!permission) {
      console.error('Permission not defined for the current platform');
      resolve(false);
      return;
    }

    request(permission)
      .then((requestResult) => {
        if (requestResult === RESULTS.GRANTED) {
          functionToCall();
          resolve(true);
        }
        reject(requestResult);
      })
      .catch((error) => {
        console.log('Error requesting permission:', error);
        reject(false);
      });
  });
};

const getNotificationPermission = () => {
  return new Promise<boolean>((resolve, reject) => {
    const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

    if (!permission) {
      console.error('Permission not defined for the current platform');
      resolve(false);
      return;
    }

    request(permission)
      .then((requestResult) => {
        if (requestResult === RESULTS.GRANTED) {
          resolve(true);
        }
        reject(requestResult);
      })
      .catch((error) => {
        console.log('Error requesting permission:', error);
        reject(false);
      });
  });
};

const isEmailValid = (email: string) => {
  // Regular expression for email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const isPhoneNumberValid = (phoneNumber: string) => {
  // Regular expression for phone number validation
  const phonePattern = /^[0-9]{10}$/; // Change this regex as per your requirements
  return phonePattern.test(phoneNumber);
};

export const Utility = {
  toastConfig,
  showToast,
  getErrorMessage,
  formateDate,
  getCameraPermission,
  getReadStoragePermission,
  getNotificationPermission,
  isEmailValid,
  isPhoneNumberValid,
};
