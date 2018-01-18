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

//urlForQueryAndPage doesn’t depend on SearchPage, so it’s implemented as a free function rather than a method. It first creates the query string based on the parameters in data.
// Then it transforms the data into name=value pairs separated by ampersands. Finally, it calls the Nestoria API to return the property listings.
function urlForQueryAndPage(key, value, pageNumber) {
    const data = {
        country: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber,
    };
    data[key] = value;

    const querystring = Object.keys(data)
        .map(key => key + '=' + encodeURIComponent(data[key]))
        .join('&');

    return 'https://api.nestoria.co.uk/api?' + querystring;
}

export default class SearchPage extends Component<{}> {
    static navigationOptions = {
        title: 'Property Finder',
    };
    // state variable, with searchString set to an initial value of london
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            // The new isLoading property will keep track of whether a query is in progress.
            isLoading: false,
            message: '',
        };
    }
    //will eventually run the query, but for now it simply logs a message to the console and sets isLoading appropriately so the UI can show the new state.
    _executeQuery = (query) => {
        console.log(query);
        this.setState({ isLoading: true });
        //This makes use of the fetch function, which is part of the Fetch API. The asynchronous response is returned as a Promise.
        // The success path calls _handleResponse which you’ll define next, to parse the JSON response.
        fetch(query)
            .then(response => response.json())
            .then(json => this._handleResponse(json.response))
            .catch(error =>
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                }));
    };

    _handleResponse = (response) => {
        this.setState({ isLoading: false , message: '' });
        if (response.application_response_code.substr(0, 1) === '1') {
            console.log('Properties found: ' + response.listings.length);
        } else {
            this.setState({ message: 'Location not recognized; please try again.'});
        }
    };

    //configures and initiates the search query. This should kick off when the Go button is pressed.
    _onSearchPressed = () => {
        const query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._executeQuery(query);
    };
// render is a great demonstration of JSX and the structure it provides. Along with the style, you can very easily visualize the UI constructed by this component: a container with two text labels.
    render() {
        //This is a ternary if statement that optionally adds an activity indicator, depending on the component’s isLoading state.
        const spinner = this.state.isLoading ?
            <ActivityIndicator size='large'/> : null;

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
                        onPress={this._onSearchPressed}
                        color='#48BBEC'
                        title='Go'
                    />
                </View>
                <Image source={require('./Resources/house.png')} style={styles.image}/>
                {/*add the following line below the Image to place the spinner*/}
                {spinner}
                {/*You’ll use this to display a range of messages to the user.*/}
                <Text style={styles.description}>{this.state.message}</Text>
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