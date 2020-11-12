import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Header } from '../sections/header';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ContactProps {
    navigation: any
}

interface ContactState {
    msg: string,
    name: string,
    email: string
}

export class Contact extends React.Component<ContactProps, ContactState> {
    constructor(props) {
        super(props);
        this.state = {
            msg: 'Enter Message',
            name: 'Enter Name',
            email: 'Enter Email Address'
        };
    }

    clearFields = () => this.setState({ msg: '', name: '', email: '' });

    sendMessage = () => {
        Alert.alert(this.state.name, this.state.msg);
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <Text style={styles.heading}>
                    Contact us
                </Text>

                <TextInput
                    style={styles.inputs}
                    onChangeText={(text: string) => this.setState({ name: text })}
                    value={this.state.name}
                />

                <TextInput
                    style={styles.multiInput}
                    onChangeText={(text: string) => this.setState({ msg: text })}
                    value={this.state.msg}
                    multiline={true}
                    numberOfLines={4}
                />

                <TextInput
                    style={styles.inputs}
                    onChangeText={(text: string) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TouchableOpacity style={styles.buttonStyles}onPress={this.sendMessage} >
                    <Text style={styles.buttonText}>
                        Send Message
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyles} onPress={this.clearFields} >
                    <Text style={styles.buttonText}>
                        Reset Form
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '45%'
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
    multiInput: {
        flex: 2,
        width: '90%',
        paddingTop: 20,
        borderBottomWidth: 1
    },
    buttonStyles: {
        marginTop: 40,
        backgroundColor: '#35605a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18
    }
});