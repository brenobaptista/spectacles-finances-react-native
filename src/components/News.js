import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

export default class News extends Component {
  state = {
    data: [],
    loading: true,
  };

  componentDidMount() {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e747466d077740d8886575b45b66f3df'
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.articles || [],
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Business News</Text>

        {this.state.loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#f1c40f" />
            <Text>Wait just a sec!</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OpenNews', {
                  'source': item.source.name,
                  'author': item.author,
                  'title': item.title,
                  'description': item.description,
                  'url': item.url,
                  'image': item.urlToImage,
                  'publishedAt': item.publishedAt,
                  'content': item.content,
                })}>
                <View style={[styles.line, { backgroundColor: 'white' }]}>
                  <Image
                    source={{ uri: item.urlToImage }}
                    style={styles.image}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.title}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    marginBottom: 54,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    height: 70,
    flexDirection: 'row',
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 11,
    width: '80%',
    textAlign: 'justify',
    marginTop: 10,
    paddingRight: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
