function Tree(id){
	var _this = this;
	this.tree = document.getElementById(id);
	this.arr = [];
	this.ifDone = true;
	this.controls = document.getElementsByTagName('fieldset')[0];

	this.controls.addEventListener('click', function(e){
		switch(e.target.id){
			case "preOrder":
				_this.preOrder(_this.tree);
				break;
			case "inOrder":
				_this.inOrder(_this.tree);
				break;
			case "postOrder":
				_this.postOrder(_this.tree);	
				break;
			default:
				return false; 
				break;
		}

		_this.startOrder();
	}, false);
}	

Tree.prototype = {

	preOrder: function(tree) {
		this.arr.push(tree);
		if ( tree.firstElementChild) {
			this.preOrder(tree.firstElementChild);
		}

		if ( tree.lastElementChild) {
			this.preOrder(tree.lastElementChild);
		}
	},
	inOrder: function(tree) {
		if ( tree.firstElementChild) {
			this.inOrder(tree.firstElementChild);
		}

		this.arr.push(tree);
		if ( tree.lastElementChild) {
			this.inOrder(tree.lastElementChild);
		}
	},
	postOrder: function(tree) {
		if ( tree.firstElementChild) {
			this.postOrder(tree.firstElementChild);
		}

		if ( tree.lastElementChild) {
			this.postOrder(tree.lastElementChild);
		}
		this.arr.push(tree);
	},
	startOrder: function () {
		var _this = this,
			delay = document.getElementById('delay').value || 500,
			arr = this.arr,
			index = 0,
			timer;
		this.arr = [];
		if ( this.ifDone){
			this.ifDone = false;
			arr[index].style.background = "red";
			timer = setInterval(function(){
			if ( index > arr.length - 2) {
				arr[index].style.background = "white";
				index = 0;
				_this.ifDone = true;
				clearInterval(timer);
			}else{
				index++;
				arr[index - 1].style.background = "white";
				arr[index].style.background = "red";
			}
		}, delay);
		}

	}

}

Tree.init = function (id) {
	new Tree(id);
}

window.onload = function () {
	Tree.init("tree");
}