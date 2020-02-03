import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Constants from 'expo-constants';
import { Linking } from 'expo';
import { Card } from 'react-native-paper';

export default class News extends Component {
  goToNews = (url) => {
    Linking.openURL(url);
  }

  render() {
    const { navigation } = this.props;
    const source = navigation.getParam('source');
    const author = navigation.getParam('author');
    const title = navigation.getParam('title');
    const description = navigation.getParam('description');
    const newsURL = navigation.getParam('url');
    const imageURL = navigation.getParam('image');
    const publishedAt = navigation.getParam('publishedAt');
    const content = navigation.getParam('content');

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{title}</Text>
          <Image 
            source={{ uri: imageURL }} 
            style={styles.image} />
          <Text style={styles.description}>{description}</Text>
          <Card style={styles.card}>
            <Text style={styles.content}>{content}</Text>
            <Text>Source: {source}</Text>
            <Text>Author: {author}</Text>
            <Text>Published at: {publishedAt}</Text>
          </Card>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.goToNews(newsURL)}>
            <Text style={{ color: 'white' }}>Read This News</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold', 
    textAlign: 'justify',
  },
  description: {
    textAlign: 'justify',
    color: '#383838',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  content: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#06476C',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    padding: 10,
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  }
});
