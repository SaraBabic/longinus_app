import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';


const BlogsScreen = ({ navigation }) => {
  const regex = /(<([^>]+)>)/ig;
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Store the selected post for deletion
  const [isModalVisible, setModalVisible] = useState(false);

  const getPosts = () => {
    axios.get('https://ff82-46-40-7-116.ngrok-free.app/api/blog')
      .then((json) => {
        setPosts(json.data)
      });
  };

  const deletePost = (nid) => {
    axios.post(`https://ff82-46-40-7-116.ngrok-free.app/blog/api/delete/${nid}`)
      .then(() => {
        getPosts(); // Refresh the list after deletion
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
    getPosts();
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


              <Text style={styles.title}>Blogs</Text>
              

                  <Pressable 
                style={styles.button} 
                onPress={() => {
                  navigation.navigate('AddBlog')
                }}
                >
                <Image 
                  source={require('../../assets/blog.png')}
                  style={styles.icon}
                  />
                <Text style={styles.text}>Add Blog!</Text>
              </Pressable>


              <ScrollView style={styles.scrollView}>
        {posts.map((post) => (
          <View style={styles.card} key={post.nid}>
          <Text style={styles.cardTitle}>{post.blog_title}</Text>
            <Image
              style={styles.cardImg}
              source={{
                uri: 'https://ff82-46-40-7-116.ngrok-free.app/' + `${post.blog_image}`,
              }}
            />
            <Text style={styles.description}>{post.blog_description.replace(regex, '')}</Text>
            <Pressable
              style={styles.deleteButton}
              onPress={() => openModal(post.nid)}
            >
              <Text style={styles.deleteButtonText}>Delete Blog</Text>
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
            <Text style={styles.modalText}>Are you sure you want to delete this blog?</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                deletePost(selectedPost);
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
    cardTitle: {
      marginVertical: 10,
      color: '#816362',
      fontWeight: '400',
      textAlign: 'center',
      fontSize: 26
    },
    description: {
      color: '#816362',
      textAlign: 'center',
      fontSize: 16,
      marginVertical: 10,
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
      cardImg: {
        width: 150,
        height: 100,
        borderRadius: 5,
        resizeMode: 'cover',
        alignItems: 'center',
        marginVertical: 10,
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
    
  });

export default BlogsScreen;