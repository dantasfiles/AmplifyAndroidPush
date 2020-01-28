import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {Auth, Analytics} from 'aws-amplify';

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

function HomeScreen(props) {
  // retrieve and print the endpoint id, for testing only
  const [endpointId, setEndpointId] = useState('');
  useEffect(() => {
    const myendpointId = Analytics.getPluggable('AWSPinpoint')._config
      .endpointId;
    console.log('endpointId', myendpointId);
    setEndpointId(myendpointId);
  }, []);
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
}

export default HomeScreen;

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
