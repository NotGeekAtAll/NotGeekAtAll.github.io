window.onload = function () {
    var lists,
        input = $("inputNumber"),
        leftIn = $("leftIn"),
        rightIn = $("rightIn"),
        leftOut = $("leftOut"),
        rightOut = $("rightOut"),
        oUl = $("ul"),
        aLi = oUl.getElementsByTagName("li");

    //左侧入
    leftIn.addEventListener("click", function () {
        if (ifIllegal()) {
            doMove("leftIn");
        } else {
            alert("请输入数字！");
        }
    });

    //右侧入
    rightIn.addEventListener("click", function () {
        if (ifIllegal()) {
            doMove("rightIn");
        } else {
            alert("请输入数字！");
        }
    });

    //左侧出
    leftOut.addEventListener("click", function () {
        doMove("leftOut");
    });

    //右侧出
    rightOut.addEventListener("click", function () {
        doMove("rightOut");
    });

    ul.addEventListener("click", function (e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName == "LI") {
            this.removeChild(target);
        }

    });
    
    //操作函数封装
    function doMove(type) {
        var removeLi,
            newLi = document.createElement("li");
        newLi.innerHTML = input.value;
        switch (type) {
        case "leftIn":
            oUl.insertBefore(newLi, oUl.childNodes[0]);
            break;
        case "rightIn":
            oUl.appendChild(newLi);
            break;
        case "leftOut":
            if (aLi.length == 0) {
                alert("队列中没有元素了!");
                return;
            }
            alert(aLi[0].innerHTML + "将从左侧出");
            removeLi = oUl.removeChild(aLi[0]);
            break;
        case "rightOut":
            if (aLi.length == 0) {
                alert("队列中没有元素了!");
                return;
            }
            alert(aLi[aLi.length - 1].innerHTML + "将从右侧出");
            removeLi = oUl.removeChild(aLi[aLi.length - 1]);
            break;
        }
    }

//输入框验证
    function ifIllegal(func) {
        if (input.value == "" || !new RegExp("^[0-9]*$").test(input.value)) {
            return false;
        } else {
            return true;
        }
    }

}

function $(id) {
    return document.getElementById(id);
}