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

const SignIn = ({onGuestSignIn}) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12 visible-xs" style={{height: '50px'}}></div>
    </div>
    <div className="row">
      <div className="col-md-12" style={{height: '300px'}}>
        <h1 className="text-center">CiderRef</h1>
        <img
          src="images/apple.png"
          width="125"
          height="125"
          style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
        />
          <h4 className="text-center"><em>Hard cider made easy</em></h4>
      </div>
    </div>
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10 text-center h4 enter-btn">Sign In</div>
      <div className="col-md-1"></div>
    </div>
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10 text-center h4 enter-btn">Register</div>
      <div className="col-md-1"></div>
    </div>
    <div className="row">
      <div className="col-md-1"></div>
      <div className="col-md-10 text-center h4 enter-btn" onClick={onGuestSignIn}>Guest</div>
      <div className="col-md-1"></div>
    </div>
  </div>
);

SignIn.propTypes = {onGuestSignIn: React.PropTypes.func.isRequired};

export default SignIn;
