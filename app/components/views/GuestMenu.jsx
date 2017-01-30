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
import { routerShape } from 'react-router/lib/PropTypes';
import {
  CALC_HYDROMETER,
  CALC_SULPHITE,
  CALC_CHAPTALIZATION,
  CALC_BACKSWEETENING,
  RECIPE_5PCT_SULPHITE_SOLN,
} from '../../routes';
import NavigationHeaderRow from '../navigation/NavigationHeaderRow';
import NavigationItemRow from '../navigation/NavigationItemRow';
import PageContainer from '../../containers/PageContainer';

const propTypes = {
  router: routerShape.isRequired,
};

function GuestMenu({ router }) {
  return (
    <PageContainer>
      <NavigationHeaderRow label="Calculators:" />
      <NavigationItemRow
        label="Hydrometer Correction"
        onClick={() => router.push(CALC_HYDROMETER)}
      />
      <NavigationItemRow
        label="Sulphite Treatment"
        onClick={() => router.push(CALC_SULPHITE)}
      />
      <NavigationItemRow
        label="Chaptalization"
        onClick={() => router.push(CALC_CHAPTALIZATION)}
      />
      <NavigationItemRow
        label="Backsweetening"
        onClick={() => router.push(CALC_BACKSWEETENING)}
      />
      <NavigationHeaderRow label="Recipes:" />
      <NavigationItemRow
        label="5% Sulphite Solution"
        onClick={() => router.push(RECIPE_5PCT_SULPHITE_SOLN)}
      />
    </PageContainer>
  );
}

GuestMenu.propTypes = propTypes;

export default GuestMenu;
