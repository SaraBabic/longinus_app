import React from 'react';
import {Text, 
        View,
        StyleSheet,
        Pressable,
        Image,
        navigation,
        ScrollView
} from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


const BlogsScreen = ({navigation}) => {
  const regex = /(<([^>]+)>)/ig;
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('https://5283-178-222-229-134.ngrok-free.app/api/blog')
        .then((json) => {
          console.log(json.data);
          setPosts(json.data)
        });
    };

    useEffect(() => {
      getPosts();
    },[])

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
              {posts.map((post) => {
                return (
                  <View style={styles.card}>
                      <Text key={post.blog_title} style={styles.cardTitle}>{post.blog_title}</Text>
                      <Image
                      style={styles.cardImg}
                      source={{
                        uri:
                        'https://5283-178-222-229-134.ngrok-free.app' + `${post.blog_image}`,
                      }}
                    />
                      <Text key={post.nid} style={styles.description}>{post.blog_description.replace(regex, '')}</Text>
                  </View>
          
                );  
              }
              )}
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
      }
    
  });

export default BlogsScreen;