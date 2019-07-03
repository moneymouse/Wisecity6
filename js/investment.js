"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List_Item = function (_React$Component) {
    _inherits(List_Item, _React$Component);

    function List_Item(props) {
        _classCallCheck(this, List_Item);

        var _this = _possibleConstructorReturn(this, (List_Item.__proto__ || Object.getPrototypeOf(List_Item)).call(this, props));

        _this.state = {
            class: "list-group-item list-group-item-action"
        };
        _this.active = false;
        return _this;
    }

    _createClass(List_Item, [{
        key: "Active",
        value: function Active() {
            this.active = true;
            this.setState({
                class: "list-group-item list-group-item-action active"
            });
        }
    }, {
        key: "unActive",
        value: function unActive() {
            this.active = false;
            this.setState({
                class: "list-group-item list-group-item-action"
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.active && !this.active) {
                this.Active();
            }
            if (!this.props.active && this.active) {
                this.unActive();
            }
            return React.createElement(
                "a",
                { href: "#", className: this.state.class, onClick: this.props.onClick },
                this.props.children
            );
        }
    }]);

    return List_Item;
}(React.Component);

var List_Group = function (_React$Component2) {
    _inherits(List_Group, _React$Component2);

    function List_Group(props) {
        _classCallCheck(this, List_Group);

        return _possibleConstructorReturn(this, (List_Group.__proto__ || Object.getPrototypeOf(List_Group)).call(this, props));
    }

    _createClass(List_Group, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "ul",
                { className: "list-group" },
                this.props.children
            );
        }
    }]);

    return List_Group;
}(React.Component);

var Teamtransfer = function (_React$Component3) {
    _inherits(Teamtransfer, _React$Component3);

    function Teamtransfer(props) {
        _classCallCheck(this, Teamtransfer);

        var _this3 = _possibleConstructorReturn(this, (Teamtransfer.__proto__ || Object.getPrototypeOf(Teamtransfer)).call(this, props));

        _this3.state = {
            allClass: "row hidden",
            banks: []
        };
        _this3.showState = false;
        _this3.ajaxData = {};
        _this3.handleGet = _this3.getValue.bind(_this3);
        _this3.handlegetMoney = _this3.getMoney.bind(_this3);
        _this3.handlegetRemark = _this3.getRemark.bind(_this3);
        _this3.handleClick = _this3.Click.bind(_this3);
        return _this3;
    }

    _createClass(Teamtransfer, [{
        key: "hide",
        value: function hide() {
            this.showState = false;
            this.setState({
                allClass: "row hidden"
            });
        }
    }, {
        key: "show",
        value: function show() {
            this.showState = true;
            this.setState({
                allClass: "row"
            });
        }
    }, {
        key: "getValue",
        value: function getValue(e) {
            if (e === "白银") {
                this.ajaxData.moneyType = 0;
            } else {
                for (var i = 3; i <= 4; i++) {
                    if (this.state.banks[i].ticketName === e) {
                        this.ajaxData.moneyType = this.state.banks[i].bankId;
                    }
                }
            }
        }
    }, {
        key: "getMoney",
        value: function getMoney(e) {
            this.ajaxData.num = e.target.value;
        }
    }, {
        key: "getRemark",
        value: function getRemark(e) {
            this.ajaxData.remark = e.target.value;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            var listen = function listen(e) {
                _this4.setState({
                    banks: e
                });
            };
            ppss.listent("bank.list", listen);
            bank_ask.list();
        }
    }, {
        key: "Click",
        value: function Click() {
            var send = {
                "fromOrgType": 1,
                "toOrgType": 2,
                "fromOrgId": team.id,
                "toOrgId": team.groupId,
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
        key: "render",
        value: function render() {
            if (this.props.show && !this.showState) {
                this.show();
            }
            if (!this.props.show && this.showState) {
                this.hide();
            }
            return React.createElement(
                "div",
                { className: this.state.allClass },
                React.createElement(
                    "div",
                    { className: "col-2" },
                    React.createElement(Select, { value: "\u8D27\u5E01\u7C7B\u578B", options: this.props.options, get_value: this.handleGet })
                ),
                React.createElement(
                    "div",
                    { className: "col-4" },
                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handlegetMoney, placeholder: "\u91D1\u989D..." })
                ),
                React.createElement(
                    "div",
                    { className: "col-4" },
                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handlegetRemark, placeholder: "\u5907\u6CE8..." })
                ),
                React.createElement(
                    "div",
                    { className: "col-2" },
                    React.createElement(
                        "a",
                        { onClick: this.handleClick, className: "btn btn-primary", href: "#", role: "button" },
                        "\u8F6C\u8D26"
                    )
                )
            );
        }
    }]);

    return Teamtransfer;
}(React.Component);

var Investment = function (_React$Component4) {
    _inherits(Investment, _React$Component4);

    function Investment(props) {
        _classCallCheck(this, Investment);

        var _this5 = _possibleConstructorReturn(this, (Investment.__proto__ || Object.getPrototypeOf(Investment)).call(this, props));

        _this5.state = {
            banks: [],
            itemActive: [false, false, false, false, false],
            bank_money: "hidden",
            bank_ticket: "hidden",
            teamShow: false
        };
        _this5.preactive; //指向前一active的listItem
        _this5.curactive; //指向当前active的listItem
        _this5.focusItem = {}; //当前被点击的item的详细信息
        _this5.ajaxData = {}; //传给后端的数据
        _this5.handleItemclick = _this5.itemClick.bind(_this5);
        _this5.handleAchange = _this5.aChange.bind(_this5);
        _this5.handleBchange = _this5.bChange.bind(_this5);
        _this5.handleCchange = _this5.cChange.bind(_this5);
        _this5.handleDchange = _this5.dChange.bind(_this5);
        _this5.handleCredit = _this5.Credit.bind(_this5);
        _this5.handleRecredit = _this5.ReCredit.bind(_this5);
        _this5.handleDeposit = _this5.Deposit.bind(_this5);
        _this5.handleWithdrawal = _this5.Withdrawal.bind(_this5);
        _this5.handleExchangeticket = _this5.exchangeTicket.bind(_this5);
        _this5.handleExchangemoney = _this5.exchangeMoney.bind(_this5);
        _this5.handleTypeA = _this5.TypeA.bind(_this5);
        _this5.handleTypeB = _this5.TypeB.bind(_this5);
        _this5.handleCreditTime = _this5.creditTime.bind(_this5);
        _this5.handleRemark = _this5.remarkGet.bind(_this5);
        _this5.handleRechange = _this5.reCreditChange.bind(_this5);
        return _this5;
    }

    _createClass(Investment, [{
        key: "itemClick",
        value: function itemClick(e, index) {
            if (!this.state.itemActive[index]) {
                this.focusItem = e;
                this.ajaxData.id = e.bankId;
                var a = this.state.itemActive; //copy the array of item active state
                this.curactive = index; // to point to to the item which is clicked
                a[this.curactive] = true; // to turn the item which is pointed and is clicked to active
                if (this.preactive !== undefined) {
                    //the pre item is active
                    a[this.preactive] = false; // turn it unactivated
                }
                this.preactive = this.curactive; // to point the pre_item to cur_item
                var teamShow = false;
                if (team.groupId === e.groupId) teamShow = true;
                if (e.bankId <= 3) {
                    this.setState({
                        itemActive: a, // run the change
                        bank_money: "",
                        bank_ticket: "hidden",
                        teamShow: teamShow
                    });
                } else {
                    this.setState({
                        itemActive: a, // run the change
                        bank_money: "hidden",
                        bank_ticket: "",
                        teamShow: teamShow
                    });
                }
            }
        }
    }, {
        key: "aChange",
        value: function aChange(e) {
            this.ajaxData.A_value = e.target.value;
        }
    }, {
        key: "bChange",
        value: function bChange(e) {
            this.ajaxData.B_value = e.target.value;
        }
    }, {
        key: "cChange",
        value: function cChange(e) {
            this.ajaxData.A_value = e.target.value;
        }
    }, {
        key: "dChange",
        value: function dChange(e) {
            this.ajaxData.B_value = e.target.value;
        }
    }, {
        key: "creditTime",
        value: function creditTime(e) {
            this.ajaxData.creditTime = e.target.value;
        }
    }, {
        key: "remarkGet",
        value: function remarkGet(e) {
            this.ajaxData.remark = e.target.value;
        }
    }, {
        key: "reCreditChange",
        value: function reCreditChange(e) {
            this.ajaxData.reCreditNum = e.target.value;
        }
    }, {
        key: "TypeA",
        value: function TypeA(e) {
            switch (e) {
                case "白银":
                    this.ajaxData.typeA = 0;
                    break;

                case this.state.banks[3].ticketName:
                    this.ajaxData.typeA = this.state.banks[3].bankId;
                    break;

                case this.state.banks[4].ticketName:
                    this.ajaxData.typeA = this.state.banks[4].bankId;
                    break;

                default:
                    alert("请选择正确的货币类型！");
                    break;
            }
        }
    }, {
        key: "TypeB",
        value: function TypeB(e) {
            switch (e) {
                case "白银":
                    this.ajaxData.typeB = 0;
                    break;

                case this.state.banks[3].ticketName:
                    this.ajaxData.typeB = this.state.banks[3].bankId;
                    break;

                case this.state.banks[4].ticketName:
                    this.ajaxData.typeB = this.state.banks[4].bankId;
                    break;

                default:
                    alert("请选择正确的货币类型！");
                    break;
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this6 = this;

            var listen = function listen(e) {
                _this6.setState({
                    banks: e
                });
            };
            ppss.listent("bank.list", listen);
            bank_ask.list();
        }
    }, {
        key: "Credit",
        value: function Credit() {
            /* To credit money */
            var time = new Date();
            time = time.getTime();
            time = parseInt(time / 1000);
            this.ajaxData.creditTime = this.ajaxData.creditTime * 60 + time;
            var ajaxData = {
                "groupId": this.focusItem.bankId,
                "moneyType": this.ajaxData.typeB,
                "num": this.ajaxData.B_value,
                "repayNum": this.ajaxData.reCreditNum,
                "repayTime": this.ajaxData.creditTime,
                "remark": this.ajaxData.remark
            };
            // console.log(ajaxData)
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/credit",
                data: ajaxData,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) ppss.publish("success", "您已成功发起借贷申请，交易ID:" + "");else ppss.publish("erro", response.code);
                }
            });
        }
    }, {
        key: "ReCredit",
        value: function ReCredit() {
            alert("还贷请返回首页！");
        }
    }, {
        key: "Deposit",
        value: function Deposit() {
            Bank.Deposit_Money(this.ajaxData.A_value, this.ajaxData.id, this.focusItem.name, this.ajaxData.typeA);
        }
    }, {
        key: "Withdrawal",
        value: function Withdrawal() {
            Bank.Withdrawals_Money(this.ajaxData.A_value, this.ajaxData.id, this.focusItem.name, this.ajaxData.typeA);
        }
    }, {
        key: "exchangeTicket",
        value: function exchangeTicket() {
            Bank.Exchange_Ticket(this.ajaxData.A_value, this.ajaxData.id, this.focusItem.ticketName);
        }
    }, {
        key: "exchangeMoney",
        value: function exchangeMoney() {
            Bank.Exchange_Money(this.ajaxData.B_value, this.ajaxData.id);
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            var tickets = ["白银"];
            for (var i in this.state.banks) {
                if (this.state.banks[i].bankId >= 4) {
                    tickets.push(this.state.banks[i].ticketName);
                }
            }
            return React.createElement(
                React.Fragment,
                null,
                React.createElement("div", { className: "mb-3" }),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { "class": "col" },
                        React.createElement(
                            List_Group,
                            null,
                            this.state.banks.map(function (v, i) {
                                return React.createElement(
                                    List_Item,
                                    { active: _this7.state.itemActive[i], onClick: function onClick() {
                                            _this7.handleItemclick(v, i);
                                        } },
                                    v.name,
                                    "\u5E84"
                                );
                            })
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "col" },
                        React.createElement(
                            "div",
                            { "class": this.state.bank_money },
                            React.createElement(
                                "h3",
                                null,
                                this.focusItem.name,
                                "\u94B1\u5E84"
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u5546\u961F:",
                                team.name
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u5B58\u6B3E:",
                                team.money.map(function (v) {
                                    if (v.bankName === _this7.focusItem.name) {
                                        return React.createElement(
                                            "div",
                                            null,
                                            v.currency,
                                            ":",
                                            v.num
                                        );
                                    }
                                })
                            ),
                            React.createElement(
                                "h4",
                                { className: "mb-3" },
                                "\u8D37\u6B3E:",
                                team.credit.map(function (v) {
                                    if (v.bankName === _this7.focusItem.name) {
                                        return React.createElement(
                                            "div",
                                            null,
                                            v.currency,
                                            ":",
                                            v.num
                                        );
                                    }
                                }),
                                " \u5269\u4F59\u989D\u5EA6:\u767D\u94F6:999999"
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u5B58\u53D6\u6B3E"
                            ),
                            React.createElement(
                                "div",
                                { className: "row mb-3" },
                                React.createElement(
                                    "div",
                                    { className: "col-2" },
                                    React.createElement(Select, { value: "\u8D27\u5E01\u7C7B\u578B", options: tickets, get_value: this.handleTypeA })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleAchange, placeholder: "\u91D1\u989D..." })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-2" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-success", href: "#", role: "button", onClick: this.handleDeposit },
                                        "\u5B58"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-2" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-warning", onClick: this.handleWithdrawal, href: "#", role: "button" },
                                        "\u53D6"
                                    )
                                )
                            ),
                            React.createElement("div", { className: "mb-3" }),
                            React.createElement(
                                "h4",
                                { className: "mb-3" },
                                "\u8D37\u8FD8\u6B3E"
                            ),
                            React.createElement(
                                "div",
                                { className: "row mb-2" },
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement(Select, { value: "\u8D27\u5E01\u7C7B\u578B", options: tickets, get_value: this.handleTypeB })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleBchange, placeholder: "\u8D37\u6B3E\u91D1\u989D..." })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleRechange, placeholder: "\u8FD8\u6B3E\u91D1\u989D..." })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row mb-3" },
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleCreditTime, placeholder: "\u8FD8\u8D37\u65F6\u95F4...\u5206\u949F" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleRemark, placeholder: "\u5907\u6CE8..." })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-2" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-success", onClick: this.handleCredit, href: "#", role: "button" },
                                        "\u501F"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-2" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-warning", onClick: this.handleRecredit, href: "#", role: "button" },
                                        "\u8FD8"
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { "class": this.state.bank_ticket },
                            React.createElement(
                                "h3",
                                null,
                                this.focusItem.name,
                                "\u7968\u5E84"
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u5546\u961F:",
                                team.name
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u6301\u6709\u7968\u6570:",
                                team.money[1].moneyType === this.focusItem.bankId ? team.money[1].num : team.money[2].num
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "\u6C47\u7387:",
                                this.focusItem.rate
                            ),
                            React.createElement(
                                "div",
                                { className: "row mb-3" },
                                React.createElement(
                                    "div",
                                    { className: "col-9" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleCchange, placeholder: "\u6570\u989D..." })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-3" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-primary", onClick: this.handleExchangeticket, href: "#", role: "button" },
                                        "\u5151\u7968"
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row mb-3" },
                                React.createElement(
                                    "div",
                                    { className: "col-9" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleDchange, placeholder: "\u6570\u989D..." })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-3" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-success", onClick: this.handleExchangemoney, href: "#", role: "button" },
                                        "\u5151\u94B1"
                                    )
                                )
                            ),
                            React.createElement("div", { className: "mb-3" }),
                            React.createElement(
                                "h4",
                                { className: "mb-3" },
                                "\u8D37\u8FD8\u6B3E"
                            ),
                            React.createElement(
                                "div",
                                { className: "row mb-2" },
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement(Select, { value: "\u8D27\u5E01\u7C7B\u578B", options: tickets, get_value: this.handleTypeB })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleBchange, placeholder: "\u8D37\u6B3E\u91D1\u989D..." })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleRechange, placeholder: "\u8FD8\u6B3E\u91D1\u989D..." })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row mb-3" },
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleCreditTime, placeholder: "\u8FD8\u8D37\u65F6\u95F4...\u5206\u949F" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-4" },
                                    React.createElement("input", { className: "form-control", type: "text", onChange: this.handleRemark, placeholder: "\u5907\u6CE8..." })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-2" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-success", onClick: this.handleCredit, href: "#", role: "button" },
                                        "\u501F"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-2" },
                                    React.createElement(
                                        "a",
                                        { "class": "btn btn-warning", onClick: this.handleRecredit, href: "#", role: "button" },
                                        "\u8FD8"
                                    )
                                )
                            )
                        ),
                        React.createElement(Teamtransfer, { show: this.state.teamShow, options: tickets })
                    )
                )
            );
        }
    }]);

    return Investment;
}(React.Component);

ReactDOM.render(React.createElement(Investment, null), document.getElementById("root"));
ReactDOM.render(React.createElement(Nav, null), document.getElementById("Nav"));