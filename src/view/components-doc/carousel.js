import React, { Component } from 'react';
import {Carousel} from '../../components';

export default class CarouselDoc extends Component {
  changeCarousel=(activeIndex)=>{
  }
  render() {
    return (
      <div>
        感觉写的组件乱七八糟，不想用
        <Carousel onChange={this.changeCarousel} dots={true} height="300px"  effect="scrollx" dotTrigger="click" interval={2000} arrows="hover" cardMode>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Carousel>
      </div>
    );
  }
}