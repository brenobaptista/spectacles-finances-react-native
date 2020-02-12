import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Keyboard
} from "react-native";
import Constants from "expo-constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card } from "react-native-paper";

import { database } from "../config/firebase";

export default class AddItem extends Component {
  state = {
    name: "",
    value: "",
    date: new Date(),
    show: Platform.OS === "ios" ? true : false
  };

  pushItem = () => {
    const newItem = database.ref("/items").push();
    newItem.set({
      id: newItem.key,
      name: this.state.name,
      value: this.state.value,
      date: this.state.date
    });
    Alert.alert("Item saved successfully");
    this.cancelItem();
  };

  cancelItem = () => {
    this.setState({
      name: "",
      value: "",
      date: new Date()
    });
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({
      date: currentDate,
      show: Platform.OS === "ios" ? true : false
    });
  };

  showMode = () => {
    this.setState({
      show: true
    });
  };

  dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
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
              keyboardType={"decimal-pad"}
            />
            <View>
              <View style={styles.dateRow}>
                <Text style={styles.date}>
                  {this.state.date.toDateString()}
                </Text>
                {Platform.OS === "ios" ? null : (
                  <TouchableOpacity
                    style={styles.dateButton}
                    onPress={this.showMode}
                  >
                    <Text style={styles.dateButtonText}>SELECT DATE</Text>
                  </TouchableOpacity>
                )}
              </View>
              {this.state.show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={this.state.date}
                  mode={"date"}
                  display="default"
                  onChange={this.onChange}
                />
              )}
            </View>
          </Card>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#DC3545" }]}
                onPress={() => this.cancelItem()}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#28A745" }]}
                onPress={() => this.pushItem()}
              >
                <Text style={{ color: "white" }}>Confirm</Text>
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
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  card: {
    marginTop: 30,
    marginBottom: 25
  },
  input: {
    margin: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 3
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3
  },
  date: {
    margin: 20
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  dateButton: {
    backgroundColor: "#0275d8",
    width: 120,
    justifyContent: "center",
    borderRadius: 3
  },
  dateButtonText: {
    color: "white",
    textAlign: "center"
  }
});
