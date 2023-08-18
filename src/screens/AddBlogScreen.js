import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable, PermissionsAndroid } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

const AddBlogScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const pickImageExpo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createBlog = async () => {
    try {
      const response = await fetch('https://ff82-46-40-7-116.ngrok-free.app/blog/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, image }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData.message);
      } else {
        setMessage('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage('Error creating blog');
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = () => {
    ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setSelectedImage(source);
      }
    });
  };

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
        <View style={styles.next}>
          <Image
            source={require('../../assets/blog.png')}
            style={styles.icon}
          />
          <Text style={styles.title}>My New Blog:</Text>
        </View>

        <Text style={styles.label}>Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
        <Text style={styles.label}>Body:</Text>
        <TextInput
          style={styles.input}
          value={body}
          onChangeText={setBody}
          placeholder="Enter body"
          multiline
        />

      <View>
      {selectedImage && (
        <Image source={selectedImage} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Pick an image from gallery" onPress={pickImageExpo} />
      </View>

        <Pressable
          style={styles.button}
          onPress={createBlog}
        >
          <Text style={styles.text}>Create Blog!</Text>
        </Pressable>

        {message ? (
          <Text style={message.startsWith('Success') ? styles.successMessage : styles.errorMessage}>
            {message}
          </Text>
        ) : null}
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
  label: {
    color: '#816362',
  fontWeight: '200',
  fontSize: 16
  },
  wrapper: {
    width: '80%',
  },
  title: {
    marginVertical: 20,
    color: '#816362',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 32
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
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
  icon: {
    width: 35,
    height: 35,
},
back: {
  alignItems: 'center',
  marginVertical: 20
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
next: {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: 20,
  justifyContent: 'center'
},
  successMessage: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
  },
});

export default AddBlogScreen;