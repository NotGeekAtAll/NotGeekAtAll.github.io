window.onload = function () {
    var lists,
        input = $("inputNumber"),
        leftIn = $("leftIn"),
        rightIn = $("rightIn"),
        leftOut = $("leftOut"),
        rightOut = $("rightOut"),
        oUl = $("ul"),
        aLi = oUl.getElementsByTagName("li");

    document.getElementsByClassName("form-inline")[0].addEventListener("click", function (e) {
        var ev = e || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName == "A") {
            switch (target.id) {
            case "leftIn":
                if (ifIllegal()) {
                    doMove("leftIn");
                } else {
                    alert("请输入数字！");
                }
                break;
            case "rightIn":
                if (ifIllegal()) {
                    doMove("rightIn");
                } else {
                    alert("请输入数字！");
                }
                break;
            case "leftOut":
                doMove("leftOut");
                break;
            case "rightOut":
                doMove("rightOut");
                break;
            case "random":
                doMove("random");
                break;
            case "order":
                doMove("order");
                break;
            }
        }
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
        newLi.style.height = input.value + "px";
        switch (type) {
        case "leftIn":
            if (aLi.length == 60) {
                alert("队列满了！！！");
                return;
            }
            if ( input.value <10 || input.value >60){
                alert("请输入10-60之间的整数！");
                return;
            }
            oUl.insertBefore(newLi, oUl.childNodes[0]);
            break;
        case "rightIn":
            if (aLi.length == 60) {
                alert("队列满了！！！");
                return;
            }
            if ( input.value <10 || input.value >60){
                alert("请输入10-60之间的整数！");
                return;
            }
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
        case "random":
            renderList();
            break;
        case "order":
            order();
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

    function renderList() {
        var length = 60 - aLi.length;
        for (var i = 0; i < length; i++) {
            var newLi = document.createElement("li");
            newLi.style.height = (10 + parseInt(Math.random() * 90)) + "px";
            oUl.appendChild(newLi);
        }
    }

    function order() {
        var length = aLi.length;
        
        for ( var i = 0; i<length; i++){
            for ( var j = i+1; j<length; j++ ){
                if ( parseInt(aLi[i].style.height) > parseInt(aLi[j].style.height)){
                    var cloneLi1 = aLi[i].cloneNode(true);
                    var cloneLi2 = aLi[j].cloneNode(true);
                    oUl.replaceChild(cloneLi2,aLi[i]);
                    oUl.replaceChild(cloneLi1,aLi[j]);
                }
            }
        }
        
    }
}

function $(id) {
    return document.getElementById(id);
}