var args = arguments[0] || {};
var today = new Date();
today.setHours(0,0,0,0);
var results={};

var age = args;
var oneweekms = 604800000;
var onemonthms = 2629743833.3334;

var fourweeks = 4*oneweekms;
var sixweeks = 6*oneweekms;
var eightweeks = 8*oneweekms;
var fifteenweeks = 15*oneweekms;
var sixteenweeks = 16*oneweekms;
var twentyfourweeks = 24*oneweekms;
var sixmonths = 6*onemonthms;
var fouryears = 48*onemonthms;
var sixteenweeks = 16*oneweekms;
var twentyfourweeks = 24*oneweekms;



function saveVax(){
	var results={};

	//HepB	
	var dateParse1 = $.hepb1.value.split(/[\s,.\/]+/);
	var dateParse2 = $.hepb2.value.split(/[\s,.\/]+/);
	var dateParse3 = $.hepb3.value.split(/[\s,.\/]+/);
	dose1 = dateParse1.length!=3 ? "" : new Date(dateParse1[2],dateParse1[0]-1,dateParse1[1]);
	dose2 = dateParse2.length!=3 ? "" : new Date(dateParse2[2],dateParse2[0]-1,dateParse2[1]);
	dose3 = dateParse3.length!=3 ? "" : new Date(dateParse3[2],dateParse3[0]-1,dateParse3[1]);

	var vax = hepbcalc(dose1,dose2,dose3);
	if(vax!==-1){
		var rowValue = "HepB, "+vax[1];				
		if(vax[0] in results){
			results[vax[0]].push(rowValue);
		}
		else{
			results[vax[0]]=[rowValue];
		}
	}
	
	//RV
	var dateParse1 = $.rv1.value.split(/[\s,.\/]+/);
	var dateParse2 = $.rv2.value.split(/[\s,.\/]+/);
	var dateParse3 = $.rv3.value.split(/[\s,.\/]+/);
	dose1 = dateParse1.length!=3 ? "" : new Date(dateParse1[2],dateParse1[0]-1,dateParse1[1]);
	dose2 = dateParse2.length!=3 ? "" : new Date(dateParse2[2],dateParse2[0]-1,dateParse2[1]);
	dose3 = dateParse3.length!=3 ? "" : new Date(dateParse3[2],dateParse3[0]-1,dateParse3[1]);

	var vax = hepbcalc(dose1,dose2,dose3);
	if(vax!==-1){
		var rowValue = "RV, "+vax[1];				
		if(vax[0] in results){
			results[vax[0]].push(rowValue);
		}
		else{
			results[vax[0]]=[rowValue];
		}
	}
	
	//DTaP
	var dateParse1 = $.dtap1.value.split(/[\s,.\/]+/);
	var dateParse2 = $.dtap2.value.split(/[\s,.\/]+/);
	var dateParse3 = $.dtap3.value.split(/[\s,.\/]+/);
	var dateParse4 = $.dtap4.value.split(/[\s,.\/]+/);
	var dateParse5 = $.dtap5.value.split(/[\s,.\/]+/);


	dose1 = dateParse1.length!=3 ? "" : new Date(dateParse1[2],dateParse1[0]-1,dateParse1[1]);
	dose2 = dateParse2.length!=3 ? "" : new Date(dateParse2[2],dateParse2[0]-1,dateParse2[1]);
	dose3 = dateParse3.length!=3 ? "" : new Date(dateParse3[2],dateParse3[0]-1,dateParse3[1]);
	dose4 = dateParse4.length!=3 ? "" : new Date(dateParse4[2],dateParse4[0]-1,dateParse4[1]);
	dose5 = dateParse5.length!=3 ? "" : new Date(dateParse5[2],dateParse5[0]-1,dateParse5[1]);

	var vax = dtapcalc(dose1,dose2,dose3,dose4,dose5);
	if(vax!==-1){
		var rowValue = "DTaP, "+vax[1];				
		if(vax[0] in results){
			results[vax[0]].push(rowValue);
		}
		else{
			results[vax[0]]=[rowValue];
		}
	}
	
	//Finalize results
	
	if("Today" in results){
		var todayDex = results.array.indexOf("Today");
		var today = results.splice(todayDex, 1);
		results.unshift(today);
	}
	
	var resultsWindow = Alloy.createController("resultsList",results).getView();
	Alloy.Globals.navWindow.openWindow(resultsWindow);
}

function hepbcalc(dose1, dose2, dose3){
	if(/a-zA-z+/.test(dose1)||/a-zA-z+/.test(dose2)||/a-zA-z+/.test(dose3)){
		return -1;
	}
	if(dose1&&dose2&&dose3){
		return["Finished"];
	}
	if(!dose1){
		return ["Today", "1st, >0d age"];
	}
	else if(!dose2){
		var fourweeks = 4*oneweekms;
		if((today-dose1)>=fourweeks){
			return["Today", "2nd, >4w dose 1"];
		}
		else{
			var next = new Date();
			next.setTime(dose1.getTime()+fourweeks);
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<4w dose 1"];
		}
	}
	else{
		var eightweekdate = new Date().setTime(dose2+eightweeks);
		var sixteenweekdate = new Date().setTime(dose1+sixteenweeks);
		var twentyfourweekdate = new Date().setTime(age+twentfourweeks);
		
		if((today-dose2)>=eightweeks && (today-dose1)>=sixteenweeks && (today-age)>=twentyfourweeks){
			return["Today", "3rd, >16w dose 1, >8w dose 2, >24w age"];
		}
		else if((today-dose2)>=eightweeks && (today-dose1)>=sixteenweeks){
			var next = twentyfourweekdate;
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<24w age"];
		}
		else if((today-dose1)>=sixteenweeks && (today-age)>=twentyfourweeks){
			var next = eightweekdate;
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<24w age"];
		}
		else if((today-dose2)>=eightweeks && (today-dose1)>=sixteenweeks){
			var next = eightweekdate;
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<24w age"];
		}
		else if((today-dose2)>=eightweeks){
			var next = eightweekdate>twentyfourweekdate? sixteenweekdate : twentyfourweekdate;
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<16w dose1, <24w age"];			
		}
		else if((today-dose1)>=sixteenweeks){
			var next = eightweekdate>twentyfourweekdate ? eightweekdate : twentyfourweekdate;
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<8w dose2, <24w age"];			
		}
		else if((today-age)>=twentyfourweeks){
			var next = eightweekdate>sixteenweekdate ? eightweekdate : sixteenweekdate;
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<8w dose2, <24w age"];			
		}
		var next;
		if(eightweeks>sixteenweeks){
			next = eightweeks>twentyfourweeks ? new Date(eightweeks) : next = twentyfourweekdate; 
		}
		else{
			next = sixteenweeks>twentyfourweeks ? sixteenweekdate : twentyfourweekdate;
		}
		var nextApt = next.toDateString().substring(4);
		return [nextApt,"<16w dose 1, <8w dose 2, <24w age"];
	}
}

function rvcalc(dose1, dose2, dose3){
	if(/a-zA-z+/.test(dose1)||/a-zA-z+/.test(dose2)||/a-zA-z+/.test(dose3)){
		return -1;
	}
	if(dose1&&dose2&&dose3){
		return["Finished"];
	}
	if(!dose1){
		if((today-age)>=fifteenweeks){
			return["Never",">15w age"];
		}
		else if((today-age)>=sixweeks){
			return ["Today", "1st, 15w>age>6w"];
		}
		else{
			var next = new Date();
			next.setTime(age.getTime()+sixweeks);
			var nextApt = next.toDateString().substring(4);
			return [nextApt, "<6w age"];
		}
	}
	else if(!dose2){
		if((today-dose1)>=fourweeks){
			if((today-age)>=eightmonths){
				return["Never", ">8m age"];
			}
			return["Today", "2nd, >4w dose 1"];
		}	
		else{
			var next = new Date();
			next.setTime(dose1.getTime()+fourweeks);
			if((next-age)>=eightmonths){
				return["Never",">8m age by next dose"];
			}
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<4w dose 1"];
		}
	}
	else{
		var fourweeks = 4*oneweekms;
		if((today-dose2)>=fourweeks){
			if((today-age)>=eightmonths){
				return["Never", ">8m age"];
			}
			return["Today", "3rd, >4w dose 2"];
		}	
		else{
			var next = new Date();
			next.setTime(dose2.getTime()+fourweeks);
			if((next-age)>=eightmonths){
				return["Never",">8m age by next dose"];
			}
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<4w dose 2"];
		}
	}
}

function dtapcalc(dose1, dose2, dose3, dose4, dose5){
	if(/a-zA-z+/.test(dose1)||/a-zA-z+/.test(dose2)||/a-zA-z+/.test(dose3)||/a-zA-z+/.test(dose4)||/a-zA-z+/.test(dose5)){
		return -1;
	}
	if(dose1&&dose2&&dose3&&dose4&&dose5){
		return["Finished"];
	}
	
	else if(!dose1){
		if((today-age)>=sixweeks){
			return ["Today", "1st, >6w age"];
		}
		else{
			var next = new Date();
			next.setTime(age.getTime()+sixweeks);
			var nextApt = next.toDateString().substring(4);
			return [nextApt, "<6w age"];
		}
	}
	else if(!dose2){
		if((today-dose1)>=fourweeks){
			return["Today", "2nd, >4w dose 1"];
		}	
		else{
			var next = new Date();
			next.setTime(dose1.getTime()+fourweeks);
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<4w dose 1"];
		}
	}
	else if(!dose3){
		if((today-dose2)>=fourweeks){
			return["Today", "3rd, >4w dose 2"];
		}	
		else{
			var next = new Date();
			next.setTime(dose1.getTime()+fourweeks);
			var nextApt = next.toDateString().substring(4);
			return[nextApt, "<4w dose 2"];
		}
	}
	else if(!dose4){
		if((today-dose3)>=sixmonths){
			if((today-age)>=twelvemonths){
				return["Today", "4th, >6m dose 3, >12m age"];
			}
			else{
				return[nextApt, "4th, >6m dose 3"];				
			}
		}
		else{
			var sixmonthdate = next.setTime(dose1.getTime()+sixmonths);
			if(age>sixmonthdate){
				var nextApt = next.toDateString().substring(4,-1);
				var year = next.toDateString().substring(next.toDateString().length-2,-1);
				nextApt+=year;
				return[nextApt, "<12m age, >6m dose 3"];
			}
			var nextApt = sixmonthday.toDateString().substring(4);
			return[nextApt, ">6m dose 3"];
		}
		
	}	
	else{
		if((dose4-dose3)>=fourmonths && (dose4-dose3)<=sixmonths){
			if((dose4-age)>=fouryears){
				return["Finished"];
			}
			else{
				if((today-dose4)>=sixmonths){
					return["Today","5th, >6w dose 4"];
				}
				var next = new Date();
				next.setTime(dose4.getTime()+sixmonths);
				var nextApt = next.toDateString().substring(4);
				return [nextApt, "<6m dose 4"];
			}
		}
		else{
			return["Today","4th, repeat 4th dose, <4m since dose 3"];
		}
	}
}