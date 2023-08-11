import React from 'react';
import {Text, 
        View,
        StyleSheet,
        Pressable,
        Image,
        navigation
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const { token } = route.params;
    return (
        <View style={styles.container}>
          
          <View style={styles.wrapper}>
          <Text style={styles.title}>Wellcome Sara!</Text>
          <Pressable 
          style={styles.button} 
          onPress={() => {
            navigation.navigate('Blogs')
          }}
          >
          <Image 
            source={require('../../assets/blog.png')}
            style={styles.icon}
            />
           <Text style={styles.text}>Blogs</Text>
        </Pressable>
        <Pressable 
          style={styles.button} 
          onPress={() => {
            navigation.navigate('Shows')
          }}
          >
          <Image 
            source={require('../../assets/show.png')}
            style={styles.icon}
            />
           <Text style={styles.text}>Shows</Text>
        </Pressable>
        <Pressable 
          style={styles.logout} 
          onPress={() => {
            navigation.navigate('Login')
          }}
          >
          <Image 
            source={require('../../assets/logout.png')}
            style={styles.icon}
            />
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
    button: {
      backgroundColor: '#E6AF73',
      paddingVertical: 12,
      borderWidth: 2,
      borderColor: '#816362',
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      marginVertical: 20
    },
    text: {
      color: '#816362',
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 18
    },
    icon: {
        width: 35,
        height: 35,
    },
    logout: {
        alignItems: 'center',
        marginVertical: 50
    },
    title: {
        marginVertical: 50,
        color: '#816362',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 24
    }
  });

export default HomeScreen;