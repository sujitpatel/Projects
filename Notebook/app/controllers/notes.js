var _args = arguments[0] || {};

if(_args[0].item != undefined){
	$.noteSubject.value = _args[0].item.noteName.text;
	$.noteDetail.value =  _args[0].item.noteDetail.text;
	$.noteDetail.focus();
}
else{
	$.noteSubject.focus();
}
	



function closeWindow(){
	//Ti.API.info("Subject: "+_args.noteName.text);
	$.notes.close();
}

function onDeleteBtnClick(e){
	var newDataSet = require('NoteDataSet');
	Ti.API.info("Current Index: "+_args[0].index);
	var noteDataSet = newDataSet.deleteData(_args[0].index);
	
	$.notes.close();
}

function onSaveBtnClick(){
	
	if(_args[0].item == undefined){
		if($.noteSubject.value == "" || $.noteDetail.value == ""){
			alert("Fill All Data !!");	
		}
		else{
			var newDataSet = require('NoteDataSet');
			var noteDataSet = newDataSet.addData($.noteSubject.value,$.noteDetail.value,getDate());
			
			$.notes.close();
		}
	}
	else{
		var index = _args[0].index;
		var dataset = _args[0].dataset;
		Ti.API.info("index: "+index+" name");
		dataset[index].noteName = $.noteSubject.value;
		//dataset[index].noteDate = _args.noteName.value;
		dataset[index].noteDetail = $.noteDetail.value;
		Ti.API.info("index: "+$.noteSubject.value.length() +" name"+$.noteSubject.value);
		if($.noteSubject.value.length() > 0 && $.noteDetail.value.length() > 0){
			alert("Fill All Data !!");	
		}
		else{
			var newDataSet = require('NoteDataSet');
			var noteDataSet = newDataSet.updateData(index,$.noteSubject.value,$.noteDetail.value,getDate());
			Ti.API.info("index: "+index+" name"+$.noteSubject.value);
			$.notes.close();
		}	
	}
	
}
$.notes.addEventListener("postlayout", function(e){
	$.notes.animate({
		opacity: 1.0,
		duration: 250,
		curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
});

function getDate() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
 
    if (hours < 10) { hours = "0" + hours}; 
    if (minutes < 10) { minutes = "0" + minutes};
    if (seconds < 10) { seconds = "0" + seconds};
 
    return month + "/" + day + "/" + year + " -  " + hours + ":" + minutes + ":" + seconds;
 
}