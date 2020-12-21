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

    settings(min, max, btn1Value, btn2Value) {
        return (
            this.min = min,
            this.max = max,
            this.btn1Value = btn1Value,
            this.btn2Value = btn2Value
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
            btn1Value: this.btn1Value,
            btn2Value: this.btn2Value,
            getCoords: this.getCoords,
            betweenSetting: this.betweenSetting,
        }
    }
}

class ControllerSlider {
    constructor(model) {
        this.props = model.getProps();
    }
    
    inputValue = () => {
        let shiftUnit = (this.props.max - this.props.min) / this.props.slider.outerWidth();
        this.shiftUnit = Math.ceil(shiftUnit);
        console.log(this.shiftUnit);
    }
    renderInputValue = (i) => {
        let maxShift = this.props.max / this.shiftUnit;
        if (this['shift_btn_' + i] <= this.props.min) {
            this['shift_btn_' + i] =  this.props.min;
        };
        if (this['shift_btn_' + i] >= maxShift) {
            this['shift_btn_' + i] =  maxShift;
        };
        let value = this.shiftUnit * this['shift_btn_' + i];
        console.log(this.shiftUnit, this['shift_btn_' + i]);

        this.props['input_' + i].val(value);
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

class Input extends ViewSlider {
    renderInput() {
        let props = this.props;
        props.value_box.appendTo(props.slider);
        props.input_1.appendTo(props.value_box);
        props.input_2.appendTo(props.value_box);
        props.input_1.val(props.btn1Value);
        props.input_2.val(props.btn2Value);
    }
}

class Between extends ViewSlider {
    betweenChange() {
        let props = this.props;
        props.between.appendTo(props.slider);
        props.betweenSetting();
    }
}

let createSlider = (name, place, min = 0, max = 5000, btn1Value = 500, btn2Value = 1500) => {
    let model = new ModelSlider(name, place);
    model.setSlider();
    model.settings( min, max, btn1Value, btn2Value);
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
createSlider('name-name', $('#range-2'), min = 0, max = 2000,);