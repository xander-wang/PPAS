var addressCity;
var addressDistrict;
var addressDoornumber;
var addressProvince;
var addressStreet;
var addressTown;
var addressTypeCode;
var archiveDate;
var archiveInstituteCode;
var archiverName;
var contactName;
var contactTel;
var dateOfBirth;
var ethnicityCode;
var genderCode;
var healthCardNumber;
var healthProfileId;
var id1;
var jobTypeCode;
var marriageStatusCode;
var medInsuranceTypeCode;
var patientId;
var patientIdTypeCode;
var patientName;
var patientTel;
var postalCode;
var workingPlaceName;
var workingPlaceTel;
function getid() {
	var a = myform.inputid.value;
	return a;
}

function getdata(id) {
	$.ajax({
		url: "http://localhost:8020/patients/basic",
		type: 'post',
		data: { 'id': id },
		dataType: 'json',
		async: false,
		success: function (data) {
			addressCity = data.addressCity;
			addressDistrict = data.addressDistrict;
			addressDoornumber = data.addressDoornumber;
			addressProvince = data.addressProvince;
			addressStreet = data.addressStreet;
			addressTown = data.addressTown;
			addressTypeCode = data.addressTypeCode;
			archiveDate = data.archiveDate;
			archiveInstituteCode = data.archiveInstituteCode;
			archiverName = data.archiverName;
			contactName = data.contactName;
			contactTel = data.contactTel;
			dateOfBirth = data.dateOfBirth;
			ethnicityCode = data.ethnicityCode;
			genderCode = data.genderCode;
			healthCardNumber = data.healthCardNumber;
			healthProfileId = data.healthProfileId;
			id1 = data.id;
			jobTypeCode = data.jobTypeCode;
			marriageStatusCode = data.marriageStatusCode;
			medInsuranceTypeCode = data.medInsuranceTypeCode;
			patientId = data.patientId;
			patientIdTypeCode = data.patientIdTypeCode;
			patientName = data.patientName;
			patientTel = data.patientTel;
			postalCode = data.postalCode;
			workingPlaceName = data.workingPlaceName;
			workingPlaceTel = data.workingPlaceTel;
		},

		error: function (data, textStatus, errorThrown) {
			alert("失败");
		}
	});

}
function getPersonalinformation() {
	getdata(getid());
	document.getElementById('healthCardNumber').innerHTML = '健康卡号�?' + healthCardNumber;
	document.getElementById('patientName').innerHTML = '�?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：' + patientName;
	document.getElementById('genderCode').innerHTML = '�?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：' + genderCode;
	document.getElementById('postalCode').innerHTML = '�?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;编：' + postalCode;
	document.getElementById('patientTel').innerHTML = '�?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机：' + patientTel;
}
function getMorbidity() {
	var myChart = echarts.init(document.getElementById('chart'));
	var Morbidity = {
		title: {
			text: "每年就诊次数"
		},

		xAxis: {
			data: ['您的就诊次数', '人均次数']
		},
		yAxis: {
		},
		series: [{
			name: '就诊对比',
			type: 'bar',
			data: ['5', '3.2']
		}]
	};
	myChart.setOption(Morbidity);
}
function getBloodtype() {
	var div_ = document.getElementById("chart1");
	var myChart1 = echarts.init(div_);
	var Bloodtype = {
		title: {
			text: '病人血型及血型份�?',
			subtext: '了解自己血�?',
			left: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			bottom: 10,
			left: 'center',
			data: ['AB�?', 'A�?', 'B�?', 'O�?', '稀有型']
		},
		series: [
			{
				type: 'pie',
				radius: '65%',
				center: ['50%', '50%'],
				selectedMode: 'single',
				data: [
					{ value: 300, name: 'AB�?' },
					{ value: 1300, name: 'A�?' },
					{ value: 900, name: 'B型（您是B型）' },
					{ value: 977, name: 'O�?' },
					{ value: 50, name: '稀有型' }
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	myChart1.setOption(Bloodtype);
}
function gethighblood() {
	var myChart = echarts.init(document.getElementById('huanbing'));
	var option = {
		title: {
			text: '心脑血管病各年龄患病率',
			subtext: '注意保持指标正常',
			left: 'center'
		},
		xAxis: {
			type: 'category',
			data: ['0-19�?', '20-39�?', '40-59�?', '60岁以�?']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [1.47, 4.32, 7.21, 27.3],
			type: 'line',
			symbol: 'triangle',
			symbolSize: 20,
			lineStyle: {
				normal: {
					color: 'green',
					width: 4,
					type: 'dashed'
				}
			},
			itemStyle: {
				normal: {
					borderWidth: 3,
					borderColor: 'yellow',
					color: 'blue'
				}
			}
		}]
	};
	myChart.setOption(option);
}
function visiblediv() {
	document.getElementById("maindiv").style.visibility = "visible";
}
function visibleform() {
	document.getElementById("biaodan").style.visibility = "visible";
}
function dotask() {
	visiblediv();
	getPersonalinformation();
	getMorbidity();
	getBloodtype();
	gethighblood();
}




