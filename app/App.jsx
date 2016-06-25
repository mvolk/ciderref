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
import SignIn from './components/SignIn.jsx';
import GuestMenu from './components/GuestMenu.jsx';
import HydrometerCorrectionWizard from './components/HydrometerCorrection.jsx';
import PageHeader from './components/PageHeader.jsx';
import PageFooter from './components/PageFooter.jsx';
import PreferencesDialog from './components/PreferencesDialog.jsx';
import Temperature from './Temperature';
import step from './hydrometerCorrectionSteps';

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.defaultViewStates = {
      signIn: {name: 'SignIn'},
      guestMenu: {name: 'GuestMenu'},
      hydrometerCorrection: {
        name: 'HydrometerCorrection',
        exitLabel: 'Back to Main Menu',
        currentStep: step.measuredSpecificGravity,
        measuredSpecificGravity: 1.050,
        measuredTemperature: 15,
        calibrationTemperature: 15,
        correctedSpecificGravity: null
      }
    };

    this.controllers = {
      signIn: {
        onGuestSignIn: () => {
          this.setState({
            currentView: this.defaultViewStates.guestMenu,
            currentController: this.controllers.guestMenu
          });
        }
      },
      guestMenu: {
        onOpenHydrometerCorrection: () => {
          this.setState({
            currentView: this.defaultViewStates.hydrometerCorrection,
            currentController: this.controllers.hydrometerCorrection
          });
        }
      },
      hydrometerCorrection: {
        onOpenHome: () => {
          this.setState({
            currentView: this.defaultViewStates.guestMenu,
            currentController: this.controllers.guestMenu
          });
        },
        onChange: (delta) => {
          this.setState({currentView: Object.assign({}, this.state.currentView, delta)});
        },
        onContinue: () => {
          if (this.state.currentView.currentStep === step.result) {
            this.setState({
              currentView: this.defaultViewStates.guestMenu,
              currentController: this.controllers.guestMenu
            });
          } else {
            let currentStep = this.state.currentView.currentStep;
            currentStep++;
            this.setState({currentView: Object.assign({}, this.state.currentView, {currentStep})});
          }
        },
        onExit: () => {
          this.setState({
            currentView: this.defaultViewStates.guestMenu,
            currentController: this.controllers.guestMenu
          });
        },
        onPreferencesChange: (newPreferences) => {
          if (newPreferences.temperature !== this.state.preferences.temperature) {
            const oldT = this.state.preferences.temperature;
            const newT = newPreferences.temperature;
            const measuredTemperature =
              newT.fromReference(oldT.toReference(this.state.currentView.measuredTemperature));
            const calibrationTemperature =
              newT.fromReference(oldT.toReference(this.state.currentView.calibrationTemperature));
            return Object.assign({}, this.state.currentView, {measuredTemperature, calibrationTemperature});
          }
          return this.state.currentView;
        }
      }
    };

    // Bind the controller functions to the App context
    for (let i = 0; i < this.controllers.length; i++) {
      const controller = this.controllers[i];
      for (let j = 0; j < controller.length; j++) {
        controller[j] = controller[j].bind(this);
      }
    }

    this.state = {
      currentView: this.defaultViewStates.signIn,
      currentController: this.controllers.signIn,
      preferences: {
        open: false,
        temperature: Temperature.units.celsius
      }
    };

    this.handleOpenPreferences = this.handleOpenPreferences.bind(this);
    this.handleClosePreferences = this.handleClosePreferences.bind(this);
  }

  render () {
    if (this.state.currentView.name === 'SignIn') {
      return <SignIn
        model={this.state.currentView}
        controller={this.state.currentController}
      />;
    }
    return (
      <div className="container">
        <PageHeader
          onOpenPreferences={this.handleOpenPreferences}
          onOpenHome={this.state.currentController.onOpenHome}
        />
        {this.getBody()}
        <PageFooter />
        <PreferencesDialog
          open={this.state.preferences.open}
          preferences={this.state.preferences}
          onClose={this.handleClosePreferences}
        />
      </div>
    );
  }

  getBody () {
    if (this.state.currentView.name === 'GuestMenu') {
      return <GuestMenu
        model={this.state.currentView}
        controller={this.state.currentController}
      />;
    } else if (this.state.currentView.name === 'HydrometerCorrection') {
      return <HydrometerCorrectionWizard
        model={this.state.currentView}
        controller={this.state.currentController}
        preferences={this.state.preferences}
      />;
    }
    return null;
  }

  handleOpenPreferences () {
    const preferences = Object.assign({}, this.state.preferences, {open: true});
    this.setState({preferences});
  }

  handleClosePreferences (newPrefs) {
    const preferences = Object.assign({}, newPrefs ? newPrefs : this.state.preferences, {open: false});
    if (this.state.currentController.onPreferencesChange) {
      const currentView = this.state.currentController.onPreferencesChange(preferences, this.state.currentView);
      this.setState({preferences, currentView});
    } else {
      this.setState({preferences});
    }
  }
}
