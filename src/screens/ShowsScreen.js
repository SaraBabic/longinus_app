import React from 'react';
import {Text, 
        View,
        StyleSheet,
        Pressable,
        Image,
        navigation
} from 'react-native';

const ShowsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
          
          <View style={styles.wrapper}>

        <Pressable 
          style={styles.back} 
          onPress={() => {
            navigation.navigate('Home')
          }}
          >
          <Image 
            source={require('../../assets/back.png')}
            style={styles.icon}
            />
        </Pressable>


        <Text style={styles.title}>Shows</Text>
        

            <Pressable 
          style={styles.button} 
          onPress={() => {
            navigation.navigate('AddShow')
          }}
          >
          <Image 
            source={require('../../assets/show.png')}
            style={styles.icon}
            />
           <Text style={styles.text}>Add Show!</Text>
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
    title: {
        marginVertical: 50,
        color: '#816362',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 32
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
      back: {
        alignItems: 'center',
        marginVertical: 50
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
  });

export default ShowsScreen;