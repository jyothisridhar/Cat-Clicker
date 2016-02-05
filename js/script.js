var names = ["Soft-kitty", "Warm-kitty", "Ball-of-fur", "Happy-kitty", "Sleepy-kitty"];

for (var i = 0; i < names.length; i++) {
	var kittyName = names[i];

	var elem = document.createElement('li');
	elem.textContent = kittyName;

	elem.addEventListener('click', (function(nameCopy){
		return function(){
			var filename = "images/" + nameCopy + ".jpg";
			document.getElementById('kitty-img').src = filename;
			// document.getElementById('kitty-display').appendChild()
			console.log(filename);
		}
	})(kittyName));

	var parent = document.getElementById('kitty-list');
	parent.appendChild(elem);
}