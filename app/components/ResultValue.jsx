import React from 'react';

export default class ResultValue extends React.Component {
  render() {
    return (
      <p className="h4">{this.props.value}</p>
    );
  }
}
