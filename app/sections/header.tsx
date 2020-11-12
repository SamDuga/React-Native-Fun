import React from 'react';
import { StyleSheet, Text, View, Platform, Image, AsyncStorage, Alert } from 'react-native';

interface HeaderState {
    isLoggedIn: boolean;
    loggedUser: string;
}

export class Header extends React.Component<any, HeaderState> {
    constructor(props) {
        super(props);
        this.state = { isLoggedIn: false, loggedUser: '' };
    }

    toggleUser = () => {
        if (this.state.isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', (err) => {
                if (!err) { 
                    this.setState({ isLoggedIn: false, loggedUser: '' }); 
                    Alert.alert('User logged out');
                }
            });
        }
        else this.props.navigate('LoginRT');
    }

    componentDidMount = () => {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if (result === 'none') console.log('None');
            else if (!result) {
                AsyncStorage.setItem('userLoggedIn', 'none', (err) => {
                    if (!err) console.log('User set to none');
                });
            }
            else if (err) Alert.alert('An unexpected error occoured');
            else {
                this.setState({isLoggedIn: true, loggedUser: result});
            }
        });
    }

    render() {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if (result !== 'none') {
                this.setState({isLoggedIn: true, loggedUser: result});
            }
        });

        const display = this.state.isLoggedIn ? this.state.loggedUser : 'Press to log in';
        return (
            <View style={styles.headStyle}>
                <Image style={styles.logoStyle}
                    source={require('./images/Varc_Logo.jpg')} />
                <Text style={styles.headText} onPress={this.toggleUser}>{display}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headText: {
        textAlign: 'right',
        color: '#ffffff',
        fontSize: 20
    },
    headStyle: {
        paddingTop: 30,
        paddingRight: 10,
        backgroundColor: Platform.OS == 'android' ? '#31e981' : '#35605a',
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#000000'
    },
    logoStyle: {
        flex: 2,
        height: undefined
    }
});