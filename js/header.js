"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Groupdata = function (_React$Component) {
    _inherits(Groupdata, _React$Component);

    function Groupdata(props) {
        _classCallCheck(this, Groupdata);

        var _this2 = _possibleConstructorReturn(this, (Groupdata.__proto__ || Object.getPrototypeOf(Groupdata)).call(this, props));

        _this2.state = {
            publishTicketNum: "",
            moneyDopsit: ""
        };
        return _this2;
    }

    _createClass(Groupdata, [{
        key: "render",
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                this.props.groupAsset.map(function (v) {
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            "div",
                            { className: "asset-each inline" },
                            React.createElement(
                                "div",
                                { style: { "color": "#856B53" } },
                                React.createElement(
                                    "b",
                                    null,
                                    v.num
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "div",
                                null,
                                v.currency
                            )
                        ),
                        React.createElement("div", { className: "line-index-asset inline" })
                    );
                })
            );
        }
    }]);

    return Groupdata;
}(React.Component);

var SureExchange = function (_React$Component2) {
    _inherits(SureExchange, _React$Component2);

    function SureExchange(props) {
        _classCallCheck(this, SureExchange);

        var _this3 = _possibleConstructorReturn(this, (SureExchange.__proto__ || Object.getPrototypeOf(SureExchange)).call(this, props));

        _this3.state = {
            willConfirm: []
        };
        _this3.handleClick = _this3.Click.bind(_this3);
        return _this3;
    }

    _createClass(SureExchange, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            var _success = function _success(e) {
                _this4.setState({
                    willConfirm: e
                });
            };
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/bank/getCreditOrder",
                data: {
                    "type": "ticketConfirm",
                    "value": this.props.groupId
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        _success(response.data.list);
                    } else if (response.code === 404) {
                        return;
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "Click",
        value: function Click(e) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/ticket/exchangeToMoneyConfirm",
                data: {
                    orderId: e
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        ppss.publish("success", "成功！");
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return React.createElement(
                T_table,
                null,
                React.createElement(
                    "thead",
                    { "class": "bg-brown" },
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u4EA4\u6613ID"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u53D1\u8D77\u961F\u4F0D"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u6570\u989D"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u5904\u7406"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.willConfirm.map(function (v) {
                        return React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                v.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                v.teamName
                            ),
                            React.createElement(
                                "td",
                                null,
                                v.num
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement(
                                    "a",
                                    { onClick: function onClick(e) {
                                            _this5.handleClick(v.id);
                                        }, "class": "btn btn-success", href: "#", role: "button" },
                                    "\u540C\u610F"
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return SureExchange;
}(React.Component);

var Response = function (_React$Component3) {
    _inherits(Response, _React$Component3);

    function Response(props) {
        _classCallCheck(this, Response);

        var _this6 = _possibleConstructorReturn(this, (Response.__proto__ || Object.getPrototypeOf(Response)).call(this, props));

        _this6.state = {
            credit: []
        };
        return _this6;
    }

    _createClass(Response, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this7 = this;

            var listent = function listent(e) {
                for (var i in e) {
                    var date = new Date(Number(e[i].extra_param.repayTime) * 1000);
                    e[i].extra_param.repayTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                }
                _this7.setState({
                    credit: e
                });
            };
            this.listent = listent.bind(this);
            ppss.listent("log.lonate", this.listent);
            getLog("lonate", 4);
            this.running = function () {
                getLog("lonate", 4); //调用函数轮询获取待交易记录
                var time = Math.random() * 10000 + Math.random() * 10000 + Math.random() * 1000;
                var running = _this7.running;
                setTimeout(function () {
                    running();
                }, time);
            };
        }
    }, {
        key: "render",
        value: function render() {
            var status = ["已还", "未还", "申请延期", "申请贷款"];
            var _t = this;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    T_table,
                    null,
                    React.createElement(
                        "thead",
                        { className: "bg-brown" },
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u4EA4\u6613\u53F7"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u53D1\u8D77\u961F\u4F0D"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u91D1\u989D"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u72B6\u6001"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.state.credit.map(function (v, i) {
                            return React.createElement(
                                "tr",
                                { key: i },
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement(
                                        "a",
                                        { onClick: function onClick() {
                                                _t.props.onClick(v);
                                            } },
                                        v.id
                                    )
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    v.teamName
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    v.currency,
                                    ":",
                                    v.num
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    status[v.status]
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Response;
}(React.Component);

var Transfer = function (_React$Component4) {
    _inherits(Transfer, _React$Component4);

    function Transfer(props) {
        _classCallCheck(this, Transfer);

        var _this8 = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

        _this8.state = {
            teamList: [],
            currencyList: ["白银"]
        };
        _this8.team = []; //the Object of teamName and teamId
        _this8.ajaxData = {};
        _this8.currency = []; //the Object of currencyName and currencyId;
        _this8.handleTeamFocus = _this8.getTeam.bind(_this8);
        _this8.handleCurrencyFocus = _this8.getType.bind(_this8);
        _this8.handleClick = _this8.Click.bind(_this8);
        _this8.handleMoneyNum = _this8.getMoney.bind(_this8);
        _this8.handleGetRemark = _this8.getRemark.bind(_this8);
        return _this8;
    }

    _createClass(Transfer, [{
        key: "getMoney",
        value: function getMoney(e) {
            // console.log(e.target.value);
            this.ajaxData.num = e.target.value;
        }
    }, {
        key: "getRemark",
        value: function getRemark(e) {
            this.ajaxData.remark = e.target.value;
        }
    }, {
        key: "getTeam",
        value: function getTeam(e) {
            var _t = this;
            this.team.map(function (v) {
                if (v.name === e) {
                    // console.log(v.id);
                    _t.ajaxData.teamId = v.id;
                }
            });
        }
    }, {
        key: "getType",
        value: function getType(e) {
            if (e === "白银") {
                this.ajaxData.moneyType = 0;
            } else {
                for (var i = 0; i < this.currency.length; i++) {
                    if (this.currency[i].currencyName === e) {
                        this.ajaxData.moneyType = this.currency[i].currencyId;
                    }
                }
            }
        }
    }, {
        key: "Click",
        value: function Click() {
            if (this.ajaxData.moneyType === undefined || this.ajaxData.num === undefined || this.ajaxData.remark === undefined) {
                alert("请选择数据后再点击！");
                return;
            }
            var send = {
                "fromOrgType": 2,
                "toOrgType": 1,
                "fromOrgId": this.props.groupId,
                "toOrgId": this.ajaxData.teamId,
                "moneyType": this.ajaxData.moneyType,
                "num": this.ajaxData.num,
                "remark": this.ajaxData.remark
                // console.log(send);
            };$.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/group/transfer",
                data: send,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        alert("转账成功");
                    } else if (response.code === 403001) {
                        alert("请先登录再访问");
                        location.href = "https://wisecity.itrclub.com/user/login";
                    } else {
                        alert("请寻找管理员,错误代码" + response.code);
                    }
                }
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this9 = this;

            var listen = function listen(e) {
                var list = _this9.state.currencyList;
                console.log(e);
                for (var i = 0; i < e.length; i++) {
                    if (e[i].bankId >= 4) {
                        list.push(e[i].ticketName);
                        var curren = { name: e[i].ticketName, id: e[i].bankId };
                        _this9.currency.push(curren);
                    }
                }
                _this9.setState({
                    currencyList: list
                });
            };
            ppss.listent("bank.list", listen);
            bank_ask.list();

            var asuccess = function asuccess(e) {
                var list = [];
                var listb = [];
                for (var i in e) {
                    var o = {
                        name: e[i].name,
                        id: e[i].id
                    };
                    list.push(o);
                    listb.push(e[i].name);
                }
                console.log(listb);
                _this9.team = list;
                _this9.setState({
                    teamList: listb
                });
            };
            asuccess = asuccess.bind(this);
            var data = {
                type: "groupId",
                value: this.props.groupId
            };
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/get",
                data: data,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        asuccess(response.data.info);
                    } else alert("请寻找管理员协助，错误码：" + response.code);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "border-brown" },
                React.createElement(
                    "div",
                    { className: "row mb-3" },
                    React.createElement(
                        "div",
                        { className: "col-4" },
                        React.createElement(Select, { value: "\u76EE\u6807\u961F\u4F0D...", options: this.state.teamList, get_value: this.handleTeamFocus })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-4" },
                        React.createElement(Select, { value: "\u8D27\u5E01\u7C7B\u578B...", options: this.state.currencyList, get_value: this.handleCurrencyFocus })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "row mb-3" },
                    React.createElement(
                        "div",
                        { className: "col-4" },
                        React.createElement("input", { className: "form-control", type: "text", onChange: this.handleMoneyNum, placeholder: "\u91D1\u989D...." })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-4" },
                        React.createElement("input", { className: "form-control", type: "text", onChange: this.handleGetRemark, placeholder: "\u5907\u6CE8...." })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-3" },
                        React.createElement(
                            "a",
                            { className: "btn bg-brown", role: "button", onClick: this.handleClick },
                            "\u8F6C\u8D26"
                        )
                    )
                )
            );
        }
    }]);

    return Transfer;
}(React.Component);

var Issue = function (_React$Component5) {
    _inherits(Issue, _React$Component5);

    function Issue(props) {
        _classCallCheck(this, Issue);

        var _this10 = _possibleConstructorReturn(this, (Issue.__proto__ || Object.getPrototypeOf(Issue)).call(this, props));

        _this10.handlegetNum = _this10.getNum.bind(_this10);
        _this10.handleClick = _this10.click.bind(_this10);
        _this10.ajaxData = {};
        return _this10;
    }

    _createClass(Issue, [{
        key: "getNum",
        value: function getNum(e) {
            this.ajaxData.num = e.target.value;
        }
    }, {
        key: "click",
        value: function click() {
            if (this.ajaxData.num === undefined) {
                alert("请输入发行数量！");
                return;
            }
            var data = {
                "num": this.ajaxData.num
            };
            console.log(data);
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/ticket/issue",
                data: data,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        alert("票号发行成功！");
                    } else {
                        alert("请寻找管理员，错误码：" + response.code);
                        console.log(response.message);
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { className: "row mb-3 border-brown" },
                    React.createElement(
                        "h5",
                        { className: "col-3" },
                        "\u53D1\u884C\u7968\u53F7:"
                    ),
                    React.createElement(
                        "div",
                        { className: "col-5" },
                        React.createElement("input", { className: "form-control", type: "text", onChange: this.handlegetNum, placeholder: "\u6570\u91CF...." })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-3" },
                        React.createElement(
                            "a",
                            { className: "btn bg-brown", onClick: this.handleClick, role: "button" },
                            "\u53D1\u884C"
                        )
                    )
                )
            );
        }
    }]);

    return Issue;
}(React.Component);

var Deposit = function (_React$Component6) {
    _inherits(Deposit, _React$Component6);

    function Deposit(props) {
        _classCallCheck(this, Deposit);

        var _this11 = _possibleConstructorReturn(this, (Deposit.__proto__ || Object.getPrototypeOf(Deposit)).call(this, props));

        _this11.state = {
            team: [{
                name: "",
                asset: {},
                all: {}
            }]
        };
        return _this11;
    }

    _createClass(Deposit, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var data = {
                "bankId": this.props.groupId
            };
            var l = [];
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/bank/money/getLog",
                data: data,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        var list = response.data.list;
                        for (var i in list) {
                            var o = {
                                name: list[i].name,
                                asset: {
                                    currency: list[i].currency,
                                    num: list[i].num
                                },
                                all: list[i]
                            };
                            l.push(o);
                        }
                    } else {
                        alert("请寻找管理员协助，错误码：" + response.code);
                    }
                }
            });
            this.setState({
                team: l
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _t = this;
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    T_table,
                    null,
                    React.createElement(
                        "thead",
                        { className: "bg-brown" },
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u4EA4\u6613\u5355\u53F7"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u961F\u4F0D\u540D"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u5B58\u5165\u8D44\u91D1\u989D"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.state.team.map(function (v, i) {
                            React.createElement(
                                "tr",
                                { key: i },
                                React.createElement(
                                    "td",
                                    null,
                                    v.all.id
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    v.name
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    v.asset.currency,
                                    ":",
                                    v.asset.num
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Deposit;
}(React.Component);

// props: type : the type of bank -- value("money":"ticket")
//        groupName


var Nav = function (_React$Component7) {
    _inherits(Nav, _React$Component7);

    function Nav(props) {
        _classCallCheck(this, Nav);

        return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));
    }

    _createClass(Nav, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "Nav" },
                React.createElement(
                    "div",
                    { "class": "nav-logo" },
                    React.createElement("img", { src: "https://wisecity.itrclub.com/resource/img/Nav_logo.png", alt: "WISECITY" })
                ),
                React.createElement(
                    "div",
                    { "class": "float-right" },
                    React.createElement(
                        "div",
                        { "class": "inline-nav box-left font-nav" },
                        "\u5546\u5E2E\u540D\u79F0\uFF1A",
                        this.props.groupName
                    ),
                    React.createElement(
                        "div",
                        { "class": "inline-nav font-nav" },
                        "\u5546\u5E2E\u4EA7\u4E1A\uFF1A",
                        this.props.type === "money" ? "钱庄" : "票庄"
                    ),
                    React.createElement("div", { "class": "inline-nav font-nav line box-center" }),
                    React.createElement(
                        "div",
                        { "class": "inline-nav box-right font-nav" },
                        React.createElement(
                            "a",
                            { href: "https://wisecity.itrclub.com/user/logout" },
                            "\u9000\u51FA\u767B\u5F55"
                        )
                    )
                )
            );
        }
    }]);

    return Nav;
}(React.Component);

var Content = function (_React$Component8) {
    _inherits(Content, _React$Component8);

    function Content(props) {
        _classCallCheck(this, Content);

        var _this13 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this13.state = {
            isOpenDeposit: false,
            isOpenResponse: false
        };
        _this13.modalValueD = {};
        _this13.modalValueR = {};
        _this13.handleOpenDeposit = _this13.openDeposit.bind(_this13);
        _this13.handleCloseDeposit = _this13.closeDeposit.bind(_this13);
        _this13.handleOpenResponse = _this13.openResponse.bind(_this13);
        _this13.handleCloseResponse = _this13.closeResponse.bind(_this13);
        _this13.sureCredit = _this13.sureCredit.bind(_this13);
        return _this13;
    }

    _createClass(Content, [{
        key: "sureCredit",
        value: function sureCredit(e) {
            var _this = this;
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/creditExamine",
                data: {
                    "id": _this.modalValueR.id,
                    "status": e
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        ppss.publish("success", "成功！");
                    } else if (response.code === 1) {
                        ppss.publish("erro.detail", "请确认商帮资产后再尝试...");
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "openDeposit",
        value: function openDeposit(e) {
            this.modalValueD = e;
            this.setState({
                isOpenDeposit: true
            });
        }
    }, {
        key: "closeDeposit",
        value: function closeDeposit() {
            this.setState({
                isOpenDeposit: false
            });
        }
    }, {
        key: "openResponse",
        value: function openResponse(e) {
            this.modalValueR = e;
            this.setState({
                isOpenResponse: true
            });
        }
    }, {
        key: "closeResponse",
        value: function closeResponse() {
            this.setState({
                isOpenResponse: false
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "render",
        value: function render() {
            var _this14 = this;

            var status = ["已还", "未还", "申请延期", "申请贷款"];
            if (this.props.type === "money") {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Nav, { type: "money", groupName: this.props.group.name }),
                    React.createElement(
                        "div",
                        { className: "welcome" },
                        React.createElement(
                            "b",
                            null,
                            "\u5546\u5E2E\u8D44\u4EA7"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "top-asset" },
                        React.createElement(Groupdata, { type: "money", groupAsset: this.props.group.treasury, groupWork: this.props.group.bankName, groupId: this.props.group.id })
                    ),
                    React.createElement(Response, { onClick: this.handleOpenResponse }),
                    React.createElement(Transfer, { groupId: this.props.group.id }),
                    React.createElement(Deposit, { onClick: this.handleOpenDeposit, groupId: this.props.group.id }),
                    React.createElement(
                        Modal,
                        { isOpen: this.state.isOpenResponse },
                        React.createElement(
                            Modal_head,
                            { close: this.handleCloseResponse },
                            "\u501F\u8D37\u4E1A\u52A1\u8BE6\u60C5"
                        ),
                        React.createElement(
                            Modal_body,
                            null,
                            "\u4EA4\u6613ID:",
                            this.modalValueR.id,
                            React.createElement("br", null),
                            "\u53D1\u8D77\u961F\u4F0D:",
                            this.modalValueR.teamName,
                            React.createElement("br", null),
                            "\u91D1\u989D:",
                            this.modalValueR.currency,
                            ":",
                            this.modalValueR.num,
                            React.createElement("br", null),
                            "\u8FD8\u6B3E\u91D1\u989D:",
                            this.modalValueR.extra_param !== undefined ? this.modalValueR.extra_param.repayNum : undefined,
                            React.createElement("br", null),
                            "\u8FD8\u6B3E\u65F6\u95F4:",
                            this.modalValueR.extra_param !== undefined ? this.modalValueR.extra_param.repayTime : undefined,
                            React.createElement("br", null),
                            "\u5907\u6CE8:",
                            this.modalValueR.remark,
                            React.createElement("br", null),
                            "\u72B6\u6001:",
                            status[this.modalValueR.status]
                        ),
                        React.createElement(
                            Modal_foot,
                            { close: this.handleCloseResponse },
                            React.createElement(
                                "a",
                                { "class": "btn btn-success", onClick: function onClick() {
                                        return _this14.sureCredit(1);
                                    }, role: "button" },
                                "\u540C\u610F"
                            ),
                            React.createElement(
                                "a",
                                { "class": "btn btn-danger", onClick: function onClick() {
                                        return _this14.sureCredit(-1);
                                    }, role: "button" },
                                "\u62D2\u7EDD"
                            )
                        )
                    )
                );
            } else {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Nav, { type: "ticket", groupName: this.props.group.name }),
                    React.createElement(
                        "div",
                        { className: "welcome" },
                        React.createElement(
                            "b",
                            null,
                            "\u5546\u5E2E\u8D44\u4EA7"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "top-asset" },
                        React.createElement(Groupdata, { type: "money", groupAsset: this.props.group.treasury, groupWork: this.props.group.bankName, groupId: this.props.group.id })
                    ),
                    React.createElement(
                        "h5",
                        null,
                        "\u501F\u8D37\u7533\u8BF7:"
                    ),
                    React.createElement(Response, { onClick: this.handleOpenResponse }),
                    React.createElement(Transfer, { groupId: this.props.group.id }),
                    React.createElement(Issue, null),
                    React.createElement(
                        "h5",
                        null,
                        "\u5151\u73B0\u7533\u8BF7:"
                    ),
                    React.createElement(SureExchange, { groupId: this.props.group.id }),
                    React.createElement(
                        Modal,
                        { isOpen: this.state.isOpenResponse },
                        React.createElement(
                            Modal_head,
                            { close: this.handleCloseResponse },
                            "\u501F\u8D37\u4E1A\u52A1\u8BE6\u60C5"
                        ),
                        React.createElement(
                            Modal_body,
                            null,
                            "\u4EA4\u6613ID:",
                            this.modalValueR.id,
                            React.createElement("br", null),
                            "\u53D1\u8D77\u961F\u4F0D:",
                            this.modalValueR.teamName,
                            React.createElement("br", null),
                            "\u91D1\u989D:",
                            this.modalValueR.currency,
                            ":",
                            this.modalValueR.num,
                            React.createElement("br", null),
                            "\u8FD8\u6B3E\u91D1\u989D:",
                            this.modalValueR.extra_param !== undefined ? this.modalValueR.extra_param.repayNum : undefined,
                            React.createElement("br", null),
                            "\u8FD8\u6B3E\u65F6\u95F4:",
                            this.modalValueR.extra_param !== undefined ? this.modalValueR.extra_param.repayTime : undefined,
                            React.createElement("br", null),
                            "\u5907\u6CE8:",
                            this.modalValueR.remark,
                            React.createElement("br", null),
                            "\u72B6\u6001:",
                            status[this.modalValueR.status]
                        ),
                        React.createElement(
                            Modal_foot,
                            { close: this.handleCloseResponse },
                            React.createElement(
                                "a",
                                { "class": "btn btn-success", onClick: function onClick() {
                                        return _this14.sureCredit(1);
                                    }, role: "button" },
                                "\u540C\u610F"
                            ),
                            React.createElement(
                                "a",
                                { "class": "btn btn-danger", onClick: function onClick() {
                                        return _this14.sureCredit(-1);
                                    }, role: "button" },
                                "\u62D2\u7EDD"
                            )
                        )
                    )
                );
            }
        }
    }]);

    return Content;
}(React.Component);

$.ajax({
    type: "GET",
    url: "https://wisecity.itrclub.com/api/user/getGroupId",
    dataType: "JSON",
    success: function success(response) {
        if (response.code === 200) {
            var type;
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/group/get",
                data: {
                    type: "id",
                    value: response.data.id
                },
                dataType: "JSON",
                success: function success(data) {
                    if (data.code === 200) {
                        console.log(data.data.info[0]);
                        if (data.data.info[0].bankId >= 4) {
                            type = "ticket";
                        } else if (data.data.info[0].bankId >= 1 && data.data.info[0].bankId < 4) {
                            type = "money";
                        } else {
                            alert("请切换身份！");
                            location.href = "https://wisecity.itrclub.com/user/login";
                        }
                        ReactDOM.render(React.createElement(Content, { type: type, group: data.data.info[0] }), document.getElementById("root"));
                    }
                }
            });
        } else if (data.code === 403001) {
            alert("请登录后再访问!");
            location.href = "https://wisecity.itrclub.com/user/login";
        } else {
            ppss.publish("erro", data.code);
        }
    }
});