import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import Constants from "expo-constants";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

let IconComponent = FontAwesome5;

const { width: WIDTH } = Dimensions.get("window");

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require("../assets/logo.jpg")} />
        </View>
        <View style={styles.inputView}>
          <IconComponent
            name={"user-alt"}
            size={13}
            color={"white"}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#F1F1F1"
            onChangeText={email => this.setState({ email })}
            style={[styles.input, { flex: 1 }]}
            value={this.state.email}
            keyboardType={"email-address"}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputView}>
          <IconComponent
            name={"lock"}
            size={14}
            color={"white"}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#F1F1F1"
            onChangeText={password => this.setState({ password })}
            style={[styles.input, { marginRight: 0 }]}
            secureTextEntry={!this.state.showPassword}
            value={this.state.password}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            onPress={() =>
              this.setState(prevState => {
                return { showPassword: !prevState.showPassword };
              })
            }
          >
            {this.state.showPassword ? (
              <IconComponent
                name={"eye"}
                size={14}
                color={"white"}
                style={[styles.inputIcon, { marginLeft: 0 }]}
              />
            ) : (
              <IconComponent
                name={"eye-slash"}
                size={14}
                color={"white"}
                style={[styles.inputIcon, { marginLeft: 0 }]}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={{ color: "white" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FCDC00",
    padding: 10
  },
  input: {
    width: WIDTH - 120,
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#E0C300",
    color: "#fff",
    height: 40
  },
  inputIcon: {
    backgroundColor: "#E0C300",
    marginBottom: 10,
    marginLeft: 12,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    height: 40
  },
  inputView: {
    flexDirection: "row"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#978400",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  logo: {
    width: 250,
    height: 250
  },
  logoView: {
    alignItems: "center"
  }
});
