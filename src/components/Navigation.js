import React from 'react';
import {Text, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import BlogsScreen from '../screens/BlogsScreen';
import ShowsScreen from '../screens/ShowsScreen';
import AddBlogScreen from '../screens/AddBlogScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
                <Stack.Screen name="Blogs" component={BlogsScreen}  options={{headerShown: false}} />
                <Stack.Screen name="Shows" component={ShowsScreen}  options={{headerShown: false}} />
                <Stack.Screen name="AddBlog" component={AddBlogScreen}  options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;