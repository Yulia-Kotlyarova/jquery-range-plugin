let OMVC = {};

OMVC.makeObservableSubject = function () {
    let observers = [];
    let addObserver = function (o) {
        if (typeof o !== 'function') {
            throw new Error('observer must be a function');
        }
        for (let i = 0; i < observers.length; i += 1) {
            let observer = observers[i];
            if (observer === o) {
                throw new Error('observer already in the list');
            }
        }
        observers.push(o);
    };
    let removeObserver = function (o) {
        for (let i = 0; i < observers.length; i += 1) {
            let observer = observers[i];
            if (observer === o) {
                observers.splice(i, 1);
                return;
            }
        }
        throw new Error('could not find observer in list of observers');
    };
    let notifyObservers = function (data) {
        // Make a copy of observer list in case the list
        // is mutated during the notifications.
        let observersSnapshot = observers.slice(0);
        for (let i = 0; i < observersSnapshot.length; i += 1) {
            observersSnapshot[i](data);
        }
    };
    return {
        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers,
        // notify: notifyObservers
    };
};

OMVC.Model = function () {
    let that = this;
    let items = [];
    this.modelChangedSubject = OMVC.makeObservableSubject();
    this.addItem = function (value) {
        if (!value) {
            return;
        } else {
            items.push(value);
            that.modelChangedSubject.notifyObservers();
        }
    };
    this.removeCurrentItem = function () {
        if (that.selectedIndex === -1) {
             return;
        } else {
            items.splice(that.selectedIndex, 1);
            that.modelChangedSubject.notifyObservers();
        }
    };
    this.getItems = function () {
        return items;
    };
    this.selectedIndex = -1;
    this.getSelectedIndex = function () {
        return that.selectedIndex;
    }
    this.setSelectedIndex = function (value) {
        that.selectedIndex = value;
        that.modelChangedSubject.notifyObservers();
    }
};

OMVC.Controller = function (model) {
    // view.buttonAdd.bind('click', function () {
    //     model.addItem(prompt('addvalue'));
    // });
    // view.buttonRemove.bind('click', function () {
    //     model.removeCurrentItem();
    // });
    // view.select.bind('click', function () {
    //    model.setSelectedIndex(view.select[0].selectedIndex);
    // });
    model.modelChangedSubject.addObserver(function () {
        let items = model.getItems();
        let innerHTML = '';
        for (let i = 0; i<items.length; i += 1) {
             innerHTML += "<option>"+items[i]+"</option>";
        }
        that.select.html(innerHTML);
    });
    addItem = function (value) {
        if (!value) {
            return;
        } else {
            model.items.push(value);
            model.modelChangedSubject.notifyObservers();
        }
    };
    removeCurrentItem = function () {
        if (that.selectedIndex === -1) {
             return;
        } else {
            model.items.splice(that.selectedIndex, 1);
            model.that.modelChangedSubject.notifyObservers();
        }
    };
    getItems = function () {
        return items;
    };
}; 

OMVC.View = function (controller, placeForAdd) {
    // console.log(controller);
    let that = this;
    that.select = $('<select/>').appendTo(placeForAdd);
    that.select.attr('size', '4');
    that.buttonAdd = $('<button>+</button>').appendTo(placeForAdd).height(20);
    that.buttonRemove = $('<button>-</button>').appendTo(placeForAdd).height(20);

    that.buttonAdd.bind('click', function () {
        controller.addItem(prompt('add value'));
    });
    that.buttonRemove.bind('click', function () {
        controller.removeCurrentItem();
    });
    that.select.bind('click', function () {
       controller.setSelectedIndex(view.select[0].selectedIndex);
    });
    // model.modelChangedSubject.addObserver(function () {
    //     let items = model.getItems();
    //     let innerHTML = '';
    //     for (let i = 0; i<items.length; i += 1) {
    //          innerHTML += "<option>"+items[i]+"</option>";
    //     }
    //     that.select.html(innerHTML);
    // });
};

$(document).ready(function () {
    let model = new OMVC.Model();
    let controller = new OMVC.Controller(model);
    console.log(model);
    let view = new OMVC.View(controller, $('<div/>').appendTo($("body")));
});

console.log(OMVC);

