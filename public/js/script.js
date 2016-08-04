window.onload=init;
window.PhotoCollage={};


//Initilizing canvas
function  init() {

    //Canvas Attach Event Handlers
		var canvasWrapper = document.getElementById('canvasWrap');
		canvasWrapper.tabIndex = -1	;
		canvasWrapper.addEventListener("keydown", OnkeyDown	, false);
    canvasWrapper.addEventListener("drop",OnImageDrop,false);
    canvasWrapper.addEventListener("dragover",OnImageDragOver,false);

    //Canvas Properties
		PhotoCollage = new fabric.Canvas('canvas');
		PhotoCollage.selectionColor = 'rgba(0,0,0,0.3)';
		PhotoCollage.selectionBorderColor = 'black';
		PhotoCollage.selectionLineWidth = 1;

    //DownLoad Canvas  As Image
    //Not made visible as tainted canvas cannot be dowbloaded
    //due to CORS origin policy
    document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'photo_collage.jpg');
}, false);

    //Dummy Image Fixtures
    AddDummyImages();

}

//Add Key Down Event 
//On Delete Remove Selected Object from canvas 
function OnkeyDown(event){
    var activeObject = PhotoCollage.getActiveObject();
    if (event.keyCode === 46) {
    	PhotoCollage.remove(activeObject);
    }
}

//Add Drop Event Listner to get images into canvas
function  OnImageDrop(event) {
    event.preventDefault();
    var imageObj=new Image();
    imageObj.src=event.dataTransfer.getData("text");
    insertAtCenter(imageObj);
    
}


//Image drag over event
function OnImageDragOver(event) {
  event.preventDefault();
}

//Set Image src on drag start
function drag(event) {
    event.dataTransfer.setData("text",event.target.src);
}


//On Upload Image Display it
function displayimg(event){
  var selectedFile = event.target.files[0];
  var reader = new FileReader();
  var preview=document.getElementById("img_drop");

  //On Image Load
  preview.onload=function(){
     var imageObj=new Image();
     imageObj.src=this.src;
    insertAtCenter(imageObj);
  };
  
  //On File Read Complete
  reader.onload=function () {
    preview.src=reader.result;
  };

  if (selectedFile) {
    reader.readAsDataURL(selectedFile);
  }

}


//Insert and Add object to canvas 
function insertAtCenter(imgElement){
  imgElement.setAttribute('crossOrigin', 'anonymous');
	var imgInstance = new fabric.Image(imgElement, {
    left: PhotoCollage.getWidth()/2-imgElement.width/2,
    top: PhotoCollage.getHeight()/2-imgElement.height/2,
    angle: 0,
});
	PhotoCollage.add(imgInstance);

}

//Download canvas Image
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

//Add dummy Images
//Not Proper way, need to implement image search to display few images on basis of search.
function  AddDummyImages() {
   var imgContainer=document.getElementById("img-container");
    //Temporray  Fixtures.
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
