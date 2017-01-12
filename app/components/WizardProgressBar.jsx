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

const COLUMN_COUNT = 12;

const propTypes = {
  progressRender: PropTypes.number.isRequired,
  progressPercent: PropTypes.number.isRequired,
};

function ProgressElement({ progressRender, progressPercent }) {
  const className =
    progressRender === COLUMN_COUNT ? 'wizard-progress-done' : 'wizard-progress-not-done';

  return (
    <div className={`col-xs-${progressRender} wizard-progress-so-far ${className}`}>
      {progressPercent}%
    </div>
  );
}

ProgressElement.propTypes = propTypes;

function ProgressRemainingElement({ progressRender }) {
  const className = progressRender === COLUMN_COUNT
    ? ''
    : `col-xs-${COLUMN_COUNT - progressRender} wizard-progress-remaining`;

  return (
    <div className={className} />
  );
}

ProgressRemainingElement.propTypes = {
  progressRender: PropTypes.number.isRequired,
};

function WizardProgressBar({ progressRender, progressPercent }) {
  return (
    <div className="row">
      <ProgressElement progressRender={progressRender} progressPercent={progressPercent} />
      <ProgressRemainingElement progressRender={progressRender} />
    </div>
  );
}

WizardProgressBar.propTypes = propTypes;

export default WizardProgressBar;
