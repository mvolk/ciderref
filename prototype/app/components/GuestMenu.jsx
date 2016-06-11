import React from "react";
import ReactDOM from 'react-dom';
import PageHeader from './PageHeader.jsx';
import NavigationHeader from './NavigationHeader.jsx';
import NavigationItem from './NavigationItem.jsx';
import PageFooter from './PageFooter.jsx';

class GuestMenu extends React.Component {
    render() {
        return (
            <div className="container">
                <PageHeader />
                <NavigationHeader label="Calculators:" />
                <NavigationItem label="Hydrometer Correction" onClick={this.handleHydrometerCorrectionClick} />
                <NavigationItem label="Sulphite Treatment" onClick={this.handleClickNoOp} />
                <NavigationItem label="Chaptalization" onClick={this.handleClickNoOp} />
                <NavigationItem label="Backsweetening" onClick={this.handleClickNoOp} />
                <NavigationHeader label="Recipes:" />
                <NavigationItem label="5% Sulphite Solution" onClick={this.handleClickNoOp} />
                <PageFooter />
            </div>
        );
    }
    handleHydrometerCorrectionClick() {
        window.location = 'hydrometerCorrection.html';
    }
    handleClickNoOp() {
        window.alert('not implemented');
    }
}

if (document.getElementById('guestMenu')) {
    ReactDOM.render(<GuestMenu />, document.getElementById('guestMenu'));
}