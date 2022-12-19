# React-native sign-in with Twitter

---

**first of all Inatsll below Depandancy's**

```javascript
 npm install react-native-signin-with-twitter
 npm install react-native-login-twitter --save

 react-native link react-native-login-twitter
```

**Go to Twitter Apps to create your app so that you can obtain API key and secret, note:**

- Remember to set a Callback Url, whatever will work
- By default, Twitter won't allow you to grab user's email, so you have to apply for a permission for your app to retrieve user's email

**Here is how callbacks would look like:**
![](https://github.com/justjavac/react-native-login-twitter/blob/master/Example/img/callbacks.png?raw=true)

**From Twitter Kit 3.3, Fabric is no longer required.**

### Setup

---

Firstly, install the npm package:

    npm install react-native-login-twitter --save

or

      yarn add react-native-login-twitter

**iOS**

- Link RNTwitterSignIn.xcodeproj by running react-native link react-native-login-twitter
- Configure Info.Plist like below, replace`<consumerKey>`with your own key:

_// Info.plist_

    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>twitterkit-<consumerKey></string>
        </array>
      </dict>
    </array>
    <key>LSApplicationQueriesSchemes</key>
    <array>
        <string>twitter</string>
        <string>twitterauth</string>
    </array>

- Modify AppDelegate.m to #import <TwitterKit/TWTRKit.h> and handle openUrl

```
-(BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
  return [[Twitter sharedInstance] application:app openURL:url options:options];
}
```

- Add TwitterKit:

**With CocoaPods**

- Add TwitterKit to your Podfile

// Podfile
target 'MyApp' do
`# use_frameworks!`
`pod 'TwitterKit', '~> 3.3.0'`

end

- Run pod install

**Manually**

- Download TwitterKit 3.3 from here https://ton.twimg.com/syndication/twitterkit/ios/3.3.0/Twitter-Kit-iOS.zip
- Add TwitterKit, TwitterCore and 2 other bundle files into your root folder in Xcode
- In Build Phases → Link Binary with libraries add Twitter.framework and LibRBTwitterSignin.a

**Android**

_Run react-native link react-native-login-twitter, or:_

On Android, it will use Gradle so all you need to do is to point to the correct project location:

- In your ${project_dir}/android/settings.gradle add this:

`include ':react-native-login-twitter' project(':react-native-login-twitter').projectDir = new File(rootProject.projectDir,'../node_modules/react-native-login-twitter/android')`

- In your ${project_dir}/android/app/build.gradle add this:

`depedencies { ... compile project(':react-native-login-twitter') ... }`

- In you MainApplication.java makes use of the package as following:

```
		/**
       * A list of packages used by the app. If the app uses additional views
       * or modules besides the default ones, add more packages here.
       */

       @Override
       protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new FacebookLoginPackage(),
            new TwitterSigninPackage(),
            new RNGoogleSigninPackage(this),
            new VectorIconsPackage(),
            new RNSvgPackage()
          );
        }
```

_Keeps in mind that all the configure is for your build tools to recognise the files. So open your Xcode and Android Studio to try making builds and make sure they pass._

## Now Go to code Structure

**Import this line in your project**

> **import Google from 'react-native-signin-with-twitter';**

```javascript
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Twitter from "react-native-signin-with-twitter";

export default function App(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          Twitter(
            "TWITTER_COMSUMER_KEY",
            "TWITTER_CONSUMER_SECRET",
            //login or logout
            "login",
            //You will get particular data Like
            //userID,name,userName,authTokenSecret,email,authToken
            "userID",
            "name",
            "userName",
            "authTokenSecret",
            "email",
            "authToken"
          ).then((i) => {
            console.log("====================================");
            console.log("my Data", JSON.stringify(i, null, 4));
            console.log("====================================");
          });

          // you can also get all data using 'all_data'

          Twitter(
            "TWITTER_COMSUMER_KEY",
            "TWITTER_CONSUMER_SECRET",
            //login or logout
            "login",
            "all_data"
          ).then((i) => {
            console.log("====================================");
            console.log("my Data", JSON.stringify(i, null, 4));
            console.log("====================================");
          });
        }}
      >
        <Text style={styles.txt}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { marginTop: 20 }]}
        onPress={() => {
          Twitter(
            "TWITTER_COMSUMER_KEY",
            "TWITTER_CONSUMER_SECRET",
            //logout
            "logout"
          );
        }}
      >
        <Text style={styles.txt}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    height: 70,
    borderRadius: 15,
    backgroundColor: "darkorange",
  },
  txt: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
  },
});
```

###### Congrats 🙌 🎉! you have successfully implemented react-native-signin-with-twitter for your react native project.
