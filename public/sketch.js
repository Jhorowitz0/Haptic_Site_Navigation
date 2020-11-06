class Element{
	constructor(type){
		this.type = type;
		this.children = [];
		return this;
	}

	addChild(child){
		this.children.push(child);
		return this;
	}

	getType(address){
		if(address.length < 1 || address == null) return this.type;
		else{
			let a = [...address];
			let i = a.shift();
			if(i >= this.children.length || i < 0) return 'error';
			return this.children[i].getType(a);
		}
	}

	getLength(address){
		if(address.length <= 1) return this.children.length;
		else{
			let a = [...address];
			let i = a.shift();
			if(i >= this.children.length || i < 0) return 'error';
			return this.children[i].getLength(a);
		}
	}

	draw(address){
		fill(50);
		text(this.type,0,0);
		if(address.length < 1){
			fill(255);
			text(this.type,0,0);
			push();
			translate(0,-100);
			fill(50);
			for(let j = 0; j < this.children.length; j++){
				// ellipse(j*100,0,10,10);
				text(this.children[j].type,j*100,0);
			}
			pop();
		}
		else{
			push();
			translate(0,-100);
			fill(50);
			let a = [...address];
			let i = a.shift();
			if(i >= this.children.length || i < 0) console.log('error');
			else{
				for(let j = 0; j < this.children.length; j++){
					// ellipse(((this.children.length-1-i)-j)*100,0,10,10);
					text(this.children[this.children.length - j - 1].type,((this.children.length-1-i)-j)*100,0);
				}
				this.children[i].draw(a);
			}
			pop();
		}
	}
}

var page = null;
var displayText = 'text';
var address = [];
var dragDistance = 35;
var initialTouch = {
	x:0,
	y:0
}
var newTouch = {
	x:0,
	y:0
}

function setup() {
	page = new Element('body');
	let elem = new Element('header');
	let nav = new Element('nav');
	let list = new Element('ul');
	list.addChild(new Element('li'));
	list.addChild(new Element('li'));
	list.addChild(new Element('li'));
	list.addChild(new Element('li'));
	nav.addChild(list)
	elem.addChild(nav);
	page.addChild(elem);
	elem = new Element('div');
	elem.addChild(new Element('button'));
	elem.addChild(new Element('img'));
	page.addChild(elem);
	elem = new Element('section');
	elem.addChild(new Element('h1'));
	elem.addChild(new Element('h2'));
	elem.addChild(list);
	elem.addChild(new Element('p'));
	page.addChild(elem);
	createCanvas(windowWidth, windowHeight);
	textAlign(CENTER);
	rectMode(CENTER);
}


let sketch = (()=>{
	draw = ()=>{
		background(0);

		push();
		noStroke();
		translate(width/2,height/2 + (100 * address.length));
		page.draw(address);
		pop();

		fill(255);
		textSize(32);

		// text(displayText, width/2, height/2);
	}

	mouseDragged = ()=>{
		newTouch.y = mouseY - initialTouch.y;
		if(newTouch.y > dragDistance){
			initialTouch.y = mouseY;
			initialTouch.x = mouseX;
			address.push(0);
			if(page.getType(address) == 'error') address.pop();
			else window.navigator.vibrate([10]);
		}
		else if(newTouch.y < -1 * dragDistance){
			initialTouch.y = mouseY;
			initialTouch.x = mouseX;
			address.pop();
			window.navigator.vibrate([10]);
		}

		newTouch.x = mouseX - initialTouch.x;
		if(newTouch.x > dragDistance){
			initialTouch.x = mouseX;
			initialTouch.y = mouseY;

			let newVal = (address[address.length-1] - 1);
			if(newVal < 0) newVal = 0;
			else window.navigator.vibrate([10]);
			address[address.length-1] = newVal;
		}
		else if(newTouch.x < -1 * dragDistance){
			initialTouch.x = mouseX;
			initialTouch.y = mouseY;

			let newVal = (address[address.length-1] + 1);
			if(newVal > page.getLength(address)-1) newVal = page.getLength(address)-1;
			else window.navigator.vibrate([10]);
			address[address.length-1] = newVal;
		}
	}

	mousePressed = ()=>{
		initialTouch.y = mouseY;
		initialTouch.x = mouseX;
	}

	keyPressed = ()=>{
		if(keyCode == 38 || keyCode == 87){
			address.push(0);
			if(page.getType(address) == 'error') address.pop();
		}
		if(keyCode == 40 || keyCode == 83){
			address.pop();
		}
		if(keyCode == 37 || keyCode == 65){
			let newVal = (address[address.length-1] - 1);
			if(newVal < 0) newVal = 0;
			address[address.length-1] = newVal;
			
		}
		if(keyCode == 39 || keyCode == 68){
			let newVal = (address[address.length-1] + 1);
			if(newVal > page.getLength(address)-1) newVal = page.getLength(address)-1;
			address[address.length-1] = newVal;
		}
		displayText = page.getType(address);
	}


});

function initClient(){
    let myp5 = new p5(sketch);
    var input = document.getElementById("input");
	input.remove();
}

// window.navigator.vibrate([50]);