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
import withRouter from 'react-router/lib/withRouter';
import { routerShape } from 'react-router/lib/PropTypes';
import { HOME, PREFERENCES } from '../../../routes';
import Row from '../Row';

class Header extends React.Component {
  static propTypes = {
    withHomeOption: PropTypes.bool,
    withPreferencesOption: PropTypes.bool,
    router: routerShape.isRequired,
  };

  static defaultProps = {
    withHomeOption: true,
    withPreferencesOption: true,
  };

  handleOpenHome = () => {
    this.props.router.push(HOME);
  };

  handleOpenPreferences = () => {
    this.props.router.push(PREFERENCES);
  };

  render() {
    const { withHomeOption, withPreferencesOption, router } = this.props;

    return (
      <Row>
        <div className="col-xs-12 h3 page-header">
          {withPreferencesOption && (
            <img
              src="/images/icon-gear-48.png"
              className="settings-icon link"
              onClick={this.handleOpenPreferences}
            />
          )}
          {!withHomeOption || router.isActive(HOME, true) ? (
            <div>
              <img src="/images/apple.png" className="logo-icon" />CiderRef
            </div>
          ) : (
            <div className="link" onClick={this.handleOpenHome}>
              <img src="/images/apple.png" className="logo-icon" />CiderRef
            </div>
          )}
        </div>
      </Row>
    );
  }
}

export default withRouter(Header);
