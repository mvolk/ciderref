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
import Temperature from '../Temperature';

const propTypes = {
  value: PropTypes.number.isRequired,
  units: PropTypes.shape({
    label: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

const defaultProps = {
  autoFocus: false,
};

function TemperatureInput({ value, units, onChange, autoFocus }) {
  return (
    <div>
      <input
        type="number"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => {
          e.stopPropagation();
          onChange(new Temperature(Number(e.target.value), units));
        }}
        min={units.minValue}
        max={units.maxValue}
        step={units.step}
      />
      {units.label}
    </div>
  );
}

TemperatureInput.propTypes = propTypes;
TemperatureInput.defaultProps = defaultProps;

export default TemperatureInput;
