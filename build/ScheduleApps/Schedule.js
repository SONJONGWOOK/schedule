'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactBootstrap = ReactBootstrap,
    InputGroup = _ReactBootstrap.InputGroup,
    DropdownButton = _ReactBootstrap.DropdownButton,
    Dropdown = _ReactBootstrap.Dropdown,
    FormControl = _ReactBootstrap.FormControl,
    Table = _ReactBootstrap.Table,
    Button = _ReactBootstrap.Button,
    ButtonGroup = _ReactBootstrap.ButtonGroup;

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

    _this._changeDropValue = function (e) {

      _this.setState({
        dropDownValue: e.currentTarget.textContent
      });
    };

    _this._changeInputValue = function (e) {
      // console.log(e.target.value)
      _this.inputText = e.target.value;
    };

    _this._customStyle = function () {
      if (_this.state.inputOpen) {
        return { display: "block" };
      } else {
        return { display: "none" };
      }
    };

    _this._dayOnclick = function (event, thisObject) {

      var date = new Date(thisObject.props.year, thisObject.props.month - 1, thisObject.props.day);
      _this.detail = thisObject.props.schedule;
      _this.setState({
        inputOpen: true,
        inputDay: date
      });

      _this.clickDay = date;
    };

    _this._inputSave = function (event, thisObject) {

      var inputDay = _this.state.inputDay;
      var list = _this.state.list;

      var inputData = {
        date: inputDay,
        type: _this.state.dropDownValue,
        text: document.querySelector("#inputText").value
      };
      console.log(inputData);

      list.push(inputData);
      //초기화
      _this.setState({
        // inputOpen : false,
        dropDownValue: _this.dropDownText,
        list: list
      });
      document.querySelector("#inputText").value = "";
    };

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
      //달력에 표시되는날짜는 총 42일
      for (var i = 0; i < 42; i++) {
        var pushDate = new Date(preDay);
        arr.push(_this._setData(pushDate));
        preDay.setDate(preDay.getDate() + 1);
      }

      return arr;
    };

    _this._setData = function (date) {

      var list = _this.state.list;

      var matchList = list.filter(function (el) {
        return el.date.getTime() == date.getTime();
      });

      return {
        date: date,
        dayOfWeek: _this.days[date.getDay()],
        isMonth: date.getMonth() == _this.state.now.getMonth() ? true : false,
        isToday: date.toLocaleDateString() == new Date().toLocaleDateString() ? true : false,
        schedule: matchList
      };
    };

    _this._getCalendar = function () {

      var list = _this._getDayArray();

      return list.map(function (value, index) {
        return React.createElement(Day, {
          key: index,
          day: value.date.getDate(),
          month: value.date.getMonth() + 1,
          year: value.date.getFullYear(),
          dayOfWeek: value.dayOfWeek,
          isMonth: value.isMonth,
          isToday: value.isToday,
          dayOnclick: _this._dayOnclick,
          schedule: value.schedule
        });
      });
    };

    _this._displayHeaderDate = function () {
      var dt = _this.state.now;
      return dt.getFullYear() + '년 ' + parseInt(dt.getMonth() + 1) + '월';
    };

    _this._bottomHeder = function () {
      console.log(_this.clickDay);
      return React.createElement(
        'h1',
        { style: _this._customStyle() },
        _this.clickDay.toLocaleDateString() + " detail schedule"
      );
    };

    _this._inputgroup = function () {
      //드롭다운 버튼 
      //<button type="button" tabindex="0" class="dropdown-item">1</button>
      return React.createElement(
        'div',
        { className: 'inputArea', style: _this._customStyle() },
        React.createElement(
          InputGroup,
          { className: 'mb-3' },
          React.createElement(
            DropdownButton,
            {
              as: InputGroup.Prepend,
              variant: 'outline-secondary',
              title: _this.state.dropDownValue,
              id: 'input-group-dropdown-1' },
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick(event) {
                  return _this._changeDropValue(event);
                } },
              'TYPE1'
            ),
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick(event) {
                  return _this._changeDropValue(event);
                } },
              'TYPE2'
            ),
            React.createElement(Dropdown.Divider, null),
            React.createElement(
              Dropdown.Item,
              { onClick: function onClick(event) {
                  return _this._changeDropValue(event);
                } },
              'TYPE3'
            )
          ),
          React.createElement(FormControl, { 'aria-describedby': 'basic-addon1', id: 'inputText', type: 'text', placeholder: '\uB0B4\uC6A9' }),
          React.createElement(
            Button,
            { color: 'secondary', onClick: function onClick(event) {
                _this._inputSave(event, _this);
              } },
            'SAVE'
          )
        )
      );
    };

    _this._detailgroup = function () {
      // console.log(this.detail)
      var addBody = _this.detail.map(function (value, index) {
        return React.createElement(
          'tr',
          { key: index },
          React.createElement(
            'th',
            { scope: 'row' },
            index + 1
          ),
          React.createElement(
            'td',
            null,
            value.date.toLocaleDateString()
          ),
          React.createElement(
            'td',
            null,
            value.type
          ),
          React.createElement(
            'td',
            null,
            value.text
          )
        );
        // return <div key={index} >{value.text}</div>
      });

      return React.createElement(
        Table,
        { style: _this._customStyle(), hover: true },
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement('th', null),
            React.createElement(
              'th',
              { className: 'detail' },
              '\uC77C\uC790'
            ),
            React.createElement(
              'th',
              { className: 'detail' },
              '\uC885\uB958'
            ),
            React.createElement(
              'th',
              { className: 'detail' },
              '\uB0B4\uC6A9'
            )
          )
        ),
        React.createElement(
          'tbody',
          null,
          addBody
        )
      );

      // return <div style={this._customStyle()} > {this.detail} </div>
    };

    _this.dropDownText = 'SELECT';
    _this.inputText;
    _this.detail;
    _this.clickDay;
    _this.today = new Date();
    _this.days = ['일', '월', '화', '수', '목', '금', '토'];

    _this.state = {
      now: _this.today,
      inputOpen: false,
      dropdownOpen: false,
      splitButtonOpen: false,
      dropDownValue: _this.dropDownText,
      list: []

      //데이터 형태
      // { date : 날짜  : type  : 타입 : text : 할일}

    };return _this;
  }

  _createClass(Schedule, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}

    //달력 이전달

    // 달력 오늘

    // 달력다음달

    //달의 첫날가져오기

    //달의 마지막날 가져오기

    //요일 표시

    // 저번달 가져오기

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
        ),
        React.createElement(
          'div',
          { className: 'bottom' },
          this.state.inputOpen ? this._bottomHeder() : '',
          this.state.inputOpen ? this._inputgroup() : '',
          this.state.inputOpen ? this._detailgroup() : ''
        )
      );
    }
  }]);

  return Schedule;
}(React.Component);