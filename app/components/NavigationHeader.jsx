import React from 'react';

export default class NavigationHeader extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 h4 nav-header">{this.props.label}</div>
      </div>
    );
  }
}
