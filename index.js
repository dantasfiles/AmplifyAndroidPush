import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// AmplifyAndroidPush ADD THESE LINES
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

AppRegistry.registerComponent(appName, () => App);
