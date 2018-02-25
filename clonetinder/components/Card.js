import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class Card extends Component {
    render() {
        return (
            <View style={styles.card}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
