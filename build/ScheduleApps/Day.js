"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_React$Component) {
    _inherits(Day, _React$Component);

    function Day(props) {
        var _this2 = this;

        _classCallCheck(this, Day);

        var _this = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

        _this._customStyle = function () {
            if (_this.state.mouseEvent) {
                return { backgroundColor: "lightgray" };
            } else {
                return { backgroundColor: "white" };
            }
        };

        _this._overEvent = function (event) {

            _this.setState({
                mouseEvent: true
            });
        };

        _this._outEvent = function (event) {

            _this.setState({
                mouseEvent: false
            });
        };

        _this._DayInfo = function (_ref) {
            var day = _ref.day,
                month = _ref.month,
                dayOfWeek = _ref.dayOfWeek,
                isMonth = _ref.isMonth,
                year = _ref.year,
                isToday = _ref.isToday,
                dayOnclick = _ref.dayOnclick,
                schedule = _ref.schedule;


            var addSchedule = schedule.map(function (value, index) {
                var type = value.type;
                var display = void 0;
                switch (type) {
                    case 'SELECT':
                        display = React.createElement(
                            "span",
                            null,
                            "\u2714"
                        );
                        break;
                    case 'TYPE1':
                        display = React.createElement(
                            "span",
                            null,
                            "\u2710"
                        );
                        break;
                    case 'TYPE2':
                        display = React.createElement(
                            "span",
                            null,
                            "\u270C"
                        );
                        break;
                    default:
                        display = React.createElement(
                            "span",
                            null,
                            "\u270B"
                        );
                }
                return React.createElement(
                    "span",
                    { className: "scheduleIcon", key: day + "" + index },
                    display
                );
            });
            var className = isMonth ? "day" : "day otherMonth";
            var addMonth = isMonth ? "" : React.createElement(
                "span",
                null,
                month,
                "\uC6D4"
            );
            var el = React.createElement(
                "span",
                null,
                addMonth,
                day,
                "\uC77C"
            );
            // console.log(dayOnclick())
            return React.createElement(
                "div",
                {
                    className: className, id: isToday ? "today" : "otherDay",
                    onMouseOver: function onMouseOver(event) {
                        _this._overEvent(event);
                    },
                    onMouseOut: function onMouseOut(event) {
                        _this._outEvent(event);
                    },
                    onClick: function onClick(event) {
                        dayOnclick(event, _this);
                    },
                    style: _this._customStyle()
                },
                "   ",
                el,
                React.createElement(
                    "div",
                    { className: "scheduleBox" },
                    addSchedule
                )
            );
        };

        _this._renderInfo = function () {
            return React.createElement(_this2._DayInfo, {
                day: _this.props.day,
                month: _this.props.month,
                year: _this.props.year,
                dayOfWeek: _this.props.dayOfWeek,
                isMonth: _this.props.isMonth,
                isToday: _this.props.isToday,
                dayOnclick: _this.props.dayOnclick,
                schedule: _this.props.schedule
            });
        };

        _this.today = new Date();
        _this.state = {
            mouseEvent: false
        };
        return _this;
    }

    _createClass(Day, [{
        key: "render",
        value: function render() {
            return React.createElement(this._renderInfo, null);
        }
    }]);

    return Day;
}(React.Component);