import React from 'react';

import { Home } from './app/views/home';

import { Contact } from './app/views/contact';

import { Video } from './app/views/video';
import { VideoDetail } from './app/views/videoDetail';

import { Register } from './app/views/register';
import { Login } from './app/views/login';

import { Quiz } from './app/views/quiz';
import { Finish } from './app/views/quizFinish';

import { About } from './app/views/about';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class NavStack extends React.Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#621FF7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
                initialRouteName='Home'
                headerMode='none'>
                <Stack.Screen
                    name='HomeRT'
                    component={Home}
                    options={{ title: 'HomeRT' }} />
                <Stack.Screen
                    name='ContactRT'
                    component={Contact}
                    options={{ title: 'Contact' }} />
                <Stack.Screen
                    name='VideoRT'
                    component={Video}
                    options={{ title: 'Video' }} />
                <Stack.Screen
                    name='VideoDetailRT'
                    component={VideoDetail}
                    options={{ title: 'VideoDetailRT' }} />
                <Stack.Screen
                    name='RegisterRT'
                    component={Register}
                    options={{ title: 'RegisterRT' }} />
                <Stack.Screen
                    name='LoginRT'
                    component={Login}
                    options={{ title: 'LoginRT' }} />
                <Stack.Screen
                    name='QuizRT'
                    component={Quiz}
                    options={{ title: 'QuizRT' }} />
                <Stack.Screen
                    name='FinishRT'
                    component={Finish}
                    options={{ title: 'FinishRT' }} />
                <Stack.Screen
                    name='AboutRT'
                    component={About}
                    options={{ title: 'AboutRT' }} />
            </Stack.Navigator>
        );
    }
}

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NavStack />
            </NavigationContainer>
        );
    }
}

console.disableYellowBox = true;