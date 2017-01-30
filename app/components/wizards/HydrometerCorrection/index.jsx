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
import { Hydrometer } from 'ciderlib';
import units, { CELSIUS, FAHRENHEIT } from 'ciderlib/units';
import { PreferencesShape } from '../../../shapes';
import inputParameters from '../../../helpers/inputParameters';
import roundToNearest from '../../../helpers/roundToNearest';
import Wizard from '../../layout/Wizard';
import SpecificGravityInput from '../../io/SpecificGravityInput';
import TemperatureInput from '../../io/TemperatureInput';
import SpecificGravityValue from '../../io/SpecificGravityValue';

const NUMBER_OF_STEPS = 4;
const LAST_STEP = NUMBER_OF_STEPS;

export default class HydrometerCorrection extends React.Component {
  static propTypes = {
    preferences: PreferencesShape.isRequired,
    referrerName: PropTypes.string.isRequired,
    onExit: PropTypes.func.isRequired,
  };

  state = {
    currentStep: 1,
    specificGravityReading: 1.040,
    temperatureReading: {
      value: 68,
      units: FAHRENHEIT,
    },
    calibrationTemperature: {
      value: 68,
      units: FAHRENHEIT,
    },
    correctedReading: Number.NaN,
  };

  handleContinue = () => {
    if (this.state.currentStep === NUMBER_OF_STEPS) {
      this.props.onExit();
    } else if (this.state.currentStep === 3) {
      this.setState({
        ...this.state,
        currentStep: this.state.currentStep + 1,
        correctedReading: this.calculateCorrectedReading(),
      });
    } else {
      this.setState({
        ...this.state,
        currentStep: this.state.currentStep + 1,
      });
    }
  };

  calculateCorrectedReading = () => {
    const { calibrationTemperature, temperatureReading, specificGravityReading } = this.state;
    const hydrometer = new Hydrometer(units.convert(calibrationTemperature).to(CELSIUS));
    const atTemperature = units.convert(temperatureReading).to(CELSIUS);

    return hydrometer.correctedReading(specificGravityReading, atTemperature);
  };

  handleSpecificGravityReadingChange = (value) => {
    this.setState({
      ...this.state,
      specificGravityReading: value,
    });
  };

  handleTemperatureReadingChange = ({ value, units: unitsOfMeasurement }) => {
    this.setState({
      ...this.state,
      temperatureReading: { value, units: unitsOfMeasurement },
    });
  };

  handleCalibrationTemperatureChange = ({ value, units: unitsOfMeasurement }) => {
    this.setState({
      ...this.state,
      calibrationTemperature: { value, units: unitsOfMeasurement },
    });
  };

  render() {
    const exitLabel = `Back to ${this.props.referrerName}`;
    const continueLabel = this.state.currentStep === LAST_STEP ? exitLabel : 'Continue';
    const temperatureUnits = this.props.preferences.units.temperature;
    const temperatureParameters = inputParameters[temperatureUnits.key];
    const resolution = temperatureParameters.resolution;
    const {
      specificGravityReading,
      temperatureReading,
      calibrationTemperature,
      correctedReading,
    } = this.state;

    return (
      <Wizard
        name="Hydrometer Correction"
        numberOfSteps={NUMBER_OF_STEPS}
        currentStep={this.state.currentStep}
        canContinue
        onContinue={this.handleContinue}
        continueLabel={continueLabel}
        canExit
        onExit={this.props.onExit}
        exitLabel={exitLabel}
      >
        {this.state.currentStep === 1 && (
          <div>
            <p>What is the specific gravity indicated by your hydrometer?</p>
            <SpecificGravityInput
              value={specificGravityReading}
              autoFocus
              onChange={this.handleSpecificGravityReadingChange}
            />
          </div>
        )}
        {this.state.currentStep === 2 && (
          <div>
            <p>What is the temperature of your juice?</p>
            <TemperatureInput
              value={
                roundToNearest(units.convert(temperatureReading).to(temperatureUnits), resolution)
              }
              autoFocus
              units={temperatureUnits}
              parameters={temperatureParameters}
              onChange={this.handleTemperatureReadingChange}
            />
          </div>
        )}
        {this.state.currentStep === 3 && (
          <div>
            <p>What is the calibration temperature of your hydrometer?</p>
            <TemperatureInput
              value={
                roundToNearest(
                  units.convert(calibrationTemperature).to(temperatureUnits), resolution)
              }
              autoFocus
              units={temperatureUnits}
              parameters={temperatureParameters}
              onChange={this.handleCalibrationTemperatureChange}
            />
          </div>
        )}
        {this.state.currentStep === LAST_STEP && (
          <div>
            <p>The actual specific gravity of your juice is:</p>
            <SpecificGravityValue value={correctedReading} />
          </div>
        )}
      </Wizard>
    );
  }
}
