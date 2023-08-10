import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
// import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const {isLoading, login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      
      <View style={styles.wrapper}>
        <View 
          style={styles.logoBlock}>
            <Image 
            source={require('../../assets/logo.png')}
            style={styles.logo}
            />
        </View>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Pressable 
          style={styles.button} 
          onPress={() => {
            navigation.navigate('Home')
          }}
          >
           <Text style={styles.text}>Login</Text>
        </Pressable>
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
  input: {
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#816362',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: '#E6AF73',
    fontWeight: '400'
  },
  button: {
    backgroundColor: '#816362',
    paddingVertical: 12,
    borderRadius: 5
  },
  text: {
    color: '#E6AF73',
    fontWeight: '400',
    textAlign: 'center'
  },
  logoBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 100,
    marginBottom: 24
  }
});

export default LoginScreen;