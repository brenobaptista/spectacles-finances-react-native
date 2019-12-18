import React, { Component } from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Constants from 'expo-constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

let IconComponent = FontAwesome5;

const { width: WIDTH } = Dimensions.get('window');

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Spectacles Finances</Text>
        <View style={styles.inputView}>
          <IconComponent 
            name={'user-alt'} 
            size={13} 
            color={'white'}
            style={styles.inputIcon} 
          />
          <TextInput
            placeholder="Your Email"
            placeholderTextColor="#c1c1c1"
            onChangeText={email => this.setState({ email })}
            style={[styles.input, { flex: 1 }]}
            value={this.state.email}
            keyboardType={'email-address'}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputView}>
          <IconComponent 
            name={'lock'} 
            size={14} 
            color={'white'}
            style={styles.inputIcon} 
          />
          <TextInput
            placeholder="Your Password"
            placeholderTextColor="#c1c1c1"
            onChangeText={password => this.setState({ password })}
            style={[styles.input, { marginRight: 0 }]}
            secureTextEntry={!this.state.showPassword}
            value={this.state.password}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity 
            onPress={() => this.setState((prevState) => {
              return { showPassword: !prevState.showPassword }
            })}
          >
            {this.state.showPassword ? (
              <IconComponent 
                name={'eye'} 
                size={14} 
                color={'white'}
                style={[styles.inputIcon, { marginLeft: 0 }]} 
              />
            ) : (
              <IconComponent 
                name={'eye-slash'} 
                size={14} 
                color={'white'}
                style={[styles.inputIcon, { marginLeft: 0 }]} 
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={{ color: 'white' }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#9300C5',
    padding: 10,
  },
  paragraph: {
    color: 'white',
    marginTop: 60,
    marginBottom: 70,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: WIDTH - 117,
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    backgroundColor: '#6A0088',
    color: '#fff',
    height: 40,
  },
  inputIcon: {
    backgroundColor: '#6A0088',
    marginBottom: 10,
    marginLeft: 10,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    height: 40,
  },
  inputView: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#3a004e',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
