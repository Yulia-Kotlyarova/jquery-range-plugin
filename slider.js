
class Slider {
    constructor(slider_name) {
        this.slider_name = slider_name;
    }

    getName() {
        return this.slider_name;
    }

    getCoords(elem) {
        return {
            top: elem.position().top + pageYOffset,
            left: elem.position().left+ pageXOffset
        };
    } 

    getSlider() {
        let layout = `<div id = "${this.slider_name}__wrapper" class="range__wrapper"></div>`;
        ($("body")).html(layout);
        this.placement = $(`#${this.slider_name}__wrapper`);
        this.slider = $(`<div id = "${this.slider_name}__range-slider" class="range__slider">`).appendTo(this.placement);
        this.between = $(`<div id = "${this.slider_name}__slider-range" class="range__slider-range"></div>`).appendTo(this.slider); 
        this.btn_1 = $(`<button id = "${this.slider_name}__btn_1" class="range__btn_1"></button>`).appendTo(this.slider);
        this.btn_2 = $(`<button id = "${this.slider_name}__btn_2" class="range__btn_2"></button>`).appendTo(this.slider);
        
        let betweenSetting = () => {
            let between_width = this.btn_2.offset().left - this.btn_1.offset().left;
            let between_shift = this.btn_1.css('left');
            this.between.css({'width': between_width + 'px', 'left': between_shift});
        }
        let move_btn_1 = (event) => {
            let sliderCoords = this.getCoords(this.slider);
            let betweenCoords = this.getCoords(this.between); 
            let buttonCoords1 = this.getCoords(this.btn_1);
            let buttonCoords2 = this.getCoords(this.btn_2);
            let shift_btn_1 = event.pageX - sliderCoords.left;
            
            let left1 = sliderCoords.left;
            let right1 = this.btn_2.position().left;

            this.btn_1.css({'left': shift_btn_1 - this.btn_1.innerWidth() / 2   + 'px'});

            if (this.btn_1.offset().left > right1) {
                this.btn_1.css({'left': this.btn_2.css('left') - 100 + 'px'});
            }
            if(this.btn_1.offset().left < left1){
                this.btn_1.css({'left': 0 + 'px'});
            }
            betweenSetting();

            this.btn_1.ondragstart = function() {
              return false;
            };
        }

        let move_btn_2 = (event) => {
            let sliderCoords = this.getCoords(this.slider);
            let betweenCoords = this.getCoords(this.between); 
            let buttonCoords1 = this.getCoords(this.btn_1);
            let buttonCoords2 = this.getCoords(this.btn_2);
            let shift_btn_2 = - sliderCoords.left - this.btn_2.innerWidth() / 2 - parseInt(this.btn_2.css('marginLeft')); 
            this.btn_2.css({'left': event.pageX + shift_btn_2  + 'px'});

            let left2 = this.btn_1.position().left;
            let right2 = sliderCoords.left + this.slider.outerWidth();

            let max_left = parseInt(this.slider.css('width')) - parseInt(this.btn_2.css('marginLeft'));

            if (this.btn_2.offset().left > right2) {
                this.btn_2.css({'left': max_left + 'px'});
            }
            if(this.btn_2.offset().left < left2){
                this.btn_2.css({'left': this.btn_1.css('left')});
            }

            betweenSetting();

            this.btn_2.ondragstart = function() {
              return false;
            };
        }

        this.btn_1.on('mousedown', () => {
            this.btn_1.on('mousemove', move_btn_1);
            this.btn_1.on('mouseup', () => {
                this.btn_1.off('mousemove', move_btn_1);
            });
        });

        this.btn_2.on('mousedown', () => {
            this.btn_2.on('mousemove', move_btn_2);
            this.btn_2.on('mouseup', () => {
                this.btn_2.off('mousemove', move_btn_2);
            });
        });
    }
}

let slider1 = new Slider('kyky');

$(document).ready(function () {
    slider1.getSlider();
});