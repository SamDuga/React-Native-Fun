import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import { QuizQuestions, QuestionData } from '../data/QuizQuestions';
import { Question } from '../sections/questions';

interface QuizProps {
    navigation;
}

interface QuizState {
    questionList: QuestionData[];
    numberOfQuestions: number;
    incorrect: number;
    questionAnswered: number;
    questionLoaded: boolean;
    totalScore: number;
    completedQuiz: boolean;
}

export class Quiz extends React.Component<QuizProps, QuizState> {
    constructor(props) {
        super(props);
        this.state = {
            questionList: [],
            numberOfQuestions: 0,
            incorrect: 0,
            questionAnswered: 0,
            questionLoaded: false,
            totalScore: 100,
            completedQuiz: false
        };
    }

    componentDidMount = () => {
        const numQuestions = Array.from(QuizQuestions).length;
        this.setState({
            questionList: Array.from(QuizQuestions),
            questionLoaded: true,
            numberOfQuestions: numQuestions,
            incorrect: 0,
            questionAnswered: 0
        });
    }

    updateScore = (penalty: number) => {
        const tempScore = this.state.totalScore;
        const missed = this.state.incorrect;
        const questionsTotal = this.state.numberOfQuestions;
        const questionsDone = this.state.questionAnswered;

        const newScore = tempScore - penalty;
        const totalAnswered = questionsDone + 1;
        const totalMissed = penalty ? missed + 1 : missed;

        this.setState({
            totalScore: newScore,
            incorrect: totalMissed,
            questionAnswered: totalAnswered
        });

        if (totalAnswered === questionsTotal) this.setState({ completedQuiz: true });
    }

    finishQuiz = () => {
        this.props.navigation.navigate(
            'FinishRT', {
                score: this.state.totalScore,
                missed: this.state.incorrect,
                questions: this.state.numberOfQuestions
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.questionLoaded && (
                    <FlatList
                        data={this.state.questionList}
                        renderItem={({ item }) =>
                            <Question
                                question={item.question}
                                answer1={item.answer1}
                                answer2={item.answer2}
                                answer3={item.answer3}
                                answer4={item.answer4}
                                correctAnswer={item.correctAnswer}
                                scoreUpdate={this.updateScore}
                            />
                        }
                    />
                )}

                {!this.state.completedQuiz && (
                    <TouchableHighlight style={styles.disabled}>
                        <Text>Please answer all the questions</Text>
                    </TouchableHighlight>
                )}

                {this.state.completedQuiz && (
                    <TouchableHighlight onPress={this.finishQuiz} style={styles.enabled}>
                        <Text>Finished</Text>
                    </TouchableHighlight>
                )}

                {!this.state.questionLoaded && (
                    <Text>Loading</Text>
                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    disabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d3d3d3',
        height: '10%'
    },
    enabled: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#90ee90',
        height: '10%'
    }
});