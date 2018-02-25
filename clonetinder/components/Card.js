import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

import moment from 'moment';

const {width, height} = Dimensions.get('window');

export default class Card extends React.Component {
  componentWillMount() {
    this.pan = new Animated.ValueXY();
    this.cardPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx:this.pan.x, dy:this.pan.y}]),
      onPanResponderRelease: (event, gesture) => {
          const dx = gesture.dx;
          const absDx = Math.abs(dx);
          const direction = absDx / dx;
          //threshold to decide to swipe out the card or not
          if (absDx > 120) {
            Animated.decay(this.pan, {
                velocity: {x: 3 * direction, y: 0},
                deceleration: 0.995,
            }).start(this.props.onSwipeOff);
          } else {
            Animated.spring(this.pan, {
            toValue: {x:0, y:0},
            friction: 4.5,
            }).start();
          }
      },
    });
  }

  render() {
    const {id, name, birthday, bio} = this.props.profile;
    const fbImage = `https://graph.facebook.com/${id}/picture?height=500`;
    const profileBday = moment(birthday, 'MM/DD/YYYY');
    const profileAge = moment().diff(profileBday, 'years');

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
        <Animated.View
            {...this.cardPanResponder.panHandlers}
            style={[styles.card, animatedStyle]}>
            <Image
                style= {{flex: 1}}
                source= {{uri: fbImage}}
            />
            <View style= {{margin:20}}>
                <Text style= {{fontSize:20}}>{name}, {profileAge}</Text>
                <Text style= {{fontSize:15, color:'darkgrey'}}>{bio}</Text>
            </View>
            {/* <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
            </TouchableHighlight> */}
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: width - 20,
    height: height * 0.7,
    top: (height * 0.3) / 2,
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
