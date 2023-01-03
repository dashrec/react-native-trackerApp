import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { NavigationEvents } from 'react-navigation';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext); // get state and signup from context


// two forms signup and signin share the same error message state to cleare out use this clearErrorMessage
  return (
    
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Spacer>
          <Text style={styles.link}></Text>
        </Spacer>
      </TouchableOpacity>

      <NavLink
        text={'Already have an account? Sign in instead'}
        routeName={'Signin'}
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  // disappear header
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 80,
  },
});

export default SignupScreen;
