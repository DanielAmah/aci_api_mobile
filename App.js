import React from 'react';
import { StyleSheet, View, Alert, Dimensions, Platform } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Footer, FooterTab,
  Label, Button, Icon, Text } from 'native-base';
import AppComponent from './Aci';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state= {
      isReady: false

    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <Container>
      <Content style={styles.container}>
        <AppComponent />
      </Content>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  //  height: 500
  },
});
