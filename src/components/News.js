import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';

export default class News extends Component {
  state = {
    articles: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=e747466d077740d8886575b45b66f3df',
      );

      const data = await response.json();

      this.setState({
        articles: data.articles,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
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
            data={this.state.articles}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('WebNews', {
                  url: item.url,
                })}
              >
                <View style={styles.line}>
                  <Image
                    source={{ uri: item.urlToImage }}
                    style={styles.image}
                  />
                  <Text style={styles.title}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
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
    backgroundColor: '#FCDC00',
    padding: 15,
  },
  paragraph: {
    margin: 24,
    marginBottom: 54,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    height: 100,
    flexDirection: 'row',
    borderColor: '#FCDC00',
    borderTopWidth: 7,
    borderBottomWidth: 7,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    width: '74%',
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
