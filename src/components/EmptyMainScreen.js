import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default class EmptyMainScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.emptyIconContainer}></View>
                <View style={styles.emptyTextContainer}>
                    <Text style={styles.emptyHeaderText}>У вас нет ни одного списка покупок</Text>
                    <Text style={styles.emptyExplanationText}>Создайте новый список, он отобразится здесь</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    emptyIconContainer: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'red',
    },
    emptyTextContainer: {
        margin: 23,
        alignItems: 'center',
    },
    emptyHeaderText: {
        fontSize: 24,
        textAlign: 'center',
    },
    emptyExplanationText: {
        marginTop: 7,
        fontSize: 19,
        textAlign: 'center',
    },

});