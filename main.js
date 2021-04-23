var c=document.getElementById("my-canvas");
var ctx=c.getContext("2d");



let loadImage=(src,callback)=>{
var img = document.createElement("img");

img.onload =()=> callback(img);
img.src = src;	
};
//var img = new Image();
let imagePath=(framenumber,animation)=>{
	return "./"+animation+"/"+ framenumber + ".png";
};

let frames={
idle:[1,2,3,4,5,6,7,8],
kick:[1,2,3,4,5,6,7],
punch:[1,2,3,4,5,6,7],
backward:[1,2,3,4,5,6],
forward:[1,2,3,4,5,6],
block:[1,2,3,4,5,6,7,8,9],
};
let loadImages=(callback)=>{
	let images={idle:[],kick:[],punch:[],forward:[],block:[],backward:[]};
	let imagesToLoad=0;
	["idle","kick","punch","forward","block","backward"].forEach((animation)=>{

		var animationFrames = frames[animation];


		imagesToLoad = animationFrames.length+imagesToLoad;

		animationFrames.forEach((framenumber)=>{
			let path=imagePath(framenumber,animation);
		loadImage(path,(image)=>{
			//Do sometrhing with that image
			images[animation][framenumber-1]=image;
			imagesToLoad=imagesToLoad-1;
			if(imagesToLoad===0){
				callback(images);
			}
		});
	});
		
	});
};

let animate=(ctx,images,animation,callback)=>{
	images[animation].forEach((image,index)=>{
		setTimeout(()=>{
			ctx.clearRect(0, 0, 500, 500);

			ctx.drawImage(image,0,0,500,500);
		},index*100);

		});
	setTimeout(callback,images[animation].length *100);
};

loadImages((images)=>{

	let queuedAnimation=[];

	let aux=()=>{
		let selectedAnimation;
		if (queuedAnimation.length===0) {
			selectedAnimation="idle";
		}else{
			selectedAnimation=queuedAnimation.shift();
		}
		animate(ctx,images,selectedAnimation,aux)
	}
	aux();

	document.getElementById("kick").onclick=()=>{
queuedAnimation.push("kick");
	};
	document.getElementById("punch").onclick=()=>{
queuedAnimation.push("punch");
	};
document.getElementById("block").onclick=()=>{
queuedAnimation.push("block");
	};
	document.getElementById("backward").onclick=()=>{
queuedAnimation.push("backward");
	};
document.getElementById("forward").onclick=()=>{
queuedAnimation.push("forward");
	};
	document.addEventListener('keyup',(event)=> {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
if(key==="ArrowLeft"){
	queuedAnimation.push("backward");
}else if(key==="ArrowRight"){
	queuedAnimation.push("forward");
}else if(key==="ArrowDown"){
	queuedAnimation.push("punch");
}else if(key==="ArrowUp"){
	queuedAnimation.push("kick");
}

});
});

/*var img = document.createElement("img");
img.onload =()=> {
   ctx.drawImage(img, 0, 0,500,500);
};
img.src = "./idle.png";
*/
