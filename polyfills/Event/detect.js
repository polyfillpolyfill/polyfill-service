(function(){
	if(!'Event' in window) return false;

	if(typeof window.Event === 'function') return true;

	var result = true;
	try{
		new Event('click');
	}catch(e){
		result = false;
	}

	return result;
}())
