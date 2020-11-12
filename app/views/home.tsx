import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Header } from '../sections/header';
import {  Menu } from '../sections/menu';

interface HomeProps {
    navigation;
}

interface HomeState {
    placeholder;
}

export class Home extends React.Component<HomeProps, HomeState> { 
    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Header navigate={navigate}/>
                <Text style={{flex: 8}}>Homepage for text</Text>
                <Text style={{flex: 6}}>This is another line</Text>
                <Menu navigate={navigate}></Menu>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});