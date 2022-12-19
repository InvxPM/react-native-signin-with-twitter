import { resolvePlugin } from "@babel/core";
import { NativeModules } from "react-native";

const { RNTwitterSignIn } = NativeModules;

var result;

const fun = (TWITTER_COMSUMER_KEY, TWITTER_CONSUMER_SECRET, event, ...item) => {
  return new Promise((resolve, reject) => {
    const Constants = {
      //Dev Parse keys
      TWITTER_COMSUMER_KEY: TWITTER_COMSUMER_KEY,
      TWITTER_CONSUMER_SECRET: TWITTER_CONSUMER_SECRET,
    };
    if (event == "login") {
      RNTwitterSignIn.logIn()
        .then((loginData) => {
          console.log("Login Successfully.....");
          // resolve(loginData);

          var v = [];

          item.map((i) => {
            v.push({ [i]: loginData[i] });
          });

          if (item == "all_data") {
            resolve(loginData);
          } else {
            resolve(v);
          }
          //     const {authToken, authTokenSecret} = loginData;
          //     if (authToken && authTokenSecret) {
          //       this.setState({
          //         isLoggedIn: true,
          //       });
          // }
        })
        .catch((error) => {
          console.log("Catch error");
          reject(error);
        });
    }
    if (event == "logout") {
      try {
        console.log("You are logout Successfully....");
        RNTwitterSignIn.logOut();
      } catch (error) {
        reject(e);
        console.error(error);
      }
    }
    return result;
  });
};

// (androidClientIdd) => GoogleSignin.configure({
//   androidClientId:androidClientIdd
//   // "695553260868-ljsid1jg4lvb8ecuekc2d3jh56divhe6.apps.googleusercontent.com",
//   // iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
// });

module.exports = fun;
