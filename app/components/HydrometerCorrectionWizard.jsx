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
import WizardHeader from './WizardHeader.jsx';
import WizardProgressBar from './WizardProgressBar.jsx';
import SpecificGravityInput from './SpecificGravityInput.jsx';
import TemperatureInput from './TemperatureInput.jsx';
import ResultValue from './ResultValue.jsx';
import WizardContinue from './WizardContinue.jsx';
import BackNavigation from './BackNavigation.jsx';

export default class HydrometerCorrectionWizard extends React.Component {
  constructor(props) {
    super(props);
    this.prompts = [
      'What is the specific gravity indicated by your hydrometer?',
      'What is the temperature of your juice?',
      'What is the calibration temperature of your hydrometer?',
      'The actual specific gravity of your juice is:'
    ];
    this.renderChild = [
      (() => {
        return <SpecificGravityInput value={this.props.model.measuredSpecificGravity}
                                     autoFocus={true}
                                     onChange={this.handleMeasuredSpecificGravityChange}
        />;
      }).bind(this),
      (() => {
        return <TemperatureInput value={this.props.model.measuredTemperature}
                                 autoFocus={true}
                                 units={this.props.preferences.temperature}
                                 onChange={this.handleMeasuredTemperatureChange}
        />;
      }).bind(this),
      (() => {
        return <TemperatureInput value={this.props.model.calibrationTemperature}
                                 autoFocus={true}
                                 units={this.props.preferences.temperature}
                                 onChange={this.handleCalibrationTemperatureChange}
        />;
      }).bind(this),
      (() => {
        return <ResultValue value={this.props.model.correctedSpecificGravity} />;
      }).bind(this)
    ];
    this.handleMeasuredSpecificGravityChange = this.handleMeasuredSpecificGravityChange.bind(this);
    this.handleMeasuredTemperatureChange = this.handleMeasuredTemperatureChange.bind(this);
    this.handleCalibrationTemperatureChange = this.handleCalibrationTemperatureChange.bind(this);
  }

  render() {
    const model = this.props.model;
    const controller = this.props.controller;
    return (
      <div className="wrapper">
        <WizardHeader name="Hydrometer Correction"/>
        <WizardProgressBar progressPercent={25 * model.currentStep} progressRender={3 * model.currentStep}/>
        <div className="row">
          <div className="col-xs-12 wizard-body">
            <p>{this.prompts[model.currentStep - 1]}</p>
            {this.renderChild[model.currentStep - 1]()}
          </div>
        </div>
        <WizardContinue label={model.currentStep == 4 ? model.exitLabel : 'Continue'} onContinue={controller.onContinue}/>
        <BackNavigation label={model.exitLabel} onGoBack={controller.onExit}/>
      </div>
    );
  }

  handleMeasuredSpecificGravityChange(value) {
    this.props.controller.onChange({measuredSpecificGravity: value});
  }

  handleMeasuredTemperatureChange(value) {
    this.props.controller.onChange({measuredTemperature: value});
  }

  handleCalibrationTemperatureChange(value) {
    this.props.controller.onChange({calibrationTemperature: value});
  }
}
