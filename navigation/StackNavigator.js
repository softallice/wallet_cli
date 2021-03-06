import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './TabNavigation';
import TabNavigationMyInfo from './TabNavigationMyInfo';
import KeyManage from '../screens/MyInfo/KeyManage';
import AppLock from '../screens/MyInfo/AppLock';
import Backup from '../screens/MyInfo/Backup';
// import ResetPIN from '../screens/MyInfo/ResetPIN';
import BioMetric from '../screens/Auth/BioMetric';
import TransferSecond from '../screens/Tabs/TransferSecond';
import CoinHistory from '../screens/History/CoinHistory';
import PurchaseHistory from '../screens/History/PurchaseHistory';
import ExchangeHistory from '../screens/History/ExchangeHistory';
import PurchaseRequest from '../screens/Tabs/PurchaseRequest';
import MyInfo from '../screens/MyInfo/MyInfo';
import ExchangeRequest from '../screens/Tabs/ExchangeRequest';
import ExchangeSecond from '../screens/Tabs/ExchangeSecond';
import MyHistory from '../screens/Tabs/MyHistory';
import EmailAuth from '../screens/MyInfo/EmailAuth';
import PhoneAuth from '../screens/MyInfo/PhoneAuth';
import IdentifyAuth from '../screens/MyInfo/IdentifyAuth';
import IdentifyCardAuth from '../screens/MyInfo/IdentifyCardAuth';
import DriverLicenseAuth from '../screens/MyInfo/DriverLicenseAuth';
import ServiceCenter from '../screens/MyInfo/ServiceCenter';
import Certification from '../screens/MyInfo/Certification';
import IamportCertification from '../screens/Auth/IamportCertification';
import ServiceCenterMyResult from '../screens/MyInfo/ServiceCenterMyResult';
import ServiceCenterOneToOne from '../screens/MyInfo/ServiceCenterOneToOne';
import QRscanner from '../screens/Tabs/QRscanner';
import { setComma } from '../utils';

import Transfer from '../screens/Tabs/Transfer';

const MainNavigation = createStackNavigator(
  {
    TabNavigation: {
      screen: TabNavigation,
      navigationOptions: {
        headerShown: false,
      },
    },
    Transfer: {
      screen: Transfer,
      navigationOptions: {
        headerTitle: '??????',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerTintColor: '#000',
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    EmailAuth: {
      screen: EmailAuth,
      navigationOptions: {
        headerTitle: '????????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    PhoneAuth: {
      screen: PhoneAuth,
      navigationOptions: {
        headerTitle: '????????? ????????????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    IdentifyAuth: {
      screen: IdentifyAuth,
      navigationOptions: {
        headerTitle: '????????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    IdentifyCardAuth: {
      screen: IdentifyCardAuth,
      navigationOptions: {
        headerTitle: '??????????????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    DriverLicenseAuth: {
      screen: DriverLicenseAuth,
      navigationOptions: {
        headerTitle: '??????????????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    QRscanner: {
      screen: QRscanner,
      navigationOptions: {
        headerTitle: 'QR?????? ?????????',
        headerTintColor: '#000',
        headerRight: false,
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    TransferSecond: {
      screen: TransferSecond,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    MyHistory: {
      screen: MyHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerBackTitleVisible: false,
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    MyInfo: {
      screen: MyInfo,
      navigationOptions: {
        headerTitle: '??? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    CoinHistory: {
      screen: CoinHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    PurchaseHistory: {
      screen: PurchaseHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    ExchangeHistory: {
      screen: ExchangeHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    PurchaseRequest: {
      screen: PurchaseRequest,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    ExchangeRequest: {
      screen: ExchangeRequest,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    ExchangeSecond: {
      screen: ExchangeSecond,
      navigationOptions: ({ navigation }) => {
        const hedearTitleVal = navigation.getParam('headerTitle');
        return {
          headerTitle: `${setComma(hedearTitleVal)}??? ?????? ??????`,
          headerTintColor: '#000',
          headerTitleStyle: {
            color: 'black',
            fontSize: 17,
            fontWeight: 'normal',
          },
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#dcdcdc',
            backgroundColor: '#fff',
          },
        };
      },
    },
    KeyManage: {
      screen: KeyManage,
      navigationOptions: {
        headerTitle: '??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    AppLock: {
      screen: AppLock,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },

    BioMetric: {
      screen: BioMetric,
      navigationOptions: {
        headerShown: false,
      },
    },
    IamportCertification: {
      screen: IamportCertification,
      navigationOptions: {
        // headerShown: false,
        headerTitle: 'PASS',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerRight: null,
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    Backup: {
      screen: Backup,
      navigationOptions: {
        // headerShown: false, //???????????? ????????? ????????????, ??? ????????? ????????? ????????? ?????????????????????
        headerTitle: '??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    // ResetPIN: {
    //   screen: ResetPIN,
    //   navigationOptions: {
    //     headerTitle: 'PIN ?????????',
    //     headerTintColor: '#000',
    //     headerTitleStyle: {
    //       color: 'black',
    //       fontSize: 17,
    //       fontWeight: 'normal',
    //     },
    //     headerStyle: {
    //       elevation: 0,
    //       borderBottomWidth: 1,
    //       borderBottomColor: '#dcdcdc',
    //       backgroundColor: '#fff',
    //     },
    //   },
    // },
    ServiceCenter: {
      screen: ServiceCenter,
      navigationOptions: {
        headerTitle: '????????????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    Certification: {
      screen: Certification,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    ServiceCenterOneToOne: {
      screen: ServiceCenterOneToOne,
      navigationOptions: {
        headerTitle: '1:1??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },

    ServiceCenterMyResult: {
      screen: ServiceCenterMyResult,
      navigationOptions: {
        headerTitle: '??? ?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
  },
  {
    // headerMode: "none",
    made: 'modal',
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('QRscanner')}>
            <Image
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
              }}
              source={require('../assets/front/qr_icon.png')}
            />
          </TouchableOpacity>
        ),
      };
    },
  },
);

//???????????? ?????????
const MainNavigationMyInfo = createStackNavigator(
  {
    TabNavigation: {
      screen: TabNavigationMyInfo,
      navigationOptions: {
        headerShown: false,
      },
    },
    Transfer: {
      screen: Transfer,
      navigationOptions: {
        headerTitle: '??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    EmailAuth: {
      screen: EmailAuth,
      navigationOptions: {
        headerTitle: '????????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    QRscanner: {
      screen: QRscanner,
      navigationOptions: {
        headerTitle: 'QR?????? ?????????',
        headerTintColor: '#000',
        headerRight: false,
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    TransferSecond: {
      screen: TransferSecond,
      navigationOptions: {
        // headerBackTitle: "true",
        // headerLeft:
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    MyHistory: {
      screen: MyHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    MyInfo: {
      screen: MyInfo,
      navigationOptions: {
        headerTitle: '??? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    CoinHistory: {
      screen: CoinHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    PurchaseHistory: {
      screen: PurchaseHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    ExchangeHistory: {
      screen: ExchangeHistory,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    PurchaseRequest: {
      screen: PurchaseRequest,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    ExchangeRequest: {
      screen: ExchangeRequest,
      navigationOptions: {
        headerTitle: '?????? ??????',
        headerTintColor: '#000',
        headerTitleStyle: {
          color: 'black',
          fontSize: 17,
          fontWeight: 'normal',
        },
        headerStyle: {
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#dcdcdc',
          backgroundColor: '#fff',
        },
      },
    },
    ExchangeSecond: {
      screen: ExchangeSecond,
      navigationOptions: ({ navigation }) => {
        const hedearTitleVal = navigation.getParam('headerTitle');
        return {
          headerTitle: `${setComma(hedearTitleVal)}??? ?????? ??????`,
          headerTintColor: '#000',
          headerTitleStyle: {
            color: 'black',
            fontSize: 17,
            fontWeight: 'normal',
          },
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#dcdcdc',
            backgroundColor: '#fff',
          },
        };
      },
    },
    BioMetric: {
      screen: BioMetric,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    // headerMode: "none",
    made: 'modal',
    headerLayoutPreset: 'center',
    headerBackTitleVisible: false,
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('QRscanner')}>
            <Image
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
              }}
              source={require('../assets/front/qr_icon.png')}
            />
          </TouchableOpacity>
        ),
      };
    },
  },
);

// createAppContainer??? return?????? Class??? Component ????????? const??? ????????? react must return Component??? ?????????
export const AppContainer = createAppContainer(MainNavigation);
export const AppContainerMyInfo = createAppContainer(MainNavigationMyInfo);
