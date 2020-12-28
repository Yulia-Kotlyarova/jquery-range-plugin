const { ModelSlider, ControllerSlider, ViewBtn, Between, Input, createSlider} = require('../model.js');

describe ('return slider', () => {
    let model;
    beforeAll(() => {
        model = new ModelSlider('id-name', $('#range-1')); // best practice, test independence from each other
    });

    describe('model', () => {
        test('not empty', () => {
            expect(model).toBeTruthy();
            expect(model).toBeDefined();
        });
        test('getCoords', () => {
            const coordinates = model.getCoords($('body'));
            expect(coordinates).toBeDefined();
            expect(coordinates).toBeInstanceOf(Object) ;
            expect(coordinates).toHaveProperty('left');
            expect(coordinates).toHaveProperty('top');
            expect(coordinates).toEqual(
                expect.objectContaining({
                    left: expect.any(Number),
                    top: expect.any(Number),
                  })
            ) 
        })
        test('settings', () => {
            const settings = model.settings(0,2000, 50, 1500, 10, 'vertical');
            expect(settings).toBeDefined();
            expect(model).toEqual(
                expect.objectContaining({
                    min: expect.any(Number),
                    max: expect.any(Number),
                    btn1Value: expect.any(Number),
                    btn2Value: expect.any(Number),
                    pace: expect.any(Number),
                    position: expect.any(String)
                  })
            ) 
        })
        test('set slider', () => {
            // const result_slider = `<div id = "id-name__range-slider" class="range__slider">`;
            // const result_between = `<div id = "id-name__slider-range" class="range__slider-range"></div>`; 
            // const result_btn_1 = `<button id = "id-name__btn_1" class="range__btn_1"></button>`;
            // const result_btn_2 = `<button id = "id-name__btn_2" class="range__btn_2"></button>`;
            // const result_value_box = `<div id = "id-name__textbox" class="range__textbox"></div>`;
            // const result_input_1 = `<input id = "id-name__input1" class = "range__input-1" type="text">`;
            // const result_input_2 = `<input id = "id-name__input2" class = "range__input-2" type="text">`;
            model.setSlider();

            expect(model).toEqual(
                expect.objectContaining({
                    slider: expect.any(Object),
                    between: expect.any(Object),
                    btn_1: expect.any(Object),
                    btn_2: expect.any(Object),
                    value_box: expect.any(Object),
                    input_1: expect.any(Object),
                    input_2: expect.any(Object)
                  })
            ) 
        })

        describe('controller', () => {
            let controller;
            beforeAll(() => {
                controller = new ControllerSlider(model);
            });
            test('render slider', () => {
                controller.renderSlider();
                expect(model.placement).toBeDefined();
            })
        })

    })

    // describe('view', () => {
    //     test('betweenSetting', () => {
    //         model.setSlider();
    //         model.betweenSetting();
    //         const between = model.between.css;
    //         expect(between.width).toBeDefined();
    //         expect(between.left).toBeDefined();
    //     })
    // })
});

describe('create slider', () => {
    let create;

    beforeAll(() => {
        create = createSlider('id-name', $('#range-1'), 0,2000, 50, 1500, 10, 'vertical', true);
    })

    test('create slider', () => {
        expect(create).toBeDefined();
        expect(create).toBeInstanceOf(Object);
        expect(create).toEqual(
            expect.objectContaining({
                model: expect.any(Object),
                controller: expect.any(Object),
                view: expect.any(Object),
              })
        ) 
    })
});


