'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Reactstrap = Reactstrap,
    Button = _Reactstrap.Button,
    ButtonGroup = _Reactstrap.ButtonGroup;

//윈도우 달력과 동일하게 제작
//총 6줄 기준은 1일에 기준에 맞추서 제작
// 1일이 토요일이라면
// 26 27 28 29 30 31 1
//~~~~`
// 30 1   2   3 4 5 6
//1일이 만약에 월요일이라면
//1번째줄 31  1 2 3 4 5 6 
//2번째줄 7~
//3번째줄 14~
//4번째줄 21~
//5번째줄 28 29 30 1 2 3 4
//6번재줄 5 6 7 8 9 10 11 로 한다.

var Schedule = function (_React$Component) {
  _inherits(Schedule, _React$Component);

  function Schedule(props) {
    _classCallCheck(this, Schedule);

    var _this = _possibleConstructorReturn(this, (Schedule.__proto__ || Object.getPrototypeOf(Schedule)).call(this, props));

    _this._prevMonth = function () {
      var dt = new Date(_this.state.now);
      dt.setMonth(dt.getMonth() - 1);
      _this.setState({
        now: dt
      });
    };

    _this._today = function () {
      _this.setState({
        now: new Date()
      });
    };

    _this._nextMonth = function () {
      var dt = new Date(_this.state.now);
      dt.setMonth(dt.getMonth() + 1);
      _this.setState({
        now: dt
      });
    };

    _this._getFirstDate = function (today) {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    };

    _this._getLastDate = function (today) {
      return new Date(today.getFullYear(), today.getMonth() + 1, 0);
    };

    _this._getDayOfWeek = function (day) {
      return _this.days[day.getDay()];
    };

    _this._getPrevDay = function (date) {
      var target = new Date(date);
      var dayNumber = new Date(date).getDay();
      target.setDate(target.getDate() - dayNumber);
      return target;
    };

    _this._getDateformat = function (date) {
      return { yyyy: date.getFullYear(),
        MM: date.getMonth() + 1,
        dd: date.getDate()
      };
    };

    _this._getDayArray = function () {
      var arr = [];
      var firstDay = _this._getFirstDate(_this.state.now);
      var preDay = _this._getPrevDay(firstDay);

      for (var i = 0; i < 42; i++) {
        var pushDate = new Date(preDay);
        arr.push(_this._setData(pushDate));
        preDay.setDate(preDay.getDate() + 1);
      }

      return arr;
    };

    _this._setData = function (date) {
      return {
        date: date,
        dayOfWeek: _this.days[date.getDay()],
        isMonth: date.getMonth() == _this.state.now.getMonth() ? true : false,
        isToday: date.toLocaleDateString() == new Date().toLocaleDateString() ? true : false
      };
    };

    _this._getCalendar = function () {

      var list = _this._getDayArray();

      return list.map(function (value, index) {
        return React.createElement(Day, {
          key: index,
          day: value.date.getDate(),
          month: value.date.getMonth() + 1,
          year: value.date.getMonth(),
          dayOfWeek: value.dayOfWeek,
          isMonth: value.isMonth,
          isToday: value.isToday
        });
      });
    };

    _this._displayHeaderDate = function () {
      var dt = _this.state.now;
      return dt.getFullYear() + '년 ' + parseInt(dt.getMonth() + 1) + '월';
    };

    _this.today = new Date();
    _this.days = ['일', '월', '화', '수', '목', '금', '토'];

    _this.state = {
      now: _this.today
    };

    return _this;
  }

  _createClass(Schedule, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      //총 42칸 제작 = 7*6
      //달 시작
      // console.log(new Date( this.year , this.today.getMonth() , 1).toLocaleDateString())
      //달 끝
      // console.log(new Date( this.year , this.today.getMonth()+1 , 0).toLocaleDateString())
      //토요일=6 


    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'outer' },
        React.createElement(
          'div',
          { className: 'header' },
          React.createElement(
            'h1',
            null,
            this._displayHeaderDate()
          ),
          React.createElement(
            'div',
            { className: 'btnGroup' },
            React.createElement(
              ButtonGroup,
              null,
              React.createElement(
                Button,
                { onClick: this._prevMonth },
                '<'
              ),
              React.createElement(
                Button,
                { onClick: this._today },
                'Today'
              ),
              React.createElement(
                Button,
                { onClick: this._nextMonth },
                '>'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'main' },
          this.state.now ? this._getCalendar() : '로딩'
        )
      );
    }
  }]);

  return Schedule;
}(React.Component);