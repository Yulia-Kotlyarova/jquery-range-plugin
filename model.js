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
        let unit = elem.getBoundingClientRect();
        return {
            top: unit.top + pageYOffset,
            left: unit.left + pageXOffset
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

        let input = $(`<input id='${name}' class='range__input1' type='number' min='20' max='700'>
        - <input id='id66i2' class='range__input2' type='number' min='20' max='700'>`).appendTo(placeForAdd);

        let move = (event) => {
            let sliderCoords = this.getCoords($('range-1'));
            let between = $('range__slider-range');
            let betweenCoords = this.getCoords(between); 
            let buttonCoords1 = this.getCoords(this.btn_1);
            let buttonCoords2 = this.getCoords(this.btn_2);
            let shift_1 = event.pageX - buttonCoords1.left;
            let shift_2 = event.pageX - buttonCoords2.left; 
            // this.btn_1.offset({top:`${top}`, left:`${event.pageY}`});
            let left1 = event.pageX - shift_1 - sliderCoords.left;
                let right1 = slider.offsetWidth - this.btn_1.offsetWidth;
                if (left1 < 0) left1 = 0;
                if (left1 > right1) left1 = right1;
                this.btn_1.style.marginLeft = left1 + 'px';  
                
                
                shift_2 = event.pageX - buttonCoords2.left; 
                let left2 = event.pageX - shift_2 - sliderCoords.left;
                let right2 = slider.offsetWidth - button2.offsetWidth;
                if (left2 < 0) left2 = 0;
                if (left2 > right2) left2 = right2;            
                
                    let per_min = 0;
                    let per_max = 0;
                if (left1 > left2) {
                    between.style.width = (left1-left2) + 'px';
                    between.style.marginLeft = left2 + 'px';
                    
                    per_min = left2*100/(slider.offsetWidth-this.btn_1.offsetWidth);
                    per_max = left1*100/(slider.offsetWidth-this.btn_1.offsetWidth);
                } else {
                    between.style.width = (left2-left1) + 'px';
                    between.style.marginLeft = left1 + 'px';                
                    
                    per_min = left1*100/(slider.offsetWidth-this.btn_1.offsetWidth);
                    per_max = left2*100/(slider.offsetWidth-this.btn_1.offsetWidth);
                };
                    input1.value= (parseInt(min)+Math.round((max-min)*per_min/100));
                    input2.value= (parseInt(min)+Math.round((max-min)*per_max/100)); 
            
        };

        this.btn_1.on('mousedown', (event) => {
            // let diff = this.btn_1.position().left - this.btn_1.offset().left;
            // this.btn_1.offset({top:`${top}`, left:`${event.pageY + diff}`});
            this.btn_1.off('onmouseup', move);
            this.btn_1.on('mousemove', move);
            return false;
        });
    }
};

$(document).ready(function () {
    let model = new ModelSlider($('.range__slider'));

    model.coordinates(110, 290);
    let controller = new ControllerSlider(model);
    let view = new ViewSlider(controller);
    view.renderLayout();
});


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

