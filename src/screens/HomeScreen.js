import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
  const {  token, logout, username  } = route.params; // Get the token from the route parameters

  const handleLogout = async () => {
    try {
      // Perform logout by making a request to the logout endpoint with the token
      // You can use axios or any other method for making the request
      // Here's an example using fetch:
      const response = await fetch(
        `https://sara.stud.vts.su.ac.rs/user/logout?token=${logout}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token,
          },
        }
      );
      console.log(response);

      if (response.status === 200) {
        // TODO: Clear the token from storage and navigate back to the login screen
        navigation.navigate('Login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Welcome {username}!</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('Blogs', { token, logout, username });
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
            navigation.navigate('Shows', { token, logout, username });
          }}
        >
          <Image
            source={require('../../assets/show.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Shows</Text>
        </Pressable>
        <Pressable style={styles.logout} onPress={handleLogout}>
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