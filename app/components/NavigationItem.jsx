import React from 'react';

export default class NavigationItem extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 h4 nav-item" onClick={this.props.onClick}>{this.props.label}</div>
      </div>
    );
  }
}
