import React from 'react';

export default class PageHeader extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 h3 page-header">
          <img src="images/icon-gear-48.png" className="settings-icon link" onClick={this.props.onOpenSettings} />
          {this.getLogo()}
        </div>
      </div>
    );
  }

  getLogo() {
    if (this.props.onRequestHome) {
      return (
        <div className="link" onClick={this.props.onRequestHome}>
          <img src="images/apple.png" className="logo-icon"/>CiderRef
        </div>
      );
    } else {
      return <div><img src="images/apple.png" className="logo-icon"/>CiderRef</div>
    }
  }
}
