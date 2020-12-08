class Model {
    constructor() {
        this.coordinates = '',
        this.subscribers = []
    }

    setState(number) {
        this.coordinates = number;
        this.notifyAll()
    }

    notifyAll() {
        return this.subscribers.forEach(subs => subs.inform(this))
    }

    register(observer) {
        this.subscribers.push(observer);
    }
    unregister(observer) {
        this.subscribers = this.subscribers.filter(el => !(el instanceof observer))
    } // filter returns all besides this observer
}

class RangeBtn1 {
    inform(position) {
        console.log(`btn position is: ${position.coordinates}`);
    }
}

const rangeUnit = new Model();

rangeUnit.register(new RangeBtn1()); // subscribe on Model

rangeUnit.setState('1');
rangeUnit.setState('35');