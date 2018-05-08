function getid() {
	var a = loginform.loginid.value
	return a;

}

//以下为载入测试值

function getlogindata() {
	loginform.loginname.value = '涂敬原';
	loginform.loginid.value = '420106196806205291';
}

//以下为Cookie
function setCookie(name, value, days) { //封装一个设置cookie的函数
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + days); //days为保存时间长度
	document.cookie = name + '=' + value + ';expires=' + oDate;
}

function putCookie() {
	var idcard = loginform.loginid.value;
	setCookie('idcard', idcard);
}
function putCookie2(id1){
	var adviceid = id1;
	setCookie('adviceid', adviceid);
}

function getCookie() {
	var arr = document.cookie.split(';');	
	for(var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if(arr2[0] =='idcard') {			
			return arr2[1]; 
		}
		arr2 = arr[1].split('=');
		return arr2[1];
	}
	return ''; //找不到就返回空字符串
}
function getCookie2() {
	var arr = document.cookie.split(';');	
	for(var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		if(arr2[0] =='adviceid') {	
			return arr2[1]; 
			
		}
		arr2 = arr[1].split('=');
		return arr2[1];
	}
	return ''; 
}

//以下为login界面
function clicklogin() {
	idcard = getid();
	$.ajax({
		url: "http://47.100.210.224:8020/patients/basic",
		type: 'post',
		data: {
			'id': idcard
		},
		dataType: 'json',
		async: true,
		success: function(data) {
			var name = loginform.loginname.value;
			if(data == "") {
				alert("查询病人数据失败，健康卡号错误");
			} else if(name == data[0].patientName) {
				window.location.href = 'index.html';
				putCookie();
				putCookie2(data[0].id);
			} else {
				alert("查询病人数据失败，健康卡号和姓名不匹配");
			}

		},

		error: function(data, textStatus, errorThrown) {
			alert("查询病人数据失败，获取数据库失败");
		}
	});
}

//以下为index界面
function indexload() {
	if(getCookie() == "") {
		alert("未输入健康卡号")
		window.location.href = 'login.html';
	} else {
		var idcard = getCookie();
		$.ajax({
			url: "http://47.100.210.224:8020/patients/basic",
			type: 'post',
			data: {
				'id': idcard
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					document.getElementById('healthProfileId').innerText = data[0].healthProfileId;
					document.getElementById('patientId').innerText = data[0].patientId;
					document.getElementById('healthCardNumber').innerText = data[0].healthCardNumber;
					document.getElementById('dateOfBirth').innerText = data[0].dateOfBirth;
					document.getElementById('ethnicityCode').innerText = data[0].ethnicityCode;
					document.getElementById('genderCode').innerText = data[0].genderCode;
					document.getElementById('addressProvince').innerText = data[0].addressProvince;
					document.getElementById('medInsuranceTypeCode').innerText = data[0].medInsuranceTypeCode;
					document.getElementById('patientName').innerText = data[0].patientName;
					document.getElementById('marriageStatusCode').innerText = data[0].marriageStatusCode;
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为基本健康信息的既往史调用
		$.ajax({
			url: "http://47.100.210.224:8020/patients/health",
			type: 'post',
			data: {
				'id': idcard
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					document.getElementById('abobloodTypeCode').innerHTML = "&nbsp;&nbsp;&nbsp;" + data[0].abobloodTypeCode + "型";
					document.getElementById('rhBloodTypeCode').innerHTML = "&nbsp;" + data[0].rhBloodTypeCode;
					if(data[0].infectiousDiseaseHistory == "有")
						document.getElementById('infectiousDiseaseHistory').className = "fa fa-check-circle-o fa-2x pull-right";
					if(data[0].vaccinationHistory == "有")
						document.getElementById('vaccinationHistory').className = "fa fa-check-circle-o fa-2x pull-right";
					if(data[0].operationHistory == "有")
						document.getElementById('operationHistory').className = "fa fa-check-circle-o fa-2x pull-right";
					if(data[0].transfusionHistory == "有")
						document.getElementById('transfusionHistory').className = "fa fa-check-circle-o fa-2x pull-right";
					if(data[0].allergyHistory == "有")
						document.getElementById('allergyHistory').className = "fa fa-check-circle-o fa-2x pull-right";
					if(data[0].familyHistory == "有")
						document.getElementById('familyHistory').className = "fa fa-check-circle-o fa-2x pull-right";
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为医疗费用接口调用
		$.ajax({
			url: "http://47.100.210.224:8020/patients/expense",
			type: 'post',
			data: {
				'id': idcard
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					document.getElementById('paymentMethodCode').innerHTML = data[0].paymentMethodCode;
					document.getElementById('outpatientExpense').innerHTML = data[0].outpatientExpense + "元";
					document.getElementById('inpatientExpense').innerHTML = data[0].inpatientExpense + "元";
					document.getElementById('personalExpense').innerHTML = data[0].personalExpense + "元";

					//以下为医疗费用表格

					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var paychart = document.getElementById('paychart');
					var resizeContainer = function() {
						paychart.style.width = paychart.innerWidth + 'px';
						paychart.style.height = paychart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(paychart);
					var option = {
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							orient: 'vertical',
							x: 'left',
							data: ['门诊费用', '住院费用', '个人费用', ]
						},

						toolbox: {
							show: true,
							feature: {
								mark: {
									show: true
								},
								dataView: {
									show: true,
									readOnly: false
								},
								magicType: {
									show: true,
									type: ['pie', 'funnel'],
									option: {
										funnel: {
											x: '25%',
											width: '50%',
											funnelAlign: 'center',
											max: 1548
										}
									}
								},
								restore: {
									show: true
								},
								saveAsImage: {
									show: true
								}
							}
						},
						calculable: true,
						series: [{
							name: '',
							type: 'pie',
							radius: ['40%', '60%'],
							itemStyle: {
								normal: {
									label: {
										show: false
									},
									labelLine: {
										show: false
									}
								},
								emphasis: {
									label: {
										show: true,
										position: 'center',
										textStyle: {
											fontSize: '15',
											fontWeight: 'bold'
										}
									}
								}
							},

							data: [{
									value: data[0].outpatientExpense,
									name: '门诊费用'
								},
								{
									value: data[0].inpatientExpense,
									name: '住院费用'
								},
								{
									value: data[0].personalExpense,
									name: '个人费用'
								}
							]
						}]
					};

					myChart.setOption(option);
					window.onresize = function() {
						resizeContainer();
						myChart.resize();
					};
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为医疗事件调用
		$.ajax({
			url: "http://47.100.210.224:8020/patients/event",
			type: 'post',
			data: {
				'id': idcard
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					document.getElementById('attackDatetime').innerText = data[0].attackDatetime;
					document.getElementById('visitDatetime').innerText = data[0].visitDatetime;
					document.getElementById('inhospitalDatetime').innerText = data[0].inhospitalDatetime;
					document.getElementById('outhospitalDatetime').innerText = data[0].outhospitalDatetime;
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

	}
}

//以下为statistics界面
function statisticsload() {
	if(getCookie() == "") {
		alert("未输入健康卡号")
		window.location.href = 'login.html';
	} else {

		//以下为获取患者ID
		var idcard = getCookie();
		$.ajax({
			url: "http://47.100.210.224:8020/patients/basic",
			type: 'post',
			data: {
				'id': idcard
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					document.getElementById('patientnumber').innerHTML = data[0].id + "&nbsp;位患者";

				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为男女性别比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/gender",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var sexchart = document.getElementById('sexchart');
					var resizeContainer = function() {
						sexchart.style.width = sexchart.innerWidth + 'px';
						sexchart.style.height = sexchart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(sexchart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						color: ['#FFE7BA', '#FFA3A3'],
						legend: {
							orient: 'vertical',
							left: 'left',
							data: ['男性', '女性']
						},
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							label: {
								textStyle: {
									color: '#726DD1'
								}
							},
							data: [{
									value: data[0].male,
									name: '男性'
								},
								{
									value: data[0].female,
									name: '女性'
								},

							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}
			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为患者年龄段比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/age",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var agechart = document.getElementById('agechart');
					var resizeContainer = function() {
						agechart.style.width = agechart.innerWidth + 'px';
						agechart.style.height = agechart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(agechart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							label: {
								textStyle: {
									color: '#726DD1'
								}
							},
							data: [{
									value: data[0]._0to10,
									itemStyle: {
										normal: {
											color: '#CF2782'
										}
									},

									name: '0-10'
								},
								{
									value: data[0]._10to20,
									itemStyle: {
										normal: {
											color: '#C4F2EF'
										}
									},
									name: '10-20'
								},
								{
									value: data[0]._20to30,
									itemStyle: {
										normal: {
											color: '#FF9AB5'
										}
									},
									name: '20-30'
								},
								{
									value: data[0]._30to4,
									itemStyle: {
										normal: {
											color: '#F8F9C2'
										}
									},
									name: '30-40'
								},
								{
									value: data[0]._40to50,
									itemStyle: {
										normal: {
											color: '#FFDBE8'
										}
									},
									name: '40-50'
								},
								{
									value: data[0]._50to60,
									itemStyle: {
										normal: {
											color: '#F94D5A'
										}
									},
									name: '50-60'
								},
								{
									value: data[0]._60to70,
									itemStyle: {
										normal: {
											color: '#F0726C'
										}
									},
									name: '60-70'

								},
								{
									value: data[0]._70to80,
									itemStyle: {
										normal: {
											color: '#DCE3E1'
										}
									},
									name: '70-80'
								},
								{
									value: data[0]._80to90,
									itemStyle: {
										normal: {
											color: '#B5C3C4'
										}
									},
									name: '80-90'
								},
								{
									value: data[0]._90to100,
									itemStyle: {
										normal: {
											color: '#8A9DA6'
										}
									},
									name: '90-100'
								},
								{
									value: data[0]._100to110,
									itemStyle: {
										normal: {
											color: '#8CFF96'
										}
									},
									name: '100-110'
								},
								{
									value: data[0]._110to120,
									itemStyle: {
										normal: {
											color: '#ddb926'
										}
									},
									name: '110-120'
								},
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})

				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为典型疾病比例

		//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
		var dianxingjibing = document.getElementById('dianxingjibing');
		var resizeContainer = function() {
			dianxingjibing.style.width = dianxingjibing.innerWidth + 'px';
			dianxingjibing.style.height = dianxingjibing.innerHeight + 'px';
		};
		//设置容器高宽
		resizeContainer();
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(dianxingjibing);
		option = {

			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			color: ['#7C8489', '#4FB3A4', '#FF7073', '#F5B977', '#FDFC7F'],
			legend: {
				orient: 'vertical',
				left: 'right',
				data: ['传染病', '寄生虫病', '恶性肿瘤', '内分泌疾病', '循环系统疾病']
			},
			series: [{
				name: '',
				type: 'pie',
				radius: '55%',
				center: ['50%', '60%'],
				label: {
					textStyle: {
						color: '#726DD1'
					}
				},
				data: [{
						value: 218,
						name: '传染病'
					},
					{
						value: 216,
						name: '寄生虫病'
					},
					{
						value: 204,
						name: '恶性肿瘤'
					},
					{
						value: 198,
						name: '内分泌疾病'
					},
					{
						value: 214,
						name: '循环系统疾病'
					},

				],

				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};
		myChart.setOption(option);
		window.addEventListener("resize", function() {
			resizeContainer();
			myChart.resize();
		})

		//以下为患者ABO血型比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/ABObloodtype",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var ABOchart = document.getElementById('ABOchart');
					var resizeContainer = function() {
						ABOchart.style.width = ABOchart.innerWidth + 'px';
						ABOchart.style.height = ABOchart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(ABOchart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						color: ['#40DBD9', '#EEA9B8', '#84F268', '#19B076'],
						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['A型', 'B型', 'O型', '不确定']
						},
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							label: {
								textStyle: {
									color: '#726DD1'
								}
							},
							data: [{
									value: data[0].A,
									name: 'A型'
								},
								{
									value: data[0].B,
									name: 'B型'
								},
								{
									value: data[0].O,
									name: 'O型'
								},
								{
									value: data[0].unknown,
									name: '不确定'
								},

							],

							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为患者RH血型比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/Rhbloodtype",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var RHchart = document.getElementById('RHchart');
					var resizeContainer = function() {
						RHchart.style.width = RHchart.innerWidth + 'px';
						RHchart.style.height = RHchart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(RHchart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						color: ['#00448a', '#0580b9', '#28c6b9', '#84e6f1'],
						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['阴性', '阳性', '未检出', '不确定']
						},
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							label: {
								textStyle: {
									color: '#726DD1'
								}
							},
							data: [{
									value: data[0].negative,
									name: '阴性'
								},
								{
									value: data[0].positive,
									name: '阳性'
								},
								{
									value: data[0].unchecked,
									name: '未检出'
								},
								{
									value: data[0].unknown,
									name: '不确定'
								},

							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为患者传染病史比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/infdiseasehis",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var dischart = document.getElementById('dischart');
					var resizeContainer = function() {
						dischart.style.width = dischart.innerWidth + 'px';
						dischart.style.height = dischart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(dischart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['有病史', '无病史', ]
						},
						color: ['#57D2F7', '#726DD1'],
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [{
									value: data[0].p1,
									name: '有病史'
								},
								{
									value: data[0].n0,
									name: '无病史'
								}

							],

							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为群体接种史比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/vacchis",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var vacchart = document.getElementById('vacchart');
					var resizeContainer = function() {
						vacchart.style.width = vacchart.innerWidth + 'px';
						vacchart.style.height = vacchart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(vacchart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['有病史', '无病史', ]
						},
						color: ['#57D2F7', '#726DD1'],
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [{
									value: data[0].p1,
									name: '有病史'
								},
								{
									value: data[0].n0,
									name: '无病史'
								}

							],

							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为手术史比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/operationhis",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var opechart = document.getElementById('opechart');
					var resizeContainer = function() {
						opechart.style.width = opechart.innerWidth + 'px';
						opechart.style.height = opechart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(opechart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['有病史', '无病史', ]
						},
						color: ['#57D2F7', '#726DD1'],
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [{
									value: data[0].p1,
									name: '有病史'
								},
								{
									value: data[0].n0,
									name: '无病史'
								}

							],

							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为输血史比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/transfusionhis",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var trachart = document.getElementById('trachart');
					var resizeContainer = function() {
						trachart.style.width = trachart.innerWidth + 'px';
						trachart.style.height = trachart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(trachart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['有病史', '无病史', ]
						},
						color: ['#57D2F7', '#726DD1'],
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [{
									value: data[0].p1,
									name: '有病史'
								},
								{
									value: data[0].n0,
									name: '无病史'
								}

							],

							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为过敏史比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/allergyhis",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var allchart = document.getElementById('allchart');
					var resizeContainer = function() {
						allchart.style.width = allchart.innerWidth + 'px';
						allchart.style.height = allchart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(allchart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['有病史', '无病史', ]
						},
						color: ['#57D2F7', '#726DD1'],
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [{
									value: data[0].p1,
									name: '有病史'
								},
								{
									value: data[0].n0,
									name: '无病史'
								}

							],

							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

		//以下为家族史比例
		$.ajax({
			url: "http://47.100.210.224:8020/patients/statistics/familyhis",
			type: 'post',
			data: {
				'pwd': 'jimengo'
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
					var famchart = document.getElementById('famchart');
					var resizeContainer = function() {
						famchart.style.width = famchart.innerWidth + 'px';
						famchart.style.height = famchart.innerHeight + 'px';
					};
					//设置容器高宽
					resizeContainer();
					// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(famchart);
					option = {

						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},

						legend: {
							orient: 'vertical',
							left: 'right',
							data: ['有病史', '无病史', ]
						},
						color: ['#57D2F7', '#726DD1'],
						series: [{
							name: '',
							type: 'pie',
							radius: '55%',
							center: ['50%', '60%'],
							data: [{
									value: data[0].p1,
									name: '有病史'
								},
								{
									value: data[0].n0,
									name: '无病史'
								}

							],

							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}]
					};
					myChart.setOption(option);
					window.addEventListener("resize", function() {
						resizeContainer();
						myChart.resize();
					})
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});

	}
}

//以下为患者标签分析profile
function profileload() {
	if(getCookie() == "") {
		alert("未输入健康卡号")
		window.location.href = 'login.html';
	} else {
		//词云栏目
		var ciyun = document.getElementById('ciyun');
		var resizeContainer = function() {
			ciyun.style.width = ciyun.innerWidth + 'px';
			ciyun.style.height = ciyun.innerHeight + 'px';
		};
		resizeContainer();
		var myChart = echarts.init(ciyun);
		var option = {
			title: {
				text: '患者标签分析',
				x: 'center',
				textStyle: {
					fontSize: 28,
				}
			},
			tooltip: {},
			series: [{
				type: 'wordCloud', //类型为字符云  
				shape: 'smooth', //平滑  
				gridSize: 15, //网格尺寸  

				sizeRange: [30, 50],
				rotationRange: [20, 115], //旋转范围  
				textStyle: {
					normal: {
						fontFamily: 'sans-serif',
					},
					emphasis: {
						shadowBlur: 0, //阴影距离  
						shadowColor: '#333' //阴影颜色  
					}
				},
				data: [{
						"name": "糖尿病",
						"value": "230",
					},
					{
						"name": "心律失常",
						"value": "156"
					},
					{
						"name": "结核",
						"value": "152"
					},
					{
						"name": "肺气肿",
						"value": "119"
					},
					{
						"name": "胆囊炎",
						"value": "108"
					},
					{
						"name": "鼻窦炎",
						"value": "101"
					}

				],
			}]
		};

		myChart.setOption(option);
		window.onresize = function() {
			resizeContainer();
			myChart.resize();
		};

		//比例栏目
		var ciyunbili = document.getElementById('ciyunbili');
		var resizeContainer = function() {
			ciyunbili.style.width = ciyun.innerWidth + 'px';
			ciyunbili.style.height = ciyun.innerHeight + 'px';
		};
		resizeContainer();
		var myChart = echarts.init(ciyunbili);
		option = {
			title: {
				text: '标签比例统计',
				left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				// orient: 'vertical',
				// top: 'middle',
				bottom: 10,
				left: 'center',
				data: ['糖尿病', '心律失常', '鼻窦炎', '胆囊炎', '结核', '肺气肿']
			},
			series: [{
				name: '',
				type: 'pie',
				radius: '65%',
				center: ['50%', '50%'],
				selectedMode: 'single',
				data: [{
						value: 230,
						name: '糖尿病',
						label: {
							normal: {
								formatter: [
									'{title|比例表格}{abg|}',
									'  {valueHead|标签}{rateHead|占比}',
									'{hr|}',
									'  {value|糖尿病}{rate|26.56%}',
									'  {value|心律失常}{rate|18.02%}',
									'  {value|鼻窦炎}{rate|11.66%}',
									'  {value|胆囊炎}{rate|12.47%}',
									'  {value|结核}{rate|17.55%}',
									'  {value|肺气肿}{rate|13.74%}'
								].join('\n'),
								backgroundColor: '#eee',
								borderColor: '#777',
								borderWidth: 2,
								borderRadius: 4,
								rich: {
									title: {
										color: '#eee',
										align: 'center'
									},
									abg: {
										backgroundColor: '#333',
										width: '100%',
										align: 'right',
										height: 25,
										borderRadius: [4, 4, 0, 0]
									},
									Sunny: {
										height: 30,
										align: 'left',

									},
									Cloudy: {
										height: 30,
										align: 'left',

									},
									Showers: {
										height: 30,
										align: 'left',
									},
									weatherHead: {
										color: '#333',
										height: 24,
										align: 'left'
									},
									hr: {
										borderColor: '#777',
										width: '100%',
										borderWidth: 0.5,
										height: 0
									},
									value: {
										width: 20,
										padding: [5, 20, 5, 0],
										align: 'left'
									},
									valueHead: {
										color: '#333',
										width: 20,
										padding: [5, 20, 5, 0],
										align: 'center'
									},
									rate: {
										width: 60,
										align: 'right',
										padding: [5, 10, 5, 0]
									},
									rateHead: {
										color: '#333',
										width: 60,
										align: 'right',
										padding: [5, 20, 5, 0]
									}
								}
							}
						}
					},
					{
						value: 156,
						name: '心律失常'
					},
					{
						value: 152,
						name: '结核'
					},
					{
						value: 119,
						name: '肺气肿'
					},
					{
						value: 108,
						name: '胆囊炎'
					},
					{
						value: 101,
						name: '鼻窦炎'
					}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}]
		};

		myChart.setOption(option);
		window.addEventListener("resize", function() {
								resizeContainer();
								myChart.resize();
		})
	}
}

//以下为clustering页面
  //以下为载入
function clusteringload(){
	if(getCookie() == "") {
		alert("未输入健康卡号")
		window.location.href = 'login.html';
	}
}
var patientage = 0;
var patientnum = 0;
var patientexpense = 0;
var patienttime = 0;
var Mpatientresult;
var Fpatientresult;
var onedata;
var twodata;
var thrdata;
var myMdata;
var myFdata;

function cbutton() {
	
	var button1 = document.getElementById('button1');
	var button2 = document.getElementById('button2');
	var button3 = document.getElementById('button3');
	var button4 = document.getElementById('button4');
	setTimeout(function() {
		var mynum = 0;
		if($("#button1").attr("aria-pressed") == 'true') {
			patientage = 1;
			mynum++
		} else {
			patientage = 0;
		}
		if($("#button2").attr("aria-pressed") == 'true') {
			patientnum = 1;
			mynum++
		} else {
			patientnum = 0;
		}
		if($("#button3").attr("aria-pressed") == 'true') {
			patientexpense = 1;
			mynum++
		} else {
			patientexpense = 0;
		}
		if($("#button4").attr("aria-pressed") == 'true') {
			patienttime = 1;
			mynum++
		} else {
			patienttime = 0;
		}
		count = mynum;
		if(count >= 2) {
			if(patientage == 1) {
				document.getElementById("biaoqian1").style.display = '';
				document.getElementById("biaoqian5").style.display = '';
			} else {
				document.getElementById("biaoqian1").style.display = 'none';
				document.getElementById("biaoqian5").style.display = 'none';
			}
			if(patientnum == 1) {
				document.getElementById("biaoqian2").style.display = '';
				document.getElementById("biaoqian6").style.display = '';
			} else {
				document.getElementById("biaoqian2").style.display = 'none';
				document.getElementById("biaoqian6").style.display = 'none';
			}
			if(patientexpense == 1) {
				document.getElementById("biaoqian3").style.display = '';
				document.getElementById("biaoqian7").style.display = '';
			} else {
				document.getElementById("biaoqian3").style.display = 'none';
				document.getElementById("biaoqian7").style.display = 'none';
			}
			if(patienttime == 1) {
				document.getElementById("biaoqian4").style.display = '';
				document.getElementById("biaoqian8").style.display = '';
			} else {
				document.getElementById("biaoqian4").style.display = 'none';
				document.getElementById("biaoqian8").style.display = 'none';
			}
			if(patientage == 1 && patientnum == 1) {
				Mpatientresult = 'M12';
				Fpatientresult = 'F12';
				onedata = '岁';
				twodata = '个';
			}
			if(patientage == 1 && patientexpense == 1) {
				Mpatientresult = 'M13';
				Fpatientresult = 'F13';
				myMdata=[66.0, 29853.0];
				myFdata=[52.0, 18311.0];
				onedata = '岁';
				twodata = '元';
			}
			if(patientage == 1 && patienttime == 1) {
				Mpatientresult = 'M14';
				Fpatientresult = 'F14';
				myMdata=[33.0, 428.0];
				myFdata=[43.0, 52.0];
				onedata = '岁';
				twodata = '天';
			}
			if(patientnum == 1 && patientexpense == 1) {
				Mpatientresult = 'M23';
				Fpatientresult = 'F23';
				myMdata=[2.0, 52572.0];
				myFdata=[6.0, 33877.0];
				onedata = '个';
				twodata = '元';
			}
			if(patientnum == 1 && patienttime == 1) {
				Mpatientresult = 'M24';
				Fpatientresult = 'F24';
				myMdata=[3.0, 234.0];
				myFdata=[5.0, 104.0];
				onedata = '个';
				twodata = '天';
			}
			if(patientexpense == 1 && patienttime == 1) {
				Mpatientresult = 'M34';
				Fpatientresult = 'F34';
				myMdata=[42385.0, 368.0];
				myFdata=[29602.0, 196.0];
				onedata = '元';
				twodata = '天';
			}
			if(patientage == 1 && patientnum == 1 && patientexpense == 1) {
				Mpatientresult = 'M123';
				Fpatientresult = 'F123';
				myMdata=[59.0, 3.0, 54869.0];
				myFdata=[42.0, 6.0, 33928.0];
				onedata = '岁';
				twodata = '个';
				thrdata = '元';
			}
			if(patientage == 1 && patientnum == 1 && patienttime == 1) {
				Mpatientresult = 'M124';
				Fpatientresult = 'F124';
				myMdata=[82.0, 3.0, 239.0];
				myFdata=[25.0, 2.0, 465.0];
				onedata = '岁';
				twodata = '个';
				thrdata = '天';
			}
			if(patientage == 1 && patienttime == 1 && patientexpense == 1) {
				Mpatientresult = 'M134';
				Fpatientresult = 'F134';
				myMdata=[52.0, 27571.0, 80.0];
				myFdata=[48.0, 34222.0, 235.0];
				onedata = '岁';
				twodata = '天';
				thrdata = '元';
			}
			if(patientnum == 1 && patienttime == 1 && patientexpense == 1) {
				Mpatientresult = 'M234';
				Fpatientresult = 'F234';
				myMdata=[3.0, 43153.0, 327.0];
				myFdata=[3.0, 16393.0, 280.0];
				onedata = '个';
				twodata = '天';
				thrdata = '元';
			}
			if(patientnum == 1 && patienttime == 1 && patientexpense == 1 && patientage == 1) {
				Mpatientresult = 'M1234';
				Fpatientresult = 'F1234';

			}
			//调用AJAX拿到男性散点图
			$.ajax({
				url: "http://47.100.210.224:8020/patients/clustering",
				type: 'post',
				data: {
					'combo': Mpatientresult
				},
				dataType: 'json',
				async: true,
				success: function(data) {
					if(data == "") {
						alert("查询病人数据失败，数据库暂无数据");
					} else {
						if(count == 2) {

							data1 = JSON.parse(data[0].twoDscatter1);
							data2 = JSON.parse(data[0].twoDscatter2);
							data3 = JSON.parse(data[0].twoDscatter3);
							data4 = JSON.parse(data[0].twoDcentro1);
							data5 = JSON.parse(data[0].twoDcentro2);
							data6 = JSON.parse(data[0].twoDcentro3);
							//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
							var manjulei = document.getElementById('manjulei');
							var resizeContainer = function() {
								manjulei.style.width = manjulei.innerWidth + 'px';
								manjulei.style.height = manjulei.innerHeight + 'px';
							};
							//设置容器高宽
							resizeContainer();
							// 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(manjulei);
							option = {
								title: {
									text: '疾病聚类分析',
									subtext: '数据来自IDC'
								},
								grid: {
									left: '3%',
									right: '7%',
									bottom: '3%',
									containLabel: true
								},
								tooltip: {
									// trigger: 'axis',
									showDelay: 0,
									formatter: function(params) {
										return params.seriesName + ' :<br/>' +
											params.value[0] + onedata + ' ' +
											params.value[1] + twodata;

									},
									axisPointer: {
										show: true,
										type: 'cross',
										lineStyle: {
											type: 'dashed',
											width: 1
										}
									}
								},
								toolbox: {
									feature: {
										dataZoom: {},
										brush: {
											type: ['rect', 'polygon', 'clear']
										}
									}
								},
								brush: {},
								legend: {
									data: ['类别1', '类别2', '类别3','患者位置'],
									left: 'center'
								},
								xAxis: [{
									type: 'value',
									scale: true,
									axisLabel: {
										formatter: '{value}' + onedata
									},
									splitLine: {
										show: false
									}
								}],
								yAxis: [{
									type: 'value',
									scale: true,
									axisLabel: {
										formatter: '{value}' + twodata
									},
									splitLine: {
										show: false
									}
								}],
								series: [{
										name: '类别1',
										type: 'scatter',
										data: data1,

										itemStyle: {
											normal: {
												color: '#ddb926'
											}
										}
									},
									{
										name: '类别2',
										type: 'scatter',
										data: data2

									},
									{
										name: '类别3',
										type: 'scatter',
										data: data3

									},
									{
										name: '类别1中心',
										
										type: 'scatter',
										symbol: 'triangle',
										data: [data4],
										symbolSize: 20,

									},
									{
										name: '类别2中心',
									
										type: 'scatter',
										symbol: 'triangle',
										data: [data5],
										symbolSize: 20,

									},
									{
										name: '类别3中心',									
										type: 'scatter',
										symbol: 'triangle',
										data: [data6],
										symbolSize: 20,

									},
									{
										name: '患者位置',									
										type: 'scatter',
										itemStyle:{
											color:'#7FFF00'
										},
										symbol: 'diamond',
										data: [myMdata],
										symbolSize: 25,

									}
								]
							};

							myChart.setOption(option, true);
							window.addEventListener("resize", function() {
								resizeContainer();
								myChart.resize();
							})
						}
						if(count > 2) {

							data1 = JSON.parse(data[0].threeDscatter1);
							data2 = JSON.parse(data[0].threeDscatter2);
							data3 = JSON.parse(data[0].threeDscatter3);
							data4 = JSON.parse(data[0].threeDcentro1);
							data5 = JSON.parse(data[0].threeDcentro2);
							data6 = JSON.parse(data[0].threeDcentro3);
							//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
							var manjulei = document.getElementById('manjulei');
							var resizeContainer = function() {
								manjulei.style.width = manjulei.innerWidth + 'px';
								manjulei.style.height = manjulei.innerHeight + 'px';
							};
							//设置容器高宽
							resizeContainer();
							// 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(manjulei);
							var symbolSize = 2.5;
							option = {

									grid3D: {
										viewControl: {
											autoRotate: true,
											autoRotateSpeed: 13
										}
									},
									tooltip: {
										// trigger: 'axis',
										showDelay: 0,
										formatter: function(params) {

											return params.seriesName + ' :<br/>' +
												params.value[0] + onedata + ' ' +
												params.value[1] + twodata + ' ' +
												params.value[2] + thrdata;
										},
										axisPointer: {
											show: true,
											type: 'cross',
											lineStyle: {
												type: 'dashed',
												width: 1
											}
										}
									},
									legend: {
										data: ['类别1', '类别2', '类别3','患者位置'],
										left: 'center'
									},
									xAxis3D: {
										axisLabel: {
											formatter: '{value}' + onedata
										},
										type: 'value',
										scale: true
									},
									yAxis3D: {
										axisLabel: {
											formatter: '{value}' + twodata
										},
										type: 'value',
										scale: true
									},
									zAxis3D: {
										axisLabel: {
											formatter: '{value}' + thrdata
										},
										type: 'value',
										scale: true
									},
									series: [{
											name: '类别1',
											type: 'scatter3D',
											blendMode: 'light',
											data: data1
										},
										{
											name: '类别2',
											type: 'scatter3D',
											blendMode: 'light',
											data: data2
										},
										{
											name: '类别3',
											type: 'scatter3D',
											blendMode: 'light',
											data: data3
										},
										{
											name: '类别1中心',
											type: 'scatter3D',
											symbol: 'triangle',
											symbolSize: 20,
											data: [data4]
										},
										{
											name: '类别2中心',
											type: 'scatter3D',
											symbol: 'triangle',
											symbolSize: 20,
											data: [data5]
										},
										{
											name: '类别3中心',
											type: 'scatter3D',
											symbol: 'triangle',
											symbolSize: 20,
											data: [data6]
										},
										{
										name: '患者位置',									
										type: 'scatter3D',
										itemStyle:{
											color:'#7FFF00'
										},
										symbol: 'diamond',
										data: [myMdata],
										symbolSize: 25,

									}
									]
								},

								myChart.setOption(option, true);
							window.addEventListener("resize", function() {
								resizeContainer();
								myChart.resize();
							})
						}
					}
				},

				error: function(data, textStatus, errorThrown) {
					alert("查询病人数据失败，获取数据库失败");
				}
			});
			//调用AJAX拿到女性散点图
			$.ajax({
				url: "http://47.100.210.224:8020/patients/clustering",
				type: 'post',
				data: {
					'combo': Fpatientresult
				},
				dataType: 'json',
				async: true,
				success: function(data) {
					if(data == "") {
						alert("查询病人数据失败，数据库暂无数据");
					} else {
						if(count == 2) {

							data1 = JSON.parse(data[0].twoDscatter1);
							data2 = JSON.parse(data[0].twoDscatter2);
							data3 = JSON.parse(data[0].twoDscatter3);
							data4 = JSON.parse(data[0].twoDcentro1);
							data5 = JSON.parse(data[0].twoDcentro2);
							data6 = JSON.parse(data[0].twoDcentro3);
							//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
							var fjulei = document.getElementById('fjulei');
							var resizeContainer = function() {
								fjulei.style.width = fjulei.innerWidth + 'px';
								fjulei.style.height = fjulei.innerHeight + 'px';
							};
							//设置容器高宽
							resizeContainer();
							// 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(fjulei);
							option = {
								title: {
									text: '疾病聚类分析',
									subtext: '数据来自IDC'
								},
								grid: {
									left: '3%',
									right: '7%',
									bottom: '3%',
									containLabel: true
								},
								tooltip: {
									// trigger: 'axis',
									showDelay: 0,
									formatter: function(params) {
										return params.seriesName + ' :<br/>' +
											params.value[0] + onedata + ' ' +
											params.value[1] + twodata;

									},
									axisPointer: {
										show: true,
										type: 'cross',
										lineStyle: {
											type: 'dashed',
											width: 1
										}
									}
								},
								toolbox: {
									feature: {
										dataZoom: {},
										brush: {
											type: ['rect', 'polygon', 'clear']
										}
									}
								},
								brush: {},
								legend: {
									data: ['类别1', '类别2', '类别3','患者位置'],
									left: 'center'
								},
								xAxis: [{
									type: 'value',
									scale: true,
									axisLabel: {
										formatter: '{value}' + onedata
									},
									splitLine: {
										show: false
									}
								}],
								yAxis: [{
									type: 'value',
									scale: true,
									axisLabel: {
										formatter: '{value}' + twodata
									},
									splitLine: {
										show: false
									}
								}],
								series: [{
										name: '类别1',
										type: 'scatter',
										data: data1,

										itemStyle: {
											normal: {
												color: '#ddb926'
											}
										}
									},
									{
										name: '类别2',
										type: 'scatter',
										data: data2

									},
									{
										name: '类别3',
										type: 'scatter',
										data: data3

									},
									{
										name: '类别1中心',
										type: 'scatter',
										symbol: 'triangle',
										data: [data4],
										symbolSize: 10,

									},
									{
										name: '类别2中心',
										type: 'scatter',
										symbol: 'triangle',
										data: [data5],
										symbolSize: 10,

									},
									{
										name: '类别3中心',
										type: 'scatter',
										symbol: 'triangle',
										data: [data6],
										symbolSize: 10,

									},
									{
										name: '患者位置',
										type: 'scatter',
										itemStyle:{
											color:'#7FFF00'
										},
										symbol: 'diamond',
										data: [myFdata],
										symbolSize: 25,
									}
								]
							};

							myChart.setOption(option, true);
							window.addEventListener("resize", function() {
								resizeContainer();
								myChart.resize();
							})
						}
						if(count > 2) {

							data1 = JSON.parse(data[0].threeDscatter1);
							data2 = JSON.parse(data[0].threeDscatter2);
							data3 = JSON.parse(data[0].threeDscatter3);
							data4 = JSON.parse(data[0].threeDcentro1);
							data5 = JSON.parse(data[0].threeDcentro2);
							data6 = JSON.parse(data[0].threeDcentro3);
							//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
							var fjulei = document.getElementById('fjulei');
							var resizeContainer = function() {
								fjulei.style.width = manjulei.innerWidth + 'px';
								fjulei.style.height = manjulei.innerHeight + 'px';
							};
							//设置容器高宽
							resizeContainer();
							// 基于准备好的dom，初始化echarts实例
							var myChart = echarts.init(fjulei);
							var symbolSize = 2.5;
							option = {

									grid3D: {
										viewControl: {
											autoRotate: true,
											autoRotateSpeed: 13
										}
									},
									tooltip: {
										// trigger: 'axis',
										showDelay: 0,
										formatter: function(params) {

											return params.seriesName + ' :<br/>' +
												params.value[0] + onedata + ' ' +
												params.value[1] + twodata + ' ' +
												params.value[2] + thrdata;
										},
										axisPointer: {
											show: true,
											type: 'cross',
											lineStyle: {
												type: 'dashed',
												width: 1
											}
										}
									},
									legend: {
										data: ['类别1', '类别2', '类别3','患者位置'],
										left: 'center'
									},
									xAxis3D: {
										axisLabel: {
											formatter: '{value}' + onedata
										},
										type: 'value',
										scale: true
									},
									yAxis3D: {
										axisLabel: {
											formatter: '{value}' + twodata
										},
										type: 'value',
										scale: true
									},
									zAxis3D: {
										axisLabel: {
											formatter: '{value}' + thrdata
										},
										type: 'value',
										scale: true
									},
									series: [{
											name: '类别1',
											type: 'scatter3D',
											blendMode: 'light',
											data: data1
										},
										{
											name: '类别2',
											type: 'scatter3D',
											blendMode: 'light',
											data: data2
										},
										{
											name: '类别3',
											type: 'scatter3D',
											blendMode: 'light',
											data: data3
										},
										{
											name: '类别1中心',
											type: 'scatter3D',
											symbol: 'triangle',
											symbolSize: 20,
											data: [data4]
										},
										{
											name: '类别2中心',
											type: 'scatter3D',
											symbol: 'triangle',
											symbolSize: 20,
											data: [data5]
										},
										{
											name: '类别3中心',
											type: 'scatter3D',
											symbol: 'triangle',
											symbolSize: 20,
											data: [data6]
										},
										{
										name: '患者位置',
										type: 'scatter3D',
										itemStyle:{
											color:'#7FFF00'
										},
										symbol: 'diamond',
										data: [myFdata],
										symbolSize: 25,
										}
									]
								},

								myChart.setOption(option, true);
							window.addEventListener("resize", function() {
								resizeContainer();
								myChart.resize();
							})
						}
					}
				},

				error: function(data, textStatus, errorThrown) {
					alert("查询病人数据失败，获取数据库失败");
				}
			});
		}
	}, 500);

}

//以下为relations页面
//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
function relationsload() {
	if(getCookie() == "") {
		alert("未输入健康卡号")
		window.location.href = 'login.html';
	}

}
//以下为advice页面载入
function adviceload() {
	if(getCookie() == "") {
		alert("未输入健康卡号")
		window.location.href = 'login.html';
	}
	else{
		adviceid = getCookie2();
		$.ajax({
			url: "http://47.100.210.224:8020/patients/diagnosis",
			type: 'post',
			data: {
				'id': adviceid
			},
			dataType: 'json',
			async: true,
			success: function(data) {
				if(data == "") {
					alert("查询病人数据失败，数据库暂无数据");
				} else {
					data0=data[0].diagnosis0.replace(/。/g,"。<br>");
					data1=data[0].diagnosis1.replace(/。/g,"。<br>");
					document.getElementById('adviceresult').innerHTML = data0.replace(/: /g,": <br>");
					document.getElementById('adviceresult2').innerHTML = data1.replace(/: /g,": <br>");
				}

			},

			error: function(data, textStatus, errorThrown) {
				alert("查询病人数据失败，获取数据库失败");
			}
		});
	}

}
//以下为关于页面载入
function aboutload() {
	if(getCookie() == "") {
		alert("未输入健康卡号")
		window.location.href = 'login.html';
	}

}