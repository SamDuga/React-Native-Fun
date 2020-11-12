import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

interface FinishProps {
    navigation;
    route;
}

export class Finish extends React.Component<FinishProps> {

    exitQuiz = () => {
        this.props.navigation.navigate('HomeRT');
    }

    render() {
        const { score, missed, questions } = this.props.route.params;

        return (
            <View style={styles.container}>
                <Text>Your quiz score was {score}</Text>
                <Text>You missed {missed} out of {questions} questions</Text>

                <TouchableHighlight onPress={this.exitQuiz} style={styles.button}>
                    <Text>Finish Quiz</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%'
    }
});