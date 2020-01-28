import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';

function NotificationScreen(props) {
  const data = props.navigation.state.params.data;
  console.log('NotificationScreen data', data);
  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Push Notification Received</Text>
          <Text style={styles.sectionDescription}>
            Your push notification data is {JSON.stringify(data)}
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Button
            title="Acknowledge Push Notification"
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default NotificationScreen;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});
