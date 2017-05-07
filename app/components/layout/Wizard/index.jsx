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
import isRequiredIf from 'react-proptype-conditional-require';
import PageHeader from '../Page/Header';
import PageTitle from '../Page/Title';
import ProgressBar from './ProgressBar';
import Continue from './Continue';
import Exit from './Exit';
import PageFooter from '../Page/Footer';
import Row from '../Row';

const propTypes = {
  name: PropTypes.string.isRequired,
  numberOfSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  canContinue: PropTypes.bool,
  onContinue: isRequiredIf(PropTypes.func, props => props.canContinue),
  continueLabel: isRequiredIf(PropTypes.string, props => props.canContinue),
  canExit: PropTypes.bool,
  onExit: isRequiredIf(PropTypes.func, props => props.canExit),
  exitLabel: isRequiredIf(PropTypes.string, props => props.canExit),
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  canContinue: false,
  onContinue: () => {},
  continueLabel: 'Continue',
  canExit: false,
  onExit: () => {},
  exitLabel: 'Exit',
};

function Wizard({
  name,
  numberOfSteps,
  currentStep,
  canContinue,
  onContinue,
  continueLabel,
  canExit,
  onExit,
  exitLabel,
  children,
}) {
  return (
    <div className="container">
      <PageHeader withPreferencesOption />
      <PageTitle name={name} />
      <ProgressBar progressPercent={(currentStep / numberOfSteps) * 100} />
      <Row>
        <div className="col-xs-12 wizard-body">
          {children}
        </div>
      </Row>
      {canContinue && (
        <Continue label={continueLabel} onContinue={onContinue} />
      )}
      {canExit && (
        <Exit label={exitLabel} onExit={onExit} />
      )}
      <PageFooter />
    </div>
  );
}

Wizard.propTypes = propTypes;
Wizard.defaultProps = defaultProps;

export default Wizard;
