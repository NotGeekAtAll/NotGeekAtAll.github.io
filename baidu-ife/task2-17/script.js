window.onload = function () {
    init();
}

function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var date, str = "",
        aniBox = document.getElementById("aniBox");
    for (date in chartData) {
        str += "<span class='aqi-item' style='height:" + chartData[date] +
            "px;background:" + getRandomColor() + ";' title='" + chartData[date] + "'></span>"
    }
    
    document.getElementById("chartBox").innerHTML = str;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 
    var radio = getRadio();
    // 设置对应数据
    if (radio == pageState.nowGraTime) {
        return;
    } else {
        initAqiChartData();
    }
    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */

function citySelectChange() {
    // 确定是否选项发生了变化 
    var city = document.getElementById("city-select").value;
    if (city == pageState["nowSelectCity"]) {
        return;
    } else {
        initAqiChartData();
    }
    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var oInput = document.getElementsByName("gra-time");
    for (var i = 0; i < oInput.length; i++) {
        oInput[i].onclick = graTimeChange;
    }
}

function getRadio() {
    var value, oInput = document.getElementsByName("gra-time");
    for (var i = 0; i < oInput.length; i++) {
        if (oInput[i].checked) {
            value = oInput[i].value;
            break;
        }
    }
    return value;
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById("city-select"),
        city, strCity = "";
    for (city in aqiSourceData) {
        strCity += "<option>" + city + "</option>"
    }

    citySelect.innerHTML = strCity;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var city = document.getElementById("city-select").value;
    var radio = getRadio();
    //    chartData = aqiSourceData[pageState["nowSelectCity"]]
    pageState.nowGraTime = radio;
    pageState["nowSelectCity"] = city;
    switch (radio) {
    case "day":
        chartData = aqiSourceData[city];
        break;
    case "week":
        chartData = {};
        var count = 0,
            total = 0,
            week = 1,
            date, getday;
        for (var time in aqiSourceData[city]) {
            date = new Date(time);
            getday = date.getDay();
            if (getday == 0) {
                count++;
                total += aqiSourceData[city][time];
                chartData["week" + week] = Math.round(total / count);
                week++;
                count = 0;
                total = 0;
            } else {
                count++;
                total += aqiSourceData[city][time];
            }
        }
        chartData["week" + week] = Math.round(total / count);
        break;
    case "month":
        chartData = {};
        var count = 0,
            total = 0,
            date, month = 1,
            getmonth;
        for (var time in aqiSourceData[city]) {
            date = new Date(time);
            getmonth = date.getMonth() + 1;
            if (getmonth == month) {
                count++;
                total += aqiSourceData[city][time];
                chartData["month" + month] = Math.round(total / count);
            } else {
                month++;
                count = 0;
                total = 0;
            }
        }
    }
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

/**
 * 获取随机颜色
 */
function getRandomColor() {
    return '#' + (function (h) {
        return new Array(7 - h.length).join("0") + h
    })((Math.random() * 0x1000000 << 0).toString(16))
}