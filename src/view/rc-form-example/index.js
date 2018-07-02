import React, { Component } from 'react';
import ComplaintForm from './rc-form';
export default class ComponentName extends Component {
  render() {
    return (
      <div>
        <ComplaintForm complaintcategoryId={this.props.match.params.complaintcategoryId}/>
      </div>
    );
  }
}
