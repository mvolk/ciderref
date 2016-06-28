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
import PageHeaderContainer from '../containers/PageHeaderContainer';
import WizardHeader from './WizardHeader';
import WizardProgressBar from './WizardProgressBar';
import SpecificGravityInput from './SpecificGravityInput';
import TemperatureInput from './TemperatureInput';
import ResultValue from './ResultValue';
import WizardContinue from './WizardContinue';
import BackNavigation from './BackNavigation';
import PageFooter from './PageFooter';

const numberOfSteps = 4;
const numberOfColumns = 12;
const columnsPerStep = numberOfColumns / numberOfSteps;
const progressTotal = 100;
const progressPerStep = progressTotal / numberOfSteps;

class HydrometerCorrection extends React.Component {
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
      () => <SpecificGravityInput value={this.props.reading}
                                  autoFocus={true}
                                  onChange={this.props.onChangeReading}
            />,
      () => <TemperatureInput value={this.props.temperature.getValue(this.props.preferredTemperatureUnits)}
                              autoFocus={true}
                              units={this.props.preferredTemperatureUnits}
                              onChange={this.props.onChangeTemperature}
            />,
      () => <TemperatureInput value={this.props.calibrationTemperature.getValue(this.props.preferredTemperatureUnits)}
                              autoFocus={true}
                              units={this.props.preferredTemperatureUnits}
                              onChange={this.props.onChangeCalibrationTemperature}
            />,
      () => <ResultValue value={this.props.correctedReading} />
    ];
  }

  render () {
    const props = this.props;
    return (
      <div className="wrapper">
        <PageHeaderContainer />
        <WizardHeader name="Hydrometer Correction"/>
        <WizardProgressBar
          progressPercent={progressPerStep * props.currentStep}
          progressRender={columnsPerStep * props.currentStep}
        />
        <div className="row">
          <div className="col-xs-12 wizard-body">
            <p>{this.prompts[props.currentStep]}</p>
            {this.renderChild[props.currentStep].bind(this)()}
          </div>
        </div>
        <WizardContinue
          label={props.currentStep === numberOfSteps ? props.exitLabel : 'Continue'}
          onContinue={props.currentStep === numberOfSteps ? props.onExit : props.onContinue}
        />
        <BackNavigation label={props.exitLabel} onGoBack={props.onExit}/>
        <PageFooter />
      </div>
    );
  }
}

HydrometerCorrection.propTypes = {
  onChangeReading: React.PropTypes.func.isRequired,
  onChangeTemperature: React.PropTypes.func.isRequired,
  onChangeCalibrationTemperature: React.PropTypes.func.isRequired,
  onContinue: React.PropTypes.func.isRequired,
  onExit: React.PropTypes.func.isRequired,
  currentStep: React.PropTypes.number.isRequired,
  exitLabel: React.PropTypes.string.isRequired,
  reading: React.PropTypes.number.isRequired,
  temperature: React.PropTypes.shape().isRequired,
  calibrationTemperature: React.PropTypes.shape().isRequired,
  correctedReading: React.PropTypes.number.isRequired,
  preferredTemperatureUnits: React.PropTypes.object.isRequired
};

export default HydrometerCorrection;
