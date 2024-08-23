/**
 * @jest-environment jsdom
 */

import { getPhoto } from "../src/client/js/getPhoto.js"

describe('getPhoto', ()=> {
    it('returns something', () => {
        expect(getPhoto).toBeDefined();
    })
})
