"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input_select = function (_React$Component) {
    _inherits(Input_select, _React$Component);

    function Input_select(props) {
        _classCallCheck(this, Input_select);

        return _possibleConstructorReturn(this, (Input_select.__proto__ || Object.getPrototypeOf(Input_select)).call(this, props));
    }

    _createClass(Input_select, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Input_group,
                null,
                React.createElement(
                    "div",
                    { "class": "input-group-prepend" },
                    React.createElement(
                        "label",
                        { "class": "input-group-text", "for": "inputGroupSelect01" },
                        this.props.optionName
                    )
                ),
                React.createElement(Select, { options: this.props.options, get_value: this.props.get_value })
            );
        }
    }]);

    return Input_select;
}(React.Component);

var Body = function (_React$Component2) {
    _inherits(Body, _React$Component2);

    function Body(props) {
        _classCallCheck(this, Body);

        var _this2 = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

        _this2.state = {
            a: ["白银"],
            b: {
                teamlist: {},
                name: []
            },
            inputValueM: "",
            inputValueR: ""
            // this.b = [["a","b","c"],[1,2,3],[4,5,6]]
        };_this2.handleget = {
            "to": _this2.Get.bind(_this2, "to"),
            "type": _this2.Get.bind(_this2, "type"),
            "num": _this2.Get.bind(_this2, "num"),
            "remark": _this2.Get.bind(_this2, "remark")
        };
        _this2.value = {};
        _this2.handleClick = _this2.Click.bind(_this2);
        return _this2;
    }

    _createClass(Body, [{
        key: "Get",
        value: function Get(index, e) {
            if (index === "type") {
                this.state.a.map(function (v, i) {
                    if (e === v && e !== "白银") {
                        e = i + 3;
                    }
                    if (e === "白银") {
                        e = 0;
                    }
                });
            }
            if (index === "to") {
                this.state.b.teamlist.map(function (val) {
                    if (val.name === e) {
                        e = val.id;
                    }
                });
            }
            if (index === "num" || index === "remark") {
                if (index === "num") {
                    this.setState({
                        inputValueM: e.target.value
                    });
                } else {
                    this.setState({
                        inputValueR: e.target.value
                    });
                }
                e = e.target.value;
            }
            this.value[index] = e;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            var handleList = this.List.bind(this);
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/bank/ticket/get",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        var data = response.data.list;
                        var mover = [];
                        for (var i in data) {
                            mover.push(data[i].ticketName);
                        }
                        handleList(mover);
                    }
                }
            });

            var listen_team = function listen_team(e) {
                // get the team content
                var name = [];
                e.map(function (val) {
                    name.push(val["name"]);
                });
                _this3.setState({
                    b: {
                        teamlist: e,
                        name: name
                    }
                });
            };
            this.listen_team = listen_team.bind(this);
            ppss.listent("team_list_payment", this.listen_team);

            $.ajax({
                // get team value
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/getList",
                data: { "type": "list" },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        var responsedata = response.data;
                        var response_data = [];
                        for (var i in responsedata) {
                            response_data.push({ "name": i, "id": responsedata[i] });
                        }
                        ppss.publish("team_list_payment", response_data);
                    } else if (response.code === 403001) {
                        alert("请登录后再访问");
                        location.href = "https://wisecity.itrclub.com/";
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "List",
        value: function List(e) {
            var mover;
            mover = this.state.a;
            mover = mover.concat(e);
            this.setState({
                a: mover
            });
        }
    }, {
        key: "Click",
        value: function Click() {
            // console.log(this.value);
            Transfer_Money(this.value["to"], this.value["type"], this.value["num"], this.value["remark"]);
            this.setState({
                inputValueM: "",
                inputValueR: ""
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement("div", { className: "mb-3" }),
                React.createElement(
                    "div",
                    { className: "row mb-3" },
                    React.createElement(
                        "div",
                        { className: "col" },
                        React.createElement(Input_select, { optionName: "\u6536\u6B3E\u65B9", options: this.state.b.name, get_value: this.handleget["to"] })
                    ),
                    React.createElement(
                        "div",
                        { className: "col" },
                        React.createElement(Input_select, { optionName: "\u8D27\u5E01\u7C7B\u578B", options: this.state.a, get_value: this.handleget["type"] })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row mb-3" },
                    React.createElement(
                        "div",
                        { className: "col" },
                        React.createElement("input", { value: this.state.clearValue, className: "form-control", type: "text", onChange: this.handleget["num"], placeholder: "\u91D1\u989D..." })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row mb-3" },
                    React.createElement(
                        "div",
                        { className: "col" },
                        React.createElement("input", { value: this.state.clearValue, className: "form-control", type: "text", onChange: this.handleget["remark"], placeholder: "\u5907\u6CE8..." })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row mb-3" },
                    React.createElement(
                        "div",
                        { className: "col" },
                        React.createElement("input", { type: "button", className: "form-control", onClick: this.handleClick, value: "\u53D1\u8D77\u4EA4\u6613" })
                    )
                )
            );
        }
    }]);

    return Body;
}(React.Component);

ReactDOM.render(React.createElement(Body, null), document.getElementById("root"));

ReactDOM.render(React.createElement(Nav, null), document.getElementById("Nav"));