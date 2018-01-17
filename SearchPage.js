'use strict';

// This imports the modules you’ll need to build the UI.
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    ActivityIndicator,
    Image,
} from 'react-native';

export default class SearchPage extends Component<{}> {
    static navigationOptions = {
        title: 'Property Finder',
    };
    // state variable, with searchString set to an initial value of london
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london'
        };
    }
    // This defines a function using the => syntax. This is an arrow function, another recent addition to the JavaScript language that provides a succinct syntax for creating anonymous functions.
    // The function takes the value from the native browser event’s text property and uses it to update the component’s state. It also adds some logging code that will make sense shortly.
    _onSearchTextChanged = (event) => {
        console.log('_onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log('Current: '+this.state.searchString+', Next: '+event.nativeEvent.text);
    };
// render is a great demonstration of JSX and the structure it provides. Along with the style, you can very easily visualize the UI constructed by this component: a container with two text labels.
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place-name or postcode.
                </Text>
                {/*view that holds a text input and a button*/}
                <View style={styles.flowRight}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        style={styles.searchInput}
                        placeholder='Search via name or postcode'/>
                    <Button
                        onPress={() => {}}
                        color='#48BBEC'
                        title='Go'  
                    />
                </View>
                <Image source={require('./Resources/house.png')} style={styles.image}/>
            </View>
        );
    }
}
// styles
const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    // set the placement of the text input and button
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flexGrow: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },
    image: {
        width: 217,
        height: 138,
    },
});