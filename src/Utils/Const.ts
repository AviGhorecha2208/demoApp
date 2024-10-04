import { Images } from '../Assets/Images/Images';

export const mobileRegex = /^([0-9]{10})$/;
export const REFRESH_TOKEN_ATTEMPT = 3;
export const BUNDLE_ID = 'com.shopease';
export const RAZORPAY_KEY = 'rzp_test_eZVZbHgiW3hPBo';

enum Screens {
  Home = 'Home',
  StartupScreen = 'StartupScreen',
  Drawer = 'Drawer',
  BottomTabs = 'BottomTabs',
}

enum ToastType {
  success = 'success',
  error = 'error',
  info = 'info',
}

const BottomTabs = [
  {
    index: 0,
    label: 'Home',
    screen: Screens.Home,
    activeIcon: Images.home,
    inActiveIcon: Images.home,
  },
  // {
  //   index: 1,
  //   label: '',
  //   screen: Screens.,
  //   activeIcon: Images.,
  //   inActiveIcon: Images.,
  // },
  // {
  //   index: 2,
  //   label: '',
  //   screen: Screens.,
  //   activeIcon: Images.,
  //   inActiveIcon: Images.,
  // },
  // {
  //   index: 3,
  //   label: '',
  //   screen: Screens.,
  //   activeIcon: Images.,
  //   inActiveIcon: Images.,
  // },
];

export { BottomTabs, ToastType, Screens };
