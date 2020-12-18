// MODEL

class ModelSlider {
    constructor(placeForAdd, min = 0, max = 3000) {
        // this.items = [];
        // this.observers = [];
        // this.selectedIndex = -1;
        this.sliderInfo = {};
        this.placeForAdd = placeForAdd;
        this.min = min;
        this.max = max;
    }

    coordinates(xValue, yValue) {
        // const name = sliderName.getName();
        console.log((`X: ${xValue} Y: ${yValue}`));
        this.xValue = xValue;
        this.yValue = yValue;
        // console.log(`name of slider: ${name}`);
        // this.addToSliderList(name);
    }
    getPlaceForAdd() {
        return this.placeForAdd;
    }

    addToSliderList(name) {
        this.sliderList.push(name);
    }
    getSliderList() {
        return this.sliderList;
    }

    addToSliderInfo(sliderName, xValue, yValue) {
        // const name = sliderName.getName();
        // let objSlider = {name: name, xValue: xValue, yValue: yValue}
        // this.sliderInfo[name] = objSlider;
        this.xValue = xValue;
        this.yValue = yValue;
    }
    getSliderInfo() {
        // const name = sliderName.getName();
        // return this.sliderInfo[unitName];
        return {
            xValue: this.xValue, yValue: this.yValue, min: this.min, max: this.max
        }
    }

    addObserver =  (o) => {
        if (typeof o !== 'function') {
            throw new Error('observer must be a function');
        } else {
            for (let i = 0; i < this.observers.length; i += 1) {
                let observer = this.observers[i];
                if (observer === o) {
                    throw new Error('observer already in the list');
                }
            }
            this.observers.push(o);
        }
    }
    removeObserver = function (o) {
        for (let i = 0; i < observers.length; i += 1) {
            let observer = observers[i];
            if (observer === o) {
                observers.splice(i, 1);
                return;
            }
        }
        throw new Error('could not find observer in list of observers');
    };
    notifyObservers = function (data) {
        let observersSnapshot = this.observers.slice(0);
        for (let i = 0; i < observersSnapshot.length; i += 1) {
            observersSnapshot[i](data);
        }
    }
};

class ControllerSlider {
    constructor (model) {
        this.model = model;
        this.name = name;

    }

    getName() {
        return this.name;
    }
    getPlacement() {
        return this.model.getPlaceForAdd();
    }

    setCoordinates(xValue, yValue) {
        // this.dealerMediator.coordinates(this, xValue, yValue);
        this.model.addToSliderInfo(this, xValue, yValue);
    }

    getInfo() {
        return this.model.getSliderInfo();
    }
};

class ViewSlider {
    constructor(controller) {
        this.controller = controller;
    }
    getCoords(elem) {
        return {
            top: elem.clientX + pageYOffset,
            left: elem.clientY+ pageXOffset
        };
    } 
    renderLayout = () => {
        let name = 'name';
        let top = this.controller.getInfo().xValue;
        let left = this.controller.getInfo().yValue;
        let min = this.controller.getInfo().min;
        let max = this.controller.getInfo().min;
        let placeForAdd = this.controller.getPlacement();
        let sliderRange = $(`<div class="range__slider-range"></div>`).appendTo(placeForAdd);

        this.btn_1 = $(`<button class="range__slider-handle range__btn-1"></button>`);
        this.btn_1.appendTo(placeForAdd).offset({top:`${top}`, left:`${left}`});
        // this.btn_2 = $(`<button class="range__slider-handle range__btn-2"></button>`);
        // this.btn_2.appendTo(placeForAdd).offset({top:`${top}`, left:`${left}`});

        this.input = $(`<input id='${name}' class='range__input1' type='number' min='20' max='700'>
        - <input id='id66i2' class='range__input2' type='number' min='20' max='700'>`).appendTo(placeForAdd);

        this.slider = $('.range-1');
        this.sliderCoords = this.getCoords($('.range-1'));
        this.between = $('.range__slider-range');
        this.betweenCoords = this.getCoords($('.range__slider-range')); 
        this.shift_1 = this.getCoords($('range__btn-1'));
        this.shift_2 = this.getCoords($('range__btn-2'));
        this.input_1 = $('.range__input1');
        this.input_2 = $('.range__input2');

        let move_btn_1 = (event) => {
            console.log(this.sliderCoords, this.betweenCoords, this.shift_1, this.input_1);
                        // let diff = this.btn_1.position().left - this.btn_1.offset().left;
            // this.btn_1.offset({top:`${top}`, left:`${event.pageY + diff}`});
            this.btn_1.off('onmouseup', move_btn_1);
            this.btn_1.on('mousemove', move_btn_1);
        };


        this.btn_1.on('mousedown', move_btn_1);

        // this.btn_2.on('mousedown', (event) => {
        //     this.btn_2.off('onmouseup', move_btn_2);
        //     this.btn_2.on('mousemove', move_btn_2);
        // });
    }
};

$(document).ready(function () {
    let model = new ModelSlider($('.range__slider'));

    model.coordinates(110, 290);
    let controller = new ControllerSlider(model);
    let view = new ViewSlider(controller);
    view.renderLayout();
});


class Button {
    constructor() {
        
    }
}


// class Model {
//     constructor() {
//         // this.sliderList = [],
//         this.sliderInfo = {}
//     }

//     coordinates(sliderName, xValue, yValue) {
//         const name = sliderName.getName();

//         console.log((`X: ${xValue}. Y ${yValue}`));
//         console.log(`name of slider: ${name}`);
//         this.addToSliderList(name);
//     }

//     addToSliderList(name) {
//         this.sliderList.push(name);
//     }
//     getSliderList() {
//         return this.sliderList;
//     }
//     addToSliderInfo(sliderName, xValue, yValue) {
//         const name = sliderName.getName();
//         let objSlider = {name: name, xValue: xValue, yValue: yValue}
//         this.sliderInfo[name] = objSlider;
//     }
//     getSliderInfo(unitName) {
//         // const name = sliderName.getName();
//         return this.sliderInfo[unitName];
//     }
// }

// class Unit {
//     constructor(name, dealerMediator) {
//         this.name = name;
//         this.dealerMediator = dealerMediator;
//     }

//     getName() {
//         return this.name;
//     }

//     setCoordinates(xValue, yValue) {
//         // this.dealerMediator.coordinates(this, xValue, yValue);
//         this.dealerMediator.addToSliderInfo(this, xValue, yValue);
//     }

//     getCoordinates() {
//         return this.dealerMediator.getSliderInfo(this.name);
//     }
// };

// const mediator = new Model(); // CONTROLLER

// const range1 = new Unit('range1', mediator);
// const range2 = new Unit('range2', mediator);

// range1.setCoordinates('10', '90');
// range2.setCoordinates('5', '77');
// console.log(range1.getCoordinates());
// console.log(range2.getCoordinates());



// class Model {
//     constructor() {
//         this.coordinates = '',
//         this.subscribers = []
//     }

//     setState(number) {
//         this.coordinates = number;
//         this.notifyAll()
//     }

//     notifyAll() {
//         return this.subscribers.forEach(subs => subs.inform(this))
//     }

//     register(observer) {
//         this.subscribers.push(observer);
//     }
//     unregister(observer) {
//         this.subscribers = this.subscribers.filter(el => !(el instanceof observer))
//     } // filter returns all besides this observer

//     setContent(arr) {
//         this.content = `<div class="range__slider-range ${arr}"></div>
//         <button class="range__slider-handle range__btn-1"></button>
//         <button class="range__slider-handle range-btn-2"></button>`;
//     }
//     getContent() {
//         return this.content;
//     }

//     render() {
//         document.html = this.content;
//     }
// }

// class RangeBtn1 {
//     inform(position) {
//         console.log(`btn position is: ${position.coordinates}`);
//     }
// }

// const rangeUnit = new Model();

// rangeUnit.register(new RangeBtn1()); // subscribe on Model

// rangeUnit.setState('1');
// rangeUnit.setState('35');
// console.log(rangeUnit);

