import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import axios from 'axios';

const BlogsScreen = ({ navigation }) => {
  const regex = /(<([^>]+)>)/ig;
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('https://54bd-46-40-7-116.ngrok-free.app/api/blog')
      .then((json) => {
        setPosts(json.data)
      });
  };

  const deletePost = (nid) => {
    axios.post(`https://54bd-46-40-7-116.ngrok-free.app/blog/api/delete/${nid}`)
      .then(() => {
        getPosts(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
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
                uri: 'https://54bd-46-40-7-116.ngrok-free.app' + `${post.blog_image}`,
              }}
            />
            <Text style={styles.description}>{post.blog_description.replace(regex, '')}</Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deletePost(post.nid)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

              
            
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
        backgroundColor: '#ff0000',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#816362',
      },
      deleteButtonText: {
        color: '#000000',
        fontWeight: '400',
        fontSize: 16,
      },
    
  });

export default BlogsScreen;