/**
 * 
 * @authors Lch (lchreal6@gmail.com)
 * @date    2016-12-04 15:18:19
 * @version $Id$
 */
function getByClass(oParent, sClass) {
	var aEle = document.getElementsByTagName('*');
	var i = 0;
	var aResult = [];
	for (i = 0; i < aEle.length; i++) {
		if (aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}

	return aResult;
}
var iNow = 0;
var iMinZindex = 2;
window.onload = function() {

	var oDiv = document.getElementById('display');

	oMarkLeft = getByClass(oDiv, 'mark_left')[0];
	oMarkRight = getByClass(oDiv, 'mark_right')[0];
	oBtnLeft = getByClass(oDiv, 'btn_left')[0];
	oBtnRight = getByClass(oDiv, 'btn_right')[0];
	oLargeImg = getByClass(oDiv, 'largeImg')[0];
	oLargeUl = oLargeImg.getElementsByTagName('ul')[0];
	aLargeLiList = oLargeUl.getElementsByTagName('li');
	oSmallImg = getByClass(oDiv, 'smallImg')[0];
	oSmallUl = oSmallImg.getElementsByTagName('ul')[0];
	aSmallLiList = oSmallUl.getElementsByTagName('li');
	oSmallUl.style.width = (aSmallLiList[0].offsetWidth + 10) * 6 + 'px';
	oBtnLeft.onmouseover = oMarkLeft.onmouseover = function() {
		starMove(oBtnLeft, 'opacity', 100);
	}
	oBtnLeft.onmouseout = oMarkLeft.onmouseout = function() {
		starMove(oBtnLeft, 'opacity', 0);
	}
	oBtnRight.onmouseover = oMarkRight.onmouseover = function() {
		starMove(oBtnRight, 'opacity', 100);
	}
	oBtnRight.onmouseout = oMarkRight.onmouseout = function() {
		starMove(oBtnRight, 'opacity', 0);
	}

	for (var i = 0; i < aSmallLiList.length; i++) {
		aSmallLiList[i].index = i;
		aSmallLiList[i].onmouseover = function() {

			starMove(this, 'opacity', 100);

		}
		aSmallLiList[i].onmouseout = function() {
			if (this.index != iNow) {
				starMove(this, 'opacity', 60);
			}

		}
		aSmallLiList[i].onclick = function() {
			iNow = this.index;
			tab();

		}
	}

	oBtnLeft.onclick = function() {
		iNow--;
		if (iNow == -1) {
			iNow = aSmallLiList.length - 1;
		}
		tab();

	}
	oBtnRight.onclick = function() {
		iNow++;
		if (iNow == aSmallLiList.length) {
			iNow = 0;
		}
		tab();

	}
}

function tab() {
	for (var i = 0; i < aSmallLiList.length; i++) {
		starMove(aSmallLiList[i], 'opacity', 60);
	}
	starMove(aSmallLiList[iNow], 'opacity', 100);

	aLargeLiList[iNow].style.zIndex = iMinZindex++;
	aLargeLiList[iNow].style.height = "20px";

	starMove(aLargeLiList[iNow], 'height', oLargeUl.offsetHeight);

	if (iNow == 0) {
		starMove(oSmallUl, 'left', 0)
	} else if (iNow == aSmallLiList.length - 1) {
		starMove(oSmallUl, 'left', -(iNow - 2) * (aSmallLiList[0].offsetWidth + 10))

	} else {
		starMove(oSmallUl, 'left', -(iNow - 1) * (aSmallLiList[0].offsetWidth + 10))
	}
}

function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function starMove(obj, attr, target) {

	clearInterval(obj.timer);


	obj.timer = setInterval(function() {
		if (attr == 'opacity') {
			//添加parseInt去整数，解决小数点出现的闪现问题
			var curStyle = parseInt(parseFloat(getStyle(obj, attr) * 100));
		} else {
			var curStyle = parseInt(getStyle(obj, attr));
		}

		var speed = (target - curStyle) / 8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (curStyle == target) {
			clearInterval(obj.timer);
		} else {
			if (attr == 'opacity') {
				obj.style.opacity = (curStyle + speed) / 100;

			} else {
				obj.style[attr] = curStyle + speed + 'px';
			}

		}
	}, 30)
}