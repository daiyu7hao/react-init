import React, { Component } from 'react';
import {PrefixInteger} from './utils';
export default class EvidenceCaseSize extends Component {
  render() {
    return (
      <div>
        {PrefixInteger(1124, 7)}
      </div>
    );
  }
}