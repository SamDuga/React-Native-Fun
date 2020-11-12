import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, AsyncStorage } from 'react-native';

interface LoginProps {
    navigation;
    route;
}

interface LoginState {
    username: string;
    password: string;
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
    }

    cancelLogin = () => {
        Alert.alert('Login cancelled');
        this.props.navigation.navigate('HomeRT');
    }

    loginUser = () => {

        if (!this.state.username) Alert.alert('Please provide a user name');

        else if (!this.state.password) Alert.alert('Please provide a password');

        else {
            AsyncStorage.getItem('userLoggedIn', (err, result) => {

                if (result !== 'none') {
                    Alert.alert('Another user is already logged in');
                    this.props.navigation.navigate('HomeRT');
                }

                else {
                    AsyncStorage.getItem(this.state.username, (err, result) => {

                        if (result !== null) {
                            if (result !== this.state.password) Alert.alert('Incorrect password');
                            else {
                                AsyncStorage.setItem('userLoggedIn', this.state.username, (err) => {
                                    if (!err) {
                                        Alert.alert(`${this.state.username} sucessfully logged in`);
                                        this.props.navigation.navigate('HomeRT');
                                    }
                                });
                            }
                        }
                        else if (!result) Alert.alert('User does not currently exist');
                    });
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>

                <TextInput
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <Text style={styles.label}>Enter Username</Text>

                <TextInput
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>Enter Password</Text>

                <TouchableHighlight onPress={this.loginUser} underlayColor='#31e981'>
                    <Text style={styles.buttons}>
                        Login
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={this.cancelLogin} underlayColor='#31e981'>
                    <Text style={styles.buttons}>
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%',
        paddingTop: '10%'
    },
    heading: {
        fontSize: 16,
        flex: 1
    },
    inputs: {
        flex: 1,
        width: '80%',
        padding: 10,
        borderBottomWidth: 1
    },
    label: {
        paddingBottom: 10
    },
    buttons: {
        marginTop: 15,
        fontSize: 16
    }
});

