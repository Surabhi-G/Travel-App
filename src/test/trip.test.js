import { handleSubmit } from '../client/js/trip'

var jsdom = require('jsdom');

global.document = jsdom();

describe('Test, the function "handleSubmit()" should exist' , () => {
    jsdom();
    test('It should return true', async () => {
        expect(handleSubmit).toBeDefined();
    });
});
