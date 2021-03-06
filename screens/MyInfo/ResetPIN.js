// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Keyboard,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Vibration,
//   ActivityIndicator,
//   StyleSheet,
// } from 'react-native';
// import '../../shim';
// import AsyncStorage from "@react-native-community/async-storage";
// import { ethers } from 'ethers';
// import styled, { withTheme } from 'styled-components';
// import SecureStorage from 'react-native-secure-storage';
// import constants from '../../constants';
// import Toast from 'react-native-tiny-toast';
// import { hexAddressToBase58 } from "../../Web3Connecter";
// import { Header } from 'react-navigation-stack';

// const style = StyleSheet.create({
//   activeInput: {
//     borderWidth: 1,
//     borderColor: '#105943',
//   },
//   inActiveInput: {
//     borderWidth: 1,
//     borderColor: '#BBB',
//   },
// });

// const Textone = styled.Text`
//   color: ${props => (props.color ? props.color : props.theme.blackTextColor)};
//   font-size: ${props => (props.fontSize ? props.fontSize : 17)};
//   text-align: ${props =>
//     props.textAlignVertical ? props.textAlignVertical : 'center'};
//   margin-top: ${props => (props.marginTop ? props.marginTop : '3%')};
//   margin-bottom: ${props => (props.marginBottom ? props.marginBottom : 0)};
//   font-weight: ${props => (props.fontWeight ? props.fontWeight : 'normal')};
// `;

// const Texttwo = styled.Text`
//   color: ${props => props.theme.lightGrayColor};
//   text-align: center;
//   font-size: 12px;
//   margin-bottom: 5%;
// `;

// const Wrapper = styled.View`
//   width: 100%;
//   height: 100%;
//   align-items: center;
//   background-color: ${props => props.theme.backGroundColor};
// `;

// const MnemonicWrapperColumn = styled.View`
//   flex: 1;
//   flex-direction: column;
// `;

// const MnemonicWrapperRow = styled.View`
//   height: 18%;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
// `;

// const MnemonicBox = styled.View`
//   justify-content: center;
//   flex: 1;
//   height: 80%;
//   margin: 5px;
//   padding: 5px 2px;
//   border-radius: 5px;
//   background-color: ${props => props.theme.subColor};
//   border-width: 1px;
// `;

// const TextInput = styled.TextInput`
//   color: ${props => props.theme.mainColor};
//   text-align: center;
// `;

// const WrapperView = styled.View`
//   width: ${constants.width * 0.95};
//   flex: 1;
//   height: 100%;
//   justify-content: flex-end;
//   margin-bottom: 2%;
// `;

// const Container = styled.View`
//   align-items: center;
//   justify-content: center;
//   height: 55px;
//   width: ${constants.width};
// `;

// const ImageContainer = styled.View`
//   height: ${constants.height / 4};
// `;

// const Image = styled.Image`
//   height: ${constants.height / 5};
//   margin: 0 auto;
//   padding: 20px;
// `;

// const ButtonText = styled.Text`
//   color: ${props => props.theme.whiteTextColor};
//   text-align: center;
//   font-size: 17px;
// `;

// const Touchable = styled.TouchableOpacity`
//   margin-top: 2%;
// `;

// const MainBGColor = styled.View`
//   background-color: ${props => props.theme.mainColor};
// `;

// const ResetPIN = ({ theme, navigation }) => {
//   // ???????????? ??????
//   // 1. ?????? Loading??? AsyncStorage?????? wallet?????? ???????????? (secure??? ?????????)
//   // 2. ????????? 12????????? ????????????. (?????? ?????? 0~10??? input??? ???????????? ????????????) ???????????? ?????? ???????????? ???????????? ??????
//   // 3. ???????????? ???????????? ????????? disable?????? ???????????? ????????????
//   // 4. ???????????? input?????? ????????? ?????? ??????(??????????????? ?????????)??? 1?????? ????????? ??????
//   // 5. ????????? PIN ????????? ??????????????? ??????
//   // 6. ????????? Toast ????????? ??????
//   const [myWalletAddress, setMyWalletAddress] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const inputRefs = useRef([]);
//   //????????? state??? ?????????????????? ??? ????????????
//   const [mnemonicValue, setMnemonicValue] = useState([
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
//   ]);
//   const [columnValue] = useState([0, 3, 6, 9]);
//   const [rowValue] = useState([0, 1, 2]);
//   const getAsyncStorage = async () => {
//     const walletStr = await AsyncStorage.getItem('WALLETS');
//     const wallet = JSON.parse(walletStr);
//     setMyWalletAddress(wallet.address);
//   };
//   useEffect(() => {
//     getAsyncStorage();
//   }, []);

//   const eng = /^[a-zA-Z]*$/;

//   const changeMnemonicValue = (idx, text) => {
//     if (eng.test(text)) {
//       setMnemonicValue(
//         mnemonicValue.map((_, index) => {
//           if (index === idx) {
//             return (mnemonicValue[idx] = text);
//           } else {
//             return mnemonicValue[index];
//           }
//         }),
//       );
//     } else {
//       Toast.show('????????? ?????? ???????????????', { position: 0 });
//       return false;
//     }
//   };

//   const mnemonicValueConcat = async () => {
//     // ?????? ??????????????? ????????? wallet??? address??? AsyncStorage??? address??? ?????????
//     let mnemonicString = '';

//     try {
//       mnemonicValue.forEach((item, idx) => {
//         if (idx === mnemonicValue.length) {
//           mnemonicString += item.replace(/\s/g, '');
//         } else {
//           mnemonicString += item.replace(/\s/g, '') + ' ';
//         }
//       });
//       mnemonicString = mnemonicString.toLowerCase().trim();
//       console.log(mnemonicString);
//       // setTimeout(() => {
//       const { address : etherAddress } = ethers.Wallet.fromMnemonic(mnemonicString);
//       const address = await hexAddressToBase58(etherAddress);
//       if (myWalletAddress === address) {
//         Toast.show('PIN????????? ??????????????????', { position: 0 });
//         //PIN??? null??? ????????? ???, BioMetric ??????????????? ???????????? ??????????
//         await SecureStorage.setItem('PINcode', '');
//         await AsyncStorage.setItem('authType', 'pin');
//         // setTimeout(() => {
//         navigation.navigate('BioMetric', { routeName: 'ResetPIN' });
//         // }, 300);
//       } else {
//         //Toast ?????????
//         Toast.show('????????? ????????? ???????????? ????????????.\n?????? ??????????????????', {
//           position: 0,
//         });
//       }
//       // }, 0);
//     } catch (e) {
//       Vibration.vibrate(200);
//       Toast.show('????????? ????????? ??????????????????.\n?????? ??? ?????? ??????????????????', {
//         position: 0,
//       });
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const nextFocus = idx => {
//     // console.log("idx : ", idx);
//     inputRefs.current[idx + 1].focus();
//   };

//   return (
//     <KeyboardAvoidingView
//       keyboardVerticalOffset={Platform.OS == "ios" ? Header.HEIGHT + 20 : 0 }
//       behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
//       <Wrapper>
//         <WrapperView>
//           <Textone>{`????????? ????????? ??????????????????`}</Textone>
//           <Texttwo>{`????????? ??????, PIN????????? ????????? ??? ??? ????????????.`}</Texttwo>
//           <ImageContainer>
//             <Image
//               style={{ resizeMode: 'contain' }}
//               source={require('../../assets/front/reset_pin_number_img.png')}
//             />
//           </ImageContainer>

//           {/* 12?????? ????????? ????????? ???????????? ???????????? ????????? box??? ????????? ???
//           <TextInputContainer>
//             <NemonicInput
//               multiline
//               textAlignVertical="top"
//               keyboardType="email-address"
//               value={inputValue}
//               onChangeText={v => setInputValue(v)}
//               placeholder={"  ????????? ????????? ??????????????????"}
//             />
//           </TextInputContainer> */}
//           <Textone
//             color={theme.blackTextColor}
//             fontSize={13}
//             marginTop={'5%'}
//             marginBottom={'2%'}
//             textAlignVertical={'left'}
//             fontWeight={'bold'}
//           >{`????????? ?????? ??????`}</Textone>
//           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <MnemonicWrapperColumn>
//               {columnValue.map(item => {
//                 return (
//                   <MnemonicWrapperRow key={item}>
//                     {rowValue.map(idx => {
//                       if (idx + item === 11) {
//                         return (
//                           <MnemonicBox
//                             key={idx + item}
//                             style={
//                               mnemonicValue[idx + item] === ''
//                                 ? style.inActiveInput
//                                 : style.activeInput
//                             }
//                           >
//                             <TextInput
//                               value={mnemonicValue[idx + item]}
//                               onChangeText={text =>
//                                 changeMnemonicValue(idx + item, text)
//                               }
//                               ref={el => (inputRefs.current[idx + item] = el)}
//                               returnKeyType="done"
//                               onSubmitEditing={() => {
//                                 setIsLoading(true);
//                                 setTimeout(() => {
//                                   mnemonicValueConcat();
//                                 }, 10);
//                               }}
//                             ></TextInput>
//                           </MnemonicBox>
//                         );
//                       } else {
//                         return (
//                           <MnemonicBox
//                             key={idx + item}
//                             style={
//                               mnemonicValue[idx + item] === ''
//                                 ? style.inActiveInput
//                                 : style.activeInput
//                             }
//                           >
//                             <TextInput
//                               value={mnemonicValue[idx + item]}
//                               onChangeText={text =>
//                                 changeMnemonicValue(idx + item, text)
//                               }
//                               blurOnSubmit={false} // ref focus??? ???????????? ???????????? ???????????? ??????
//                               returnKeyType="next"
//                               ref={el => (inputRefs.current[idx + item] = el)}
//                               onSubmitEditing={() => nextFocus(idx + item)}
//                             ></TextInput>
//                           </MnemonicBox>
//                         );
//                       }
//                     })}
//                   </MnemonicWrapperRow>
//                 );
//               })}
//             </MnemonicWrapperColumn>
//           </TouchableWithoutFeedback>
//         </WrapperView>
//         <Touchable
//           // disabled={isLoading}
//           onPress={() => {
//             setIsLoading(true);
//             setTimeout(() => {
//               mnemonicValueConcat();
//             }, 1);
//           }}
//         >
//           <MainBGColor>
//             <Container>
//               {isLoading ? (
//                 <ActivityIndicator
//                   size="large"
//                   color={theme.activityIndicatorColor}
//                 />
//               ) : (
//                 <ButtonText>??????</ButtonText>
//               )}
//             </Container>
//           </MainBGColor>
//         </Touchable>
//       </Wrapper>
//       {/* </ScrollView> */}
//     </KeyboardAvoidingView>
//   );
// };

// export default withTheme(ResetPIN);
