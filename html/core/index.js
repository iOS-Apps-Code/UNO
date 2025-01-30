function spin(strLinkSent) {
	if(strLinkSent) strLink=strLinkSent
	setInterval("document.getElementById('spinner').style.webkitTransform='translateX(-100%)'",200);	
	setTimeout("location.href='"+strLink+"'",200);	
}

function spinbackwards(strLink) {
	document.getElementById('spinner').style.webkitTransform='translateX(100%)';
	setTimeout("location.href='"+strLink+"'",200);	
}