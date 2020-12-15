class Model {
    constructor() {
        this.items = [];
        this.observers = [];
        // this = makeObservableSubject();
        this.selectedIndex = -1;
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

    addItem = function (value) {
        if (!value) {
            return;
        } else {
            this.items.push(value);
            this.notifyObservers();
        }
    };
    removeCurrentItem = function () {
        if (this.selectedIndex === -1) {
             return;
        } else {
            this.items.splice(this.selectedIndex, 1);
            this.notifyObservers();
        }
    };
    getItems = function () {
        return this.items;
    };
    
    getSelectedIndex = function () {
        return this.selectedIndex;
    }
    setSelectedIndex = function (value) {
        this.selectedIndex = value;
        this.notifyObservers();
    }
};

class Controller {
    constructor (model) {
        this.model = model;
    }
    actionAddObserver = (o) => this.model.addObserver(() => {
            // debugger
            let items = this.model.getItems();
            let innerHTML = '';
            for (let i = 0; i< items.length; i += 1) {
                 innerHTML += "<option>"+ items[i]+"</option>";
            };
            o.html(innerHTML);
        })
    actionAddItem = (o) => {
        // debugger
        this.model.addItem(o);
    }
    actionRemoveItem = () => this.model.removeCurrentItem();
    actionGetItems = () => this.model.getItems();
    getSelectedIndex = () => this.model.getSelectedIndex;
    setSelectedIndex = (index) => this.model.setSelectedIndex(index)

};

class View {
    constructor(controller, placeForAdd) {
        this.controller = controller;
        this.placeForAdd = placeForAdd;
    }
    renderLayout = () => {
        let select = $('<select/>').appendTo(this.placeForAdd);
        select.attr('size', '4');
        let buttonAdd = $('<button>+</button>').appendTo(this.placeForAdd).height(20);
        let buttonRemove = $('<button>-</button>').appendTo(this.placeForAdd).height(20);
        // console.log(controller);
    
        buttonAdd.bind('click', () => {
            this.controller.actionAddItem(prompt('add value'));
            this.controller.actionAddObserver(select);
        });
        buttonRemove.bind('click', () => {
            this.controller.actionRemoveItem();
        });
        select.bind('click', () => {
            this.controller.setSelectedIndex(select[0].selectedIndex);
        });
        this.controller.actionAddObserver(select);
    }


};

$(document).ready(function () {
    let model = new Model();
    let controller = new Controller(model);
    let view = new View(controller, $('<div/>').appendTo($("body")));
    view.renderLayout();

});





// let OMVC = {};

// OMVC.makeObservableSubject = function () {
//     let observers = [];
//     let addObserver = function (o) {
//         if (typeof o !== 'function') {
//             throw new Error('observer must be a function');
//         }
//         for (let i = 0; i < observers.length; i += 1) {
//             let observer = observers[i];
//             if (observer === o) {
//                 throw new Error('observer already in the list');
//             }
//         }
//         observers.push(o);
//     };
//     let removeObserver = function (o) {
//         for (let i = 0; i < observers.length; i += 1) {
//             let observer = observers[i];
//             if (observer === o) {
//                 observers.splice(i, 1);
//                 return;
//             }
//         }
//         throw new Error('could not find observer in list of observers');
//     };
//     let notifyObservers = function (data) {
//         // Make a copy of observer list in case the list
//         // is mutated during the notifications.
//         let observersSnapshot = observers.slice(0);
//         for (let i = 0; i < observersSnapshot.length; i += 1) {
//             observersSnapshot[i](data);
//         }
//     };
//     return {
//         addObserver: addObserver,
//         removeObserver: removeObserver,
//         notifyObservers: notifyObservers,
//         // notify: notifyObservers
//     };
// };

// OMVC.Model = function () {
//     let that = this;
//     let items = [];
//     this.modelChangedSubject = OMVC.makeObservableSubject();
//     this.addItem = function (value) {
//         if (!value) {
//             return;
//         } else {
//             items.push(value);
//             that.modelChangedSubject.notifyObservers();
//         }
//     };
//     this.removeCurrentItem = function () {
//         console.log(that.selectedIndex);
//         if (that.selectedIndex === -1) {
//              return;
//         } else {
//             items.splice(that.selectedIndex, 1);
//             that.modelChangedSubject.notifyObservers();
//         }
//     };
//     this.getItems = function () {
//         return items;
//     };
//     this.selectedIndex = -1;
//     this.getSelectedIndex = function () {
//         return that.selectedIndex;
//     }
//     this.setSelectedIndex = function (value) {
//         that.selectedIndex = value;
//         that.modelChangedSubject.notifyObservers();
//     }
// };

// OMVC.Controller = function (model) {
//     let that = this;
//     this.actionAddObserver = (select) => model.modelChangedSubject.addObserver(function () {
//         let items = model.getItems();
//         let innerHTML = '';
//         for (let i = 0; i<items.length; i += 1) {
//              innerHTML += "<option>"+items[i]+"</option>";
//         }
//         select.html(innerHTML);
//     });
//     this.actionAddItem = (o) => model.addItem(o);
//     this.actionRemoveItem = () => model.removeCurrentItem();
//     this.actionGetItems =  model.getItems();
//     this.getSelectedIndex = model.getSelectedIndex;
//     this.setSelectedIndex = (index) => model.setSelectedIndex(index)
// }; 

// OMVC.View = function (controller, placeForAdd) {
//     let that = this;
//     that.select = $('<select/>').appendTo(placeForAdd);
//     that.select.attr('size', '4');
//     that.buttonAdd = $('<button>+</button>').appendTo(placeForAdd).height(20);
//     that.buttonRemove = $('<button>-</button>').appendTo(placeForAdd).height(20);

//     that.buttonAdd.on('click', function () {
//         controller.actionAddItem(prompt('add value'));
//     });
//     that.buttonRemove.on('click', function () {
//         controller.actionRemoveItem();
//     });
//     that.select.on('click', function () {
//         controller.setSelectedIndex(that.select[0].selectedIndex);
//     });
//     controller.actionAddObserver(that.select);
// };

// $(document).ready(function () {
//     let model = new OMVC.Model();
//     let controller = new OMVC.Controller(model);
//     let view = new OMVC.View(controller, $('<div/>').appendTo($("body")));
// });
