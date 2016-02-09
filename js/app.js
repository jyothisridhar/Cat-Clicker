var model = {
	currentCat: null,
		catArray: [{
			name: 'soft kitty',
			clicks: 0,
			imageUrl: "images/Soft-kitty.jpg" 
		},
		{
			name: 'warm kitty',
			clicks: 0,
			imageUrl: "images/Warm-kitty.jpg"
		},
		{
			name: 'ball o fur',
			clicks: 0,
			imageUrl: 'images/Ball-of-fur.jpg'
		},
		{
			name: 'happy',
			clicks: 0,
			imageUrl: 'images/Happy-kitty.jpg'
		},
		{
			name: 'sleepy',
			clicks: 0,
			imageUrl: 'images/Sleepy-kitty.jpg'
		}
		]

};

var octopus = {
	init: function() {
		model.currentCat = model.catArray[0];
		catListView.init();
		catView.init();
		adminView.init();
	},

	displayCats: function(){
		return model.catArray;
	},
	
	setCurrentCat: function(cat){
		model.currentCat = cat;
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	incrementCounter: function(){
		model.currentCat.clicks++;
		catView.render();
		adminView.render();
	},

	isAdminView: function(status){
		adminView.isAdmin = status;
		adminView.render();
	},

	updateValues: function(updateCat){
		updateCat.name = adminView.adminCat.val();
		updateCat.clicks = adminView.adminCounter.val();
		updateCat.imageUrl = adminView.adminUrl.val();
		catView.render();
	}
};

var catListView = {
	init: function() {
		this.catListElem = $('#kitty-list');

		this.render();
	},

	render: function(){
		var kitty, elem;
		var cats = octopus.displayCats();
		for(var index in cats){
			kitty = cats[index];
			elem = document.createElement('button');
			elem.textContent = kitty.name;

			elem.addEventListener('click', (function(catCopy){
			return function(){
				octopus.setCurrentCat(catCopy);
				catView.render();
				adminView.render();
			};
			})(kitty));

			this.catListElem.append(elem);
		}
	}
};

var catView = {
	init: function(){
		this.catElem = $('#kitty-display');
		this.catNameElem = $('#catName');
		this.catClicksElem = $('#clicks');
		this.catImgElem = $('#kitty-img');

		this.catImgElem.click(function(){
			octopus.incrementCounter();
		});

		this.render();
	},

	render: function(){
		var currentCat = octopus.getCurrentCat();
		if(currentCat != null){
			this.catNameElem.text(currentCat.name);
			this.catClicksElem.text(currentCat.clicks);
			this.catImgElem.attr("src",currentCat.imageUrl);			
		}
	}
};

var adminView = {
	isAdmin: false,
	init: function() {
		this.adminButtonElem = document.getElementById('admin-button');
		this.adminFormElem = $('#admin-form');
		this.adminCat = $('#cat-name');
		this.adminUrl = $('#url');
		this.adminCounter = $('#counter');
		this.adminCancel = $('#cancel');
		this.adminSave = $('#save');

		this.adminButtonElem.addEventListener('click', function(){
			octopus.isAdminView(true);
		});

		this.adminCancel.click(function(){
			octopus.isAdminView(false);
		});

		this.adminSave.click(function(){
			var cat = octopus.getCurrentCat();
			octopus.updateValues(cat);
			octopus.isAdminView(false);
		});

		this.render();
	},

	render: function(){
		console.log("isadmin:",this.isAdmin);
		if(this.isAdmin === false){
			this.adminFormElem.css('display', 'none');
			this.adminCancel.css('display', 'none');
			this.adminSave.css('display', 'none');
		}
		else{
			this.adminFormElem.css('display', 'inline-block');
			this.adminCancel.css('display', 'inline-block');
			this.adminSave.css('display', 'inline-block');
			var cat = octopus.getCurrentCat();
			this.adminCat.val(cat.name);
			this.adminUrl.val(cat.imageUrl);
			this.adminCounter.val(cat.clicks);
		}
	}
};
octopus.init();