"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    这是整个项目最最最最最恶心的代码页，相信没有之一，我花了三天去实现此功能，其中两天在拼搭它的逻辑....
    by:作者
    --2019年5月11日18:20:49

    我现在感觉好多了
    by:作者
    --2019年5月18日12:56:31
*/

var PS = function () {
    function PS() {
        _classCallCheck(this, PS);

        this.event = [];
        this.message = [];
    }

    _createClass(PS, [{
        key: "listent",
        value: function listent(key, fn) {
            this.event[key] = this.event[key] || [];
            this.event[key].push(fn);
            if (this.message[key]) {
                for (var i = 0; i < this.message[key].length; i++) {
                    fn(this.message[key][i].pop());
                }
            }
        }
    }, {
        key: "publish",
        value: function publish(key, message) {
            this.message[key] = this.message[key] || [];
            this.message[key].push(message);
            if (this.event[key]) {
                for (var i = 0; i < this.event[key].length; i++) {
                    this.event[key][i](message);
                    this.message[key].pop(message);
                }
            }
        }
    }, {
        key: "remove",
        value: function remove(key, fn) {
            for (var i = 0; i <= this.event[key].length; i++) {
                if (this.event[key][i] == fn) {
                    this.event[key].splice(i, 1);
                }
            }
        }
    }]);

    return PS;
}();

// 模态框组件


var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));
        //渲染一个隐藏的模态框


        _this.state = {
            show: "modal fade",
            style: "none",
            opc: "1"
        };
        _this.state_renderd = false; //状态渲染
        return _this;
    }

    _createClass(Modal, [{
        key: "open",
        value: function open() {
            this.state_renderd = true; //To tell the component it's state is open
            var _t = this;
            this.setState({
                style: "block"
            });
            // 延时是为了让其动画正常进行
            setTimeout(function () {
                _t.setState({
                    show: "modal fade show",
                    opc: ".5"
                });
            }, 100);
            //调暗背景
            ReactDOM.render(React.createElement(Fade, { isOpen: true }), document.getElementById("fade"));
        }
    }, {
        key: "close",
        value: function close() {
            this.state_renderd = false; //To tell the component it's state of render is close;
            var _t = this;
            // modal_state = false;
            this.setState({
                show: "modal fade",
                opc: "1"
            });
            // 延时是为了让其动画正常进行
            setTimeout(function () {
                _t.setState({
                    style: "none"
                });
            }, 300);
            //调亮背景
            ReactDOM.render(React.createElement(Fade, { isOpen: false }), document.getElementById("fade"));
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.isOpen && this.state_renderd !== this.props.isOpen) {
                this.open();
            }
            if (!this.props.isOpen && this.state_renderd !== this.props.isOpen) {
                this.close();
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: this.state.show, id: "exampleModalLong", style: { display: this.state.style }, tabindex: "-1", role: "dialog", "aria-hidden": "true" },
                    React.createElement(
                        "div",
                        { className: "modal-dialog", role: "document" },
                        React.createElement(
                            "div",
                            { className: "modal-content" },
                            this.props.children
                        )
                    )
                )
            );
        }
    }]);

    return Modal;
}(React.Component);

var Modal_head = function (_React$Component2) {
    _inherits(Modal_head, _React$Component2);

    function Modal_head(props) {
        _classCallCheck(this, Modal_head);

        return _possibleConstructorReturn(this, (Modal_head.__proto__ || Object.getPrototypeOf(Modal_head)).call(this, props));
    }

    _createClass(Modal_head, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal-header" },
                React.createElement(
                    "h5",
                    { className: "modal-title", id: "exampleModalLongTitle" },
                    this.props.children
                ),
                React.createElement(
                    "button",
                    { type: "button", className: "close", onClick: this.props.close },
                    React.createElement(
                        "span",
                        { "aria-hidden": "true" },
                        "\xD7"
                    )
                )
            );
        }
    }]);

    return Modal_head;
}(React.Component);

var Modal_body = function (_React$Component3) {
    _inherits(Modal_body, _React$Component3);

    function Modal_body(props) {
        _classCallCheck(this, Modal_body);

        return _possibleConstructorReturn(this, (Modal_body.__proto__ || Object.getPrototypeOf(Modal_body)).call(this, props));
    }

    _createClass(Modal_body, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal-body" },
                this.props.children
            );
        }
    }]);

    return Modal_body;
}(React.Component);

var Modal_foot = function (_React$Component4) {
    _inherits(Modal_foot, _React$Component4);

    function Modal_foot(props) {
        _classCallCheck(this, Modal_foot);

        return _possibleConstructorReturn(this, (Modal_foot.__proto__ || Object.getPrototypeOf(Modal_foot)).call(this, props));
    }

    _createClass(Modal_foot, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "modal-footer" },
                this.props.children,
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-secondary", "data-dismiss": "modal", onClick: this.props.close },
                    "Close"
                )
            );
        }
    }]);

    return Modal_foot;
}(React.Component);

var Fade = function (_React$Component5) {
    _inherits(Fade, _React$Component5);

    // 背景颜色
    function Fade(props) {
        _classCallCheck(this, Fade);

        var _this5 = _possibleConstructorReturn(this, (Fade.__proto__ || Object.getPrototypeOf(Fade)).call(this, props));

        _this5.state = {
            shows: "",
            is: null
        };
        _this5.state_renderd = false; //渲染状态
        return _this5;
    }

    _createClass(Fade, [{
        key: "toggle",
        value: function toggle() {
            if (this.props.isOpen) {
                this.state_renderd = true;
                this.setState({
                    shows: "modal-backdrop fade show",
                    is: function is() {
                        console.log("click");
                    }
                });
            } else {
                this.state_renderd = false;
                this.setState({
                    shows: "",
                    is: null
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state_renderd !== this.props.isOpen) {
                // this.state_renderd = !this.state_renderd//否认状态
                this.toggle();
            }
            return React.createElement("div", { className: this.state.shows, onClick: this.state.is });
        }
    }]);

    return Fade;
}(React.Component);

/*
    name:Nav
    props: teamName -- the team.name,
           choosed -- the ordinal num of the choosed nav.0.首页, 1.转账, 2.仓库, 3.情报, 
           4.商店, 5.资产管理, 6.金融操作
    return: a Nav component
*/


var Nav = function (_React$Component6) {
    _inherits(Nav, _React$Component6);

    // 导航栏组件
    function Nav(props) {
        _classCallCheck(this, Nav);

        var _this6 = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

        _this6.state = {
            navClass: ["onChoose inline hide", "onChoose inline hide", "hide inline onChoose", "onChoose inline hide", "onChoose inline hide", "onChoose inline hide", "onChoose inline hide", "onChoose inline hide"],
            isOpen: false,
            value: {}
        };
        _this6.state.navClass[_this6.props.choosed] = "onChoose inline";
        _this6.handleClose = _this6.close.bind(_this6);
        _this6.handleOpen = _this6.open.bind(_this6);
        _this6.handleGetValue = _this6.getValue.bind(_this6);
        _this6.handleClick = _this6.Click.bind(_this6);
        return _this6;
    }

    _createClass(Nav, [{
        key: "close",
        value: function close() {
            this.setState({
                isOpen: false
            });
        }
    }, {
        key: "open",
        value: function open() {
            this.setState({
                isOpen: true
            });
        }
    }, {
        key: "getValue",
        value: function getValue(e, i) {
            var oj = this.state.value;
            oj[i] = e.target.value;
            this.setState({
                value: oj
            });
        }
    }, {
        key: "Click",
        value: function Click() {
            if (this.state.value["surepass"] !== this.state.value["newpass"]) {
                alert("新密码与确认密码不同！");
                return;
            }

            var _t = this;
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/user/changePassword",
                data: {
                    "oldPwd": _t.state.value["oldpass"],
                    "newPwd": _t.state.value["newpass"]
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        alert("修改成功");
                        _t.handleClose();
                    } else if (response.code === 403) {
                        alert("旧密码错误");
                    } else {
                        alert("请联系管理员！");
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { "class": "Nav" },
                    React.createElement(
                        "div",
                        { "class": "nav-top" },
                        React.createElement(
                            "div",
                            { "class": "f inline" },
                            this.props.teamName
                        ),
                        React.createElement(
                            "div",
                            { "class": "d inline" },
                            React.createElement(
                                "a",
                                { href: "https://wisecity.itrclub.com/user/logout" },
                                "\u9000\u51FA\u767B\u5F55"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "nav-logo" },
                        React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/Nav_logo.png", alt: "WISECITY" })
                    ),
                    React.createElement(
                        "div",
                        { "class": "first navBar" },
                        React.createElement("div", { className: this.state.navClass[0] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/home.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { style: { "color": "white" }, href: "index" },
                                "\u9996\u9875"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "navBar" },
                        React.createElement("div", { className: this.state.navClass[1] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/exchange-alt.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { style: { "color": "white" }, href: "payment" },
                                "\u8F6C\u8D26"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "navBar" },
                        React.createElement("div", { className: this.state.navClass[2] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/chart-pie.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { style: { "color": "white" }, href: "warehouse" },
                                "\u4ED3\u5E93"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "navBar" },
                        React.createElement("div", { className: this.state.navClass[3] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/chart-bar.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { style: { "color": "white" }, href: "news" },
                                "\u60C5\u62A5"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "navBar" },
                        React.createElement("div", { className: this.state.navClass[4] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/shopping-cart.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { style: { "color": "white" }, href: "goods" },
                                "\u5546\u5E97"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "navBar" },
                        React.createElement("div", { className: this.state.navClass[5] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/dollar-sign.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { style: { "color": "white" }, href: "asset" },
                                "\u8D44\u4EA7\u7BA1\u7406"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "navBar" },
                        React.createElement("div", { className: this.state.navClass[6] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/hand-pointer.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { style: { "color": "white" }, href: "investment" },
                                "\u91D1\u878D\u64CD\u4F5C"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "navBar" },
                        React.createElement("div", { className: this.state.navClass[7] }),
                        React.createElement(
                            "div",
                            { "class": "icon inline" },
                            React.createElement(
                                "span",
                                null,
                                React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/icon/user-shield.png", alt: "WISECITY" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": "option inline" },
                            React.createElement(
                                "a",
                                { onClick: this.handleOpen },
                                "\u4FEE\u6539\u5BC6\u7801"
                            )
                        )
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.isOpen },
                    React.createElement(
                        Modal_head,
                        { close: this.handleClose },
                        React.createElement(
                            "b",
                            null,
                            "\u4FEE\u6539\u5BC6\u7801"
                        )
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        React.createElement(
                            "div",
                            { className: "row mb-3" },
                            React.createElement(
                                "div",
                                { className: "col-4" },
                                "\u539F\u5BC6\u7801"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-7" },
                                React.createElement("input", { className: "form-control", value: this.state.value.oldpass, onChange: function onChange(e) {
                                        return _this7.handleGetValue(e, "oldpass");
                                    } })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row mb-3" },
                            React.createElement(
                                "div",
                                { className: "col-4" },
                                "\u65B0\u5BC6\u7801"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-7" },
                                React.createElement("input", { className: "form-control", value: this.state.value.newpass, onChange: function onChange(e) {
                                        return _this7.handleGetValue(e, "newpass");
                                    } })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row mb-3" },
                            React.createElement(
                                "div",
                                { className: "col-4" },
                                "\u786E\u8BA4\u65B0\u5BC6\u7801"
                            ),
                            React.createElement(
                                "div",
                                { className: "col-7" },
                                React.createElement("input", { className: "form-control", value: this.state.value.surepass, onChange: function onChange(e) {
                                        return _this7.handleGetValue(e, "surepass");
                                    } })
                            )
                        )
                    ),
                    React.createElement(
                        Modal_foot,
                        { close: this.handleClose },
                        React.createElement(
                            "a",
                            { className: "btn bg-brown", role: "button", onClick: this.handleClick },
                            "\u786E\u8BA4"
                        )
                    )
                )
            );
        }
    }]);

    return Nav;
}(React.Component);

// 表格组件


var T_head = function (_React$Component7) {
    _inherits(T_head, _React$Component7);

    function T_head(props) {
        _classCallCheck(this, T_head);

        return _possibleConstructorReturn(this, (T_head.__proto__ || Object.getPrototypeOf(T_head)).call(this, props));
    }

    _createClass(T_head, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "thead",
                { className: "thead-light" },
                React.createElement(
                    "tr",
                    null,
                    this.props.content.map(function (value, index) {
                        return React.createElement(
                            "th",
                            { scope: "col", key: index },
                            value
                        );
                    })
                )
            );
        }
    }]);

    return T_head;
}(React.Component);

var T_body = function (_React$Component8) {
    _inherits(T_body, _React$Component8);

    function T_body(props) {
        _classCallCheck(this, T_body);

        return _possibleConstructorReturn(this, (T_body.__proto__ || Object.getPrototypeOf(T_body)).call(this, props));
    }

    _createClass(T_body, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "tbody",
                null,
                this.props.content.map(function (value, index) {
                    return React.createElement(
                        "tr",
                        { key: index },
                        value.map(function (val, index) {
                            return React.createElement(
                                "td",
                                { key: index },
                                val
                            );
                        })
                    );
                    {/* return value; */}
                })
            );
        }
    }]);

    return T_body;
}(React.Component);

var T_table = function (_React$Component9) {
    _inherits(T_table, _React$Component9);

    function T_table(props) {
        _classCallCheck(this, T_table);

        return _possibleConstructorReturn(this, (T_table.__proto__ || Object.getPrototypeOf(T_table)).call(this, props));
    }

    _createClass(T_table, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "table" },
                this.props.children
            );
        }
    }]);

    return T_table;
}(React.Component);

// select 


var Select = function (_React$Component10) {
    _inherits(Select, _React$Component10);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this11 = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this11.handleget = _this11.Get.bind(_this11);
        return _this11;
    }

    _createClass(Select, [{
        key: "Get",
        value: function Get(e) {
            this.props.get_value(e.target.value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "select",
                { "class": "custom-select", id: "inputGroupSelect01", onChange: this.handleget },
                React.createElement(
                    "option",
                    { selected: true },
                    this.props.value || "Choose..."
                ),
                this.props.options.map(function (value, index) {
                    return React.createElement(
                        "option",
                        { value: value, key: index },
                        value
                    );
                })
            );
        }
    }]);

    return Select;
}(React.Component);

// Input


var Input_group = function (_React$Component11) {
    _inherits(Input_group, _React$Component11);

    function Input_group(props) {
        _classCallCheck(this, Input_group);

        return _possibleConstructorReturn(this, (Input_group.__proto__ || Object.getPrototypeOf(Input_group)).call(this, props));
    }

    _createClass(Input_group, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "input-group mb-3" },
                this.props.children
            );
        }
    }]);

    return Input_group;
}(React.Component);

// class ES extends React.Component{
//     // erro or success
//     constructor(props){
//         super(props);
//         this.state = {
//             isOpen:false
//         }
//     }

//     componentDidMount(){

//     }

//     render(){
//         return(
//             <Modal isOpen={this.state.isOpen}>

//             </Modal>
//         )
//     }
// }