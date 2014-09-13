
$(document).ready(
	function(){
		setUpPictureLoading();
		var uploadButton = $("#upload-button");
		uploadButton.click( function(){
			var uploadDiv = createUploadDiv();
			console.log(uploadDiv);
			$("#container").append(uploadDiv);
			$("#uploadDiv").animate({top: "-=40%"}, 200);	
			$("#fileImage").click(function(){
				$("#file").change(function(){



					var files = this.files || [];
					console.log(files[0]);
					if(!files.length || !window.FileReader) return;


					var reader = new FileReader();
					

					reader.onloadend = function(){
						$("#imagePreview").css("background-image", "url("+this.result+")");
					}

					reader.readAsDataURL(files[0]);
				});
				$("#file").click();
				
			});


		});


	}
);


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
		images[count] = createElt("img", {"src":"http://placehold.it/"+width+"x"+height})
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
			if(content.scrollTop() + content.outerHeight() >= content[0].scrollHeight){
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
	var form = document.getElementById('formContainer');
	form.style.display = "block";
	uploadDiv.appendChild(form);

	return uploadDiv;
}