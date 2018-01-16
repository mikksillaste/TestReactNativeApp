/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// This enables Strict Mode, which adds improved error handling and disables some less-than-ideal
'use strict';

// StackNavigator enables your app to transition from one screen to another with the new screen being placed on top of a stack.
import {
    StackNavigator,
} from 'react-navigation';
import SearchPage from './SearchPage';

// This configures the SearchPage component as the initial component in the navigation stack.
const App = StackNavigator({
    Home: { screen: SearchPage },
});
export default App;


