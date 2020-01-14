import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

import {withAuthenticator} from 'aws-amplify-react-native';
import PushNotification from '@aws-amplify/pushnotification';
import {Auth, Analytics} from 'aws-amplify';

async function associateEndpointWithUser(setEndpointId, setUserId) {
  // retrieve and print the endpoint id, for testing only
  const endpointId = Analytics.getPluggable('AWSPinpoint')._config.endpointId;
  console.log('endpointId', endpointId);
  setEndpointId(endpointId);

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
  // set up the push notification callback functions
  useEffect(() => {
    PushNotification.onRegister(token => {
      console.log('onRegister ', token);
    });
    PushNotification.onNotification(notification => {
      console.log('onNotification ', notification);
      // iOS only
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    });
    PushNotification.onNotificationOpened(notification => {
      console.log('onNotificationOpened', notification);
    });
  }, []);

  // associate the device endpoint with the user
  const [endpointId, setEndpointId] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    associateEndpointWithUser(setEndpointId, setUserId);
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
