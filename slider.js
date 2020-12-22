class ModelSlider {
    constructor(slider_name, placement) {
        this.slider_name = slider_name;
        this.placement = placement;
    }
    
    getCoords(elem) {
        return {
            top: elem.position().top + pageYOffset,
            left: elem.position().left + pageXOffset
        };
    } 

    settings(min, max, btn1Value, btn2Value, pace, position) {
        return (
            this.min = min,
            this.max = max,
            this.btn1Value = btn1Value,
            this.btn2Value = btn2Value,
            this.pace = pace,
            this.position = position
        )
    }

    setSlider() {
        let slider_name = this.slider_name;
        this.slider = $(`<div id = "${slider_name}__range-slider" class="range__slider">`);
        this.between = $(`<div id = "${slider_name}__slider-range" class="range__slider-range"></div>`); 
        this.btn_1 = $(`<button id = "${slider_name}__btn_1" class="range__btn_1"></button>`);
        this.btn_2 = $(`<button id = "${slider_name}__btn_2" class="range__btn_2"></button>`);
        this.value_box = $(`<div id = "${slider_name}__textbox" class="range__textbox"></div>`)
        this.input_1 = $(`<input id = "${slider_name}__input1" class = "range__input-1" type="text">`);
        this.input_2 = $(`<input id = "${slider_name}__input2" class = "range__input-2" type="text">`);
    }

    betweenSetting = () => {
        let between_width = this.btn_2.offset().left - this.btn_1.offset().left;
        let between_shift = this.btn_1.css('left');
        this.between.css({'width': between_width + 'px', 'left': between_shift});
    }

    betweenSettingVert = () => {
        let between_height = this.btn_2.offset().top - this.btn_1.offset().top;
        let between_shift = this.btn_1.css('top');
        this.between.css({'height': between_height + 'px', 'top': between_shift});
    }

    getProps() {
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
        }
    }
}

class ControllerSlider {
    constructor(model) {
        this.props = model.getProps();
    }
    
    inputValue = () => {
        let props = this.props;
        let sliderSize = (props.position === 'vertical') ? props.slider.height() : props.slider.outerWidth();
        console.log(sliderSize);
        let shiftUnit = (props.max - props.min) / sliderSize;
        this.shiftUnit = Math.ceil(shiftUnit); // ratio of slider width and min-max width
        console.log('pace:' + this.shiftUnit);
    }
    renderInputValue = (i) => {
        let props = this.props;
        let maxShift = props.max / this.shiftUnit;
        if (this['shift_btn_' + i] <= props.min) { // limit value on boundaries of slider
            this['shift_btn_' + i] =  props.min;
        };
        if (this['shift_btn_' + i] >= maxShift) { // limit value on boundaries of slider
            this['shift_btn_' + i] =  maxShift;
        };

        let value = this.shiftUnit * this['shift_btn_' + i];

        let roundValue = () => { // round value for input
            if (props.pace !== 1 &&  props.pace !== 0) {
                return Math.round(value / props.pace)* props.pace;
            } else {
                return value;
            }
        };
        let roundedValue = roundValue();

        props['input_' + i].val(roundedValue);
    }

    move_btn_1_vert = (event) => {
        let props = this.props;
        let sliderCoords = props.getCoords(props.slider);
        let shift_btn_1 = event.pageY - sliderCoords.top - props.btn_1.height() / 2 ;
        this.shift_btn_1 = shift_btn_1;
        
        let top1 = sliderCoords.top;
        let bottom1 = props.btn_2.position().top;

        props.btn_1.css({'top': shift_btn_1  + 'px'});

        if (props.btn_1.offset().top > bottom1) {
            props.btn_1.css({'top': props.btn_2.css('top') - 100 + 'px'});
        }
        if(props.btn_1.offset().top < top1){
            props.btn_1.css({'top': 0 + 'px'});
        }
        props.betweenSettingVert();
        this.renderInputValue(1);

        props.btn_1.ondragstart = function() {
          return false;
        };
    }

    move_btn_1 = (event) => {
        let props = this.props;
        let sliderCoords = props.getCoords(props.slider);
        let shift_btn_1 = event.pageX - sliderCoords.left - props.btn_1.innerWidth() / 2 ;
        this.shift_btn_1 = shift_btn_1;
        
        let left1 = sliderCoords.left;
        let right1 = props.btn_2.position().left;

        props.btn_1.css({'left': shift_btn_1  + 'px'});

        if (props.btn_1.offset().left > right1) {
            props.btn_1.css({'left': props.btn_2.css('left') - 100 + 'px'});
        }
        if(props.btn_1.offset().left < left1){
            props.btn_1.css({'left': 0 + 'px'});
        }
        props.betweenSetting();
        this.renderInputValue(1);

        props.btn_1.ondragstart = function() {
          return false;
        };
    }

    
    move_btn_2_vert = (event) => {
        let props = this.props;
        let sliderCoords = props.getCoords(props.slider);
        let shift_btn_2 = event.pageY - sliderCoords.top - props.btn_2.innerHeight() / 2 - parseInt(props.btn_2.css('marginTop')); 
        this.shift_btn_2 = shift_btn_2;
        props.btn_2.css({'top': shift_btn_2  + 'px'});

        let top2 = props.btn_1.position().top;
        let bottom2 = sliderCoords.top + props.slider.outerHeight();

        let max_top = parseInt(props.slider.css('height')) - parseInt(props.btn_2.css('marginTop'));

        if (props.btn_2.offset().top > bottom2) {
            props.btn_2.css({'top': max_top + 'px'});
        }
        if(props.btn_2.offset().top < top2){
            props.btn_2.css({'top': props.btn_1.css('top')});
        }

        props.betweenSettingVert();
        this.renderInputValue(2);

        props.btn_2.ondragstart = function() {
          return false;
        };
    }

    move_btn_2 = (event) => {
        let props = this.props;
        let sliderCoords = props.getCoords(props.slider);
        let shift_btn_2 = event.pageX - sliderCoords.left - props.btn_2.innerWidth() / 2 - parseInt(props.btn_2.css('marginLeft')); 
        this.shift_btn_2 = shift_btn_2;
        props.btn_2.css({'left': shift_btn_2  + 'px'});

        let left2 = props.btn_1.position().left;
        let right2 = sliderCoords.left + props.slider.outerWidth();

        let max_left = parseInt(props.slider.css('width')) - parseInt(props.btn_2.css('marginLeft'));

        if (props.btn_2.offset().left > right2) {
            props.btn_2.css({'left': max_left + 'px'});
        }
        if(props.btn_2.offset().left < left2){
            props.btn_2.css({'left': props.btn_1.css('left')});
        }

        props.betweenSetting();
        this.renderInputValue(2);

        props.btn_2.ondragstart = function() {
          return false;
        };
    }

    renderSlider() {
        let props = this.props;
        props.slider.appendTo(props.placement);
        props.btn_1.appendTo(props.slider);
        props.btn_2.appendTo(props.slider);
    }
}

class ViewSlider {
    constructor(controller) {
        this.controller = controller;
        this.props = controller.props;
    }
    userActions() {
        let props = this.props;
    }
}

class ViewBtn extends ViewSlider {
    btnMove() {
        let props = this.props;
        let vert = () => {
            props.btn_1.css({'top': props.btn1Value / this.controller.shiftUnit  + 'px'});
            props.btn_2.css({'top': props.btn2Value / this.controller.shiftUnit + 'px'});
    
            props.btn_1.on('mousedown', () => {
                props.btn_1.on('mousemove', this.controller.move_btn_1_vert);
                props.btn_1.on('mouseup', () => {
                    props.btn_1.off('mousemove', this.controller.move_btn_1_vert);
                });
            });
            props.btn_2.on('mousedown', () => {
                props.btn_2.on('mousemove', this.controller.move_btn_2_vert);
                props.btn_2.on('mouseup', () => {
                    props.btn_2.off('mousemove', this.controller.move_btn_2_vert);
                });
            });
        }
        if (props.position === 'vertical' ) {
            vert();
        } else {
            props.btn_1.css({'left': props.btn1Value / this.controller.shiftUnit  + 'px'});
            props.btn_2.css({'left': props.btn2Value / this.controller.shiftUnit + 'px'});
    
            props.btn_1.on('mousedown', () => {
                props.btn_1.on('mousemove', this.controller.move_btn_1);
                props.btn_1.on('mouseup', () => {
                    props.btn_1.off('mousemove', this.controller.move_btn_1);
                });
            });
            props.btn_2.on('mousedown', () => {
                props.btn_2.on('mousemove', this.controller.move_btn_2);
                props.btn_2.on('mouseup', () => {
                    props.btn_2.off('mousemove', this.controller.move_btn_2);
                });
            });
        }

    }
}

class Input extends ViewSlider {
    renderInput() {
        let props = this.props;
        props.value_box.appendTo(props.placement);
        props.input_1.appendTo(props.value_box);
        props.input_2.appendTo(props.value_box);
        let value_1 = props.pace !== 1 &&  props.pace !== 0 ? Math.round(props.btn1Value / props.pace) * props.pace : props.btn2Value;
        props.input_1.val(value_1);
        props.input_2.val(props.btn2Value);
    }
}

class Between extends ViewSlider {
    betweenChange() {
        let props = this.props;
        props.between.appendTo(props.slider);
        (props.position === 'vertical') ? props.betweenSettingVert() : props.betweenSetting();
    }
}

let createSlider = (name, place, min = 0, max = 5000, btn1Value = 500, btn2Value = 1500, pace = 50, position = 'horizontal') => {
    let model = new ModelSlider(name, place);
    model.setSlider();
    model.settings( min, max, btn1Value, btn2Value, pace, position);
    let controller = new ControllerSlider(model);
    controller.renderSlider();
    controller.inputValue();

    let view = new ViewSlider(controller);
    let viewBtn = new ViewBtn(controller);
    viewBtn.btnMove();

    let input = new Input(controller);
    input.renderInput();
    let between = new Between(controller);
    between.betweenChange();
}
createSlider('id-name', $('#range-1'));
createSlider('name-name', $('#range-2'), min = 0, max = 2000, 100, 2300);
createSlider('$', $('#range-3'), 0,2000, 50, 1500, 10, 'vertical');
createSlider('&', $('#range-4'), 0,3000, 300, 2400, 100, 'vertical');