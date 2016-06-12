import React from 'react';

export default class BackNavigation extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 h5 nav-back" onClick={this.props.onRequestBack}>{this.props.label}</div>
      </div>
    );
  }
}
