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

const boilingInCelsius = 100;
const freezingInCelsius = 0;
const boilingInFahrenheit = 212;
const freezingInFahrenheit = 32;
const nearestTenthRoundingFactor = 10;
const celsiusToFahrenheitFactor = 9 / 5;        // eslint-disable-line no-magic-numbers
const fahrenheitToCelsiusFactor = 5 / 9;        // eslint-disable-line no-magic-numbers
const degreesSymbol = String.fromCharCode(176); // eslint-disable-line no-magic-numbers

const temperature = {
  celsius: {
    key: 'celsius',
    name: 'Celsius',
    label: `${degreesSymbol}C`,
    minValue: freezingInCelsius,
    maxValue: boilingInCelsius,
    step: 0.1,
    toReference: (c) => c,
    fromReference: (c) => c
  },
  fahrenheit: {
    key: 'fahrenheit',
    name: 'Fahrenheit',
    label: `${degreesSymbol}F`,
    minValue: freezingInFahrenheit,
    maxValue: boilingInFahrenheit,
    step: 1,
    toReference: (f) => {
      const c = (f - freezingInFahrenheit) * fahrenheitToCelsiusFactor;
      // round to nearest tenth of degree C
      return Math.round(c * nearestTenthRoundingFactor) / nearestTenthRoundingFactor;
    },
    fromReference: (c) => {
      const f = (c * celsiusToFahrenheitFactor) + freezingInFahrenheit;
      // round to nearest degree F
      return Math.round(f);
    }
  }
};

export {temperature};
