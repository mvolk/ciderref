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
import Temperature from '../Temperature';

const PreferencesDialog = ({isOpen, temperatureUnits, onTemperatureUnitsChange, onClose}) => {
  if (isOpen) {
    const celsius = Temperature.units.celsius;
    const fahrenheit = Temperature.units.fahrenheit;
    return (
      <div className="modal-backdrop">
        <div className="prefs">
          <span className="prefs-close" onClick={onClose}>x</span>
          <label>Temperature Units:</label>
          <select value={temperatureUnits.key} onChange={(e) => {
            e.stopPropagation();
            onTemperatureUnitsChange(Temperature.units[e.target.value]);
          }}>
            <option value={celsius.key}> {celsius.label}</option>
            <option value={fahrenheit.key}>{fahrenheit.label}</option>
          </select>
        </div>
      </div>
    );
  }
  return <span />;
};

PreferencesDialog.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  temperatureUnits: React.PropTypes.shape().isRequired,
  onTemperatureUnitsChange: React.PropTypes.func.isRequired,
  onClose: React.PropTypes.func.isRequired
};

export default PreferencesDialog;
