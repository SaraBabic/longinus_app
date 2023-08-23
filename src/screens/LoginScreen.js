import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Image, Text } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://sara.stud.vts.su.ac.rs/user/login?_format=json', // Replace with the correct endpoint
        {
          name: username,
          pass: password,
        }
      );

      if (response.data && response.data.csrf_token) {
        const token = response.data.csrf_token;
        const logout = response.data.logout_token;
        const username = response.data.current_user.name;
        setErrorMessage(''); // Clear any previous error message
        navigation.navigate('Home', { token, logout, username });
      }
    } catch (error) {
      setErrorMessage('Invalid username or password'); // Set an error message
      // console.error('Login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.center}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
        </View>
    
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <View style={styles.center}>
          <Pressable 
            style={styles.login} 
            onPress={handleLogin}
          >
            <Image 
              source={require('../../assets/login.png')}
              style={styles.login}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6af7333'
  },
  wrapper: {
    width: '80%',
  },
  center: {
    alignItems: 'center',
    marginVertical: 50
  },
  input: {
    backgroundColor: '#E6AF7390',
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#816362',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
    marginTop: 5,
    padding: 10,
  },
  login: {
      width: 40,
      height: 40,
},
logo: {
  width: 80,
  height: 95,
},
errorText: {
  color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
},
});

export default LoginScreen;
