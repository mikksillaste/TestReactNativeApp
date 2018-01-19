'use strict';

import React, { Component } from 'react'
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';

// This manipulates the returned price, which is in the format 300,000 GBP, to remove the GBP suffix. Then it renders the row UI using techniques that you are by now quite familiar with.
// Of note, an Image is added to the row and is loaded from a returned URL (item.img_url) which React Native decodes off the main thread.
// You may have noticed that this component extends React.PureComponent. React re-renders a Component if its props or state changes. React only re-renders a
// PureComponent if a shallow compare of the state and props shows changes.
// Used under the right conditions, this can give your app a performance boost.
class ListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.index);
    }

    render() {
        const item = this.props.item;
        const price = item.price_formatted.split(' ')[0];
        return (
            <TouchableHighlight
                onPress={this._onPress}
                underlayColor='#dddddd'>
                <View>
                    <View style={styles.rowContainer}>
                        <Image style={styles.thumb} source={{ uri: item.img_url }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.price}>{price}</Text>
                            <Text style={styles.title}
                                  numberOfLines={1}>{item.title}</Text>
                        </View>
                    </View>
                    <View style={styles.separator}/>
                </View>
            </TouchableHighlight>
        );
    }
}

//This makes use of a more specialized component — FlatList — which displays rows of data within a scrolling container, similar to RecyclerView.
//data provides the data to display
//keyExtractor provides a unique key that React uses for efficient list item management
//renderItem specifies how the UI is rendered for each row
// _onPressItem is passed into ListItem to handle a row selection. This design pattern is equivalent to a callback.
// In this callback, the index for the selected row is logged.
export default class SearchResults extends Component {
    static navigationOptions = {
        title: 'Results',
    };

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => (
        <ListItem
            item={item}
            index={index}
            onPressItem={this._onPressItem}
        />
    );

    _onPressItem = (index) => {
        console.log("Pressed row: "+index);
    };

    render() {
        const { params } = this.props.navigation.state;
        return (
            <FlatList
                data={params.listings}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

// This defines all the styles that you are going to use to render each row.
const styles = StyleSheet.create({
    thumb: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
});