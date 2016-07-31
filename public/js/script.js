window.onload=init;

var canvas;

//Init Cnavas
function  init() {

    //Canvas Attach Event Handlers
		var canvasWrapper = document.getElementById('canvasWrap');
		canvasWrapper.tabIndex = -1	;
		canvasWrapper.addEventListener("keydown", OnkeyDown	, false);
    canvasWrapper.addEventListener("drop",OnImageDrop,false);
    canvasWrapper.addEventListener("dragover",OnImageDragOver,false);

    //Canvas Properties
		canvas = new fabric.Canvas('canvas');
		canvas.selectionColor = 'rgba(0,0,0,0.3)';
		canvas.selectionBorderColor = 'black';
		canvas.selectionLineWidth = 1;

    //DownLoad Canvas  As Image()
    document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'photo_collage.jpg');
}, false);

    //Dummy Image Fixtures
    AddDummyImages();

}

//Add Key Down Event 
//On Delete Remove Selected Object from canvas 
function OnkeyDown(event){
    var activeObject = canvas.getActiveObject();
    console.log(event.keyCode);
    if (event.keyCode === 46) {
    	canvas.remove(activeObject);
    }
}

//Add Drop Event Listner to get images into canvas
function  OnImageDrop(event) {
    console.log("Image Dropped");
    event.preventDefault();
    var imageObj=new Image();
    imageObj.src=event.dataTransfer.getData("imgsrc");
    insertAtCenter(imageObj);
    
}

function OnImageDragOver(event) {
  console.log("Image DragOver");
  event.preventDefault();
}


function drag(event) {
    event.dataTransfer.setData("imgsrc",event.target.src);
}

//On Upload Image Display it
function displayimg(event){
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imageObj=new Image();
  imageObj.title = selectedFile.name;

  reader.onload = function(event) {
    imageObj.src = event.target.result;
	insertAtCenter(imageObj);
  };

  reader.readAsDataURL(selectedFile);
}


//Insert and Add object to canvas 
function insertAtCenter(imgElement){
  imgElement.setAttribute('crossOrigin', 'anonymous');
	var imgInstance = new fabric.Image(imgElement, {
    left: canvas.getWidth()/2-imgElement.width/2,
    top: canvas.getHeight()/2-imgElement.height/2,
    angle: 0,
});
	canvas.add(imgInstance);
}

//Download canvas Image
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}



//Add dummy Images
function  AddDummyImages() {
   var imgContainer=document.getElementById("img-container");
   var len=5;
   for(var i=0;i<len;i++){
      
      var imagediv=document.createElement("div");
      imagediv.className="img-item";
     
      var img=new Image();
      img.draggable="true";
      img.addEventListener("dragstart",drag,false);
      img.src="img/"+(i+1)+".jpg";
      
      imagediv.appendChild(img);
     imgContainer.appendChild(imagediv);
      
   }
}
