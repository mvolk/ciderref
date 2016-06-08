
var HydrometerCorrectionWizard = React.createClass({
    getInitialState: function () {
        return {
            step: 1
        };
    },
    render: function() {
        return (
            <div className="container">
                <PageHeader />
                <WizardHeader name="Hydrometer Correction" />
                <WizardProgressBar progressPercent={25 * this.state.step} progressRender={3 * this.state.step} />
                <HydrometerCorrectionWizardBody prompt={this.getPrompt()}>
                    {this.getChild()}
                </HydrometerCorrectionWizardBody>
                <WizardContinue label={this.getContinueLabel()} onContinue={this.handleContinue} />
                <BackNavigation label={this.props.refererName} onClick={this.props.onExit} />
                <PageFooter />
            </div>
        );
    },
    getPrompt: function() {
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
    },
    getChild: function() {
        var step = this.state.step;
        if (step === 1) {
            return <SpecificGravityInput />;
        } else if (step === 2) {
            return <TemperatureInput />;
        } else if (step === 3) {
            return <TemperatureInput />;
        } else if (step == 4) {
            return <ValueResult value="1.048" />;
        }
    },
    getContinueLabel: function() {
        return this.state.step === 4 ? 'Done' : 'Continue';
    },
    handleContinue: function() {
        var nextStep = this.state.step + 1;
        if (nextStep == 5) {
            this.props.onExit();
        } else {
            this.setState({
                step: nextStep
            });
        }
    }
});

var PageHeader = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 h3 page-head">
                    <a href=""><img src="assets/images/icon-gear-48.png" className="settings-icon" /></a>
                    <a href="guest.html"><img src="assets/images/apple.png" className="logo-icon" />CiderRef</a>
                </div>
            </div>
        );
    }
});

var WizardHeader = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 h4 wizard-header">{this.props.name}</div>
            </div>
        );
    }
});

var WizardProgressBar = React.createClass({
    render: function() {
        return (
            <div className="row">
                {this.getProgressElement()}
                {this.getProgressRemainingElement()}
            </div>
        );
    },
    getProgressElement: function() {
        var className = this.props.progressRender === 12 ? 'wizard-progress-done' : 'wizard-progress-not-done';
        return (
            <div className={'col-xs-' + this.props.progressRender + ' wizard-progress-so-far ' + className}>{this.props.progressPercent}%</div>
        );
    },
    getProgressRemainingElement: function() {
        if (this.props.progressRender == 12) {
            return (
                <div />
            );
        } else {
            return (
                <div className={'col-xs-' + (12 - this.props.progressRender) + ' wizard-progress-remaining'}></div>
            );
        }
    }
});

var HydrometerCorrectionWizardBody = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 wizard-body">
                    <p>{this.props.prompt}</p>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var SpecificGravityInput = React.createClass({
    render: function() {
        return (
            <input type="number" defaultValue="1.049" min="0.990" max="1.099" step="0.001" />
        );
    }
});

var TemperatureInput = React.createClass({
    render: function() {
        return (
            <div>
                <input type="number" defaultValue="15" min="0" max="100" step="1" /> &deg;C
            </div>
        );
    }
});

var ValueResult = React.createClass({
    render: function() {
        return (
            <p className="h4">{this.props.value}</p>
        );
    }
});

var WizardContinue = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 wizard-nav">
                    <input type="submit" value={this.props.label} onClick={this.props.onContinue} />
                </div>
            </div>
        );
    }
});

var BackNavigation = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12 h5 nav-back" onClick={this.props.onClick}>{this.props.label}</div>
            </div>
        );
    }
});

var PageFooter = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 footer">
                    <p>Copyright &copy; 2016 Michael Volk</p>
                </div>
            </div>
        );
    }
});

var backToGuest = function () {
    window.location = "guest.html";
};

ReactDOM.render(
    <HydrometerCorrectionWizard refererName="Main Menu" onExit={backToGuest}/>,
    document.getElementById('webapp')
);
