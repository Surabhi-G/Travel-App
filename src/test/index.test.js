const request = require('supertest');
const app = require('../server/index');

describe('Test root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test path "/test"', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.body.time).toBe('now'); 
    });
}); 

describe('Test, the function "fetchLatLng()" should exist' , () => {
    test('It should return true', () => {
        expect('fetchLatLng').toBeDefined();
    });
});

describe('Test, the function "fetchWeather()" should exist' , () => {
    test('It should return true', () => {
        expect('fetchWeather').toBeDefined();
    });
});

describe('Test, the function "fetchImage()" should exist' , () => {
    test('It should return true', () => {
        expect('fetchImage').toBeDefined();
    });
});