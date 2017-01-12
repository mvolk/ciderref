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

import places from './places';
import actions from './actions';
import Temperature from './Temperature';

const initialAppState = {
  place: {
    name: places.SIGN_IN,
  },
  preferencesDialog: false,
  preferences: { units: { temperature: Temperature.units.fahrenheit } },
  hydrometerCorrection: {},
};

const initialHydrometerCorrectionState = {
  hydrometerCorrection: {
    reading: 1.055,
    temperature: new Temperature(68, Temperature.units.fahrenheit),
    calibrationTemperature: new Temperature(68, Temperature.units.fahrenheit),
    correctedReading: 1.055,
  },
};

/**
 * Produces a place shape given a name and optional step attribute.
 * @param {string} name - the place name
 * @param {number} step - (optional) the step number
 * @returns {*} place shape
 */
function generatePlaceModel(name, step) {
  return step ? { place: { name, step } } : { place: { name } };
}

/**
 * Reducer function for the 'FORWARD' navigation action.
 * @param {*} state - the state prior to the navigation action
 * @param {string} destination - the place name to navigate to
 * @returns {*} the state after the navigation action
 */
function forward(state, { destination }) {
  switch (destination) {
    case places.GUEST_MENU:
      return Object.assign({}, state, generatePlaceModel(destination));
    case places.NOT_IMPLEMENTED:
      return Object.assign({}, state, generatePlaceModel(destination));
    case places.HYDROMETER_CORRECTION:
      return Object.assign(
        {},
        state,
        generatePlaceModel(destination, 1), initialHydrometerCorrectionState,
      );
    default:
      return state;
  }
}

/**
 * Reducer function for the 'NEXT' navigation action.
 * @param {*} state - the state prior to the navigation action
 * @returns {*} the state after the navigation action
 */
function next(state) {
  if (state.place.step) {
    const place = Object.assign({}, state.place, { step: state.place.step + 1 });
    return Object.assign({}, state, { place });
  }
  return state;
}

/**
 * Reducer function for the 'BACK' navigation action.
 * @param {*} state - the state prior to the navigation action
 * @param {string} destination - the place name to navigate (back) to
 * @returns {*} the state after the navigation action
 */
function back(state, { destination }) {
  switch (destination) {
    case places.GUEST_MENU:
      return Object.assign({}, state, generatePlaceModel(destination));
    default:
      return state;
  }
}

/**
 * Reducer function for the 'HOME' navigation action.
 * @param {*} state - the state prior to the navigation action
 * @returns {*} the state after the navigation action
 */
function home(state) {
  return Object.assign({}, state, generatePlaceModel(places.GUEST_MENU));
}

/**
 * Reducer function for the 'OPEN_PREFERENCES' navigation action.
 * @param {*} state - the state prior to the navigation action
 * @returns {*} the state after the navigation action
 */
function openPreferences(state) {
  return Object.assign({}, state, { preferencesDialog: true });
}

/**
 * Reducer function for the 'CLOSE_PREFERENCES' navigation action.
 * @param {*} state - the state prior to the navigation action
 * @returns {*} the state after the navigation action
 */
function closePreferences(state) {
  return Object.assign({}, state, { preferencesDialog: false });
}

/**
 * Reducer function for the 'CHANGE_PREFERENCES' state change action.
 * @param {*} state - the state prior to the state change action
 * @param {*} preferences - the new preferences state
 * @returns {*} the state after the state change action
 */
function changePreferences(state, { preferences }) {
  return Object.assign({}, state, { preferences });
}

/**
 * Placeholder for future hydrometer correction function.
 * @returns {string} 'Not Implemented'
 */
function calculateCorrectedHydrometerReading() {
  return 'Not Implemented';
}

/**
 * Reducer function for the 'CHANGE_HYDROMETER_READING' state change action.
 * @param {object} state - the state prior to the state change action
 * @param {number} specificGravity - the new hydrometer reading
 * @returns {object} the state after the state change action
 */
function changeHydrometerReading(state, { specificGravity }) {
  if (state.place.name === places.HYDROMETER_CORRECTION) {
    const hydrometerCorrection = Object.assign({}, state.hydrometerCorrection);
    hydrometerCorrection.reading = specificGravity;
    hydrometerCorrection.correctedReading =
      calculateCorrectedHydrometerReading(hydrometerCorrection);
    return Object.assign({}, state, { hydrometerCorrection });
  }
  return state;
}

/**
 * Reducer function for the 'CHANGE_HYDROMETER_CALIBRATION_TEMPERATURE' state change action.
 * @param {object} state - the state prior to the state change action
 * @param {number} temperature - the new hydrometer calibration temperature
 * @returns {object} the state after the state change action
 */
function changeHydrometerCalibrationTemperature(state, { temperature }) {
  if (state.place.name === places.HYDROMETER_CORRECTION) {
    const hydrometerCorrection = Object.assign({}, state.hydrometerCorrection);
    hydrometerCorrection.calibrationTemperature = temperature;
    hydrometerCorrection.correctedReading =
      calculateCorrectedHydrometerReading(hydrometerCorrection);
    return Object.assign({}, state, { hydrometerCorrection });
  }
  return state;
}

/**
 * Reducer function for the 'CHANGE_TEMPERATURE' state change action.
 * @param {object} state - the state prior to the state change action
 * @param {number} temperature - the new temperature
 * @returns {object} the state after the state change action
 */
function changeTemperature(state, { temperature }) {
  if (state.place.name === places.HYDROMETER_CORRECTION) {
    const hydrometerCorrection = Object.assign({}, state.hydrometerCorrection);
    hydrometerCorrection.temperature = temperature;
    hydrometerCorrection.correctedReading =
      calculateCorrectedHydrometerReading(hydrometerCorrection);
    return Object.assign({}, state, { hydrometerCorrection });
  }
  return state;
}

const reducerMap = {};
reducerMap[actions.FORWARD] = forward;
reducerMap[actions.NEXT] = next;
reducerMap[actions.BACK] = back;
reducerMap[actions.HOME] = home;
reducerMap[actions.OPEN_PREFERENCES] = openPreferences;
reducerMap[actions.CLOSE_PREFERENCES] = closePreferences;
reducerMap[actions.CHANGE_PREFERENCES] = changePreferences;
reducerMap[actions.CHANGE_HYDROMETER_READING] = changeHydrometerReading;
reducerMap[actions.CHANGE_HYDROMETER_CALIBRATION_TEMPERATURE] =
  changeHydrometerCalibrationTemperature;
reducerMap[actions.CHANGE_TEMPERATURE] = changeTemperature;

const app = (state = initialAppState, action) => {
  if (action) {
    const reducer = reducerMap[action.type];
    if (reducer) {
      return reducer(state, action);
    }
  }
  return state;
};

export default app;
