function displayRating(intRating) {
	intNumberFullStars=parseInt(intRating);
	intNumberEmptyStars=parseInt(5-intRating);
	intNumberHalfFullStars=5-intNumberFullStars-intNumberEmptyStars;
	var output='';
	if(intNumberFullStars) {
		for(var i=1;i<=intNumberFullStars;i++) {
			output+='<img src="star_on.png"/>&nbsp;';
		}
	}
	if(intNumberHalfFullStars) {
		for(var i=1;i<=intNumberHalfFullStars;i++) {
			output+='<img src="star_half.png"/>&nbsp;';
		}
	}
	if(intNumberEmptyStars) {
		for(var i=1;i<=intNumberEmptyStars;i++) {
			output+='<img src="star_off.png"/>&nbsp;';
		}
	}
	return output;
}