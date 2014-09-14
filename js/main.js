
$(document).ready(
	function(){
		setUpPictureLoading();
		setUpUploadButton();

		var myOptions = {
			zoom:4,
			mapTypeControl:true,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
			navigationControl: true,
			navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);



		if(geo_position_js.init()){
			geo_position_js.getCurrentPosition(showPosition, null);
		}else
			alert("Functionality not available");

		getPicsData(0);
	});

function showPosition(p){
	var pos=new google.maps.LatLng(p.coords.latitude,p.coords.longitude);
	console.log(pos);
	map.setCenter(pos);
	map.setZoom(14);

	var infowindow = new google.maps.InfoWindow({
	    content: "<strong>yes</strong>"
	});

	var marker = new google.maps.Marker({
	    position: pos,
	    map: map,
	    title:"You are here"
	});

	google.maps.event.addListener(marker, 'click', function() {
	  infowindow.open(map,marker);
	});
}

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

function getImagesFromDataBase(num, callback){
	
	
	//console.log("In getImages")
	getPicsData(num, function(pics){
		var count = 0;
		var images = [];

		picIndex+=pics.length-1;	
		while(count < pics.length){
			console.log("working so far");
			console.log(stringify(pics));
			images[count] = createElt("img", {"src":pics[count].fileName});
		count++;
		}	
		callback(images);
	});


}


var picIndex = 0;
function loadPic(num, callback){
	num = num || 5;
	//console.log("In load pic")
	getImagesFromDataBase(num, callback);
	//getPicsData(0);
}

function setUpPictureLoading(){

		var content = $("#content");
		//console.log("In setUpPics")
		loadPic(picIndex, content.append);
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

function getPicsData(pageIndex, callback) {	
	$.ajax({
	type: 'POST',
	url: 'getPics.php',
	data: {'pageIndex': pageIndex},
	success: function(msg) {
		var jsonData = JSON.parse(msg);
		data = jsonData.data;
		callback(data);
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