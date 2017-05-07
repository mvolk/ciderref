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

import React, { PropTypes } from 'react';
import { routerShape } from 'react-router/lib/PropTypes';

import Button from '../layout/Button';
import ButtonGroup from '../layout/ButtonGroup';
import HeaderRow from '../layout/HeaderRow';
import Page from '../layout/Page';
import Spacing from '../layout/Spacing';
import TemperatureUnitsSelect from '../../components/io/TemperatureUnitsSelect';
import { PreferencesShape } from '../../shapes';

class Preferences extends React.Component {
  static propTypes = {
    preferences: PreferencesShape.isRequired,
    setPreferences: PropTypes.func.isRequired,
    router: routerShape.isRequired,
  };

  constructor(props) {
    super();
    this.state = { preferences: props.preferences };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ preferences: newProps.preferences });
  }

  handleClosePreferences = () => {
    this.props.router.goBack();
  };

  handleSavePreferences = () => {
    this.props.setPreferences(this.state.preferences);
    this.handleClosePreferences();
  };

  handleTemperatureUnitsChange = (newUnits) => {
    this.setState({
      preferences: {
        ...this.state.preferences,
        units: {
          ...this.state.units,
          temperature: newUnits,
        },
      },
    });
  };

  render() {
    const { preferences } = this.state;

    return (
      <Page withHomeOption={false} withPreferencesOption={false}>
        <HeaderRow label="Your Preferences" />
        <Spacing top={10}>
          <label>Temperature in:</label>
          <TemperatureUnitsSelect
            value={preferences.units.temperature}
            onChange={this.handleTemperatureUnitsChange}
          />
        </Spacing>
        <Spacing top={10}>
          <ButtonGroup>
            <Button onClick={this.handleSavePreferences}>
              Save
            </Button>
            <Button onClick={this.handleClosePreferences} secondary>
              Cancel
            </Button>
          </ButtonGroup>
        </Spacing>
      </Page>
    );
  }
}

export default Preferences;
