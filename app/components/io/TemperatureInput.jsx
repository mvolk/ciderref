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

import convert from '../../helpers/convert';
import { InputParametersShape, TemperatureShape } from '../../shapes';
import Spacing from '../layout/Spacing';
import TemperatureUnitsSelect from './TemperatureUnitsSelect';

export default class TemperatureInput extends React.Component {
  static propTypes = {
    temperature: TemperatureShape.isRequired,
    parameters: InputParametersShape.isRequired,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
  };

  static defaultProps = {
    autoFocus: false,
  };

  handleValueChangeEvent = (e) => {
    e.preventDefault();
    this.props.onChange({ value: Number(e.target.value), units: this.props.temperature.units });
  };

  handleUnitsChange = (newUnits) => {
    this.props.onChange(
      convert(this.props.temperature, newUnits, this.props.parameters.resolution),
    );
  };

  render() {
    const { temperature, parameters, autoFocus } = this.props;

    return (
      <div>
        <input
          type="number"
          value={temperature.value.toFixed(parameters.decimalPlaces)}
          autoFocus={autoFocus}
          onChange={this.handleValueChangeEvent}
          min={parameters.minValue}
          max={parameters.maxValue}
          step={parameters.resolution}
        />
        <Spacing left={6} inline>
          <TemperatureUnitsSelect
            value={temperature.units}
            onChange={this.handleUnitsChange}
          />
        </Spacing>
      </div>
    );
  }
}
