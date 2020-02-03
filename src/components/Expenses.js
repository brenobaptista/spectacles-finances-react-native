import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Constants from 'expo-constants';

import { database } from '../config/firebase';

export default class Expenses extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    database.ref('/items').on('value', snapshot => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }

  deleteItem = (id) => {
    database.ref('/items').child(id).remove();
    Alert.alert('Item deleted');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Expenses List</Text>
        {this.state.items.length > 0 ? (
          <SwipeListView
            data={this.state.items}
            renderItem={({ item }) => (
              <View style={styles.rowFront}>
                <Text style={styles.itemLeft}>{item.name}</Text>
                <Text style={styles.itemRight}>R$ {item.value}</Text>
              </View>
            )}
            renderHiddenItem={({ item }) => (
              <View style={styles.rowBack}>
                <Text style={{ color: '#DC3545' }}>Left</Text>
                <TouchableOpacity onPress={() => this.deleteItem(item.id)}>
                  <Text style={styles.textBack}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            disableRightSwipe
            keyExtractor={ item => item.id }
          />
        ) : (
          <Text
            style={[styles.paragraph, { fontWeight: 'normal', fontSize: 16 }]}>
            No items
          </Text>
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
  rowFront: {
    padding: 5,
    borderBottomWidth: 3,
    borderColor: '#ecf0f1',
    backgroundColor: 'white',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DC3545',
    borderBottomWidth: 3,
    borderColor: '#ecf0f1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderRadius: 7,
  },
  textBack: {
    paddingRight: 15,
    color: 'white',
  },
  itemLeft: {
    height: 44,
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  itemRight: {
    height: 44,
    padding: 10,
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
});
