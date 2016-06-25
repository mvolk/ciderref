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
import NavigationHeader from './NavigationHeader';
import NavigationItem from './NavigationItem';

export default class GuestMenu extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <NavigationHeader label="Calculators:"/>
        <NavigationItem label="Hydrometer Correction" onClick={this.props.controller.onOpenHydrometerCorrection}/>
        <NavigationItem label="Sulphite Treatment" onClick={this.props.controller.onOpenNotImplemented}/>
        <NavigationItem label="Chaptalization" onClick={this.props.controller.onOpenNotImplemented}/>
        <NavigationItem label="Backsweetening" onClick={this.props.controller.onOpenNotImplemented}/>
        <NavigationHeader label="Recipes:"/>
        <NavigationItem label="5% Sulphite Solution" onClick={this.props.controller.onOpenNotImplemented}/>
      </div>
    );
  }
}

GuestMenu.propTypes = {
  controller: React.PropTypes.shape(
    {
      onOpenHydrometerCorrection: React.PropTypes.func.isRequired,
      onOpenNotImplemented: React.PropTypes.func.isRequired
    }).isRequired
};
