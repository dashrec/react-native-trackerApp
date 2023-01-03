import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontSize: 28}}>AccountScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </View>
  );
};
AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome name="gear" size={20} />
};
const styles = StyleSheet.create({});

export default AccountScreen;
