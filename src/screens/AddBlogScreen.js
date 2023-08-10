import React from 'react';
import {Text, 
        View,
        StyleSheet,
        Pressable,
        Image,
        TextInput
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

const options={
  
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    }
}
const openGallery=async()=> {
  const image = await launchCamera(options);
}
const AddBlogScreen = ({navigation}) => {
    return (

        <View style={styles.container}>
          
          <View style={styles.wrapper}>

          <Pressable 
          style={styles.back} 
          onPress={() => {
            navigation.navigate('Blogs')
          }}
          >
          <Image 
            source={require('../../assets/back.png')}
            style={styles.icon}
            />
        </Pressable>


        <TextInput
          style={styles.input}
          placeholder="Blog title"
        />
        <TextInput
          style={styles.textarea}
          placeholder="Description"
        />
            
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
      icon: {
        width: 35,
        height: 35,
    },
    back: {
      alignItems: 'center',
      marginVertical: 50
    },
    input: {
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#816362',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    textarea: {
      marginBottom: 12,
        borderWidth: 2,
        borderColor: '#816362',
        borderRadius: 5,
        paddingHorizontal: 14,
        height: 100,
    }
  });

export default AddBlogScreen;