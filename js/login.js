"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.handleget = _this.Get.bind(_this); //在输入时调用函数向上传递input中的值
        _this.props.value = _this.props.value || "";
        _this.handlekey = _this.Key.bind(_this); //在键盘被点击时向上返回键盘对象
        return _this;
    }

    _createClass(Input, [{
        key: "Get",
        value: function Get(e) {
            var value = e.target.value; //input框中的值
            // console.log(value);
            this.props.onGet(value);
        }
    }, {
        key: "Key",
        value: function Key(e) {
            this.props.onKey(e);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement("input", { className: "form-control", type: this.props.type, placeholder: this.props.placeholder, onChange: this.handleget, onKeyDown: this.handlekey })
            );
        }
    }]);

    return Input;
}(React.Component);

var Button = function (_React$Component2) {
    _inherits(Button, _React$Component2);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this2 = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this2.props.class = _this2.props.class || "";
        _this2.props.value = _this2.props.value || "button";
        return _this2;
    }

    _createClass(Button, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { type: "button", className: this.props.class, onClick: this.props.click },
                this.props.value
            );
        }
    }]);

    return Button;
}(React.Component);

var Form = function (_React$Component3) {
    _inherits(Form, _React$Component3);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this3 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this3.props.class = _this3.props.class ? _this3.props.class + " " + "form" : "form";
        _this3.handleget = [_this3.Get.bind(_this3, 0), _this3.Get.bind(_this3, 1)];
        _this3.handleclick = _this3.Click.bind(_this3);
        _this3.handlekey = _this3.Keydown.bind(_this3);
        _this3.input_value = [];
        return _this3;
    }

    _createClass(Form, [{
        key: "Get",
        value: function Get(index, value) {
            this.input_value[index] = value;
        }
    }, {
        key: "Click",
        value: function Click() {
            if (this.input_value[0] != undefined && this.input_value[1] != undefined) {
                $.ajax({
                    type: "POST",
                    url: "https://wisecity.itrclub.com/user/toLogin",
                    data: {
                        "userName": this.input_value[0],
                        "password": this.input_value[1]
                    },
                    dataType: "JSON",
                    success: function success(response) {
                        if (response.code == 200) {
                            // alert("登录成功");
                            location.href = response.data['url'];
                        } else if (response.code === 403) {
                            alert("用户名或密码错误！");
                        } else {
                            alert("登录失败\n错误码:" + response.code + "\n错误内容:" + response.message);
                        }
                    }
                });
            }
        }
    }, {
        key: "Keydown",
        value: function Keydown(e) {
            if (e.keyCode == "13") {
                this.Click();
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { className: this.props.class },
                    React.createElement(
                        "div",
                        { className: "hh" },
                        React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/wisecity_logo.png", alt: "wisecity" })
                    ),
                    React.createElement(
                        "div",
                        { className: "tips" },
                        "\u7528\u6237\u540D/user ID"
                    ),
                    React.createElement(Input, { type: "text", onGet: this.handleget[0], onKey: this.handlekey }),
                    React.createElement(
                        "div",
                        { className: "tips tip" },
                        "\u5BC6\u7801/password"
                    ),
                    React.createElement(Input, { type: "password", onGet: this.handleget[1], onKey: this.handlekey }),
                    React.createElement(
                        "div",
                        { className: "forget" },
                        React.createElement(
                            "a",
                            { onClick: function onClick(e) {
                                    alert("请联系 穿着荧光黄外套 的技术支持(小生蚝)~");
                                } },
                            "\u5FD8\u8BB0\u5BC6\u7801\uFF1F/Foget?"
                        )
                    ),
                    React.createElement(Button, { value: "\u767B\u5F55", "class": "t btn btn-p", click: this.handleclick })
                )
            );
        }
    }]);

    return Form;
}(React.Component);

ReactDOM.render(React.createElement(Form, null), document.getElementById("root"));