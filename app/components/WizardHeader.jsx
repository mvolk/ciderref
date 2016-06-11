import React from 'react';

export default class WizardHeader extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 h4 wizard-header">{this.props.name}</div>
      </div>
    );
  }
}
