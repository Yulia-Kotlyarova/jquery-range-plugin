const { ModelSlider, ControllerSlider, ViewBtn, Between, Input, createSlider} = require('../model.js');

test('return slider', () => {
    const model = new ModelSlider();
    expect(model).toBeTruthy();
    const coordinates = model.getCoords($('body'));
    expect(coordinates).toBeDefined();
});
