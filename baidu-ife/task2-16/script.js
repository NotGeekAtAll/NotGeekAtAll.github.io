function trim(sStr) {
    if (typeof (sStr) != 'string') { return sStr; }
    return sStr.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = trim(document.getElementById("inputCity").value),
        air = trim(document.getElementById("inputAir").value);
    if (city == "" || air == ""){
        alert("输入不能为空！")
        return;
    }
    
    if (!new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$").test(city)) {
        alert("请输入中英文字符!");
        return;
    }
    if (!new RegExp("^[0-9]*[1-9][0-9]*$").test(air)) {
        alert("请输入正整数!");
        return;
    }
    aqiData[city] = air;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table"),
        result = [],
        p;
    result.push("<tr class='info'>");
    result.push("<td>城市</td>");
    result.push("<td>空气质量</td>");
    result.push("<td>操作</td>");
    result.push("</tr>");
    for (p in aqiData) {
        result.push("<tr>");
        result.push("<td>" + p + "</td>");
        result.push("<td>" + aqiData[p] + "</td>");
        result.push('<td><button class="btn btn-danger btn-sm" onclick="delBtnHandle(\'' + p + '\')">删除</button></td>');
        result.push("</tr>");
    }
    aqiTable.innerHTML = result.join("");
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(name) {
  // do sth.
    delete aqiData[name];       
    renderAqiList();
}


window.onload = function () {
    document.getElementById("addBtn").onclick = function () {
        addBtnHandle();
        return false;
    } 
}
