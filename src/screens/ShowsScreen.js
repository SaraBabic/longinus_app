import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ShowsScreen = ({navigation}) => {
  const regex = /(<([^>]+)>)/ig;
  const [posts, setShows] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Store the selected post for deletion
  const [isModalVisible, setModalVisible] = useState(false);

  const getShows = () => {
    axios.get('https://ff82-46-40-7-116.ngrok-free.app/api/shows')
      .then((json) => {
        setShows(json.data)
      });
  };

  const deleteShow = (nid) => {
    axios.post(`https://ff82-46-40-7-116.ngrok-free.app/show/api/delete/${nid}`)
      .then(() => {
        getShows(); // Refresh the list after deletion
        setModalVisible(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  const openModal = (nid) => {
    setSelectedPost(nid);
    setModalVisible(true);
  };

  useEffect(() => {
    getShows();
  }, [])

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

        <ScrollView style={styles.scrollView}>
        {posts.map((post) => (
          <View style={styles.card} key={post.nid}>
          <Text style={styles.cardTitle}>{post.title}</Text>
          <Text style={styles.description}>{post.description.replace(regex, '')}</Text>

          <View>
            <View style={styles.next}>
              <Image 
                source={require('../../assets/country.png')}
                style={styles.smallIcon}
                />
              <Text style={styles.description}>{post.country.replace(regex, '')}</Text>
            </View>
            <View style={styles.next}>
              <Image 
                source={require('../../assets/city.png')}
                style={styles.smallIcon}
                />
              <Text style={styles.description}>{post.city.replace(regex, '')}</Text>
            </View>
            <View style={styles.next}>
              <Image 
                source={require('../../assets/start-date.png')}
                style={styles.smallIcon}
                />
              <Text style={styles.description}>{post.start_date}</Text>
            </View>
            <View style={styles.next}>
            <Image 
              source={require('../../assets/end-date.png')}
              style={styles.smallIcon}
              />
            <Text style={styles.description}>{post.end_date}</Text>
            </View>
          </View>
            <Pressable
              style={styles.deleteButton}
              onPress={() => openModal(post.nid)}
            >
              <Text style={styles.deleteButtonText}>Delete Show</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this show?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                deleteShow(selectedPost);
              }}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
            
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
        marginVertical: 20,
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
      cardTitle: {
        marginVertical: 10,
        color: '#816362',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: 26
      },
      icon: {
          width: 35,
          height: 35,
      },
      smallIcon: {
        width: 20,
        height: 20,
      },
      next: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      },
      back: {
        alignItems: 'center'
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
      scrollView: {
        marginHorizontal: 0,
        height: 550,
      },
      card: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 5,
        padding: 8,
        borderWidth: 2,
        borderColor: '#816362',
        alignItems: 'center',
      },
      deleteButton: {
        backgroundColor: '#C14545',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderWidth: 2,
        borderColor: '#816362',
        width: 100,
      },
      deleteButtonText: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 12,
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
      },
      modalButton: {
        backgroundColor: '#6FCC93',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#816362',
        width: 100,
      },
      modalButtonText: {
        color: '#ffffff',
        fontWeight: '400',
        fontSize: 12,
      },
      description: {
        color: '#816362',
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
      },
  });

export default ShowsScreen;