import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

function cropDate(originalDate) {
  const dateObj = new Date(originalDate);
  const croppedDate = dateObj.toISOString().split('T')[0];
  return croppedDate;
}

const AddShowScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [field_city, setCity] = useState('');
  const [field_country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [field_date, setStart] = useState(new Date(1598051730000));
  const [field_end_date, setEnd] = useState(new Date(1598051730000));


  const createShow = async () => {
    try {
      const croppedStartDate = cropDate(field_date);
      const croppedEndDate = cropDate(field_end_date);
      const response = await fetch('https://ff82-46-40-7-116.ngrok-free.app/shows/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          field_city,
          field_country,
          field_date: croppedStartDate, 
          field_end_date: croppedEndDate, 
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData.message);
      } else {
        setMessage('Failed to create show');
      }
    } catch (error) {
      console.error('Error creating show:', error);
      setMessage('Error creating show');
    }
  };

  
  const onChangeStart = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || field_date;
      setStart(currentDate);
    }
  };
  
  const onChangeEnd = (event, selectedDate) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || field_end_date;
      setEnd(currentDate);
    }
  };

  const showStart = () => {
    DateTimePickerAndroid.open({
      value: field_date,
      mode: 'date', // Change to 'time' if you want to pick only the time
      is24Hour: true,
      onChange: onChangeStart, // Use the correct callback function here
    });
  };
  
  const showEnd = () => {
    DateTimePickerAndroid.open({
      value: field_end_date,
      mode: 'date', // Change to 'time' if you want to pick only the time
      is24Hour: true,
      onChange: onChangeEnd, // Use the correct callback function here
    });
  };

  const showDatepickerStart = () => {
    showStart('field_date');
  };

  const showDatepickerEnd = () => {
    showEnd('field_end_date');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable
          style={styles.back}
          onPress={() => {
            navigation.navigate('Shows');
          }}
        >
          <Image source={require('../../assets/back.png')} style={styles.icon} />
        </Pressable>
        <View style={styles.next}>
          <Image source={require('../../assets/show.png')} style={styles.icon} />
          <Text style={styles.title}>My New Show: </Text>
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

    <View style={styles.next}>
      <Text style={styles.label}>Start date:</Text>
      <Pressable onPress={showDatepickerStart}>
        <Image source={require('../../assets/calendar.png')} style={styles.icon} />
      </Pressable>
      <Text style={styles.dateText}>
        {field_date ? cropDate(field_date) : 'No selected date'}
      </Text>
    </View>

    <View style={styles.next}>
      <Text style={styles.label}>End date:</Text>
      <Pressable onPress={showDatepickerEnd}>
        <Image source={require('../../assets/calendar.png')} style={styles.icon} />
      </Pressable>
      <Text style={styles.dateText}>
        {field_end_date ? cropDate(field_end_date) : 'No selected date'}
      </Text>
    </View>


          <Pressable style={styles.button} onPress={createShow}>
          <Text style={styles.text}>Create Show!</Text>
        </Pressable>
        

        {message ? (
          <Text
            style={
              message.startsWith('Success') ? styles.successMessage : styles.errorMessage
            }
          >
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
  justifyContent: 'center',
  marginVertical: 5
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
dateText: {
  color: '#816362',
  fontWeight: '200',
  fontSize: 16,
  marginLeft: 10, // Add some spacing between the icon and the text
},
});

export default AddShowScreen;