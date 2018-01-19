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
import SearchResults from './SearchResults';

// This configures the SearchPage component as the initial component in the navigation stack.
// This adds a new route named Results to the navigator and registers SearchResults as the component that will handle this route.
// When a component is registered with a navigator, it gets a navigation prop added to it that can be used to manage screen transitions and pass in data.
const App = StackNavigator({
    Home: { screen: SearchPage },
    Results: { screen: SearchResults },
});
export default App;


