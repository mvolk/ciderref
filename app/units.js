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

const temperature = {
  celsius: {
    key: 'celsius',
    name: 'Celsius',
    label: String.fromCharCode(176) + 'C',
    minValue: 0,
    maxValue: 100,
    step: 0.1,
    toReference: (temperature) => {
      return temperature;
    },
    fromReference: (temperature) => {
      return temperature;
    }
  },
  fahrenheit: {
    key: 'fahrenheit',
    name: 'Fahrenheit',
    label: String.fromCharCode(176) + 'F',
    minValue: 32,
    maxValue: 212,
    step: 1,
    toReference: (temperature) => {
      // round to nearest tenth of a reference degree (celsius)
      return Math.round((temperature - 32) * 5 / 9 * 10) / 10;
    },
    fromReference: (temperature) => {
      // round to the nearest whole degree (fahrenheit)
      return Math.round(((temperature * 9 / 5) + 32));
    }
  }
};

export { temperature };