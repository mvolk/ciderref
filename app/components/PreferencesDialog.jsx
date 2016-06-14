import React from 'react';

export default class PreferencesDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.preferences;

    this.handleClose = this.handleClose.bind(this);
  }
  render() {
    if (this.props.display) {
      return (
        <div className="modal-backdrop">
          <div className="prefs">
            <span className="prefs-close" onClick={this.handleClose}>x</span>
            <p>Some text in the Modal..</p>
          </div>
        </div>
      );
    }
    return null;
  }

  handleClose(e) {
    this.props.onClosePreferences(this.state);
  }
}
