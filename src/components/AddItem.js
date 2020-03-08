import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';

import { database } from '../config/firebase';

export default class AddItem extends Component {
  state = {
    name: '',
    value: '',
    date: new Date(),
    show: Platform.OS === 'ios',
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
      date: new Date(),
    });
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({
      date: currentDate,
      show: Platform.OS === 'ios',
    });
  };

  showMode = () => {
    this.setState({
      show: true,
    });
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
        <View style={styles.container}>
          <Text style={styles.paragraph}>Add New Item</Text>
          <View style={styles.card}>
            <TextInput
              placeholder="What?"
              placeholderTextColor="#5A5A5A"
              onChangeText={(name) => this.setState({ name })}
              style={styles.input}
              value={this.state.name}
            />
            <TextInput
              placeholder="How much?"
              placeholderTextColor="#5A5A5A"
              onChangeText={(value) => this.setState({ value })}
              style={styles.input}
              value={this.state.value}
              keyboardType="decimal-pad"
            />
            <View>
              <View style={styles.dateRow}>
                <Text style={styles.date}>
                  {this.state.date.toDateString()}
                </Text>
                {Platform.OS === 'ios' ? null : (
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={this.showMode}
                  >
                    <Text style={styles.buttonText}>SELECT DATE</Text>
                  </TouchableOpacity>
                )}
              </View>
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={this.state.date}
                  mode="date"
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#DC3545' }]}
                onPress={this.cancelItem}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#28A745' }]}
                onPress={this.pushItem}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginTop: 30,
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  input: {
    margin: 10,
    backgroundColor: '#fff',
    color: 'black',
    padding: 10,
    borderRadius: 3,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  date: {
    margin: 20,
    color: '#000',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateButton: {
    backgroundColor: '#0275d8',
    width: 120,
    justifyContent: 'center',
    borderRadius: 3,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  inputView: {
    flexDirection: 'row',
  },
});
