import React, { useState, useCallback } from 'react';
import styled, { withTheme } from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { ScrollView, RefreshControl } from 'react-native';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import Toast from 'react-native-tiny-toast';
import PropTypes from 'prop-types';

const CenterImage = styled.Image`
  margin: 30px auto;
`;

const ImageContainer = styled.View`
  height: 55px;
  justify-content: center;
  margin-left: 3%;
`;

const Container = styled.View`
  height: 55px;
  justify-content: center;
  margin-left: 3%;
`;

const ButtonText = styled.Text`
  color: black;
`;

const TextHeader = styled.Text`
  color: ${(props) => (props.textColor ? props.theme.mainColor : 'black')};
  font-weight: bold;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '20px')};
`;

const TextWrapper = styled.Text`
  overflow: hidden;
  text-align: center;
  margin: 20px;
`;

const Text = styled.Text`
  color: black;
  text-align: center;
  font-size: 16px;
  margin: 10px;
`;

const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backGroundColor};
`;

const ButtonWrapper = styled.View`
  background-color: ${(props) =>
    props.bgColor ? props.theme.lightGray : props.theme.subColor};
  border-bottom-width: 1px;
  border-bottom-color: #dcdcdc;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  position: relative;
`;

const MiniTouchable = styled.TouchableOpacity`
  position: absolute;
  right: 5%;
  top: 30%;
`;

const MiniContainer = styled.View`
  width: 45;
  height: 25;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${(props) =>
    props.bgColor === 'SUCCESS'
      ? props.theme.mainColor
      : props.bgColor === 'FAIL'
      ? props.theme.redColor
      : props.theme.subColor};
  border-width: 1px;
  border-color: ${(props) =>
    props.bgColor === 'FAIL' ? '#ff6e6e' : '#105943'};
`;

const IS_AUTH_USER = gql`
  query isAuthUser {
    isAuthUser {
      bool
      status
    }
  }
`;

export default withTheme(({ navigation }) => {
  const { loading, data, error, refetch } = useQuery(IS_AUTH_USER);

  if (error) {
    return <Error navigation={navigation} route={'myInfo'} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!loading && !error) {
    return (
      <Certification
        data={data.isAuthUser}
        navigation={navigation}
        refetch={refetch}
      />
    );
  }
});
const Certification = ({ data, navigation, refetch }) => {
  const [refresh, setRefresh] = useState(false);
  const emailBtnFunc = () => {
    if (data.bool[0]) {
      return Toast.show('?????? ?????????????????????', { position: 0 });
    } else {
      return navigation.navigate('EmailAuth');
    }
  };

  const phoneBtnFunc = () => {
    if (data.bool[1]) {
      return Toast.show('?????? ?????????????????????', { position: 0 });
    } else if (!data.bool[0]) {
      return Toast.show('????????? ????????? ?????? ??????????????????', {
        position: 0,
      });
    } else {
      return navigation.navigate('PhoneAuth');
    }
  };

  const identifyBtnFunc = () => {
    if (data.status === 'SUCCESS') {
      return Toast.show('?????? ?????????????????????', { position: 0 });
    } else if (data.status === 'WAIT') {
      return Toast.show('????????? ??????????????????', { position: 0 });
    } else if (!data.bool[0] || !data.bool[1]) {
      return Toast.show('?????????,????????? ????????? ?????? ??????????????????', {
        position: 0,
      });
    } else {
      return navigation.navigate('IdentifyAuth');
    }
  };

  const onRefresh = useCallback(async () => {
    try {
      setRefresh(true);
      await refetch();
    } catch (e) {
      console.log(e);
      Toast.show('???????????????\n??????????????????', {
        position: 0,
      });
    } finally {
      setRefresh(false);
    }
  }, []);

  return (
    <>
      <Wrapper>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          scrollIndicatorInsets={{ right: 1 }}
          style={{ height: '100%' }}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        >
          <TextWrapper>
            <TextHeader
              numberOfLines={1}
              ellipsizeMode="tail"
            >{`???????????? ?????? ?????? ??????`}</TextHeader>
            <TextHeader
              textColor={true}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{`  ??????${
              data.bool.lastIndexOf(true) + 1 === 2 && data.status === 'SUCCESS'
                ? 3
                : data.bool.lastIndexOf(true) + 1
            }`}</TextHeader>
          </TextWrapper>
          <Text>
            {data.bool.every((item) => {
              return item;
            })
              ? '?????? ????????? ?????????????????????.\n?????? ?????? ?????? ???????????? ???????????? ??? ????????????.'
              : `????????? ??????(KRWG)??? ??????, ?????? ??? ??????\n????????? ?????? ????????? ??????????????? ?????????.`}
          </Text>
          <CenterImage
            style={{
              resizeMode: 'contain',
            }}
            source={require('../../assets/front/certification_icon.png')}
          />
          <ButtonWrapper bgColor={data.bool[0]}>
            <Touchable
              onPress={() => {
                emailBtnFunc();
              }}
            >
              <ImageContainer>
                <TextHeader
                  textColor={true}
                  fontSize={16}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >{` ??????1`}</TextHeader>
              </ImageContainer>
              <Container>
                <ButtonText>????????? ??????</ButtonText>
              </Container>
              <MiniTouchable
                onPress={() => {
                  emailBtnFunc();
                }}
              >
                <MiniContainer bgColor={data.bool[0] ? 'SUCCESS' : null}>
                  <ButtonText
                    style={{
                      color: data.bool[0] ? '#ffffff' : '#105943',
                    }}
                  >
                    {data.bool[0] ? '??????' : '??????'}
                  </ButtonText>
                </MiniContainer>
              </MiniTouchable>
            </Touchable>
          </ButtonWrapper>
          <ButtonWrapper bgColor={data.bool[1]}>
            <Touchable
              onPress={() => {
                phoneBtnFunc();
              }}
            >
              <ImageContainer>
                <TextHeader
                  textColor={true}
                  fontSize={16}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >{` ??????2`}</TextHeader>
              </ImageContainer>
              <Container>
                <ButtonText>????????? ????????????</ButtonText>
              </Container>
              <MiniTouchable
                onPress={() => {
                  phoneBtnFunc();
                }}
              >
                <MiniContainer bgColor={data.bool[1] ? 'SUCCESS' : null}>
                  <ButtonText
                    style={{
                      color: data.bool[1] ? '#ffffff' : '#105943',
                    }}
                  >
                    {data.bool[1] ? '??????' : '??????'}
                  </ButtonText>
                </MiniContainer>
              </MiniTouchable>
            </Touchable>
          </ButtonWrapper>

          <ButtonWrapper bgColor={data.status === 'SUCCESS' ? true : false}>
            <Touchable
              onPress={() => {
                identifyBtnFunc();
              }}
            >
              <ImageContainer>
                <TextHeader
                  textColor={true}
                  fontSize={16}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >{` ??????3`}</TextHeader>
              </ImageContainer>
              <Container>
                <ButtonText>????????? ??????</ButtonText>
              </Container>
              <MiniTouchable
                onPress={() => {
                  identifyBtnFunc();
                }}
              >
                <MiniContainer bgColor={data.status}>
                  <ButtonText
                    style={{
                      color:
                        data.status === 'SUCCESS' || data.status === 'FAIL'
                          ? '#ffffff'
                          : '#105943',
                    }}
                  >
                    {data.status === 'NOAPPLY'
                      ? '??????'
                      : data.status === 'WAIT'
                      ? '?????????'
                      : data.status === 'FAIL'
                      ? '?????????'
                      : '??????'}
                  </ButtonText>
                </MiniContainer>
              </MiniTouchable>
            </Touchable>
          </ButtonWrapper>
        </ScrollView>
      </Wrapper>
    </>
  );
};
Certification.propTypes = {
  data: PropTypes.any,
};
