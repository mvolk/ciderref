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

export default class TemperatureInput extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render () {
    return (
      <div>
        <input type="number"
               value={this.props.value}
               autoFocus={this.props.autoFocus || false}
               onChange={this.handleChange}
               min={this.props.minValue || this.props.units.minValue}
               max={this.props.maxValue || this.props.units.maxValue}
               step={this.props.step || this.props.units.step}
        />
        {this.props.units.label}
      </div>
    );
  }

  handleChange (event) {
    this.props.onChange(Number(event.target.value));
  }
}

TemperatureInput.propTypes = {
  value: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
  step: React.PropTypes.number,
  units: React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    minValue: React.PropTypes.number.isRequired,
    maxValue: React.PropTypes.number.isRequired,
    step: React.PropTypes.number.isRequired
  }).isRequired,
  autoFocus: React.PropTypes.bool
};
