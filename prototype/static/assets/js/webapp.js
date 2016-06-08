var HydrometerCorrectionWizard = React.createClass({
    render: function() {
        return (
            <div className="container">
                <PageHeader />
                <WizardHeader />
                <WizardProgressBar />
                <HydrometerCorrectionWizardBody />
                <WizardContinue />
                <BackNavigation />
                <PageFooter />
            </div>
        );
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
                <div className="col-xs-12 h4 wizard-header">Hydrometer Correction</div>
            </div>
        );
    }
});

var WizardProgressBar = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-3 wizard-progress-so-far wizard-progress-not-done">25%</div>
                <div className="col-xs-9 wizard-progress-remaining"></div>
            </div>
        );
    }
});

var HydrometerCorrectionWizardBody = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 wizard-body">
                    <p>What is the specific gravity indicated by your hydrometer?</p>
                    <input type="number" defaultValue="1.049" min="0.990" max="1.099" step="0.001" />
                </div>
            </div>
        );
    }
});

var WizardContinue = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-xs-12 wizard-nav">
                    <input type="submit" value="Continue" onclick="window.location='hydrometerCorrection2of4.html';" />
                </div>
            </div>
        );
    }
});

var BackNavigation = React.createClass({
    render: function() {
        return (
            <div className="row">
                <a href="guest.html"><div className="col-md-12 h5 nav-back">Main Menu</div></a>
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

ReactDOM.render(
    <HydrometerCorrectionWizard />,
    document.getElementById('webapp')
);