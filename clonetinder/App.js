import React, {Component} from 'react';
import Exponent from 'expo';
import Card from './components/Card';

export default class App extends Component {
  render() {
    return (
      <Card />
    );
  }
}

Exponent.registerRootComponent(App);
