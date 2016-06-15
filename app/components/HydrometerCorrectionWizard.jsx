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
