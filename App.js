import React from 'react';
import {withAuthenticator} from 'aws-amplify-react-native';
import PushNotification from '@aws-amplify/pushnotification';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './src/NavigationService';
import HomeScreen from './src/HomeScreen';
import NotificationScreen from './src/NotificationScreen';

// set up the push notification callback functions
PushNotification.onRegister(token => {
  console.log('onRegister', token);
});
PushNotification.onNotification(notification => {
  console.log('onNotification', notification);
  const data = JSON.parse(notification.data['pinpoint.jsonBody']);
  const screen = data.screen;
  NavigationService.navigate(screen, {data});
  // iOS only
  // notification.finish(PushNotificationIOS.FetchResult.NoData);
});
PushNotification.onNotificationOpened(notification => {
  console.log('onNotificationOpened', notification);
  // const data = JSON.parse(notification['pinpoint.jsonBody']);
  // const screen = data.screen;
  // NavigationService.navigate(screen, {data});
});

// Main Application Navigation Structure
const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {},
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Notification: {
      screen: NotificationScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

const App = withAuthenticator(() => {
  return (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
});

export default App;
