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

const propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  step: PropTypes.number,
};

const defaultProps = {
  autoFocus: false,
  minValue: 0.990,
  maxValue: 1.100,
  step: 0.001,
};

function SpecificGravityInput({ value, onChange, autoFocus, minValue, maxValue, step }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => {
        e.stopPropagation();
        onChange(Number(e.target.value));
      }}
      autoFocus={autoFocus}
      min={minValue}
      max={maxValue}
      step={step}
    />
  );
}

SpecificGravityInput.propTypes = propTypes;
SpecificGravityInput.defaultProps = defaultProps;

export default SpecificGravityInput;
