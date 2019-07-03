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

// {
//  <div>   
//     <div className="cont font_f">
//     {/* 商品选择modal-body样式 */}
//             {"商品"+":"+this.props.content.name}
//             <br/>
//             {"单价"+":"+this.props.content.price}
//             <br/>
//         </div>
//         <div class="input-group mb-3">
//             <div class="input-group-prepend">
//                 <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
//                 <div class="dropdown-menu">
//                     <a class="dropdown-item" href="#">Action</a>
//                     <a class="dropdown-item" href="#">Another action</a>
//                     <a class="dropdown-item" href="#">Something else here</a>
//                     <div role="separator" class="dropdown-divider"></div>
//                     <a class="dropdown-item" href="#">Separated link</a>
//                 </div>
//             </div>
//             <input type="text" class="form-control" aria-label="Text input with dropdown button"/>
//         </div>
//     </div>
// }           

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

var Nav = function (_React$Component6) {
    _inherits(Nav, _React$Component6);

    // 导航栏组件
    function Nav(props) {
        _classCallCheck(this, Nav);

        var _this6 = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

        _this6.state = {
            navshow: "collapse navbar-collapse",
            height: "0px",
            down: "nav-item dropdown active",
            downmenu: "dropdown-menu"
        };
        _this6.timehandle;
        _this6.togglehandle = _this6.toggle.bind(_this6);
        _this6.toggle_2 = _this6.toggle_1.bind(_this6);
        _this6.isclick = true;
        return _this6;
    }

    _createClass(Nav, [{
        key: "toggle",
        value: function toggle(e) {
            // 移动端收缩导航栏显示与隐藏
            if (this.isclick == true) {
                this.isclick = false;
                var _t = this;
                var navshow;
                if (this.state.navshow == "collapse navbar-collapse show") {
                    navshow = "collapse navbar-collapse";
                    this.setState({
                        navshow: "collapsing navbar-collapse",
                        height: "0px"
                    });
                } else {
                    navshow = "collapse navbar-collapse show";
                    this.setState({
                        navshow: "collapsing navbar-collapse"
                    });
                    setTimeout(function () {
                        _t.setState({ height: "114px" });
                    }, 1);
                }
                var tog = function tog() {
                    _t.setState({
                        navshow: navshow
                    });
                    _t.isclick = true;
                };
                setTimeout(function () {
                    tog();
                }, 300);
            }
        }
    }, {
        key: "toggle_1",
        value: function toggle_1() {
            // 下拉菜单显示与隐藏
            if (this.state.downmenu == "dropdown-menu") {
                this.setState({
                    downmenu: "dropdown-menu show"
                });
            } else {
                this.setState({
                    downmenu: "dropdown-menu"
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "nav",
                { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
                React.createElement(
                    "a",
                    { className: "navbar-brand title", href: "#" },
                    "Wisecity"
                ),
                React.createElement(
                    "button",
                    { onClick: this.togglehandle, className: "navbar-toggler", "aria-controls": "navbarSupportedContent" },
                    React.createElement("span", { "class": "navbar-toggler-icon" })
                ),
                React.createElement(
                    "div",
                    { className: this.state.navshow, style: { height: this.state.height }, id: "navbarSupportedContent" },
                    React.createElement(
                        "ul",
                        { className: "navbar-nav mr-auto" },
                        React.createElement(
                            "li",
                            { className: "nav-item" },
                            React.createElement(
                                "a",
                                { className: "nav-link font_f active", href: "index" },
                                "\u9996\u9875"
                            )
                        ),
                        React.createElement(
                            "li",
                            { className: this.state.down },
                            React.createElement(
                                "a",
                                { className: "nav-link dropdown-toggle", role: "button", href: "#", id: "dropdownId", onClick: this.toggle_2 },
                                "\u64CD\u4F5C"
                            ),
                            React.createElement(
                                "ul",
                                { className: this.state.downmenu, "aria-labelledby": "dropdownId" },
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { className: "dropdown-item", href: "https://wisecity.itrclub.com/team/payment" },
                                        "\u8F6C\u8D26"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { className: "dropdown-item", href: "https://wisecity.itrclub.com/team/warehouse" },
                                        "\u4ED3\u5E93"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { className: "dropdown-item", href: "https://wisecity.itrclub.com/team/news" },
                                        "\u60C5\u62A5"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { className: "dropdown-item", href: "https://wisecity.itrclub.com/team/goods" },
                                        "\u5546\u5E97"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { className: "dropdown-item", href: "https://wisecity.itrclub.com/team/asset" },
                                        "\u8D44\u4EA7\u7BA1\u7406"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    null,
                                    React.createElement(
                                        "a",
                                        { className: "dropdown-item", href: "https://wisecity.itrclub.com/team/investment" },
                                        "\u91D1\u878D\u64CD\u4F5C"
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "li",
                            { className: "nav-item" },
                            React.createElement(
                                "a",
                                { className: "nav-link font_f active", href: "https://wisecity.itrclub.com/user/logout", role: "button" },
                                "\u9000\u51FA\u767B\u5F55"
                            )
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

        var _this10 = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this10.handleget = _this10.Get.bind(_this10);
        return _this10;
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