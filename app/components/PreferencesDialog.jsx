import React from 'react';
import {temperature} from '../units';

export default class PreferencesDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.preferences;

    this.isSelectedTemperatureUofM = this.isSelectedTemperatureUofM.bind(this);
    this.handleTemperatureUofMChange = this.handleTemperatureUofMChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  render() {
    const celsius = temperature.celsius;
    const fahrenheit = temperature.fahrenheit;

    if (this.props.open) {
      return (
        <div className="modal-backdrop">
          <div className="prefs">
            <span className="prefs-close" onClick={this.handleClose}>x</span>
            <label>Temperature Units:</label>
            <select onChange={this.handleTemperatureUofMChange}>
              <option value={celsius.key} selected={this.isSelectedTemperatureUofM(celsius)}>{celsius.label}</option>
              <option value={fahrenheit.key} selected={this.isSelectedTemperatureUofM(fahrenheit)}>{fahrenheit.label}</option>
            </select>
          </div>
        </div>
      );
    }
    return null;
  }

  isSelectedTemperatureUofM(uom) {
    return uom === this.state.temperature;
  }

  handleTemperatureUofMChange(e) {
    this.setState({temperature: temperature[e.target.value]});
  }

  handleClose(e) {
    this.props.onClose(this.state);
  }
}
