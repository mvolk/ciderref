import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn.jsx';
import GuestMenu from './components/GuestMenu.jsx';
import HydrometerCorrectionWizard from './components/HydrometerCorrectionWizard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'SignIn'
    };

    this.handleRequestGuestMenu = this.handleRequestGuestMenu.bind(this);
    this.handleRequestHydrometerCorrection = this.handleRequestHydrometerCorrection.bind(this);
  }

  render() {
    if (this.state.currentView === 'HydrometerCorrectionWizard') {
      return (
        <HydrometerCorrectionWizard refererName="Back to Main Menu" onExit={this.handleRequestGuestMenu} onRequestHome={this.handleRequestGuestMenu} />
      );
    } else if (this.state.currentView === 'SignIn') {
      return (
        <SignIn onRequestGuest={this.handleRequestGuestMenu} />
      );
    } else {
      return (
        <GuestMenu onHydrometerCorrectionClick={this.handleRequestHydrometerCorrection} onRequestHome={() => {}} />
      );
    }
  }

  handleRequestGuestMenu() {
    this.setState({
      currentView: 'GuestMenu'
    });
  }

  handleRequestHydrometerCorrection() {
    this.setState({
      currentView: 'HydrometerCorrectionWizard'
    });
  }
}

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

ReactDOM.render( <App />, document.getElementById('app'));
