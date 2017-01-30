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
import { InputParametersShape } from '../../shapes';
import inputParameters from '../../helpers/inputParameters';

export default class SpecificGravityInput extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    parameters: InputParametersShape,
  };

  static defaultProps = {
    autoFocus: false,
    parameters: inputParameters.specificGravity,
  };

  handleChange = (e) => {
    e.preventDefault();
    this.props.onChange(Number(e.target.value));
  };

  render() {
    const { value, autoFocus, parameters } = this.props;

    return (
      <input
        type="number"
        value={value.toFixed(parameters.decimalPlaces)}
        onChange={this.handleChange}
        autoFocus={autoFocus}
        min={parameters.minValue}
        max={parameters.maxValue}
        step={parameters.resolution}
      />
    );
  }
}
