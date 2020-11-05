function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	// background(mouseX/width * 255, 0, 50);
}

let sketch = (()=>{
	draw = ()=>{
	}

	mouseDragged = ()=>{
		background(mouseX/width * 255, 0, 50);
	}

	mousePressed = ()=>{
		window.navigator.vibrate([200]);
	}


});

function initClient(){
    let myp5 = new p5(sketch);
    var input = document.getElementById("input");
	input.remove();
}