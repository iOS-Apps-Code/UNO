function XMLHttp()
{
	var xmlhttp;
	/**
	*
	*/
	this.get = function () 
	{	
		/*@cc_on
		@if (@_jscript_version >= 5)
		try {
			this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {
			try {
				this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (E) {
				this.xmlhttp = false;
			}		
		}
		@else
		this.xmlhttp = false;
		@end @*/
	
		if (!this.xmlhttp && typeof XMLHttpRequest != 'undefined') {
			try {
				this.xmlhttp = new XMLHttpRequest();
			}
			catch (e) {
				this.xmlhttp = false;
			}
		}
			
		return(this.xmlhttp);
	};
	
	/**
	* Returns a boolean wether the xmlhttp object is ready to be used or not
	*/
	this.isReady = function ()
	{
		try{
			if (this.xmlhttp.readyState==4) {
				if (this.xmlhttp.status == 200) {
				return(true);
				}
			}
		}
		catch(e){
		}
		return(false);
	};
	
	/**
	*
	*/
	this.sendData = function(method, url, data)
	{
		if(method == "GET") {
			if(data == 'null') {
			
				this.xmlhttp.open("GET", url, true); 
			}
			else {
		
				this.xmlhttp.open("GET", url+"?"+data, true);
			}
			
			this.xmlhttp.send(null);
		}
		else if(method == "POST") {
			this.xmlhttp.open("POST", url, true); 
			this.xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			this.xmlhttp.setRequestHeader("Content-length", data.length);
			this.xmlhttp.send(data);
		}
		this.blnCanDoOtherEvent = false;
		/*
		else if(method == "HEAD") {
			this.xmlhttp.open("HEAD", url, true); // TODO!
		}
		*/
		return(true);
		
	};
	
	/**
	*
	*/
	this.getText = function ()
	{
		return(this.xmlhttp.responseText);
	}
	
	/**
	*
	*/
	this.getXML = function ()
	{
		return(this.xmlhttp.responseXML);
	}
}

/**
* @param string		ID of the object to fill
* @param string		Request Type (what operation to perform in fillselect.php?)		
* @param string		Other Params (format: 'xxx=yyy&aaa=bbb')
* @param bool		Clear the select before filling it?
* @param bool		Hide the select if the result is empty?
*/
function selectFromXML(strSelectID, strAction, strOtherParams,strExecCommand)
{
	var req = new XMLHttp();
	req.get();
	req.xmlhttp.onreadystatechange=function() {
		if(req.isReady()) {
			//alert(req.getText());
			var objXml = document.createElement('XML');
			objXml.XMLDocument = req.getText();
			
			var objSelect = document.getElementById(strSelectID);
			fillselect(req.getXML(),objSelect,0);
		}
	}

	req.sendData('GET', 'index.php', 'action='+strAction+'&'+strOtherParams);
}

function setDataFromXML(strElementID, strAction, strOtherParams,strExecCommand)
{
	var req = new XMLHttp();
	req.get();
	req.xmlhttp.onreadystatechange=function() {
		if(req.isReady()) {
			//alert(req.getText());
			strContentData = req.getText();
			setData(strContentData,strElementID);
			
		}
	}
//document.write('action='+strAction+'&'+strOtherParams);
	req.sendData('GET', 'index.php', 'action='+strAction+'&'+strOtherParams);
}


function updateServerData(strScript, strAction, strOptionnalCommand,strOptionnalValue)
{
	var req = new XMLHttp();
	req.get();
	req.xmlhttp.onreadystatechange=function() {
		if(req.isReady()) {
	
			if(strOptionnalValue != undefined)
				strOptionnalValue = '\''+ strOptionnalValue + '\',\'' + req.getText()+'\'';
			else	
				strOptionnalValue = '\'' +req.getText()+'\'';
			
			if(strOptionnalCommand)	
				eval("" + strOptionnalCommand + "(" + strOptionnalValue + ")");
		}
	}
	
	req.sendData('GET', strScript, strAction);
}

function updateServerDataPost(strAction, strOtherParams,strOptionnalCommand,strOptionnalValue)
{
	var req = new XMLHttp();
	req.get();
	req.xmlhttp.onreadystatechange=function() {
		if(req.isReady()) {
	
			if(strOptionnalValue != undefined)
				strOptionnalValue = '\''+ strOptionnalValue + '\',\'' + req.getText()+'\'';
			else	
				strOptionnalValue = '\'' +req.getText()+'\'';
			if(strOptionnalCommand)	
				eval("" + strOptionnalCommand + "(" + strOptionnalValue + ")");
		}
	}
	
	req.sendData('POST', 'index.php', 'action='+strAction+'&'+strOtherParams);
}
