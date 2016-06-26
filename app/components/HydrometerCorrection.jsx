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
import WizardHeader from './WizardHeader';
import WizardProgressBar from './WizardProgressBar';
import SpecificGravityInput from './SpecificGravityInput';
import TemperatureInput from './TemperatureInput';
import ResultValue from './ResultValue';
import WizardContinue from './WizardContinue';
import BackNavigation from './BackNavigation';

const numberOfSteps = 4;
const numberOfColumns = 12;
const columnsPerStep = numberOfColumns / numberOfSteps;
const progressTotal = 100;
const progressPerStep = progressTotal / numberOfSteps;

export default class HydrometerCorrectionWizard extends React.Component {
  constructor (props) {
    super(props);
    this.prompts = [
      '',
      'What is the specific gravity indicated by your hydrometer?',
      'What is the temperature of your juice?',
      'What is the calibration temperature of your hydrometer?',
      'The actual specific gravity of your juice is:'
    ];
    this.renderChild = [
      () => null,
      () => <SpecificGravityInput value={this.props.model.measuredSpecificGravity}
                                  autoFocus={true}
                                  onChange={this.handleMeasuredSpecificGravityChange}
            />,
      () => <TemperatureInput value={this.props.model.measuredTemperature
                                .getValue(this.props.preferences.temperature)}
                              autoFocus={true}
                              units={this.props.preferences.temperature}
                              onChange={this.handleMeasuredTemperatureChange}
            />,
      () => <TemperatureInput value={this.props.model.calibrationTemperature
                                .getValue(this.props.preferences.temperature)}
                              autoFocus={true}
                              units={this.props.preferences.temperature}
                              onChange={this.handleCalibrationTemperatureChange}
            />,
      () => <ResultValue value={this.props.model.correctedSpecificGravity} />
    ];
    this.handleMeasuredSpecificGravityChange = this.handleMeasuredSpecificGravityChange.bind(this);
    this.handleMeasuredTemperatureChange = this.handleMeasuredTemperatureChange.bind(this);
    this.handleCalibrationTemperatureChange = this.handleCalibrationTemperatureChange.bind(this);
  }

  render () {
    const model = this.props.model;
    const controller = this.props.controller;
    return (
      <div className="wrapper">
        <WizardHeader name="Hydrometer Correction"/>
        <WizardProgressBar
          progressPercent={progressPerStep * model.currentStep}
          progressRender={columnsPerStep * model.currentStep}
        />
        <div className="row">
          <div className="col-xs-12 wizard-body">
            <p>{this.prompts[model.currentStep]}</p>
            {this.renderChild[model.currentStep].bind(this)()}
          </div>
        </div>
        <WizardContinue
          label={model.currentStep === numberOfSteps ? model.exitLabel : 'Continue'}
          onContinue={controller.onContinue}
        />
        <BackNavigation label={model.exitLabel} onGoBack={controller.onExit}/>
      </div>
    );
  }

  handleMeasuredSpecificGravityChange (value) {
    this.props.controller.onChange({measuredSpecificGravity: value});
  }

  handleMeasuredTemperatureChange (value) {
    this.props.controller.onChange({measuredTemperature: value});
  }

  handleCalibrationTemperatureChange (value) {
    this.props.controller.onChange({calibrationTemperature: value});
  }
}

HydrometerCorrectionWizard.propTypes = {
  controller: React.PropTypes.shape({
    onChange: React.PropTypes.func.isRequired,
    onExit: React.PropTypes.func.isRequired
  }).isRequired,
  model: React.PropTypes.shape({
    currentStep: React.PropTypes.number.isRequired,
    exitLabel: React.PropTypes.string.isRequired,
    measuredSpecificGravity: React.PropTypes.number.isRequired,
    measuredTemperature: React.PropTypes.shape().isRequired,
    calibrationTemperature: React.PropTypes.shape().isRequired,
    // eslint-disable-next-line consistent-return
    correctedSpecificGravity: (props, propName, componentName) => {
      if (props.currentStep === numberOfSteps && !props[propName]) {
        return new Error(`Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`);
      }
    }
  }).isRequired,
  preferences: React.PropTypes.shape({temperature: React.PropTypes.object.isRequired}).isRequired
};
