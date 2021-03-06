import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Switch } from 'react-native-switch';
import Toast from 'react-native-tiny-toast';
import AsyncStorage from '@react-native-community/async-storage';

import { basicState } from '../../recoil/recoilAtoms';
import { useRecoilState } from 'recoil';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backGroundColor};
`;

const Container = styled.View`
  height: 55px;
  justify-content: center;
  margin-left: 3%;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  margin-top: 2;
  background-color: ${(props) => props.theme.subColor};
  align-items: center;
  position: relative;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.borderBottomColor};
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.blackTextColor};
  font-size: 15px;
`;

const SwitchWrapper = styled.View`
  position: absolute;
  right: 20;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.whiteTextColor};
`;

const View = styled.View`
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const MainBGColor = styled.View`
  background-color: ${(props) =>
    props.BgColor ? props.BgColor : props.theme.mainColor};
  border-radius: 15;
  width: 50px;
  height: 30px;
`;

const AppLock = ({ theme }) => {
  //state
  const [bioMetricPossible, setBioMetricPossible] = useState(null);

  //recoil
  const [
    { useAuthenticationPossible, alreadyAuthenticatie, authType },
    setRecoilBasicState,
  ] = useRecoilState(basicState);

  //recoil setter func
  const changeAuthTypeFunc = async (type) => {
    if (type === 'bio') {
      await AsyncStorage.setItem('authType', type);
      return setRecoilBasicState((prev) => ({ ...prev, authType: type }));
    } else {
      await AsyncStorage.setItem('authType', type);
      return setRecoilBasicState((prev) => ({ ...prev, authType: type }));
    }
  };

  const getAsyncStorage = async () => {
    if (!useAuthenticationPossible) {
      setBioMetricPossible(false);
      Toast.show('??????????????? ???????????? ?????? ???????????????\nPIN?????? ???????????????', {
        position: 0,
      });
    } else if (
      useAuthenticationPossible &&
      alreadyAuthenticatie == 'BiometryLockout'
    ) {
      setBioMetricPossible(false);
      Toast.show('??????????????? ?????????????????????\nPIN?????? ???????????????', {
        position: 0,
      });
    } else if (
      useAuthenticationPossible &&
      alreadyAuthenticatie === 'BiometryIsAvailable'
    ) {
      setBioMetricPossible(true);
    } else if (
      useAuthenticationPossible &&
      alreadyAuthenticatie !== 'BiometryIsAvailable'
    ) {
      setBioMetricPossible(false);
      Toast.show('????????? ???????????? ?????? ???????????????\nPIN?????? ???????????????', {
        position: 0,
      });
    }
  };

  useEffect(() => {
    getAsyncStorage();
    return () => {
      Toast.show('????????? ???????????? ?????????????????????', { position: 0 });
    };
  }, []);

  const toggleSwitch = () => {
    if (authType !== 'bio') {
      //true
      changeAuthTypeFunc('bio');
    } else {
      changeAuthTypeFunc('pin');
    }
  };

  return (
    <>
      <Wrapper>
        <ButtonWrapper>
          <Container>
            <ButtonText>???????????? ????????????</ButtonText>
          </Container>
          <SwitchWrapper>
            <Switch
              value={authType && authType === 'bio' ? true : false}
              disabled={bioMetricPossible ? false : true}
              onValueChange={() => {
                toggleSwitch();
              }}
              backgroundActive={'#e2e2e2'}
              backgroundInactive={'#e2e2e2'}
              renderInsideCircle={() =>
                authType === 'bio' ? (
                  <MainBGColor>
                    <View>
                      <Text>{authType === 'bio' ? 'On' : 'Off'}</Text>
                    </View>
                  </MainBGColor>
                ) : (
                  <MainBGColor BgColor={theme.AppLockOffColor}>
                    <View>
                      <Text>{authType === 'bio' ? 'On' : 'Off'}</Text>
                    </View>
                  </MainBGColor>
                )
              }
            />
          </SwitchWrapper>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default withTheme(AppLock);
