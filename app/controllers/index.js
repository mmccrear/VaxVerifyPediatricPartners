Alloy.Globals.navWindow = $.navWindow;

$.navWindow.open();

function saveDob(){
	var dateParse = $.childDobField.value.split(/[\s,.\/]+/);
	var calcage = new Date(dateParse[2],dateParse[0]-1,dateParse[1]);

	var vaxWindow = Alloy.createController("vaccineDates",calcage).getView();
	$.navWindow.openWindow(vaxWindow);
}
