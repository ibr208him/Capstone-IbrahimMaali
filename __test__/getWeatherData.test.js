/**
 * @jest-environment jsdom
 */

import { getWeatherData } from "../src/client/js/getWeatherData.js"

describe('getWeatherData', ()=> {
    it('returns something', () => {
        expect(getWeatherData).toBeDefined();
    })
})
