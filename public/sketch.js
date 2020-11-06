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

	draw(address){
		if(address.length < 1){
			fill(255,0,0);
			ellipse(0,0,20,20);
			push();
			translate(0,-100);
			fill(50,0,0);
			for(let j = 0; j < this.children.length; j++) ellipse(j*100,0,10,10);
			pop();
		}
		else{
			push();
			translate(0,-100);
			fill(50,0,0);
			let a = [...address];
			let i = a.shift();
			if(i >= this.children.length || i < 0) console.log('error');
			else{
				for(let j = 0; j < this.children.length; j++) ellipse(((this.children.length-1-i)-j)*100,0,10,10);
				this.children[i].draw(a);
			}
			pop();
		}
	}
}

var page = null;
var displayText = 'text';
var address = [0];

function setup() {
	page = new Element('body');
	let elem = new Element('div');
	elem.addChild(new Element('button'));
	elem.addChild(new Element('img'));
	elem.addChild(new Element('p'));
	page.addChild(elem);
	elem = new Element('section');
	elem.addChild(new Element('h1'));
	elem.addChild(new Element('h2'));
	elem.addChild(new Element('p'));
	page.addChild(elem);
	createCanvas(windowWidth, windowHeight);
	textAlign(CENTER);
}


let sketch = (()=>{
	draw = ()=>{
		background(0);

		push();
		noStroke();
		translate(width/2,height/2);
		page.draw(address);
		pop();

		fill(255);
		textSize(32);

		text(address, 100, 100);
		text(displayText, width/2, height/2);
	}

	mouseDragged = ()=>{
	}

	mousePressed = ()=>{
	}

	keyPressed = ()=>{
		if(keyCode == 38 || keyCode == 87){
			address.push(0);
		}
		if(keyCode == 40 || keyCode == 83){
			address.pop();
		}
		if(keyCode == 37 || keyCode == 65){
			address[address.length-1] = (address[address.length-1] - 1);
		}
		if(keyCode == 39 || keyCode == 68){
			address[address.length-1] = address[address.length-1] + 1;
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