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

import {connect} from 'react-redux';
import HydrometerCorrection from '../components/HydrometerCorrection';
import actions from '../actions';
import places from '../places';

const mapStateToProps = (state) => ({
  currentStep: state.place.step,
  exitLabel: 'Guest Menu',
  reading: state.hydrometerCorrection.reading,
  temperature: state.hydrometerCorrection.temperature,
  calibrationTemperature: state.hydrometerCorrection.calibrationTemperature,
  correctedReading: state.hydrometerCorrection.correctedReading,
  preferredTemperatureUnits: state.preferences.units.temperature
});

const mapDispatchToProps = (dispatch) => ({
  onChangeReading: (sg) => {
    dispatch({
      type: actions.CHANGE_HYDROMETER_READING,
      specificGravity: sg
    });
  },
  onChangeTemperature: (t) => {
    dispatch({
      type: actions.CHANGE_TEMPERATURE,
      temperature: t
    });
  },
  onChangeCalibrationTemperature: (t) => {
    dispatch({
      type: actions.CHANGE_HYDROMETER_CALIBRATION_TEMPERATURE,
      temperature: t
    });
  },
  onContinue: () => {
    dispatch({type: actions.NEXT});
  },
  onExit: () => {
    dispatch({
      type: actions.BACK,
      destination: places.GUEST_MENU
    });
  }
});

const HydrometerCorrectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HydrometerCorrection);

export default HydrometerCorrectionContainer;