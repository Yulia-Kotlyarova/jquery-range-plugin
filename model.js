// MODEL

// class Model {
//     constructor() {
//         // this.sliderList = [],
//         this.sliderInfo = {}
//     }

//     // coordinates(sliderName, xValue, yValue) {
//     //     const name = sliderName.getName();

//     //     console.log((`X: ${xValue}. Y ${yValue}`));
//     //     console.log(`name of slider: ${name}`);
//     //     this.addToSliderList(name);
//     // }

//     // addToSliderList(name) {
//     //     this.sliderList.push(name);
//     // }
//     // getSliderList() {
//     //     return this.sliderList;
//     // }
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

