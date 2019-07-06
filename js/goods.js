"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    // 商店
    function Table(props) {
        _classCallCheck(this, Table);

        // this.handleclick = this.click.bind(this);
        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.state = {
            good_space: [],
            publicModal_state: false,
            modal_value: {
                place: {}
            },
            currency: []
        };
        _this.handlecloseModal = _this.close.bind(_this);
        _this.handleopenModal = _this.open.bind(_this);
        _this.buy_value = {}; // the value to buy goods
        _this.handleget_input_Value = _this.get_input_Value.bind(_this);
        _this.handleBuy = _this.Buy.bind(_this);
        _this.handleSell = _this.Sell.bind(_this);
        _this.warehouse = {};
        return _this;
    }

    _createClass(Table, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var listent = function listent(e) {
                _this2.good = new Good(e);
                _this2.setState({
                    good_space: _this2.good.list
                });
            };
            listent = listent.bind(this);
            this.listentID = listent;
            ppss.listent("good.list", listent);
            this.running = function () {
                good_ask.list(); //Ask the AJAX of api:goods/get in the whole page after all components rendered
                var time = Math.random() * 10000 + Math.random() * 10000 + Math.random() * 1000;
                var running = _this2.running;
                setTimeout(function () {
                    running();
                }, time);
            };
            this.running();
            var handlelist = this.List.bind(this);
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/bank/ticket/get",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        var data = response.data.list;
                        var mover = [];
                        for (var i in data) {
                            mover.push(data[i].ticketName);
                        }
                        handlelist(mover);
                    }
                }
            });

            var su = function su(e) {
                for (var i in e) {
                    _this2.warehouse[e[i].goods_name] = e[i].num;
                }
            };
            su = su.bind(this);
            $.ajax({
                // get warehouse value
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/getWarehouse",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        var response_data = response.data;
                        su(response_data);
                    } else if (response.code == 403001) {
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
            this.setState({
                currency: e
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            ppss.remove("good.list", this.listentID);
            this.running = 0;
        }
    }, {
        key: "close",
        value: function close() {
            this.setState({
                publicModal_state: false
            });
        }
    }, {
        key: "open",
        value: function open(value) {
            this.buy_value.id = value.id;
            this.setState({
                publicModal_state: true,
                modal_value: value
            });
        }
    }, {
        key: "get_input_Value",
        value: function get_input_Value(e) {
            this.buy_value.num = e.target.value;
        }
    }, {
        key: "Buy",
        value: function Buy() {
            console.log(this.buy_value);
            this.good.BuyOrSell("buy", this.buy_value.id, this.buy_value.num);
        }
    }, {
        key: "Sell",
        value: function Sell() {
            this.good.BuyOrSell("sell", this.buy_value.id, this.buy_value.num);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "table",
                    { className: "table" },
                    React.createElement(
                        "div",
                        { className: "welcome" },
                        "\u5546\u5E97"
                    ),
                    React.createElement("div", { className: "goodBox" }),
                    React.createElement(
                        "thead",
                        { className: "thead-light" },
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u5546\u54C1\u540D\u79F0"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u539F\u4EA7\u5730"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u5373\u65F6\u8D2D\u4EF7"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u5373\u65F6\u552E\u4EF7"
                            ),
                            React.createElement("th", { scope: "col" })
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.state.good_space.map(function (value, index) {
                            return React.createElement(
                                "tr",
                                { key: "index" },
                                React.createElement(
                                    "td",
                                    null,
                                    value.name
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    " ",
                                    value.place.name,
                                    " "
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    value.buy
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    value.sell
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-secondary", href: "#", onClick: function onClick() {
                                                _this3.handleopenModal(value);
                                            }, role: "button" },
                                        "Click!"
                                    )
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.publicModal_state },
                    React.createElement(
                        Modal_head,
                        { close: this.handlecloseModal },
                        this.state.modal_value.name
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        React.createElement(
                            "h4",
                            null,
                            "\u8FDB\u4EF7:",
                            this.state.modal_value.buy
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "\u4EA7\u5730:",
                            this.state.modal_value.place.name
                        ),
                        React.createElement(
                            "h4",
                            null,
                            "\u5E93\u5B58:",
                            this.warehouse[this.state.modal_value.name]
                        )
                    ),
                    React.createElement(
                        Modal_foot,
                        { close: this.handlecloseModal },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement("input", { className: "form-control", type: "text", onChange: this.handleget_input_Value, placeholder: "\u8D2D\u4E70\u6570\u91CF..." })
                        ),
                        React.createElement(
                            "a",
                            { "class": "btn btn-primary", href: "#", onClick: this.handleBuy, role: "button" },
                            "\u8D2D\u4E70"
                        ),
                        React.createElement(
                            "a",
                            { "class": "btn btn-primary", href: "#", role: "button", onClick: this.handleSell },
                            "\u51FA\u552E"
                        )
                    )
                )
            );
        }
    }]);

    return Table;
}(React.Component);

ReactDOM.render(React.createElement(Table, null), document.getElementById("root"));

ReactDOM.render(React.createElement(Nav, null), document.getElementById("Nav"));