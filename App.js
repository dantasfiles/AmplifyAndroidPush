import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {withAuthenticator} from 'aws-amplify-react-native';
import PushNotification from '@aws-amplify/pushnotification';
import {Auth, Analytics} from 'aws-amplify';

// set up the push notification callback functions
PushNotification.onRegister(token => {
  console.log('onRegister', token);
});
PushNotification.onNotification(notification => {
  if (notification.foreground) {
    console.log('onNotification foreground', notification);
  } else {
    console.log('onNotification background or closed', notification);
  }
  // extract the data passed in the push notification
  const data = JSON.parse(notification.data['pinpoint.jsonBody']);
  console.log('onNotification data', data);
  // iOS only
  // notification.finish(PushNotificationIOS.FetchResult.NoData);
});
PushNotification.onNotificationOpened(notification => {
  console.log('onNotificationOpened', notification);
  // extract the data passed in the push notification
  const data = JSON.parse(notification['pinpoint.jsonBody']);
  console.log('onNotificationOpened data', data);
});

async function associateEndpointWithUser(setUserId) {
  // retrieve and print the unique internal userid
  const {
    attributes: {sub},
  } = await Auth.currentUserInfo();
  console.log('userId', sub);
  setUserId(sub);

  // associate the device endpoint with the user
  Analytics.updateEndpoint({userId: sub});
}

const App = withAuthenticator(() => {
  // retrieve and print the endpoint id, for testing only
  const [endpointId, setEndpointId] = useState('');
  useEffect(() => {
    const myendpointId = Analytics.getPluggable('AWSPinpoint')._config
      .endpointId;
    console.log('endpointId', myendpointId);
    setEndpointId(myendpointId);
  }, []);

  // associate the device endpoint with the user
  const [userId, setUserId] = useState('');
  useEffect(() => {
    associateEndpointWithUser(setUserId);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            AWS Amplify Android Push Notification Example
          </Text>
          <Text style={styles.sectionDescription}>
            Your endpointId is {endpointId}
          </Text>
          <Text style={styles.sectionDescription}>Your userId is {userId}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});

export default App;
