import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  profileImage: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Settings extends React.Component {
  // constructor(props) {
  //   this.state = {};
  // }

  render() {
    return (
      <>
        <View style={styles.profileImage}>
          <View style={styles.profileInfo}>
            <Text>Mohammad Ardyy</Text>
            <Text>Es permen karet</Text>
          </View>
          <View>
            <Text>Edit</Text>
          </View>
        </View>
      </>
    );
  }
}

export default Settings;
