import React, { Component } from 'react';
import { Image, Text, View, Dimensions, StyleSheet } from 'react-native';

import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json

import { scrollInterpolator, animatedStyles } from './utils/animations';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 1/1.8);




const DATA = [];
for (let i = 0; i < 10; i++) {
  DATA.push(i);
}

export default class Slide extends Component {
  
  state = {
    index: 0,
    currentIndex : 0
  }

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this)
  }

  _renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Image
        style={{width:ITEM_WIDTH, height:ITEM_HEIGHT}}
        source={{
          uri: `${global.uri}/slides/${item+1}.png`,
        }}
      />
      </View>
    );
  }
  
  changeSlide(newIndex)
  {
  console.log(this.state.currentIndex,newIndex);
  if(this.state.currentIndex > newIndex)
  {
    this.prev(newIndex);
  }else
  {
    this.next(newIndex);
  }
  this.setState({currentIndex:newIndex});
  }
  prev(index)
  {
    this.props.setSlideNo(index);
    global.socket.emit('prev','hello');
    console.log("Prev");
  }
  next(index)
  {
    this.props.setSlideNo(index);
    global.socket.emit('next','hello');
    console.log("Next");
  }
  
  
  render() {
    return (
      <View>
        <Carousel
          ref={(c) => this.carousel = c}
          data={DATA}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => {this.setState({ index }); this.changeSlide(index);}}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
    
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
