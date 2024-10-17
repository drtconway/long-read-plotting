/*
   Copyright 2024 Thomas Conway

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

export type Options = {
    width: number,
    height: number,
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    marginLeft: number,
    gap: number,
    groupBackground: "#fafafa",
    guideColour: "#f0f0f0",
    singleSegments: boolean,
    numTicks: number,
    enableFlipping: boolean,
    randomizeColours: boolean,
};

export const optionDefaults: Options = {
    width: 800,
    height: 600,
    marginTop: 50,
    marginRight: 50,
    marginBottom: 80,
    marginLeft: 80,
    gap: 30,
    groupBackground: "#fafafa",
    guideColour: "#f0f0f0",
    singleSegments: false,
    numTicks: 10,
    enableFlipping: true,
    randomizeColours: false,
  };