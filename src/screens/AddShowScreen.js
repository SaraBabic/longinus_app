import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AddShowScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [field_city, setCity] = useState('');
  const [field_country, setCountry] = useState('');

  const createBlog = async () => {
    try {
      const response = await fetch('https://54bd-46-40-7-116.ngrok-free.app/shows/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            body,
            field_city,
            field_country,
          }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message); // Success message from Drupal
      } else {
        console.log('Failed to create show');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <View style={styles.container}>
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

<Text style={styles.label}>City:</Text>
      <TextInput
        style={styles.input}
        value={field_city}
        onChangeText={setCity}
        placeholder="Enter city"
      />
      <Text style={styles.label}>Country:</Text>
      <TextInput
        style={styles.input}
        value={field_country}
        onChangeText={setCountry}
        placeholder="Enter country"
      />

      <Button title="Create Show" onPress={createBlog} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddShowScreen;