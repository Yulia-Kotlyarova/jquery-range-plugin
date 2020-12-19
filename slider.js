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

    setSlider() {
        let slider_name = this.slider_name;
        this.slider = $(`<div id = "${slider_name}__range-slider" class="range__slider">`);
        this.between = $(`<div id = "${slider_name}__slider-range" class="range__slider-range"></div>`); 
        this.btn_1 = $(`<button id = "${slider_name}__btn_1" class="range__btn_1"></button>`);
        this.btn_2 = $(`<button id = "${slider_name}__btn_2" class="range__btn_2"></button>`);
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
            input_1: this.input_1,
            input_2: this.input_2,
            slider_name: this.slider_name,
            getCoords: this.getCoords,
            betweenSetting: this.betweenSetting,
        }
    }
}

class ControllerSlider {
    constructor(model) {
        this.props = model.getProps();
    }

    move_btn_1 = (event) => {
        let props = this.props;
        let sliderCoords = props.getCoords(props.slider);
        let betweenCoords = props.getCoords(props.between); 
        let buttonCoords1 = props.getCoords(props.btn_1);
        let buttonCoords2 = props.getCoords(props.btn_2);
        let shift_btn_1 = event.pageX - sliderCoords.left;
        
        let left1 = sliderCoords.left;
        let right1 = props.btn_2.position().left;

        props.btn_1.css({'left': shift_btn_1 - props.btn_1.innerWidth() / 2   + 'px'});

        if (props.btn_1.offset().left > right1) {
            props.btn_1.css({'left': props.btn_2.css('left') - 100 + 'px'});
        }
        if(props.btn_1.offset().left < left1){
            props.btn_1.css({'left': 0 + 'px'});
        }
        props.betweenSetting();

        props.btn_1.ondragstart = function() {
          return false;
        };
    }

    move_btn_2 = (event) => {
        let props = this.props;
        let sliderCoords = props.getCoords(props.slider);
        let betweenCoords = props.getCoords(props.between); 
        let buttonCoords1 = props.getCoords(props.btn_1);
        let buttonCoords2 = props.getCoords(props.btn_2);
        let shift_btn_2 = - sliderCoords.left - props.btn_2.innerWidth() / 2 - parseInt(props.btn_2.css('marginLeft')); 
        props.btn_2.css({'left': event.pageX + shift_btn_2  + 'px'});

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

        props.btn_2.ondragstart = function() {
          return false;
        };
    }

    renderSlider() {
        let props = this.props;
        props.slider.appendTo(props.placement);
        props.between.appendTo(props.slider); 
        props.btn_1.appendTo(props.slider);
        props.btn_2.appendTo(props.slider);
        props.input_1.appendTo(props.slider);
        props.input_2.appendTo(props.slider);
        this.props.betweenSetting();
    }
}

class ViewSlider {
    constructor(controller) {
        this.controller = controller;
        this.props = controller.props;
    }
    userActions() {
        let props = this.props;
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

$(document).ready(function () {
    let model = new ModelSlider('id-name', $('.range__wrapper'));
    model.setSlider();
    // model.coordinates(110, 290);
    let controller = new ControllerSlider(model);
    controller.renderSlider();

    let view = new ViewSlider(controller);
    view.userActions();
});