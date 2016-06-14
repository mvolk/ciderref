import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn.jsx';
import GuestMenu from './components/GuestMenu.jsx';
import HydrometerCorrectionWizard from './components/HydrometerCorrectionWizard.jsx';
import PageHeader from './components/PageHeader.jsx';
import PageFooter from './components/PageFooter.jsx';
import PreferencesDialog from './components/PreferencesDialog.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentView: 'SignIn',
      preferences: {
        dialogOpen: false,
        temperatureUnits: {
          name: 'Celsius',
          label: String.fromCharCode(176) + 'C'
        }
      }
    };

    this.handleOpenPreferences = this.handleOpenPreferences.bind(this);
    this.handleClosePreferences = this.handleClosePreferences.bind(this);
    this.handleRequestGuestMenu = this.handleRequestGuestMenu.bind(this);
    this.handleRequestHydrometerCorrection = this.handleRequestHydrometerCorrection.bind(this);
  }

  render() {
    if (this.state.currentView === 'SignIn') {
      return (
        <SignIn onRequestGuest={this.handleRequestGuestMenu} />
      );
    } else {
      return (
        <div className="container">
          <PageHeader onOpenSettings={this.handleOpenPreferences} />
          {this.getBody()}
          <PageFooter />
          <PreferencesDialog display={this.state.preferences.dialogOpen} onClosePreferences={this.handleClosePreferences} />
        </div>
      )
    }
  }

  getBody() {
    if (this.state.currentView === 'GuestMenu') {
      return (
        <GuestMenu
          onHydrometerCorrectionClick={this.handleRequestHydrometerCorrection}
          onRequestHome={() => {}}
        />
      );
    } else if (this.state.currentView === 'HydrometerCorrectionWizard') {
      return (
        <HydrometerCorrectionWizard
          refererName="Back to Main Menu"
          preferences={this.state.preferences}
          onExit={this.handleRequestGuestMenu}
          onRequestHome={this.handleRequestGuestMenu}
        />
      );
    }
    return null;
  }

  handleOpenPreferences() {
    const preferences = Object.assign({}, this.state.preferences, {dialogOpen: true});
    this.setState({preferences});
  }
  
  handleClosePreferences(newPrefs) {
    const preferences = Object.assign({}, newPrefs ? newPrefs : this.state.preferences, {dialogOpen: false});
    this.setState({preferences});
  }

  handleRequestGuestMenu() {
    this.setState({currentView: 'GuestMenu'});
  }

  handleRequestHydrometerCorrection() {
    this.setState({currentView: 'HydrometerCorrectionWizard'});
  }
}

if (process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

ReactDOM.render( <App />, document.getElementById('app'));
