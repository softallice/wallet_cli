import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import constants from '../../constants';
import AddressInputBox from '../../components/AddressInputBox';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from 'react-apollo-hooks';
import NameInputBox from '../../components/NameInputBox';
import Modal from 'react-native-modal';
import { Header } from 'react-navigation-stack';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';
import { setComma } from '../../utils';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import { isAddressFunc } from '../../Web3Connecter';

import {
  myInfoState,
  userBalance,
  companyState,
  transferData,
} from '../../recoil/recoilAtoms';
import { useRecoilValue, useResetRecoilState } from 'recoil';

const Warpper = styled.View`
  width: ${constants.width};
  height: ${constants.height};
`;

const Container = styled.View`
  height: 55px;
  align-items: center;
  justify-content: center;
`;

const CheckBoxWarpper = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const RecieverBox = styled.View`
  height: ${constants.height * 0.6};
  background-color: ${(props) => props.theme.backGroundColor};
  padding-bottom: 2%;
`;

const CoinText = styled.Text`
  color: ${(props) => props.theme.blackTextColor};
  text-align: left;
  font-weight: 600;
  margin-left: 20px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 20)};
`;

const ButtonText = styled.Text`
  color: ${(props) => (props.color ? props.color : props.theme.whiteTextColor)};
  text-align: center;
  font-size: 17px;
`;

const CancelButtonText = styled.Text`
  color: ${(props) => (props.color ? props.color : props.theme.blackTextColor)};
  text-align: center;
  font-size: 17px;
`;

const BottomContainer = styled.View`
  align-items: flex-end;
  flex-direction: row;
`;

const ButtonContainerWarpper = styled.View`
  align-items: center;
`;

const NextButtonContainer = styled.View`
  width: ${constants.width};
`;

const Touchable2 = styled.TouchableOpacity``;

const ListView = styled.View``;

const ModalView = styled.View`
  background-color: ${(props) => props.theme.subColor};
  align-items: center;
  border-radius: 11px;
  width: 330;
  height: 230;
`;

const ModalButtonContainer = styled.View`
  justify-content: flex-end;
  flex: 1;
  flex-direction: row;
`;

const ModalWarpper = styled.View`
  align-items: center;
`;

const ModalImage = styled.Image`
  margin-top: 20px;
`;

const ModalTextContainer = styled.View`
  flex: 3;
  width: 240;
  justify-content: center;
`;

const ModalText = styled.Text`
  font-size: ${(props) => (props.fontSize ? props.fontSize : 14)};
  color: ${(props) => (props.color ? props.color : props.theme.blackTextColor)};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)};
  text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
  height: ${(props) => (props.height ? props.height : 'auto')};
`;

const Touchable = styled.TouchableOpacity``;

const ModalTouchable = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
`;

const ModalContainer = styled.View`
  height: 55px;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.borderBottomColor};
`;

const CustomText = styled.Text`
  color: ${(props) => (props.color ? props.color : props.theme.blackTextColor)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 18)};
  padding: 10px;
  height: 44;
  background-color: ${(props) => props.theme.subColor};
  margin-bottom: 1;
  padding-left: 10%;
`;

const RadiusRight = styled.View`
  overflow: hidden;
  border-bottom-right-radius: 10;
`;

const TextContainer = styled.View`
  width: ${constants.width * 0.9};
  height: 48px;
  margin: 0 auto;
  justify-content: flex-end;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.borderBottomColor};
`;

const RecentlyText = styled.Text`
  color: ${(props) => (props.color ? props.color : props.theme.blackTextColor)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : 18)};
  margin-bottom: 3;
`;

const Underline = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.borderBottomColor};
  margin: 5px 0;
`;

const MainBGColor = styled.View`
  background-color: ${(props) => props.theme.mainColor};
`;

const FlatComponent = styled.View``;

const FIND_USER = gql`
  mutation findUser($nickName: String!) {
    findUser(nickName: $nickName) {
      nickName
      code
      address
    }
  }
`;

const USER_GET_NICKNAME = gql`
  mutation userGetNickname($address: String!) {
    userGetNickname(address: $address)
  }
`;

const LATELY_USERS = gql`
  {
    latelyUsers {
      code
      nickName
      address
    }
  }
`;

export default withTheme(({ theme, navigation }) => {
  const {
    loading: latelyUserLoading,
    error: latelyUserError,
    data: latelyUserData,
  } = useQuery(LATELY_USERS, {
    fetchPolicy: 'network-only',
  });

  if (latelyUserLoading) return <Loader />;

  if (latelyUserError) {
    return <Error navigation={navigation} />;
  }

  if (latelyUserData)
    return (
      <TransferSecond
        navigation={navigation}
        data={latelyUserData}
        theme={theme}
      />
    );
});

const TransferSecond = ({ navigation, data, theme }) => {
  //recoil
  const { KRWG } = useRecoilValue(userBalance);
  const { dailyFreeTransferCount } = useRecoilValue(myInfoState);
  const { charge } = useRecoilValue(companyState);

  //recoil setter
  const transferDataReset = useResetRecoilState(transferData);

  //state
  const [findUserArr, setFindUserArr] = useState([]);
  const [nickName, setNickName] = useState('');
  const [validate, setValidate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); //Modal ????????? ?????? ??????
  const [listType, setListType] = useState('lately');
  const [addressValue, setAddressValue] = useState(''); //?????? input ???
  const [nameInput, setNameInput] = useState('');

  //params
  const coinValue = navigation.getParam('coinValue');
  const qrAddress = navigation.getParam('qrAddress');

  //mutation
  const [findUserMutation] = useMutation(FIND_USER);
  const [userGetNicknameMutation] = useMutation(USER_GET_NICKNAME);

  const regHex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
  const check = /[???-???|???-???|???-???]|[\s\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

  const changeAddress = (val) => {
    if (check.test(val)) {
      Toast.show('??????, ???????????? ?????? ??????', { position: 0 });
      setAddressValue('');
      return false;
    } else if (val.length > 42) {
      Toast.show('????????? 0x??? ????????? 40?????? ??????', { position: 0 });
      return false;
    } else {
      setAddressValue(val);
    }
  };

  const modalClose = () => {
    setValidate(false);
    setModalVisible(false);
  };

  const handleModal = async () => {
    setModalVisible(!modalVisible);
  };

  const addressValidate = async (addressValue) => {
    const walletStr = await AsyncStorage.getItem('WALLETS');
    const wallet = JSON.parse(walletStr);

    if (wallet.address === addressValue) {
      setAddressValue('');
      Vibration.vibrate(150);
      Toast.show('?????? ??????????????? ????????? ??? ????????????.', { position: 0 });
      return false;
    }

    if (addressValue === '' && addressValue !== null) {
      Vibration.vibrate(150);
      Toast.show('?????? ????????? ???????????????', { position: 0 });
      return false;
    } else if (!isAddressFunc(addressValue)) {
      Vibration.vibrate(150);
      Toast.show('?????? ????????? ???????????? ????????????\n?????? ??????????????????', {
        position: 0,
      });
      return false;
    } else {
      return true;
    }
  };

  const userGetNickMutationFunc = async () => {
    try {
      const valid = await addressValidate(addressValue); // 1. ?????? ?????? ????????? ?????? ??????
      if (valid) {
        const {
          data: { userGetNickname },
        } = await userGetNicknameMutation({
          variables: {
            address: addressValue,
          },
        });
        if (userGetNickname !== '') {
          setNickName(userGetNickname);
        } else {
          setNickName('');
        }
        handleModal();
      } else {
        setValidate(false);
      }
      //mutation
    } catch (error) {
      Vibration.vibrate(150);
      Toast.show('?????? ????????? ???????????? ????????????\n?????? ??????????????????', {
        position: 0,
      });
    }
  };

  const navigateFunc = () => {
    //????????? ???????????? ????????? && ???????????? ????????? ?????? ?????? -990?????? ???
    modalClose();

    setTimeout(() => {
      const transferData = {
        value: coinValue,
        receiver: addressValue,
      };
      transferDataReset();
      navigation.navigate('BioMetric', {
        routeName: 'Transfer',
        transferData,
      });
    }, 300);
  };

  const nickNameFindRealTime = async (val) => {
    if (val === '') {
      setListType('lately');
      setNameInput('');
    } else if (regHex.test(val)) {
      Toast.show('????????? ???????????? ?????? ??????', { position: 0 });
      setNameInput(val.replace(regHex, ''));
    } else {
      try {
        setNameInput(val);
        //????????? ??????
        const {
          data: { findUser },
        } = await findUserMutation({
          variables: {
            nickName: val,
          },
        });

        setFindUserArr(findUser);
        setListType('find');
      } catch (error) {
        Toast.show(
          '????????? ????????? ???????????? ????????????.\n?????? ??? ?????? ????????? ?????????',
          { position: 0 },
        );
      }
    }
  };

  const nickNameFind = async () => {
    if (nameInput === '') {
      setListType('lately');
    } else {
      try {
        //????????? ??????
        const {
          data: { findUser },
        } = await findUserMutation({
          variables: {
            nickName: nameInput,
          },
        });

        setFindUserArr(findUser);
        setListType('find');
      } catch (error) {
        Toast.show(
          '????????? ????????? ???????????? ????????????.\n?????? ??? ?????? ????????? ?????????',
          { position: 0 },
        );
      }
    }
  };

  useEffect(() => {
    if (qrAddress) {
      setAddressValue(qrAddress);
      setTimeout(() => {
        setValidate(true);
      }, 100);
    }
    const didFocusEventListener = navigation.addListener(
      'didFocus',
      (payload) => {
        if (payload.lastState.params.qrAddress) {
          setAddressValue(payload.lastState.params.qrAddress);
        }
      },
    );
    return () => {
      didFocusEventListener.remove();
    };
  }, []);

  useEffect(() => {
    if (nameInput === '') {
      setListType('lately');
    }
  }, [nameInput]);

  useEffect(() => {
    if (validate) {
      userGetNickMutationFunc();
    }
  }, [validate]);

  const renderLately = () => {
    if (listType === 'lately') {
      if (data === null || data.latelyUsers.length === 0) {
        return (
          <TextContainer>
            <RecentlyText color={theme.grayColor} fontSize={14}>
              ?????? ????????? ????????????
            </RecentlyText>
          </TextContainer>
        );
      } else {
        return (
          <>
            <FlatComponent
              style={{
                height: '42%',
              }}
            >
              <FlatList
                scrollIndicatorInsets={{ right: 1 }}
                legacyImplementation={true}
                removeClippedSubviews={true}
                scrollEnabled={true}
                nestedScrollEnabled={true} //ios????????? ??????????????? ??????????????? ??????????????? ?????????????????? ???????????? ?????? ???????????????
                data={data.latelyUsers}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <Touchable2
                    onPress={() => {
                      setAddressValue(item.address);
                      setValidate(true);
                    }}
                  >
                    <ListView>
                      {item.nickName && item.code ? (
                        <CustomText>
                          [{item.code}]{item.nickName}
                        </CustomText>
                      ) : item.nickName && !item.code ? (
                        <CustomText>[{item.nickName}]</CustomText>
                      ) : (
                        <CustomText fontSize={14}>
                          [{`${item.address.substring(0, 30)}...`}]
                        </CustomText>
                      )}
                    </ListView>
                  </Touchable2>
                )}
              />
            </FlatComponent>
          </>
        );
      }
    } else {
      return <></>;
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS == 'ios' ? Header.HEIGHT + 20 : 50}
      behavior={Platform.OS == 'ios' ? 'padding' : null}
      style={{ flex: 1 }}
    >
      <ScrollView
        scrollIndicatorInsets={{ right: 1 }}
        keyboardShouldPersistTaps={'handled'} //???????????? ????????? ???????????? input ????????????????????? ?????? props
        style={{ height: '100%' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Warpper>
              <RecieverBox>
                <CoinText>????????? ???(?????????)</CoinText>
                <NameInputBox
                  value={nameInput}
                  onChange={(val) => nickNameFindRealTime(val)}
                  returnKeyType="send" //props? ?????? ????????????
                  autoCorrect={false} //?????????
                  onSubmitEditing={nickNameFind}
                ></NameInputBox>

                {listType === 'find' && findUserArr.length > 0 ? (
                  <FlatComponent
                    style={{
                      height: '42%',
                    }}
                  >
                    <FlatList
                      legacyImplementation={true}
                      removeClippedSubviews={true}
                      nestedScrollEnabled={true} //ios????????? ??????????????? ??????????????? ??????????????? ?????????????????? ???????????? ?????? ???????????????
                      data={findUserArr}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={({ item }) => (
                        <Touchable2
                          onPress={() => {
                            setAddressValue(item.address);
                            setValidate(true);
                          }}
                        >
                          <ListView>
                            <CustomText>
                              [{item.code}]{item.nickName}
                            </CustomText>
                          </ListView>
                        </Touchable2>
                      )}
                    />
                  </FlatComponent>
                ) : null}
                <>
                  <CoinText>?????? ??????</CoinText>
                  {renderLately()}
                </>

                <CoinText marginTop={20}>?????? ??????</CoinText>
                <AddressInputBox
                  value={addressValue}
                  onChange={(val) => changeAddress(val)}
                  keyboardType="email-address"
                  returnKeyType="send" //props? ?????? ????????????
                  autoCorrect={false} //?????????
                  onSubmitEditing={() => setValidate(true)}
                />

                <Modal
                  isVisible={modalVisible}
                  onBackdropPress={() => modalClose()}
                >
                  <ModalWarpper>
                    <ModalView style={{ height: 300 }}>
                      <ModalImage
                        style={{
                          resizeMode: 'contain',
                          height: '17%',
                        }}
                        source={require('../../assets/front/pop_up_electrical_transmission_icon.png')}
                      />
                      <ModalTextContainer>
                        <ModalText
                          fontSize={15}
                          textAlign={'center'}
                          marginBottom={10}
                          marginTop={5}
                        >
                          ?????? ???????????????????
                        </ModalText>
                        {/* ??????????????? ????????? ?????? ?????? ????????? ?????? */}

                        {nickName !== '' ? (
                          <>
                            <ModalText
                              style={{
                                lineHeight: 18,
                              }}
                              fontSize={'14px'}
                            >
                              {`????????? : ${nickName}\n????????? : ${setComma(
                                coinValue,
                              )}KRWG\n
                            ????????? : ${
                              dailyFreeTransferCount > 0
                                ? `${dailyFreeTransferCount}??? ??????`
                                : `${charge}???`
                            }`}
                            </ModalText>
                          </>
                        ) : (
                          <>
                            <ModalText
                              style={{
                                lineHeight: 18,
                              }}
                              fontSize={'14px'}
                            >
                              {`???????????? : ${addressValue.substring(
                                0,
                                15,
                              )}...\n????????? : ${setComma(coinValue)}KRWG\n
                            ????????? : ${
                              dailyFreeTransferCount > 0
                                ? `${dailyFreeTransferCount}??? ??????`
                                : `${charge}???`
                            }`}
                            </ModalText>
                          </>
                        )}
                        <Underline />

                        <ModalText textAlign={'right'}>{`KRWG ?????? : ${setComma(
                          KRWG / 1000000 -
                            coinValue -
                            (dailyFreeTransferCount > 0 ? 0 : charge),
                        )}KRWG`}</ModalText>
                      </ModalTextContainer>
                      <ModalButtonContainer>
                        <ModalTouchable onPress={() => modalClose()}>
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
              </RecieverBox>
            </Warpper>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
      <BottomContainer>
        <ButtonContainerWarpper>
          <NextButtonContainer>
            <Touchable
              onPress={() => {
                setValidate(true);
              }}
            >
              <MainBGColor>
                <Container>
                  <ButtonText>?????? ?????? ??????</ButtonText>
                </Container>
              </MainBGColor>
            </Touchable>
          </NextButtonContainer>
        </ButtonContainerWarpper>
      </BottomContainer>
    </KeyboardAvoidingView>
  );
};
TransferSecond.propTypes = {
  data: PropTypes.any,
};
