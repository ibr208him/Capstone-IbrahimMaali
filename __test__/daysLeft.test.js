/**
 * @jest-environment jsdom
 */

import { daysLeft } from "../src/client/js/daysLeft.js"

describe('daysLeft', ()=> {
    it('returns something', () => {
        expect(daysLeft).toBeDefined();
    })
})
