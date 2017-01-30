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

import React, { PropTypes } from 'react';
import units, { CELSIUS, FAHRENHEIT } from 'ciderlib/units';
import { PreferencesShape } from '../../shapes';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  preferences: PreferencesShape.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

class PreferencesDialog extends React.Component {

  handleTemperatureUnitsChange = (e) => {
    e.stopPropagation();
    this.props.onChange({
      ...this.props.preferences,
      units: {
        ...this.props.preferences.units,
        temperature: units[e.target.value],
      },
    });
  };

  render() {
    const { visible, preferences, onClose } = this.props;

    return visible && (
      <div className="modal-backdrop">
        <div className="prefs">
          <span className="prefs-close" onClick={onClose}>x</span>
          <h4>Units of Measurement:</h4>
          <label>Temperature:</label>
          <select
            value={preferences.units.temperature.key}
            onChange={this.handleTemperatureUnitsChange}
          >
            <option value={CELSIUS.key}>{CELSIUS.name}</option>
            <option value={FAHRENHEIT.key}>{FAHRENHEIT.name}</option>
          </select>
        </div>
      </div>
    );
  }
}

PreferencesDialog.propTypes = propTypes;

export default PreferencesDialog;