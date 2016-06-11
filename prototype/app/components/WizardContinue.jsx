import React from 'react';

class WizardContinue extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-xs-12 wizard-nav">
                    <input type="submit" value={this.props.label} onClick={this.props.onContinue} />
                </div>
            </div>
        );
    }
}

export default WizardContinue;
