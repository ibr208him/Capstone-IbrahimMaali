/**
 * @jest-environment jsdom
 */
const analyzeWeather = require("../src/server/analyzeWeather.js");
describe('analyzeWeather', ()=> {
    it('returns something', () => {
        expect(analyzeWeather).toBeDefined();
    })
})
