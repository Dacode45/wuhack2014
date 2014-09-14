
$(document).ready(
	function(){
		setUpPictureLoading();
		setUpUploadButton();
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
		images[count] = createElt("img", {"src":"http://placehold.it/"+width+"x"+height})
		
		count++;
	}
	return images;
}

var picIndex = 0;

var recursionDept = 0;
var recursionStop = 0;
function getImagesFromDataBase(num){
		recursionStop = num;
		getPicsData(picIndex, loadPic, recursionDept++);
	


}


function loadPics(num){
	
	getImagesFromDataBase(num);
	//getPicsData(0);
}
function loadPic(pics){
	if(recursionDept <= recursionStop){
		var count1 = 0;
		var images = [];
		console.log(picIndex);
		if(pics[0]){
			while(count1 < pics.length){
				picIndex++;
				images[count1] = createElt("img", {"src":"http://ec2-54-68-69-213.us-west-2.compute.amazonaws.com/swag/pics/"+pics[count1].fileName});
			count1++;

			}
			var imageDivs = images.map(function(img){
				var div = createElt("div", {"class":"imageWrapper"});
				div.appendChild(img);

				var voteDiv = createElt("div", {"class":"voteDivWrapper"});
				var upDiv = createElt("div", {"class":"upVote"});
				var downDiv = createElt("div", {"class":"downVote"});

				voteDiv.appendChild(upDiv);
				voteDiv.appendChild(downDiv);

				div.appendChild(voteDiv);
				

				return div;
			})
			$("#content").append(imageDivs);
		}
		getPicsData(picIndex, loadPic, recursionDept++);
	}else
		recursionStop = 0;
}

function setUpPictureLoading(){

		var content = $("#content");
		//console.log("In setUpPics")
		loadPics(5);
		content.scroll(function(){


			console.log("Scrolling + " + (content.scrollTop() + content.outerHeight()) +"," +content[0].scrollHeight);
			if(content.scrollTop() + content.outerHeight() >= content[0].scrollHeight-100){
				loadPics(5);

			}
		});

}

function getPicsData(pageIndex, callback, times) {	
	$.ajax({
	type: 'POST',
	url: 'http://ec2-54-68-69-213.us-west-2.compute.amazonaws.com/swag/getPics.php',
	crossDomain:true,
	data: {'pageIndex': pageIndex},
	success: function(msg) {
		var jsonData = JSON.parse(msg);
		data = jsonData.data;
		callback(data, times);
		/*for (i = 0; i < data.length; i++) {
			picData = data[i];
			alert(picData.name);
			//TODO
			//add the images to the list.
		}*/
	}
	});

}

function createUploadDiv(){
	var uploadDiv =  createElt("div", {"id":"uploadDiv"})
	var form = $(".formContainer").clone();
	
	//form.css("display", "initial");
	form.toggleClass("show");
	$(uploadDiv).append(form);
	form.children(".button-container")[0].appendChild(createElt("div", {"id":"imagePreveiw"}));
	
	return uploadDiv;
}

function openUploadDiv(){

			var uploadDiv = createUploadDiv();
			$("#footer").append(uploadDiv);
			
			$("#footer").animate({height: "100px"}).append(uploadDiv);
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

function submitForm(){
	$(".show")[0].submit();
}

function closeUploadDiv(up){

	$("#footer").animate({height: "20px"})
	$(uploadDiv).remove();
	
	$("#upload-button").off("click", closeUploadDiv);
	$("#upload-button").on("click", openUploadDiv);
}

function setUpUploadButton(){

		var uploadButton = $("#upload-button");
		uploadButton.on("click", openUploadDiv);
}
