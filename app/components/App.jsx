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
import places from '../places';
import SignInContainer from '../containers/SignInContainer';
import GuestMenuContainer from '../containers/GuestMenuContainer';
import HydrometerCorrectionContainer from '../containers/HydrometerCorrectionContainer';
import PreferencesDialogContainer from '../containers/PreferencesDialogContainer';
import NotImplemented from './NotImplemented';

const propTypes = {
  placeName: PropTypes.string.isRequired,
};

function App({ placeName }) {
  return (
    <div className="container">
      {(() => {
        switch (placeName) {
          case places.GUEST_MENU:
            return <GuestMenuContainer />;
          case places.HYDROMETER_CORRECTION:
            return <HydrometerCorrectionContainer />;
          case places.NOT_IMPLEMENTED:
            return <NotImplemented />;
          default:
            return <SignInContainer />;
        }
      })()}
      <PreferencesDialogContainer />
    </div>
  );
}

App.propTypes = propTypes;

export default App;
