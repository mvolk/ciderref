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
import PageHeaderContainer from '../containers/PageHeaderContainer';
import WizardHeader from './WizardHeader';
import WizardProgressBar from './WizardProgressBar';
import SpecificGravityInput from './SpecificGravityInput';
import TemperatureInput from './TemperatureInput';
import ResultValue from './ResultValue';
import WizardContinue from './WizardContinue';
import BackNavigation from './BackNavigation';
import PageFooter from './PageFooter';

const NUMBER_OF_STEPS = 4;
const NUMBER_OF_COLUMNS = 12;
const COLUMNS_PER_STEP = NUMBER_OF_COLUMNS / NUMBER_OF_STEPS;
const PROGRESS_TOTAL = 100;
const PROGRESS_PER_STEP = PROGRESS_TOTAL / NUMBER_OF_STEPS;
const PROMPTS = [
  '',
  'What is the specific gravity indicated by your hydrometer?',
  'What is the temperature of your juice?',
  'What is the calibration temperature of your hydrometer?',
  'The actual specific gravity of your juice is:',
];

function DynamicChild(props) {
  switch (props.currentStep) {
    case 1:
      return (
        <SpecificGravityInput
          value={props.reading}
          autoFocus
          onChange={props.onChangeReading}
        />
      );
    case 2:
      return (
        <TemperatureInput
          value={props.temperature.getValue(props.preferredTemperatureUnits)}
          autoFocus
          units={props.preferredTemperatureUnits}
          onChange={props.onChangeTemperature}
        />
      );
    case 3:
      return (
        <TemperatureInput
          value={props.calibrationTemperature.getValue(props.preferredTemperatureUnits)}
          autoFocus
          units={props.preferredTemperatureUnits}
          onChange={props.onChangeCalibrationTemperature}
        />
      );
    case 4:
      return (
        <ResultValue value={props.correctedReading} />
      );
    default:
      return null;
  }
}

DynamicChild.propTypes = {
  onChangeReading: React.PropTypes.func.isRequired,
  onChangeTemperature: PropTypes.func.isRequired,
  onChangeCalibrationTemperature: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  temperature: PropTypes.shape().isRequired,
  calibrationTemperature: PropTypes.shape().isRequired,
  reading: React.PropTypes.number.isRequired,
  correctedReading: PropTypes.number.isRequired,
  preferredTemperatureUnits: PropTypes.shape({
    label: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
  }).isRequired,
};

const propTypes = {
  onContinue: PropTypes.func.isRequired,
  onExit: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  exitLabel: PropTypes.string.isRequired,
};

function HydrometerCorrection(props) {
  return (
    <div className="wrapper">
      <PageHeaderContainer />
      <WizardHeader name="Hydrometer Correction" />
      <WizardProgressBar
        progressPercent={PROGRESS_PER_STEP * props.currentStep}
        progressRender={COLUMNS_PER_STEP * props.currentStep}
      />
      <div className="row">
        <div className="col-xs-12 wizard-body">
          <p>{PROMPTS[props.currentStep]}</p>
          <DynamicChild {...props} />
        </div>
      </div>
      <WizardContinue
        label={props.currentStep === NUMBER_OF_STEPS ? props.exitLabel : 'Continue'}
        onContinue={props.currentStep === NUMBER_OF_STEPS ? props.onExit : props.onContinue}
      />
      <BackNavigation label={props.exitLabel} onGoBack={props.onExit} />
      <PageFooter />
    </div>
  );
}

HydrometerCorrection.propTypes = propTypes;

export default HydrometerCorrection;
