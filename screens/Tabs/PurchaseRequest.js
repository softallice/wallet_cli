import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Vibration,
} from 'react-native';
import CoinInputBox from '../../components/CoinInputBox';
import styled, { withTheme } from 'styled-components';
import constants from '../../constants';
import Modal from 'react-native-modal';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-tiny-toast';
import { setComma } from '../../utils';
import CoinButton from '../../components/CoinButton';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { loadingTransaction, someState } from '../../recoil/recoilAtoms';
import { useRecoilValue } from 'recoil';

const Warpper = styled.View`
  width: ${constants.width};
  height: ${constants.height * 0.85};
  align-items: center;
`;

const Container = styled.View`
  height: 55px;
  align-items: center;
  justify-content: center;
`;

const View = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.backGroundColor};
  padding-bottom: 2%;
`;

const RadiusRight = styled.View`
  overflow: hidden;
  border-bottom-right-radius: 10;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.blackTextColor};
  text-align: center;
  font-size: 16px;
  padding: 5px;
  margin: 20px 0;
  border: 1px solid white;
`;

const CoinText = styled.Text`
  color: ${(props) => props.theme.blackTextColor};
  text-align: left;
  font-weight: 600;
  margin-top: 3%;
  margin-left: 5%;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.whiteTextColor};
  text-align: center;
  font-size: 17px;
`;

const ButtonContainerWarpper = styled.View`
  align-items: center;
`;

const BottomContainer = styled.View``;

const NextButtonContainer = styled.View`
  width: ${constants.width};
`;

const Touchable = styled.TouchableOpacity`
  justify-content: flex-end;
`;

const Image = styled.Image`
  margin: 0 auto;
`;

const CoinButtonContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  margin: 10px auto;
  width: ${constants.width * 0.9};
`;

const ModalView = styled.View`
  background-color: ${(props) => props.theme.subColor};
  width: 300;
  align-items: center;
  justify-content: space-between;
  border-radius: 11px;
`;

const ModalImage = styled.Image`
  width: ${(props) => (props.width ? props.width : '15%')};
  margin-top: 10px;
`;

const ModalTextContainer = styled.View`
  width: 240;
  justify-content: center;
  margin-bottom: 5;
`;

const ModalText = styled.Text`
  color: ${(props) => props.theme.blackTextColor};
  text-align: center;
  border: 1px solid white;
`;

const ModalWarpper = styled.View`
  align-items: center;
`;

const ModalButtonContainer = styled.View`
  flex-direction: row;
`;
const ModalTouchable = styled.TouchableOpacity`
  width: 50%;
  height: 55px;
`;

const ModalContainer = styled.View`
  height: 55px;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;

  border-top-color: ${(props) => props.theme.borderBottomColor};
`;

const CancelButtonText = styled.Text`
  color: ${(props) => props.theme.blackTextColor};
  text-align: center;
  font-size: 17px;
`;

const MainBGColor = styled.View`
  background-color: ${(props) => props.theme.mainColor};
`;

const IS_AUTH_USER = gql`
  query isAuthUser {
    isAuthUser {
      bool
      status
    }
  }
`;

const PurchaseRequest = ({ theme, navigation }) => {
  //state
  const [coinValue, setCoinValue] = useState(''); //?????? input ???
  const [modalVisible, setModalVisible] = useState(false); //Modal ????????? ?????? ??????

  //recoil
  const transactionLoading = useRecoilValue(loadingTransaction);
  const { myInfoCheck } = useRecoilValue(someState);

  //query
  const { refetch: isAuthUserRefetch } = useQuery(IS_AUTH_USER);

  const handleCoin = (value) => {
    const val = value.replace(/,/g, '');
    if (val == '') {
      setCoinValue('');
    } else if (isNaN(val)) {
      Toast.show('????????? ?????? ???????????????', { position: 0 });
      setCoinValue('');
    } else if (parseInt(val) > 2000000000) {
      Toast.show(`?????? ?????? ????????? 20??? KRWG ???????????????`, {
        position: 0,
      });
    } else {
      setCoinValue(String(parseInt(val)));
    }
  };
  const handleCoinInput = (value) => {
    let val = coinValue.replace(/,/g, '');
    if (val === '') {
      val = 0;
    } else {
      val = parseInt(val);
    }
    return setCoinValue((c) =>
      c == ''
        ? String(parseInt(0) + parseInt(value))
        : String(parseInt(c) + parseInt(value)),
    );
  };
  const handleModal = async () => {
    //????????? ??????
    setModalVisible(!modalVisible); //ModalVisible?????? ????????? ????????? ??????
  };

  const navigateFunc = () => {
    if (coinValue == '' || parseInt(coinValue) === 0) {
      Vibration.vibrate(150);
      Toast.show('??????????????? ????????? ???????????????', { position: 0 });
      return false;
    } else if (isNaN(coinValue)) {
      Vibration.vibrate(150);
      Toast.show('??????????????? ????????? ?????? ???????????????', { position: 0 });
      return false;
    } else if (parseInt(coinValue) < 10000) {
      Vibration.vibrate(150);
      Toast.show(`?????? ?????? ????????? 10,000KRWG ?????????`, {
        position: 0,
      });
      return false;
    } else {
      setModalVisible(!modalVisible);
      // ?????? ????????? ???????????? ????????? ?????? ????????? ??????????????? ????????? ?????????????????? ??????
      setTimeout(() => {
        navigation.navigate('BioMetric', {
          routeName: 'coinPurchase',
          coinValue,
          //????????????
          // nickName: depositorInput
        });
      }, 500);
    }
  };

  const NextButtonOnPress = async () => {
    if (coinValue == '') {
      Toast.show('??????????????? ????????? ???????????????', { position: 0 });
      return false;
    } else if (isNaN(coinValue)) {
      Toast.show('????????? ?????? ???????????????', { position: 0 });
      return false;
    } else if (parseInt(coinValue) < 10000) {
      Toast.show('?????? ?????? ????????? 10,000????????????', { position: 0 });
      return false;
    } else {
      isAuthUserRefetch().then(({ data }) => {
        console.log({ data });
        if (
          data.isAuthUser.bool.every((item) => {
            return item;
          })
        ) {
          handleModal();
        } else {
          Toast.show('????????? ???????????? ??????????????? ???????????? ?????????. ', {
            position: 0,
          });
          if (myInfoCheck) {
            return new Promise((resolve, reject) => {
              navigation.navigate('MyInfo', { screen: 'Certification' });
              resolve();
            }).then(() => {
              return navigation.navigate('Certification');
            });
          } else {
            return setTimeout(() => {
              return navigation.navigate('MyInfoBioMetric');
            }, 2000);
          }
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS == 'ios' ? Header.HEIGHT + 20 : 0}
      behavior={Platform.OS == 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ height: '100%' }}
        scrollIndicatorInsets={{ right: 1 }}
        keyboardShouldPersistTaps={'handled'} //???????????? ????????? ???????????? input ????????????????????? ?????? props
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Warpper>
              <View>
                <>
                  <Text>{`????????? ????????? ?????? ????????? ???????????????\n???????????? ?????? ??? KRWG??? ??????????????????`}</Text>
                  <Image
                    style={{ resizeMode: 'contain', height: '30%' }}
                    source={require('../../assets/front/purchase_img.png')}
                  />
                  <CoinText>?????? ??????</CoinText>
                  <CoinInputBox
                    value={setComma(coinValue)}
                    setCoinValue={setCoinValue}
                    onChange={(value) => handleCoin(value)}
                    keyboardType="numeric"
                    returnKeyType="send"
                    autoCorrect={false}
                    modalVisible={modalVisible}
                    text="KRWG"
                  ></CoinInputBox>
                  {/* ====================================== */}
                  <CoinButtonContainer>
                    <CoinButton
                      text={'+1,000'}
                      onPress={() => handleCoinInput(1000)}
                    ></CoinButton>
                    <CoinButton
                      text={'+5,000'}
                      onPress={() => handleCoinInput(5000)}
                    ></CoinButton>
                    <CoinButton
                      text={'+10,000'}
                      onPress={() => handleCoinInput(10000)}
                    ></CoinButton>
                    <CoinButton
                      text={'+50,000'}
                      onPress={() => handleCoinInput(50000)}
                    ></CoinButton>
                  </CoinButtonContainer>
                </>

                <Modal
                  isVisible={modalVisible}
                  onBackdropPress={() => handleModal()}
                >
                  <ModalWarpper>
                    <ModalView style={{ height: 200 }}>
                      <ModalImage
                        style={{
                          resizeMode: 'contain',
                          height: '20%',
                          marginTop: 15,
                        }}
                        source={require('../../assets/front/pop_up_wallet_icon.png')}
                      />
                      <ModalTextContainer>
                        <ModalText
                          style={{
                            paddingTop: 10,
                          }}
                        >{`??????????????? KRWG???\n${setComma(
                          coinValue,
                        )}?????? ??????????`}</ModalText>
                      </ModalTextContainer>
                      <ModalButtonContainer>
                        <ModalTouchable onPress={() => handleModal()}>
                          <ModalContainer>
                            <CancelButtonText>?????????</CancelButtonText>
                          </ModalContainer>
                        </ModalTouchable>
                        <ModalTouchable onPress={() => navigateFunc()}>
                          <RadiusRight>
                            <MainBGColor
                              style={{
                                borderBottomRightRadius: 10,
                              }}
                            >
                              <ModalContainer>
                                <ButtonText>??????</ButtonText>
                              </ModalContainer>
                            </MainBGColor>
                          </RadiusRight>
                        </ModalTouchable>
                      </ModalButtonContainer>
                    </ModalView>
                  </ModalWarpper>
                </Modal>
              </View>
            </Warpper>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
      <BottomContainer>
        <ButtonContainerWarpper>
          <NextButtonContainer>
            <Touchable
              disabled={transactionLoading}
              onPress={(e) => {
                NextButtonOnPress();
              }}
            >
              <MainBGColor>
                {transactionLoading ? (
                  <Container>
                    <ActivityIndicator
                      size="large"
                      color={theme.activityIndicatorColor}
                    />
                  </Container>
                ) : (
                  <Container>
                    <ButtonText>?????? ??????</ButtonText>
                  </Container>
                )}
              </MainBGColor>
            </Touchable>
          </NextButtonContainer>
        </ButtonContainerWarpper>
      </BottomContainer>
    </KeyboardAvoidingView>
  );
};

export default withTheme(PurchaseRequest);
