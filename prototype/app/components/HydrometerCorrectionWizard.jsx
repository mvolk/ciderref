import React from 'react';
import ReactDOM from 'react-dom';
import PageHeader from './PageHeader.jsx';
import WizardHeader from './WizardHeader.jsx';
import WizardProgressBar from './WizardProgressBar.jsx';
import SpecificGravityInput from './SpecificGravityInput.jsx';
import TemperatureInput from './TemperatureInput.jsx';
import ResultValue from './ResultValue.jsx';
import WizardContinue from './WizardContinue.jsx';
import BackNavigation from './BackNavigation.jsx';
import PageFooter from './PageFooter.jsx';

class HydrometerCorrectionWizard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            measuredSpecificGravity: 1.045,
            measuredTemperature: 15,
            calibrationTemperature: 15
        };

        this.handleContinue = this.handleContinue.bind(this);
    }
    render() {
        return (
            <div className="container">
                <PageHeader />
                <WizardHeader name="Hydrometer Correction" />
                <WizardProgressBar progressPercent={25 * this.state.step} progressRender={3 * this.state.step} />
                <div className="row">
                    <div className="col-xs-12 wizard-body">
                        <p>{this.getPrompt()}</p>
                        {this.getChild()}
                    </div>
                </div>
                <WizardContinue label={this.getContinueLabel()} onContinue={this.handleContinue} />
                <BackNavigation label={this.props.refererName} onClick={this.props.onExit} />
                <PageFooter />
            </div>
        );
    }
    getPrompt() {
        var step = this.state.step;
        if (step === 1) {
            return 'What is the specific gravity indicated by your hydrometer?';
        } else if (step === 2) {
            return 'What is the temperature of your juice?';
        } else if (step === 3) {
            return 'What is the calibration temperature of your hydrometer?';
        } else if (step == 4) {
            return 'The actual specific gravity of your juice is:';
        }
    }
    getChild() {
        var step = this.state.step;
        if (step === 1) {
            return <SpecificGravityInput value={this.state.measuredSpecificGravity} onChange={this.setMeasuredSpecificGravity} />;
        } else if (step === 2) {
            return <TemperatureInput value={this.state.measuredTemperature} onChange={this.setMeasuredTemperature} />;
        } else if (step === 3) {
            return <TemperatureInput value={this.state.calibrationTemperature} onChange={this.setCalibrationTemperature} />;
        } else if (step == 4) {
            return <ResultValue value={this.getCorrectedSpecificGravity()} />;
        }
    }
    getContinueLabel() {
        return this.state.step === 4 ? 'Done' : 'Continue';
    }
    getCorrectedSpecificGravity() {
        return 'Not Implemented';
    }
    setMeasuredSpecificGravity(value) {
        this.state.measuredSpecificGravity = value;
        this.setState(this.state);
    }
    setMeasuredTemperature(value) {
        this.state.measuredTemperature = value;
        this.setState(this.state);
    }
    setCalibrationTemperature(value) {
        this.state.calibrationTemperature = value;
        this.setState(this.state);
    }
    handleContinue() {
        var nextStep = this.state.step + 1;
        if (nextStep == 5) {
            this.props.onExit();
        } else {
            this.state.step = this.state.step + 1;
            this.setState(this.state);
        }
    }
}

const handleExit = () => {
    window.location = "guest.html";
};

if (document.getElementById('hydrometerCorrectionWizard')) {
    ReactDOM.render(<HydrometerCorrectionWizard refererName="Main Menu" onExit={handleExit}/>, document.getElementById('hydrometerCorrectionWizard'));
}
