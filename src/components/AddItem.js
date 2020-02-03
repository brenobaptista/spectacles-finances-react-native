import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import { Card } from 'react-native-paper';

import { database } from '../config/firebase';

export default class AddItem extends Component {
  state = {
    name: '',
    value: '',
    date: '',
  };

  pushItem = () => {
    const newItem = database.ref('/items').push();
    newItem.set({
      id: newItem.key,
      name: this.state.name,
      value: this.state.value,
      date: this.state.date,
    });
    Alert.alert('Item saved successfully');
    this.cancelItem();
  };

  cancelItem = () => {
    this.setState({
      name: '',
      value: '',
      date: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Expense Tracker</Text>
        <Card style={styles.card}>
          <TextInput
            placeholder="What?"
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            value={this.state.name}
          />
          <TextInput
            placeholder="How much?"
            onChangeText={value => this.setState({ value })}
            style={styles.input}
            value={this.state.value}
            keyboardType={'decimal-pad'}
          />
          <DatePicker
            style={styles.date}
            format="DD-MM-YYYY"
            date={this.state.date}
            onDateChange={date => {
              this.setState({ date });
            }}
            mode="date" // The enum of date, datetime and time
            placeholder="When?"
            minDate="01-01-2019"
            maxDate="01-01-3001"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'relative',
                left: 6,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 0,
              },
            }}
          />
        </Card>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#DC3545' }]}
              onPress={() => this.cancelItem()}>
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#28A745' }]}
              onPress={() => this.pushItem()}>
              <Text style={{ color: 'white' }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginTop: 30,
    marginBottom: 25,
  },
  input: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 3,
  },
  date: {
    width: 180,
    marginTop: 10,
    marginBottom: 15,
    left: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
  },
});
