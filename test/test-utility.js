// var assert = require('assert');

describe('Utility.js 테스트', function() {
    before(function() {
        // before suite
    });
    after(function() {
        // after suite
    });
    beforeEach(function() {
        // before test
    });
    afterEach(function() {
        // after test
    });
    describe('#padZero 테스트', function() {
        it('한자리 달과 length 2를 넣으면 앞에 0이 붙어서 출력되어야한다.', function(done) {
            for (var i = 1; i <= 9; i++) {
                var result = Utility.padZero(i, 2);
                if (result !== "0" + i) {
                    throw Error(i + '를 넣었는데' + result + '가 나온다.');
                }
            }
            done();
        });
        it('두자리 달과 length 2를 넣으면 숫자 그대로 출력되어야한다.', function(done) {
            for (var i = 10; i <= 12; i++) {
                var result = Utility.padZero(i, 2);
                if (result !== "" + i) {
                    throw Error(i + '를 넣었는데' + result + '가 나온다.');
                }
            }
            done();
        });
    });
    describe('#addClass 테스트', function() {
        it('element와 class 이름을 넣으면 해당 element에 class가 들어가야한다.', function(done) {
            var ele = document.createElement('div');
            var name = "my-class";
            Utility.addClass(ele, name);
            if (ele.classList.contains(name)) done();
            else throw Error(ele + '가 ' + name + '을 가지고 있지 않다.');
        });
    });
    describe('#setTimeByGMT 테스트', function() {
        it('date를 넣으면 GMT시간으로 바뀐 날짜가 출력되어야한다.', function(done) {
            var date = new Date();
            var result = Utility.setTimeByGMT(date);

            var originer = date.getHours();
            var change = result.getHours();
            if (originer + 9 === change) done();
            else throw Error('변환이 제대로 되지 않았다.');
        });
    });
    describe('#setTimeDefault 테스트', function() {
        it('date객체와 type 0 을 넣으면 00:00:00으로 시간이 바뀌어야한다.', function(done) {
            var date = new Date();
            Utility.setTimeDefault(date, 0);
            if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) done();
            else throw Error(date + ' -> 시간이 00:00:00으로 바뀌지 않았습니다.');
        });
        it('date객체와 type 9 를 넣으면 23:59:59로 시간이 바뀌어야한다.', function(done) {
            var date = new Date();
            Utility.setTimeDefault(date, 9);
            if (date.getHours() === 23 && date.getMinutes() === 59 && date.getSeconds() === 59) done();
            else throw Error(date + ' -> 시간이 00:00:00으로 바뀌지 않았습니다.');
        });
    });

    describe('element display 테스트', function() {
        before(function() {
            var box = document.createElement("div");
            box.setAttribute("id", "test-box");
            box.innerText = "I am a box";
            box.style.height = "100px";
            box.style.width = "100px";

            document.body.appendChild(box);
        });
        it('#hideElement 실행 시 display 속성이 none이 되어야 한다.', function(done) {
            ele = _$('#test-box');
            Utility.hideElement(ele);
            if (ele.style.display === "none") done();
            else throw Error('display is visible');
        });
        it('#showElement 실행 시 display 속성이 block이 되어야 한다.', function(done) {
            ele = _$('#test-box');
            Utility.showElement(ele);
            if (ele.style.display === "block") done();
            else throw Error('display is not block');
        });
        after(function() {
            var box = document.body._$('#test-box');
            document.body.removeChild(box);
        });
    });
    describe('#getTbodyFromThead 테스트', function() {
        before(function() {
            var div = document.createElement("div");
            div.setAttribute("id", "table-container");
            var html = '<table id = "test-table"><thead><tr><td></td><td id = "finder"></td><td></td></tr></thead>' +
                '<tbody><tr><td></td><td></td></tr><tr><td></td><td id = "correct"></td></tr><tr><td></td><td></td></tr></tbody>';
            document.body.appendChild(div);
            _$('#table-container').innerHTML = html;
        });
        it('head의 td와 row를 넘겨주면 body의 해당하는 위치의 td를 돌려준다.', function(done) {
            var thead = _$("#test-table thead");
            var finder = thead._$("#finder");
            var row = 1;
            var result = Utility.getTbodyFromThead(thead, finder, row);
            if (result.getAttribute("id") === "correct") done();
            else throw Error('wrong body item');
        });
        after(function() {
            _$('#table-container').removeChild(_$("#test-table"));
        });
    });
    describe('#formDate 테스트', function() {
        it('전달된 월이 0 일때 월은 12로 출력한다', function(done) {
            var result = Utility.formDate(2017, 0, 1);
            if (result === "2017-12-01") done();
            else throw Error('error');
        });
        it('전달된 월이 13~ 23일때 다음년도가 출력되고, 월은 12로 나눈 나머지가 출력된다.', function(done) {
            var result = Utility.formDate(2017, 18, 1);
            if (result === "2018-06-01") done();
            else throw Error('error');
        });
    });
    describe('#removeClass테스트', function() {
        it('div의 기존 3개의 클래스(text, container, mystyle)에서 container클래스를 제거하고 남은 클래스는 text, mystyle 이다.', function(done) {
            var ele = document.querySelector("#Test");
            Utility.removeClass(ele, "container");
            if (arraysEqual(ele.classList, ["text", "mystyle"])) done();
            else throw Error('error');

            function arraysEqual(arr1, arr2) {
                if (arr1.length !== arr2.length)
                    return false;
                for (var i = arr1.length; i--;) {
                    if (arr1[i] !== arr2[i])
                        return false;
                }
                return true;
            }
        });
        it('div의 기존 클래스 container를 지우면 더이상 클래스는 없다.', function(done) {
            var ele = document.querySelector("#Test2");
            Utility.removeClass(ele, "container");
            if (ele.classList.length === 0) done();
            else throw Error('error');
        });
    });
    describe('#on 테스트', function() {
        it('div를 클릭했을때 클릭한div의 배경색을 pink로 지정한다.', function(done) {
            var ele = document.querySelector("#Test");
            Utility.on(ele, "click", test);

            function test(event) {
                event.target.style.backgroundColor = "pink";
            }
            ele.click();
            if (ele.style.backgroundColor === "pink") done();
            else throw Error('error');
        });
    });
});
