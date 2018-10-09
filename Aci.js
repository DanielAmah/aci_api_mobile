import React from 'react';
import { StyleSheet, View, Alert, Dimensions, Platform, TextInput } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Title,
  Label, Button, Icon, Text, Spinner } from 'native-base';
import axios from 'axios';

export default class Aci extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      currency: '',
      paymentBrand: '',
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      paymentInfo: {},
      isReady: false,
      showSpinner: false
    }
    this.makePayments = this.makePayments.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady:true})
  }

  makePayments() {
    this.setState({
      showSpinner: true
    })
    const { amount, currency, paymentBrand, cardNumber, cardHolder, expiryMonth, expiryYear, cvv }  = this.state ;
    axios.post('https://aci-mobile-app.herokuapp.com/', {
      amount,
      currency,
      paymentBrand,
      cardNumber,
      cardHolder,
      expiryMonth,
      expiryYear,
      cvv
    })
    .then((response) => {
      this.setState({ paymentInfo: response.data, showSpinner: false})
    })
    .catch((error) => {
      console.log(error);
    });
  }


  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    const { paymentInfo } = this.state;
    return (
      <Container>
      <Header>
      <Body style={{ flex: 1, alignItems:'center'}}>
        <Title>ACI API Sample App</Title>
      </Body>
      </Header>
      <Content>
        <View>
        <View style={styles.container}>
        <Text style={styles.accountDetailsText}> Make Payment </Text>

        {
          this.state.showSpinner && (<Spinner color='blue' />)
        }
        { (paymentInfo != undefined && Object.keys(paymentInfo).length > 0 && paymentInfo.constructor === Object) ? (
          <View style={styles.result}>
          <Text>Amount: {paymentInfo.amount}</Text>
          <Text>Message: {paymentInfo.message}</Text>
          <Text>Timestamp: {paymentInfo.timestamp}</Text>
          </View>) : null
          }
          <Text style={styles.labelText}>Amount</Text>
            <TextInput
            onChangeText={amount => this.setState({amount})}
            placeholder="Amount e.g 500"
            style={styles.inputText}
            />
            <Text style={styles.labelText}>Currency</Text>
            <TextInput
            onChangeText={currency => this.setState({currency})}
            placeholder="Currency e.g EUR"
            style={styles.inputText}
            />
            <Text style={styles.labelText}>Payment Brand</Text>
          <TextInput
          onChangeText={paymentBrand => this.setState({paymentBrand})}
          placeholder="Payment Brand e.g VISA"
          style={styles.inputText}
          />
          <Text style={styles.labelText}>Card Number</Text>
          <TextInput
          onChangeText={cardNumber => this.setState({cardNumber})}
          placeholder="Card Number e.g 4200000000000000"
          style={styles.inputText}
          />
          <Text style={styles.labelText}>Card Holder</Text>
        <TextInput
        onChangeText={cardHolder => this.setState({cardHolder})}
        placeholder="Card Holder e.g Jane"
        style={styles.inputText}
        />
        <Text style={styles.labelText}>Card Expiry Month</Text>
        <TextInput
          onChangeText={expiryMonth => this.setState({expiryMonth})}
          placeholder="Card Expiry Month e.g 05"
          style={styles.inputText}
        />
        <Text style={styles.labelText}>Card Expiry Year</Text>
        <TextInput
          onChangeText={expiryYear => this.setState({expiryYear})}
          placeholder="Card Expiry Year e.g 2020"
          style={styles.inputText}
        />
          <Text style={styles.labelText}>CVV</Text>
          <TextInput
            onChangeText={cvv => this.setState({cvv})}
            placeholder="CVV e.g 123"
            style={styles.inputText}
          />
          <Button onPress={this.makePayments}
          primary style={styles.formButton}>
            <Text>Make Payments</Text>
          </Button>

        </View>
        </View>



      </Content>


    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // height: 400
    marginBottom: 20
  },

  result: {
    marginTop: 25,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#007bff'
  },

  formButton: {
    top: '5%',
    left: (Dimensions.get('window').width / 4) + 10
  },
  accountDetailsText: {
    fontSize: 30,
    left: (Dimensions.get('window').width / 4) - 10
  },

  inputText: {
    height: 35,
    borderColor: Platform.OS === 'ios' ? 'gray' : 'white',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    fontSize: 18,
    marginTop: 5
  },
  labelText: {
    marginTop: 10
  }
});
