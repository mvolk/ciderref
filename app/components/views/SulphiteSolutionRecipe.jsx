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

import HeaderRow from '../layout/HeaderRow';
import Page from '../layout/Page';
import Spacing from '../layout/Spacing';

function SulphiteSolutionRecipe() {
  // TODO add a calculator that determines how much solution to add to a given volume to get a
  // TODO  given concentration (in 25 ppm increments)
  return (
    <Page>
      <HeaderRow label="5% Sulphite Solution" />
      <Spacing top={10}>
        <p>
          In a 100 ml glass or plastic graduated cylinder, add enough water to 10 grams of
          Potassium Metabisulphite (K<sub>2</sub>S<sub>2</sub>O<sub>5</sub>) to make 100 ml of
          solution after the solids have completely dissolved.
        </p>
        <p>
          Add 1 ml of this solution to 1 liter of juice to get 50 ppm of SO<sub>2</sub>.
        </p>
      </Spacing>
    </Page>
  );
}

export default SulphiteSolutionRecipe;
