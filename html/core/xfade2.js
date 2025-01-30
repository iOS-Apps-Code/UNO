/*****

Image Cross Fade Redux
Version 1.0
Last revision: 02.15.2006
steve@slayeroffice.com

Please leave this notice intact. 

Rewrite of old code found here: http://slayeroffice.com/code/imageCrossFade/index.html


*****/

var d=document, imgs = new Array(), zInterval = null, current=0, pause=false;

function so_init(blnSetTimeout) {
	// verify divs first
	divs=d.getElementById("imageContainer").getElementsByTagName("div");
	for(i=0;i<divs.length;i++) {
		if(divs[i].style.display!='none') {
			imgs = d.getElementById(divs[i].id).getElementsByTagName("img");
			for(j=1;j<imgs.length;j++) imgs[j].xOpacity = 0;			
		}
	}

	imgs[0].style.display = "block";
	imgs[0].xOpacity = .99;
	
	if(blnSetTimeout) setTimeout(so_xfade,400);
}

function so_xfade() {
	cOpacity = imgs[current].xOpacity;
	nIndex = imgs[current+1]?current+1:0;

	nOpacity = imgs[nIndex].xOpacity;
	
	cOpacity-=.05; 
	nOpacity+=.05;
	
	imgs[nIndex].style.display = "block";
	imgs[current].xOpacity = cOpacity;
	imgs[nIndex].xOpacity = nOpacity;
	
	setOpacity(imgs[current]); 
	setOpacity(imgs[nIndex]);
	
	if(cOpacity<=0) {
		imgs[current].style.display = "none";
		current = nIndex;
		setTimeout(so_xfade,400);
	} else {
		setTimeout(so_xfade,50);
	}
	
}

function setOpacity(obj) {
	if(obj.xOpacity>.99) {
		obj.xOpacity = .99;
		return;
	}
	obj.style.opacity = obj.xOpacity;
	obj.style.MozOpacity = obj.xOpacity;
	obj.style.filter = "alpha(opacity=" + (obj.xOpacity*100) + ")";
}