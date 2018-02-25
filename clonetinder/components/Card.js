import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  PanResponder,
  Animated,
} from 'react-native';

const fbImage = 'https://graph.facebook.com/259389830744794/picture?height=500';

export default class Card extends React.Component {
  componentWillMount() {
    this.pan = new Animated.ValueXY();
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx:this.pan.x, dy:this.pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(this.pan, {
          toValue: {x:0, y:0},
          friction: 4.5,
        }).start();
      },
    });
  }

  render() {
    // rotation and spring back animation
    const rotateCard = this.pan.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ['10deg', '0deg', '-10deg'],
    });

    // this is for touch and movement animation
    const animatedStyle = {
      transform: [
        {translateX: this.pan.x},
        {translateY: this.pan.y},
        {rotate: rotateCard},
      ],
    };
    return (
      <View style={styles.container}>
        <View style={styles.dummy}>
        </View>
        <Animated.View
        {...this.cardPanResponder.panHandlers}
        style={[styles.card, animatedStyle]}>
          <Image
            style= {{flex: 1}}
            source= {{uri: fbImage}}
          />
          <View style= {{margin:20}}>
            <Text style= {{fontSize:20}}>Candice, 26</Text>
            <Text style= {{fontSize:15, color:'darkgrey'}}>Supermodel</Text>
          </View>
          {/* <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </TouchableHighlight> */}
        </Animated.View>
        <View style={styles.dummy}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dummy: {
    flex: 1,
  },
  card: {
    flex: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    margin: 10,
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 8,
  },
  button:{
    backgroundColor: 'grey',
    width: 150,
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText:{
    color: 'white',
  },
  container: {
    flex: 10,
    backgroundColor: '#fff',
  },
});
