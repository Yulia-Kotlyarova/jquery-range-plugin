var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ModelSlider = /** @class */ (function () {
    function ModelSlider(slider_name, placement) {
        var _this = this;
        this.slider_name = slider_name;
        this.placement = placement;
        this.betweenSetting = function () {
            var between_width = _this.btn_2.offset().left - _this.btn_1.offset().left;
            var between_shift = _this.btn_1.css('left');
            _this.between.css({ 'width': between_width + 'px', 'left': between_shift });
        };
        this.betweenSettingVert = function () {
            var between_height = _this.btn_2.offset().top - _this.btn_1.offset().top;
            var between_shift = _this.btn_1.css('top');
            _this.between.css({ 'height': between_height + 'px', 'top': between_shift });
        };
    }
    ModelSlider.prototype.getCoords = function (elem) {
        return {
            top: elem.position().top + pageYOffset,
            left: elem.position().left + pageXOffset
        };
    };
    ModelSlider.prototype.settings = function (min, max, btn1Value, btn2Value, pace, position) {
        return (this.min = min,
            this.max = max,
            this.btn1Value = btn1Value,
            this.btn2Value = btn2Value,
            this.pace = pace,
            this.position = position);
    };
    ModelSlider.prototype.setSlider = function () {
        var slider_name = this.slider_name;
        this.slider = $("<div id = \"" + slider_name + "__range-slider\" class=\"range__slider\">");
        this.between = $("<div id = \"" + slider_name + "__slider-range\" class=\"range__slider-range\"></div>");
        this.btn_1 = $("<button id = \"" + slider_name + "__btn_1\" class=\"range__btn_1\"></button>");
        this.btn_2 = $("<button id = \"" + slider_name + "__btn_2\" class=\"range__btn_2\"></button>");
        this.value_box = $("<div id = \"" + slider_name + "__textbox\" class=\"range__textbox\"></div>");
        this.input_1 = $("<input id = \"" + slider_name + "__input1\" class = \"range__input-1\" type=\"text\">");
        this.input_2 = $("<input id = \"" + slider_name + "__input2\" class = \"range__input-2\" type=\"text\">");
    };
    ModelSlider.prototype.getProps = function () {
        return {
            placement: this.placement,
            slider: this.slider,
            between: this.between,
            btn_1: this.btn_1,
            btn_2: this.btn_2,
            value_box: this.value_box,
            input_1: this.input_1,
            input_2: this.input_2,
            slider_name: this.slider_name,
            min: this.min,
            max: this.max,
            pace: this.pace,
            position: this.position,
            btn1Value: this.btn1Value,
            btn2Value: this.btn2Value,
            getCoords: this.getCoords,
            betweenSetting: this.betweenSetting,
            betweenSettingVert: this.betweenSettingVert
        };
    };
    return ModelSlider;
}());
var ControllerSlider = /** @class */ (function () {
    function ControllerSlider(model) {
        var _this = this;
        this.inputValue = function () {
            var props = _this.props;
            var sliderSize = (props.position === 'vertical') ? props.slider.height() : props.slider.outerWidth();
            var shiftUnit = (props.max - props.min) / sliderSize;
            _this.shiftUnit = Math.ceil(shiftUnit); // ratio of slider width and min-max width
            console.log('pace:' + _this.shiftUnit);
        };
        this.renderInputValue = function (i) {
            var props = _this.props;
            var maxShift = props.max / _this.shiftUnit;
            if (_this['shift_btn_' + i] <= props.min) { // limit value on boundaries of slider
                _this['shift_btn_' + i] = props.min;
            }
            ;
            if (_this['shift_btn_' + i] >= maxShift) { // limit value on boundaries of slider
                _this['shift_btn_' + i] = maxShift;
            }
            ;
            var value = _this.shiftUnit * _this['shift_btn_' + i];
            var roundValue = function () {
                if (props.pace !== 1 && props.pace !== 0) {
                    return Math.round(value / props.pace) * props.pace;
                }
                else {
                    return value;
                }
            };
            var roundedValue = roundValue();
            props['input_' + i].val(roundedValue);
        };
        this.move_btn_1_vert = function (event) {
            var props = _this.props;
            var sliderCoords = props.getCoords(props.slider);
            var coordinateEvent;
            var btnSize;
            var keyMin;
            var top1;
            var bottom1;
            if (props.position === 'vertical') {
                coordinateEvent = event.pageY;
                btnSize = props.btn_1.height() / 2;
                top1 = sliderCoords.top;
                bottom1 = props.btn_2.position().top; // TODO DELETE OR DRY FUNCTIONS
                keyMin = "top";
            }
            else {
                coordinateEvent = event.pageX;
                btnSize = props.btn_1.innerWidth() / 2;
                top1 = sliderCoords.left;
                bottom1 = props.btn_2.position().left;
            }
            var shift_btn_1 = coordinateEvent - sliderCoords[keyMin] - btnSize;
            // let shift_btn_1 = event.pageY - sliderCoords.top - props.btn_1.innerHeight() / 2 ;
            _this.shift_btn_1 = shift_btn_1;
            // let top1 = sliderCoords.top;
            // let bottom1 = props.btn_2.position().top;
            props.btn_1.css({ 'top': shift_btn_1 + 'px' });
            if (props.btn_1.offset()[keyMin] > bottom1) {
                props.btn_1.css({ keyMin: props.btn_2.css(keyMin) - 100 + 'px' });
            }
            if (props.btn_1.offset()[keyMin] < top1) {
                props.btn_1.css({ keyMin: 0 + 'px' });
            }
            props.betweenSettingVert();
            _this.renderInputValue(1);
            props.btn_1.ondragstart = function () {
                return false;
            };
        };
        this.move_btn_1 = function (event) {
            var props = _this.props;
            var sliderCoords = props.getCoords(props.slider);
            var shift_btn_1 = event.pageX - sliderCoords.left - props.btn_1.innerWidth() / 2;
            _this.shift_btn_1 = shift_btn_1;
            var left1 = sliderCoords.left;
            var right1 = props.btn_2.position().left;
            props.btn_1.css({ 'left': shift_btn_1 + 'px' });
            if (props.btn_1.offset().left > right1) {
                props.btn_1.css({ 'left': props.btn_2.css('left') - 100 + 'px' });
            }
            if (props.btn_1.offset().left < left1) {
                props.btn_1.css({ 'left': 0 + 'px' });
            }
            props.betweenSetting();
            _this.renderInputValue(1);
            props.btn_1.ondragstart = function () {
                return false;
            };
        };
        this.move_btn_2_vert = function (event) {
            var props = _this.props;
            var sliderCoords = props.getCoords(props.slider);
            var shift_btn_2 = event.pageY - sliderCoords.top - props.btn_2.innerHeight() / 2 - parseInt(props.btn_2.css('marginTop'));
            _this.shift_btn_2 = shift_btn_2;
            props.btn_2.css({ 'top': shift_btn_2 + 'px' });
            var top2 = props.btn_1.position().top;
            var bottom2 = sliderCoords.top + props.slider.outerHeight();
            var max_top = parseInt(props.slider.css('height')) - parseInt(props.btn_2.css('marginTop'));
            if (props.btn_2.offset().top > bottom2) {
                props.btn_2.css({ 'top': max_top + 'px' });
            }
            if (props.btn_2.offset().top < top2) {
                props.btn_2.css({ 'top': props.btn_1.css('top') });
            }
            props.betweenSettingVert();
            _this.renderInputValue(2);
            props.btn_2.ondragstart = function () {
                return false;
            };
        };
        this.move_btn_2 = function (event) {
            var props = _this.props;
            var sliderCoords = props.getCoords(props.slider);
            var shift_btn_2 = event.pageX - sliderCoords.left - props.btn_2.innerWidth() / 2 - parseInt(props.btn_2.css('marginLeft'));
            _this.shift_btn_2 = shift_btn_2;
            props.btn_2.css({ 'left': shift_btn_2 + 'px' });
            var left2 = props.btn_1.position().left;
            var right2 = sliderCoords.left + props.slider.outerWidth();
            var max_left = parseInt(props.slider.css('width')) - parseInt(props.btn_2.css('marginLeft'));
            if (props.btn_2.offset().left > right2) {
                props.btn_2.css({ 'left': max_left + 'px' });
            }
            if (props.btn_2.offset().left < left2) {
                props.btn_2.css({ 'left': props.btn_1.css('left') });
            }
            props.betweenSetting();
            _this.renderInputValue(2);
            props.btn_2.ondragstart = function () {
                return false;
            };
        };
        this.props = model.getProps();
    }
    ControllerSlider.prototype.renderSlider = function () {
        var props = this.props;
        props.slider.appendTo(props.placement);
        props.btn_1.appendTo(props.slider);
        props.btn_2.appendTo(props.slider);
    };
    return ControllerSlider;
}());
var ViewSlider = /** @class */ (function () {
    function ViewSlider(controller) {
        this.controller = controller;
        this.props = controller.props;
    }
    return ViewSlider;
}());
var ViewBtn = /** @class */ (function (_super) {
    __extends(ViewBtn, _super);
    function ViewBtn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewBtn.prototype.btnMove = function () {
        var props = this.controller.props;
        var onBtnMove = function (onBtn1, onBtn2) {
            props.btn_1.on('mousedown', function () {
                props.btn_1.on('mousemove', onBtn1);
                props.btn_1.on('mouseup', function () {
                    props.btn_1.off('mousemove', onBtn1);
                });
            });
            props.btn_2.on('mousedown', function () {
                props.btn_2.on('mousemove', onBtn2);
                props.btn_2.on('mouseup', function () {
                    props.btn_2.off('mousemove', onBtn2);
                });
            });
        };
        if (props.position === 'vertical') {
            props.btn_1.css({ 'top': props.btn1Value / this.controller.shiftUnit + 'px' });
            props.btn_2.css({ 'top': props.btn2Value / this.controller.shiftUnit + 'px' });
            var onBtn1 = this.controller.move_btn_1_vert;
            var onBtn2 = this.controller.move_btn_2_vert;
            onBtnMove(onBtn1, onBtn2);
        }
        else {
            props.btn_1.css({ 'left': props.btn1Value / this.controller.shiftUnit + 'px' });
            props.btn_2.css({ 'left': props.btn2Value / this.controller.shiftUnit + 'px' });
            var onBtn1 = this.controller.move_btn_1;
            var onBtn2 = this.controller.move_btn_2;
            onBtnMove(onBtn1, onBtn2);
        }
    };
    return ViewBtn;
}(ViewSlider));
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Input.prototype.renderInput = function () {
        var props = this.props;
        props.value_box.appendTo(props.placement);
        props.input_1.appendTo(props.value_box);
        props.input_2.appendTo(props.value_box);
        var value_1 = props.pace !== 1 && props.pace !== 0 ? Math.round(props.btn1Value / props.pace) * props.pace : props.btn2Value;
        props.input_1.val(value_1);
        props.input_2.val(props.btn2Value);
    };
    return Input;
}(ViewSlider));
var Between = /** @class */ (function (_super) {
    __extends(Between, _super);
    function Between() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Between.prototype.betweenChange = function () {
        var props = this.props;
        props.between.appendTo(props.slider);
        (props.position === 'vertical') ? props.betweenSettingVert() : props.betweenSetting();
    };
    return Between;
}(ViewSlider));
var createSlider = function (name, place, min, max, btn1Value, btn2Value, pace, position, test) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 5000; }
    if (btn1Value === void 0) { btn1Value = 500; }
    if (btn2Value === void 0) { btn2Value = 1500; }
    if (pace === void 0) { pace = 50; }
    if (position === void 0) { position = 'horizontal'; }
    if (test === void 0) { test = false; }
    var model = new ModelSlider(name, place);
    model.setSlider();
    model.settings(min, max, btn1Value, btn2Value, pace, position);
    var controller = new ControllerSlider(model);
    controller.renderSlider();
    controller.inputValue();
    var view = new ViewSlider(controller);
    var viewBtn = new ViewBtn(controller);
    viewBtn.btnMove();
    var input = new Input(controller);
    input.renderInput();
    var between = new Between(controller);
    between.betweenChange();
    if (test === true) {
        return { model: model, view: view, controller: controller };
    }
};
createSlider('id-name', $('#range-1'));
createSlider('name-name', $('#range-2'), 0, 2000, 100, 2300);
createSlider('$', $('#range-3'), 0, 2000, 50, 1500, 10, 'vertical');
createSlider('&', $('#range-4'), 0, 3000, 300, 2400, 100, 'vertical');
module.exports = { ModelSlider: ModelSlider, ControllerSlider: ControllerSlider, ViewBtn: ViewBtn, Between: Between, Input: Input, createSlider: createSlider };
