class Window{
    constructor(canvasId, backgroundColor, bodyColor) {
        // Set up canvas context
        Window._canvas = document.getElementById(canvasId);
        Window._ctx = Window._canvas.getContext('2d');

        // Set window properties
        let br = Window._canvas.getBoundingClientRect();
        Window._boundingRect = {left: br.left, top: br.top + Math.round(window.scrollY)}
        Window._backgroundColor = (typeof backgroundColor == 'undefined') ? 'white' : backgroundColor;
        Window._bodyColor = (typeof bodyColor == "undefined") ? 'white' : bodyColor;

        // Set up mouse event listeners
        Window._canvas.addEventListener("mousemove", Window.onMouseMoveEvent, false);
        Window._canvas.addEventListener("mousedown", Window.onMouseDownEvent, false);
        Window._canvas.addEventListener("mouseup",   Window.onMouseUpEvent, false);
        Window._canvas.addEventListener("click",     Window.onMouseClickEvent, false);

        // Set up key event listeners
        this._keyboardBuffer = new Set([]);
        window.addEventListener('keydown', this.onKeyDownEvent.bind(this), false);
        window.addEventListener('keyup', this.onKeyUpEvent.bind(this), false);

        // Manage resize events
        window.addEventListener('resize', () => {Window._boundingRect = Window._canvas.getBoundingClientRect();});

        // Set colors
        document.body.style.backgroundColor = bodyColor;

        // Calculate dimensional values
        Window._halfWidth = Math.round(Window._canvas.width/2);
        Window._halfHeight= Math.round(Window._canvas.height/2);

        window.onbeforeunload = null;

        window.mobileAndTabletcheck = function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };


        // fullscreen event handling
        this._onfullscreenchange = null;
        this.isFullScreen = false;

        document.addEventListener('webkitfullscreenchange', this._fullscreenChangeHandler.bind(this), false);
        document.addEventListener('mozfullscreenchange', this._fullscreenChangeHandler.bind(this), false);
        document.addEventListener('fullscreenchange', this._fullscreenChangeHandler.bind(this), false);
        document.addEventListener('MSFullscreenChange', this._fullscreenChangeHandler.bind(this), false);
    }

    toggleFullscreen(){
        if (w.isFullScreen){
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }else if (document.webkitExitFullscreen){
                document.webkitExitFullscreen();
            }else if (document.mozCancelFullScreen){
                document.mozCancelFullScreen();
            }else if (document.msExitFullscreen){
                document.msExitFullscreen();
            }

        } else {
            if (document.body.mozRequestFullScreen) {
                document.body.mozRequestFullScreen();
            } else if (document.body.requestFullscreen) {
                document.body.requestFullscreen();
            }
        }
    }

    _fullscreenChangeHandler(){
        if (document.webkitIsFullScreen !== undefined){
            this.isFullScreen = document.webkitIsFullScreen;
        } else if (document.mozFullScreen !== undefined){
            this.isFullScreen = document.mozFullScreen;
            console.log(document.mozFullScreen);
        }
        
        if (this._onfullscreenchange !== null)
            this._onfullscreenchange();
    }

    set onfullscreenchange(f){
        this._onfullscreenchange = f;
    }

    static clear(){
        Window._ctx.fillStyle = Window._backgroundColor;
        Window._ctx.fillRect(0, 0, Window._canvas.width, Window._canvas.height);
    };

    get keysPressed(){
        const result = new Set(this._keyboardBuffer);
        return result;
    }

    clearKeyboardBuffer(){
        this._keyboardBuffer = new Set([]);
    }

    onKeyDownEvent(e){
        if(e.target === document.body)
            e.preventDefault();
        this._keyboardBuffer.add(e.code);
     
        console.log(this._keyboardBuffer);
    }

    onKeyUpEvent(e){
        this._keyboardBuffer.delete(e.code);
        console.log(this._keyboardBuffer);
    }

    static onMouseMoveEvent(e){
        let mouse = {
            x: e.pageX - Window._boundingRect.left,
            y: e.pageY - Window._boundingRect.top,
        };

        let event = new CustomEvent('handleMouseMove', { detail: mouse });
        Window._canvas.dispatchEvent(event);
    }

    static onMouseDownEvent(e){
        let mouse = {
            x: e.pageX - Window._boundingRect.left,
            y: e.pageY - Window._boundingRect.top ,
        };
        let event = new CustomEvent('handleMouseDown', { detail: mouse });
        Window._canvas.dispatchEvent(event);
    }

    static onMouseUpEvent(e){
        let mouse = {
            x: e.pageX - Window._boundingRect.left,
            y: e.pageY - Window._boundingRect.top,
        };
        let event = new CustomEvent('handleMouseUp', { detail: mouse });
        Window._canvas.dispatchEvent(event);
    }

    static onMouseClickEvent(e){
        let mouse = {
            x: e.pageX - Window._boundingRect.left,
            y: e.pageY - Window._boundingRect.top,
        };
        let event = new CustomEvent('handleMouseClick', { detail: mouse });
        Window._canvas.dispatchEvent(event);
    }
}

/**
 * Drawable base class
 *
 * Manages the transformation between display coordinates and canvas coordinates
 */
class Drawable{
    constructor(prop){
        this._size = prop['size'];
        this._position = prop['position'];
        this._updateCoordinates();
    }

    _updateCoordinates(){
        this._topleft     = [Window._halfWidth + (this._position[0] - this._size[0]/2), Window._halfHeight - (this._position[1] + this._size[1]/2)];
        this._boundingBox = [this._topleft[0], this._topleft[1], this._topleft[0] + this._size[0], this._topleft[1] + this._size[1]];
    }

    contains(point){
        return ((point.x > this._boundingBox[0]) && (point.x <= this._boundingBox[2]) && (point.y > this._boundingBox[1]) && (point.y < this._boundingBox[3]));
    }

    set size(newSize)           { this._size     = newSize; this._updateCoordinates();}
    set position(newPosition)   { this._position = newPosition; this._updateCoordinates();}
}

/**
 * Class Rectangle
 *
 * Implements a simple rectangle
 *
 * TO DO: recalculate object position when using extendWidth
 */
class Rectangle extends Drawable{
    constructor(prop){
        super(prop);

        this.fillColor = (prop.hasOwnProperty('fillColor')) ? prop['fillColor'] : "rgb(0, 0, 0)";
        this.lineColor = (prop.hasOwnProperty('lineColor')) ? prop['lineColor'] : "rgb(160, 160, 160)";
        this.lineWidth = (prop.hasOwnProperty('lineWidth')) ? prop['lineWidth'] : 1;
    }

    set fillColor(newFillColor) { this._fillColor = newFillColor;}
    set lineColor(newLineColor) { this._lineColor = newLineColor;}
    set lineWidth(newLineWidth) { this._lineWidth = newLineWidth;}
    set extendWidth(newWidth)   { this._size = [newWidth, this._size[1]];}

    draw(){
        Window._ctx.strokeStyle = this._lineColor;
        Window._ctx.lineWidth   = this._lineWidth;
        Window._ctx.fillStyle   = this._fillColor;

        if (this._lineWidth > 0)
            Window._ctx.strokeRect(this._topleft[0], this._topleft[1], this._size[0], this._size[1]);
        Window._ctx.fillRect(this._topleft[0], this._topleft[1], this._size[0], this._size[1]);
    }
}

class Triangle{
    constructor(position, radius, fillColor, rotation){
        this._radius = radius;
        this._fillColor = fillColor;
        this._rotation = (typeof rotation == "undefined") ? -Math.PI/2 : rotation;
        this.position = position;
    }

    contains(point){
        return ( (point.x-this._centerX)*(point.x-this._centerX) + (point.y - this._centerY)*(point.y - this._centerY) <= this._radius*this._radius);
    }

    set position(newPosition){
        this._position = newPosition;

        this._centerX = Window._halfWidth + this._position[0];
        this._centerY = Window._halfHeight - this._position[1];
        this._vertices = [this._centerX  + this._radius*Math.cos(this._rotation), this._centerY - this._radius*Math.sin(this._rotation),
                          this._centerX  + this._radius*Math.cos(this._rotation + 2*Math.PI/3), this._centerY - this._radius*Math.sin(this._rotation+2*Math.PI/3),
                          this._centerX  + this._radius*Math.cos(this._rotation + 4*Math.PI/3), this._centerY - this._radius*Math.sin(this._rotation + 4*Math.PI/3)];
    }

    draw(){
        Window._ctx.beginPath();
        Window._ctx.moveTo(this._vertices[0], this._vertices[1]);
        Window._ctx.lineTo(this._vertices[2], this._vertices[3]);
        Window._ctx.lineTo(this._vertices[4], this._vertices[5]);
        Window._ctx.closePath();

        Window._ctx.fillStyle = this._fillColor;
        Window._ctx.fill();
    }
}

class ProgressBar{
    constructor(position, size, progress){
        // Set object properties
        this._position = position;
        this._size = size;
        this._progress = progress;

        // Determine component measures
        this._pbSize     = [0, this._size[1]-4];
        this._pbFullWidth= this._size[0] - 4;
        this._pbPosition = [this._position[0] - this._pbFullWidth/2, this._position[1]];

        // Create components
        this._pbBackground = new Rectangle({position: this._position, size: this._size, lineWidth: 3});
        this._pbProgress   = new Rectangle({position: this._pbPosition,size: this._pbSize, fillColor : "rgb(100,180,115)"});

        // Set initial states
        this.progress = progress;
    }

    set progress(newProgress){
        this._progress = newProgress;
        this._pbProgress.extendWidth = this._progress*this._pbFullWidth;
    }

    draw(){
        this._pbBackground.draw();
        this._pbProgress.draw();
    }
}

class Text{
    constructor(props){
        this._text = props.hasOwnProperty('text') ?   props['text'] : "";
        this._color = props.hasOwnProperty('color') ? props['color'] : "rgb(0, 0, 0)";
        this._font  = props.hasOwnProperty('font') ?  props['font'] :"16px Arial";
        this._textAlign = props.hasOwnProperty('textAlign') ? props['textAlign'] : "center";
        this._textBaseline = props.hasOwnProperty('textBaseline') ? props['textBaseline'] : "middle";
        this.position = (props.hasOwnProperty('position')) ? props['position'] : [0, 0];
    }

    set color(newColor){
        this._color = newColor;
    }
    set text(newText){
        this._text = newText;
    }

    set font(newFont){
        this._font = newFont;
    }

    set position(newPosition){
        this._position = [Window._canvas.width / 2 + newPosition[0], Window._canvas.height/ 2 - newPosition[1]];
    }

    draw(){
        Window._ctx.font = this._font;
        Window._ctx.textAlign = this._textAlign;
        Window._ctx.textBaseline = this._textBaseline;
        Window._ctx.fillStyle = this._color;
        Window._ctx.fillText(this._text,  this._position[0], this._position[1]);
    }
}

class TextInput{
    constructor(props){
        this._size = props['size'];
        this._textInput = document.createElement("textarea");
        this._textInput.setAttribute('rows','5');

        this._textInput.style.width = props['size'][0].toString() + 'px';
        this._textInput.style.height= props['size'][1].toString() + 'px';
        this._textInput.style.position = 'absolute';
        this._textInput.style.border = '0px';
        this._textInput.style.resize = 'none';
        this._textInput.style.zIndex = '5 ';
        this._textInput.style.font   = "Arial";
        this._textInput.style.padding = '5px';
        this._textInput.style.backgroundColor = 'white';
        this._textInput.style.fontFamily = 'Arial';
        this._textInput.style.fontSize = '16px';
        this.position = props['position'];
        document.body.appendChild(this._textInput);

        this.enabled = false;
        window.addEventListener('resize', this.onResize.bind(this));

        this._keyDownHandler = this._onKeyDown.bind(this);

        this._keyDownCallback = null;
    }


    set keyDownCallback(f){
        this._keyDownCallback = f;
    }

    set enabled(newEnabledValue){
        this._enabled = newEnabledValue;
        if (this._enabled) {
            this._textInput.style.display = 'block';
            this._textInput.addEventListener('keyup', this._keyDownHandler);
        }
        if (!this._enabled) {
            window.removeEventListener('keyup', this._keyDownHandler);
            this._textInput.style.display = 'none';
        }
    }

    focus(){
        this._textInput.focus();
    }

    _onKeyDown(e){
        if(this._keyDownCallback !== null)
            this._keyDownCallback();
    }

    onResize(){
        this.position = this._position;
    }

    set position(newPosition){
        this._position = newPosition;
        let x_offset = Window._canvas.offsetLeft;
        let y_offset = Window._canvas.offsetTop;

        let left = x_offset + Window._halfWidth + this._position[0] - this._size[0]/2;
        let top  = y_offset + Window._halfHeight- this._position[1] - this._size[1]/2;

        this._textInput.style.top = top.toString() + 'px';
        this._textInput.style.left = left.toString() + 'px';
    }

    get text(){
        return this._textInput.value;
    }

    set text(newText){
        this._textInput.value = newText;
    }

    draw(){}
}


class ButtonStates{
    static get Disabled() { return 0;}
    static get Neutral(){return 1;}
    static get MouseOver() {return 2;}
    static get MouseDown() {return 3;}
}

class Button extends Drawable{
    constructor(prop){
        super(prop);
        this._label = prop.hasOwnProperty(('text')) ? prop['text'] : "";

        // Define color palette for button
        this._backgroundColor = prop.hasOwnProperty(('backgroundColor')) ? prop['backgroundColor'] :"rgb(150, 150, 150)";
        this._mouseHoverColor = prop.hasOwnProperty(('mouseHoverColor')) ? prop['mouseHoverColor'] :"rgb(190,190,190)";
        this._mouseDownColor  = prop.hasOwnProperty(('mouseDownColor'))  ? prop['mouseDownColor'] :"rgb(120,120,120)";
        this._disabledColor   = prop.hasOwnProperty(('disabledColor'))   ? prop['disabledColor'] :"rgb(50 , 50, 50)";


        // Set default button properties
        this._font = prop.hasOwnProperty(('font')) ? prop['font'] : "18px Arial";
        this._textColor = prop.hasOwnProperty(('textColor')) ? prop['textColor'] :"rgb(220, 220, 220)";
        this._lineWidth = prop.hasOwnProperty(('lineWidth')) ? prop['lineWidth'] : 1;
        this._lineColor = prop.hasOwnProperty(('lineColor')) ? prop['lineColor'] :"rgb(130, 130, 130)";

        // Create button components
        this._btnRectangle = new Rectangle({position: this._position, size: this._size, fillColor : this._backgroundColor, lineColor : this._lineColor, lineWidth : this._lineWidth});
        this._btnText = new Text({text : this._label, position: [this._position[0], this._position[1]-1], color : this._textColor, font: this._font});

        // Define mouse event callback functions
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp   = this.onMouseUp.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseClick= this.onMouseClick.bind(this);

        // Set default state to disabled
        this.enabled = false;
    }

    set text(newLabel){ this._btnText.text = newLabel;}
    set label(newLabel){ this._btnText.text = newLabel;}

    set font(newFont){ this._btnText.font = newFont; }

    set textColor(newTextColor){ this._btnText.color = newTextColor;}

    set lineWidth(newLineWidth){ this._btnRectangle.lineWidth = newLineWidth;}

    set lineColor(newLineColor){ this._btnRectangle.lineColor = newLineColor; }

    get enabled(){ return this._enabled;}

    set enabled(enabledValue){
        this._enabled = enabledValue;

        if(this._enabled){
            this.buttonState = ButtonStates.Neutral;
            Window._canvas.addEventListener("handleMouseDown", this._onMouseDown, false );
            Window._canvas.addEventListener("handleMouseUp", this._onMouseUp, false );
            Window._canvas.addEventListener("handleMouseMove", this._onMouseMove, false);
            Window._canvas.addEventListener("handleMouseClick", this._onMouseClick, false);
        } else {
            this.buttonState = ButtonStates.Disabled;
            Window._canvas.removeEventListener("handleMouseDown", this._onMouseDown);
            Window._canvas.removeEventListener("handleMouseUp", this._onMouseUp);
            Window._canvas.removeEventListener("handleMouseMove", this._onMouseMove);
            Window._canvas.removeEventListener("handleMouseClick", this._onMouseClick);
        }
    }

    set position(newPosition){
        this._position = newPosition;
        this._btnRectangle.position = this._position;
        this._btnText.position = this._position;
    }

    set mouseClickedCallback(cbf){
        this._mouseClickedCallback = cbf;
    }

    onMouseUp(e){
        if(this.contains(e.detail)){
            this.buttonState = ButtonStates.MouseOver;
        }
    }

    onMouseMove(e){
        if(this.contains(e.detail)){
          e.stopImmediatePropagation();
            this.buttonState = ButtonStates.MouseOver;
            Window._canvas.style.cursor = "pointer";
        }
        else {
            this.buttonState = ButtonStates.Neutral;
            Window._canvas.style.cursor = "default";
        }
    }

    onMouseDown(e){
        if (this.contains(e.detail)){
            this.buttonState = ButtonStates.MouseDown;
        }
    }

    onMouseClick(e){
        if (this.contains(e.detail) && typeof(this._mouseClickedCallback) === "function") {
            e.stopImmediatePropagation();
            this._mouseClickedCallback();
        }
    }

    doClick(){
        if(typeof(this._mouseClickedCallback) === "function")
            this._mouseClickedCallback();
    }

    draw(){
        switch (this.buttonState){
            case ButtonStates.MouseDown:
                this._btnRectangle.fillColor   = this._mouseDownColor;
                break;
            case ButtonStates.MouseOver:
                this._btnRectangle.fillColor   = this._mouseHoverColor;
                break;
            case ButtonStates.Disabled:
                this._btnRectangle.fillColor = this._disabledColor;
                break;
            default:
                this._btnRectangle.fillColor = this._backgroundColor;
        }

        this._btnRectangle.draw();
        this._btnText.draw();
    }
}

class Slider{
    constructor(position, size, value){
        this._size = size;
        this._position = position;
        this._sliderSize = [14, this._size[1] + 4];

        this._barFillColor     = "rgb(100, 100, 150)";
        this._sliderFillColor  = "rgb(200, 200, 200)";
        this._sliderHoverColor = "rgb(180, 180, 180)";
        this._sliderDownColor  = "rgb(160, 160, 160)";

        // Slider components
        this._sliderBackground = new Rectangle({position: this._position, size : this._size, fillColor : this._barFillColor});
        this._sliderMarker     = new Rectangle({position: this._position, size : this._sliderSize, fillColor : this._sliderFillColor});

        this.value = (typeof(value) == "undefined")? 0 : value;
        this._bookmarks = {counter: 0, bookmarkDict : {}, drawList : []};

        this._enabled = false;

        // Define mouse event callback functions
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp   = this.onMouseUp.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);
        this._onMouseClick = this.onMouseClick.bind(this);
        this._onValueChanged = null;
        this._onBookmarkClicked = null;



        this._dragInfo = {isDragging: false, dragTarget : null, xOffset : 0};
    }

    set enabled(enabledValue){
      if(enabledValue === true){
        Window._canvas.addEventListener("handleMouseDown", this._onMouseDown, false );
        Window._canvas.addEventListener("handleMouseUp", this._onMouseUp, false );
        Window._canvas.addEventListener("handleMouseMove", this._onMouseMove, false);
        Window._canvas.addEventListener("handleMouseClick", this._onMouseClick, false);
      } else if (enabledValue === false){
        Window._canvas.removeEventListener("handleMouseDown", this._onMouseDown, false );
        Window._canvas.removeEventListener("handleMouseUp", this._onMouseUp, false );
        Window._canvas.removeEventListener("handleMouseMove", this._onMouseMove, false);
        Window._canvas.removeEventListener("handleMouseClick", this._onMouseClick, false);
      }
    }

    onMouseClick(e){
        if (!this._sliderMarker.contains(e.detail) && this._sliderBackground.contains(e.detail)){
            e.stopImmediatePropagation();
            this.value = (e.detail.x - this._sliderBackground._topleft[0])/this._size[0];
            if (typeof this._onValueChanged == "function")
                this._onValueChanged(this._value);
            return
        }

        for(let i = 0; i < this._bookmarks.drawList.length; ++i){
            let bookmark = this._bookmarks.bookmarkDict[this._bookmarks.drawList[i]];

            if (bookmark.contains(e.detail)){
                e.stopImmediatePropagation();
                this.value = (bookmark._centerX - this._sliderBackground._topleft[0])/this._size[0];
                if (typeof this._onValueChanged == "function")
                    this._onValueChanged(this._value);
                if (typeof this._onBookmarkClicked == "function")
                    this._onBookmarkClicked(this._bookmarks.drawList[i]);
                break;
            }
        }
    }

    onMouseUp(){
        if (this._dragInfo.isDragging === true){
            this._dragInfo.isDragging = false;
        }
    }

    onMouseMove(e){
        // When mouse is down, movement corresponds to a drag event
        if (this._dragInfo.isDragging) {
            e.stopImmediatePropagation();
            let newValue = (e.detail.x - this._sliderBackground._topleft[0] - this._dragInfo.xOffset)/this._size[0];
            if (newValue >= 0 && newValue <= 1) {
                this.value = newValue;

                if (this._dragInfo.dragTarget !== this._sliderMarker){
                    this._dragInfo.dragTarget.value = this._value;
                    this._dragInfo.dragTarget.position = [this._sliderMarker._position[0], this._dragInfo.dragTarget._position[1]];
                }

                if (typeof this._onValueChanged == "function")
                    this._onValueChanged(this._value);
            }

            return;
        }

        // If the mouse is not down, execute hover effects
        if (this._sliderMarker.contains(e.detail)){
            e.stopImmediatePropagation();
            this._sliderMarker.fillColor = this._sliderHoverColor;
            Window._canvas.style.cursor = "pointer";
        } else {
            this._sliderMarker.fillColor = this._sliderFillColor;
        }

        for(let i = 0; i < this._bookmarks.drawList.length; ++i){
            if (this._bookmarks.bookmarkDict[this._bookmarks.drawList[i]].contains(e.detail)){
                e.stopImmediatePropagation();
                Window._canvas.style.cursor = "pointer";
                break;
            }
        }
    }

    onMouseDown(e){
        if(this._sliderMarker.contains(e.detail)){
            e.stopImmediatePropagation();
            this._sliderMarker.fillColor = this._sliderDownColor;
            Window._canvas.style.cursor = "pointer";
            this._dragInfo.isDragging = true;
            this._dragInfo.xOffset = e.detail.x - this._sliderMarker._topleft[0] - this._sliderMarker._size[0]/2;
            this._dragInfo.dragTarget = this._sliderMarker;
        }

        for(let i = 0; i < this._bookmarks.drawList.length; ++i){
            let bookmark = this._bookmarks.bookmarkDict[this._bookmarks.drawList[i]];
            if (bookmark.contains(e.detail)){
                e.stopImmediatePropagation();

                Window._canvas.style.cursor = "pointer";

                this._dragInfo.isDragging = true;
                this._dragInfo.xOffset = e.detail.x - bookmark._centerX;
                this._dragInfo.dragTarget = bookmark;
                break;
            }
        }
    }

    set onValueChanged(newValueChanged){
        this._onValueChanged = newValueChanged;
    }

    set onBookmarkClicked(newOnBookmarkClicked){
        this._onBookmarkClicked = newOnBookmarkClicked;
    }

    /**
     * Sets the position of the tracker as a percentage of the total width of the trackbar
     * @param newValue a floating point number [0,1] representing the location of the tracker
     */
    set value(newValue){
        this._value = newValue;
        this._sliderMarker.position = [parseInt(this._position[0] - this._size[0]/2 + this._value * this._size[0]), this._position[1]];
    }

    /**
     * Set the position of the sliderBar object
     * @param newPosition
     */
    set position(newPosition){
        this._position = newPosition;
        this._sliderBackground.position = newPosition;
        this._sliderMarker.position = [this._sliderMarker._position[0], this._position[1]];
    }

    addBookmark(bookmarkColor){
        console.log("Adding bookmark");
        let radius = 10;
        let triangle= new Triangle([this._sliderMarker._position[0], (radius/2)+2+this._sliderMarker._position[1] + this._sliderMarker._size[1]/2], radius, (typeof bookmarkColor == "undefined") ? "rgb(50,50,150)" : bookmarkColor);
        triangle.value = this._value;
        this._bookmarks.counter = this._bookmarks.counter + 1;
        this._bookmarks.bookmarkDict[this._bookmarks.counter.toString()] = triangle;
        this._bookmarks.drawList.push(this._bookmarks.counter.toString());
        return this._bookmarks.counter;
    }

    removeBookmark(bookmarkID){
        this._bookmarks.drawList.splice(this._bookmarks.drawList.indexOf(bookmarkID.toString()), 1);
        delete this._bookmarks.bookmarkDict[bookmarkID.toString()];
    }

    getBookmarks(){
        return this._bookmarks.bookmarkDict;
    }

    draw(){
        this._sliderBackground.draw();
        this._bookmarks.drawList.forEach(key => this._bookmarks.bookmarkDict[key].draw());
        this._sliderMarker.draw();
    }
}

class ImageLoaderStatus{
    static get Idle(){ return 1;}
    static get Processing(){ return 2; }
}

class ImageLoader{
    constructor(){
        this._loadedImages = {};
        this._errorImages  = {};
        this._imageQueue   = {};
        this._loaderStatus = ImageLoaderStatus.Idle;
    }

    enqueue(newImage, imageName){
        this._imageQueue[imageName] = newImage;
    }

    set loadingCompletedCallback(cb){
      this._onLoadingCompleted = cb;
    }

    get loadedImageCount(){
        return Object.keys(this._loadedImages).length;
    }

    get queueEmpty(){
        return (Object.keys(this._imageQueue).length === 0);
    }

    get percentageLoaded(){
        let nQueued = Object.keys(this._imageQueue).length;
        let nLoaded = Object.keys(this._loadedImages).length;

        if (nQueued + nLoaded === 0)
            return -1;

        return nLoaded / (nQueued + nLoaded);
    }

    processImageQueue(){
        if (this._loaderStatus === ImageLoaderStatus.Processing)
            return;
        this._loaderStatus = ImageLoaderStatus.Processing;

        for(let key in this._imageQueue) {
            if (this._imageQueue.hasOwnProperty(key)) {
                let imageFile = this._imageQueue[key];

                let img = new Image();
                img.loader = this;
                img.key    = key;
                img.onload = function (e) {
                    delete this.loader._imageQueue[this.key];
                    this.loader._loadedImages[this.key] = this;

                    if (Object.keys(this.loader._imageQueue).length === 0) {
                        this.loader._loaderStatus = ImageLoaderStatus.Idle;
                        if (typeof(this.loader._onLoadingCompleted) === "function")
                          this.loader._onLoadingCompleted();
                    }
                };
                img.onerror = function(e){
                    delete this.loader._imageQueue[this.key];
                    this.loader._errorImages[this.key] = e;
                };
                img.src = imageFile;
            }
        }
    }

    getImage(imageName){
        return this._loadedImages[imageName];
    }
}

/**
 * ImageStim
 */
class ImageStim{
    /**
     * @param image an HTMLImageElement
     * @param position array [x,y] coordinates
     * @param size array [width, height] dimension, defaults to image element size
     */
    constructor(prop){
        this._position = prop['position'];
        this._size =  prop.hasOwnProperty(('size')) ? prop['size'] : [0, 0];
        this._image = prop.hasOwnProperty('image') ? prop['image'] : null;

        if (!prop.hasOwnProperty('size') && this._image instanceof HTMLImageElement)
            this._size = [this._image.width, this._image.height];

        this._updateBoundingBox();
    }

    /**
     * Set a new image
     * @param newImage HTMLImageElement
     */
    set image(newImage){
        this._image = (newImage instanceof HTMLImageElement) ? newImage : null;
    }

    get image(){
        return this._image;
    }

    /**
     * @param newSize [width, height] array
     */
    set size(newSize){
        this._size = newSize;
        this._updateBoundingBox();
    }

    /**
     * @param newPosition [x, y] array
     */
    set position(newPosition){
        this._position = newPosition;
        this._updateBoundingBox();
    }


    _updateBoundingBox(){
        this._boundingBox = [Window._halfWidth  + this._position[0] - this._size[0]/2,  // left
                             Window._halfHeight - this._position[1] - this._size[1]/2, // top
                             Window._halfWidth  + this._position[0] + this._size[0]/2, // right
                             Window._halfHeight - this._position[1] + this._size[1]/2];// bottom
    }

    draw(){
        Window._ctx.drawImage(this._image, 0, 0, this._image.width, this._image.height, this._boundingBox[0], this._boundingBox[1], this._size[0], this._size[1]);
    }
}

class PostData{
    constructor(url){
        this._url = url;
    }

    post(data){
        this._xhr = new XMLHttpRequest();
        this._xhr.onreadystatechange = this._onreadystatechange;
        this._xhr.open("POST", this._url);
        this._xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        this._xhr.send(data);
    }

    _onreadystatechange(){
        console.log("hello");
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            let r = JSON.parse(this.response);
            console.log(r);
        }
    }
}

/*

a = new PostData("http://psytests.local/tests/event_marking/cgi/test.py");
 */