
$(document).ready(
	function(){
		setUpPictureLoading();
		var uploadButton = $("#upload-button");
		uploadButton.on("click", openUploadDiv);
	});


function stringify(o){
	var cache = [];
	JSON.stringify(o, function(key, value) {
	    if (typeof value === 'object' && value !== null) {
	        if (cache.indexOf(value) !== -1) {
	            // Circular reference found, discard key
	            return;
	        }
	        // Store value in our collection
	        cache.push(value);
	    }
	    return value;
	});
	cache = null;
}

function createElt(type, attributes){
	var elt = document.createElement(type);
	for(var name in attributes){
		if(attributes.hasOwnProperty(name)){
			elt.setAttribute(name, attributes[name]);
		}
		
	}
	for(var i = 2; i < arguments.length; i++){
		if(typeof arguments[i] == "string"){
			
			elt.appendChild(document.createTextNode(arguments[i]));
		}
	}
	return elt;
}

function createRandomImages(num, maxWidth, minWidth, maxHeight, minHeight){
	var count = 0;
	var images = [];

	
	minHeight = minHeight || 500;
	minWidth = minWidth || 500;
	maxHeight = (maxHeight || 1000) - minHeight;
	maxWidth = (maxWidth || 1000) - minWidth;

	while(count < num){
		var width = Math.floor(Math.random()*maxHeight + minHeight);
		var height = Math.floor(Math.random()*maxHeight + minHeight);
		images[count] = createElt("img", {"src":"http://placehold.it/"+width+"x"+height, "class":"normal"})
		
		$(images[count]).click(function(e){
			$(this).toggleClass("enlarged");
			$(this).toggleClass("normal");
		});

		count++;
	}
	return images;
}

function loadPic(num){
	num = num || 5;
	return createRandomImages(num);
}

function setUpPictureLoading(){

		var content = $("#content");
		content.append(loadPic(5));
		content.scroll(function(){
			//console.log("Scrolling + " + (content.scrollTop() + content.outerHeight()) +"," +content[0].scrollHeight);
			if(content.scrollTop() + content.outerHeight() >= content[0].scrollHeight-100){
				content.append(loadPic(5));

				var images = $("#content img");
				console.log(images.size());
				if(images.size() > 30){
					images.slice(0,15).remove();
				}
			}
		});
}

function createUploadDiv(){
	var uploadDiv =  createElt("div", {"id":"uploadDiv"})
	var form = $("#formContainer").clone();
	
	form.css("display", "inline");
	uploadDiv.appendChild(form[0]);
	uploadDiv.appendChild(createElt("div", {"id":"imagePreveiw"}));

	return uploadDiv;
}

function openUploadDiv(){

			var uploadDiv = createUploadDiv();
			$("#footer").append(uploadDiv);
			
			$("#footer").animate({height: "40%"}).append(uploadDiv);
			$("#fileImage").click(function(){
				console.log("hi");
				$("#file").change(function(){




					var files = this.files || [];
					fileDisplayArea = document.getElementById("imagePreveiw");
					console.log(files[0]);
					var file = files[0];
					var imageType = /image.*/;

					if (file.type.match(imageType)) {
					  var reader = new FileReader();

					  reader.onload = function(e) {
					    fileDisplayArea.innerHTML = "";

					    // Create a new image.
					    var img = new Image();
					    // Set the img src property using the data URL.
					    img.src = reader.result;

					    // Add the image to the page.
					    fileDisplayArea.appendChild(img);
					  }

					  reader.readAsDataURL(file); 
					} else {
					  fileDisplayArea.innerHTML = "File not supported!";
					}
				});
				$("#file").click();

				
				
});
			$("#upload-button").off("click", openUploadDiv);
				$("#upload-button").on("click", closeUploadDiv);
}

function closeUploadDiv(up){

	$("#footer").animate({height: "10%"})
	$(uploadDiv).remove();
	
	$("#upload-button").off("click", closeUploadDiv);
	$("#upload-button").on("click", openUploadDiv);
}