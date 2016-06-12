import React from 'react';

export default class WizardProgressBar extends React.Component {
  render() {
    return (
      <div className="row">
        {this.getProgressElement()}
        {this.getProgressRemainingElement()}
      </div>
    );
  }

  getProgressElement() {
    var className = this.props.progressRender === 12 ? 'wizard-progress-done' : 'wizard-progress-not-done';
    return (
      <div className={'col-xs-' + this.props.progressRender + ' wizard-progress-so-far ' + className}>
        {this.props.progressPercent}%
      </div>
    );
  }

  getProgressRemainingElement() {
    if (this.props.progressRender == 12) {
      return (
        <div />
      );
    } else {
      return (
        <div className={'col-xs-' + (12 - this.props.progressRender) + ' wizard-progress-remaining'}></div>
      );
    }
  }
}
