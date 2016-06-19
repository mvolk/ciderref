/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Michael Volk (michael@volksys.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
