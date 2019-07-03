"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_React$Component) {
    _inherits(Table, _React$Component);

    // 仓库
    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.handleclick = _this.click.bind(_this); //click the table item
        _this.state = {
            warehouse: [],
            modal_state: false,
            classinput: "form-control col-3",
            a: ["白银"],
            teamlist: {
                name: []
            }
        };
        _this.value = {}; // the value to modal
        _this.sellvalue = {}; // the value to ajax
        _this.good = {};
        _this.handleopen = _this.click.bind(_this); //To open modal
        _this.handleclose = _this.close.bind(_this); //To close modal
        _this.handlegetremark = _this.get_remark_value.bind(_this);
        _this.handlegetprice = _this.get_price_value.bind(_this); // To get the price
        _this.handlegetnum = _this.get_num_value.bind(_this); //To get the num
        _this.handlegetselect = _this.get_select_value.bind(_this); //To get the select value
        _this.handlegetcurrency = _this.get_currency.bind(_this);
        _this.handleSell = _this.Sell.bind(_this);
        _this.handleBuy = _this.Buy.bind(_this);
        return _this;
    }

    _createClass(Table, [{
        key: "close",
        value: function close() {
            // close modal
            this.setState({
                modal_state: false
            });
        }
    }, {
        key: "open",
        value: function open() {
            // open modal
            this.setState({
                modal_state: true
            });
        }
    }, {
        key: "click",
        value: function click(e) {
            // open modal and push the value into modal
            this.setState({
                modal_state: true
            });
            this.value = e; // Tell the whole the open item content 
            // console.log(e);
            this.sellvalue.good = e.id;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var listen_warehouse = function listen_warehouse(e) {
                // warehouse content
                _this2.setState({
                    warehouse: e
                });
            };
            this.listen_warehouse = listen_warehouse.bind(this);
            ppss.listent("warehouse", this.listen_warehouse);

            var listen_team = function listen_team(e) {
                // get the team content
                var name = [];
                e.map(function (val, index) {
                    name[index] = val.name;
                });
                name.push("劳动者");
                _this2.setState({
                    teamlist: {
                        teamlist: e,
                        name: name
                    }
                });
            };
            this.listen_team = listen_team.bind(this);
            ppss.listent("team_list_warehouse", this.listen_team);

            var listen = function listen(e) {
                _this2.good = new Good(e);
            };
            listen = listen.bind(this);
            this.listentID = listen;
            ppss.listent("good.list", listen);
            good_ask.list();

            $.ajax({
                // get team value
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/get",
                data: { "type": "list" },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        var responsedata = response.data.info;
                        var response_data = [];
                        for (var i = 0; i < responsedata.length; i++) {
                            response_data.push({ "id": responsedata[i].id, "name": responsedata[i].name });
                        }
                        ppss.publish("team_list_warehouse", response_data);
                    } else if (response.code === 403001) {
                        alert("请登录后再访问");
                        location.href = "https://wisecity.itrclub.com/";
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
            $.ajax({
                // get warehouse value
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/getWarehouse",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        var response_data = response.data;
                        ppss.publish("warehouse", response_data);
                    } else if (response.code == 403001) {
                        alert("请登录后再访问");
                        location.href = "https://wisecity.itrclub.com/";
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });

            var handleList = this.List.bind(this);
            // 获取货币列表
            $.ajax({
                // get currency
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
                        handleList(mover);
                    }
                }
            });
        }
    }, {
        key: "List",
        value: function List(e) {
            // list the currency,the currency type will be it's (index+2) except for 白银 
            var mover;
            mover = this.state.a;
            mover = mover.concat(e);
            this.setState({
                a: mover
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            ppss.remove("warehouse", this.listen_warehouse);
            ppss.remove("team_list_warehouse", this.listen_team);
            ppss.remove("good.list", this.listentID);
        }
    }, {
        key: "get_remark_value",
        value: function get_remark_value(e) {
            this.sellvalue.remark = e.target.value;
        }
    }, {
        key: "get_select_value",
        value: function get_select_value(e) {
            var _t = this;
            this.state.teamlist.teamlist.map(function (val) {
                if (val.name === e) {
                    _t.sellvalue.id = val.id;
                }
            });
        }
    }, {
        key: "get_num_value",
        value: function get_num_value(e) {
            this.sellvalue.num = e.target.value;
        }
    }, {
        key: "get_price_value",
        value: function get_price_value(e) {
            this.sellvalue.price = e.target.value;
        }
    }, {
        key: "get_currency",
        value: function get_currency(e) {
            var id = 0;
            this.state.a.map(function (v, i) {
                if (v === e && e !== "白银") {
                    id = i + 3;
                }
            });
            this.sellvalue.currency = id;
        }
    }, {
        key: "Sell",
        value: function Sell() {
            // console.log(this.sellvalue)
            if (this.sellvalue.id === undefined || this.sellvalue.good === undefined || this.sellvalue.num === undefined) {
                alert("请选择数据");
                return;
            }
            this.sellvalue.price = this.sellvalue.price * this.sellvalue.num;
            Transaction_goods(this.sellvalue.id, this.sellvalue.currency, this.sellvalue.num, this.sellvalue.remark, 0, this.sellvalue.good, this.sellvalue.price);
        }
    }, {
        key: "Buy",
        value: function Buy() {
            // console.log(this.sellvalue)
            if (this.sellvalue.id === undefined || this.sellvalue.good === undefined || this.sellvalue.num === undefined) {
                alert("请选择数据");
                return;
            }
            this.sellvalue.price = this.sellvalue.price * this.sellvalue.num;
            Transaction_goods(this.sellvalue.id, this.sellvalue.currency, this.sellvalue.num, this.sellvalue.remark, 1, this.sellvalue.good, this.sellvalue.price);
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
                    { className: "table", style: { paddingTop: "10px" } },
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
                                "\u5E93\u5B58"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u5373\u65F6\u552E\u4EF7"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u4E70\u5165/\u5356\u51FA"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.state.warehouse.map(function (val, index) {
                            return React.createElement(
                                "tr",
                                { key: index },
                                React.createElement(
                                    "th",
                                    { scope: "row" },
                                    val.goods_name
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    val.num
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    _this3.good.list.map(function (v, i) {
                                        if (v.name == val.goods_name) {
                                            val.price = v.sell;
                                            val.id = v.id;
                                            return v.sell;
                                        }
                                    })
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-secondary", href: "#", role: "button", onClick: function onClick() {
                                                _this3.handleclick(val);
                                            } },
                                        "Click!"
                                    )
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.modal_state },
                    React.createElement(
                        Modal_head,
                        { close: this.handleclose },
                        this.value.goods_name
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        React.createElement(
                            "h4",
                            null,
                            "\u4EF7\u683C:",
                            this.value.price
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "h4",
                            null,
                            "\u5E93\u5B58:",
                            this.value.num
                        ),
                        React.createElement(
                            "div",
                            { className: "row mb-3" },
                            React.createElement(Select, { options: this.state.teamlist.name, get_value: this.handlegetselect }),
                            " "
                        ),
                        React.createElement(
                            "div",
                            { className: "row mb-3" },
                            React.createElement(Select, { options: this.state.a, get_value: this.handlegetcurrency }),
                            " "
                        )
                    ),
                    React.createElement(
                        Modal_foot,
                        { close: this.handleclose },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement("input", { className: "form-control col-3", onChange: this.handlegetnum, type: "text", placeholder: "\u51FA\u552E\u6570\u91CF..." }),
                            React.createElement("input", { className: this.state.classinput, onChange: this.handlegetprice, type: "text", placeholder: "\u51FA\u552E\u5355\u4EF7..." }),
                            React.createElement("input", { className: this.state.classinput, onChange: this.handlegetremark, type: "text", placeholder: "\u5907\u6CE8..." }),
                            React.createElement(
                                "a",
                                { "class": "btn btn-success", href: "#", role: "button", onClick: this.handleBuy },
                                "\u8D2D\u5165"
                            ),
                            React.createElement(
                                "a",
                                { "class": "btn btn-primary", href: "#", role: "button", onClick: this.handleSell },
                                "\u51FA\u552E"
                            )
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