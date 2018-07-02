import React, { Component } from 'react';
export default class BsPart extends Component {
  render() {
    const {title, body, ownclass} = this.props;
    return (<div className={'bs-part ' + ownclass||''}>
      <div className="bs-part-title">{title}</div>
      <div className="bs-part-body">{body}</div>
    </div>
    );
  }
}