"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Good_Edit = function (_React$Component) {
    _inherits(Good_Edit, _React$Component);

    function Good_Edit(props) {
        _classCallCheck(this, Good_Edit);

        var _this = _possibleConstructorReturn(this, (Good_Edit.__proto__ || Object.getPrototypeOf(Good_Edit)).call(this, props));

        _this.state = {
            goods: [],
            groups: [],
            focusName: "a"
        };
        _this.ajaxData = {};
        _this.handleGetValue = _this.getValue.bind(_this);
        _this.group = {};
        _this.goods = {
            a: {}
        };
        _this.handleClick = _this.Click.bind(_this);
        return _this;
    }

    _createClass(Good_Edit, [{
        key: "getValue",
        value: function getValue(type, e) {
            if (type === "name" || type === "groupName") {
                this.ajaxData[type] = e;
            } else this.ajaxData[type] = e.target.value;
        }
    }, {
        key: "Click",
        value: function Click() {
            console.log(this.group);
            var data = {
                "name": this.ajaxData["name"],
                "groupId": this.group[this.ajaxData["groupName"]],
                "kb": this.ajaxData["kb"],
                "ks": this.ajaxData["ks"],
                "B": this.ajaxData["B"],
                "S": this.ajaxData["S"],
                "NB": this.ajaxData["NB"],
                "NS": this.ajaxData["NS"]
                // console.log(data)
            };$.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/goods/edit",
                data: data,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        alert("修改成功");
                    } else alert("请联系管理员，错误码:" + response.code);
                }
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var asuccess = function asuccess(e) {
                _this2.group = e;
                var groups = [];
                for (var i in e) {
                    groups.push(i);
                }
                _this2.setState({
                    groups: groups
                });
            };

            var bsuccess = function bsuccess(e) {
                var goods = {};
                for (var i in e) {
                    _this2.goods[e[i].goodsName] = e[i];
                    if (goods[e[i].groupName] === undefined) {
                        goods[e[i].groupName] = [e[i].goodsName];
                    } else {
                        goods[e[i].groupName].push(e[i].goodsName);
                    }
                }
                _this2.setState({
                    goods: goods
                });
            };
            asuccess = asuccess.bind(this);
            bsuccess = bsuccess.bind(this);
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/group/getList",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        asuccess(response.data);
                    } else {
                        alert("请联系管理员，错误码:" + response.code);
                    }
                }
            });
            ppss.listent("good.list", bsuccess);
            good_ask.list("list");
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var goodFocus = this.goods[this.state.focusName];
            console.log(goodFocus);
            return React.createElement(
                "div",
                null,
                "\u5546\u54C1\u540D\u79F0:",
                React.createElement(Select, { get_value: function get_value(e) {
                        return _this3.handleGetValue("name", e);
                    }, value: "\u4EA7\u54C1\u540D\u79F0\uFF08\u5FC5\u9009\uFF09", options: this.state.goods[this.props.groupName === "京商" ? "all" : this.props.grouopName] || [] }),
                "\u5546\u54C1\u4EA7\u5730:",
                React.createElement(Select, { get_value: function get_value(e) {
                        return _this3.handleGetValue("groupName", e);
                    }, value: this.props.groupName || "所属商帮（必选）", options: this.state.groups }),
                "\u8D2D\u4EF7\u7CFB\u6570:",
                React.createElement("input", { className: "form-control non-border", onChange: function onChange(e) {
                        return _this3.handleGetValue("kb", e);
                    }, placeholder: goodFocus.kb || "购价系数" }),
                "\u552E\u4EF7\u7CFB\u6570:",
                React.createElement("input", { className: "form-control non-border", onChange: function onChange(e) {
                        return _this3.handleGetValue("ks", e);
                    }, placeholder: goodFocus.ks || "售价系数" }),
                "\u8D2D\u4EF7:",
                React.createElement("input", { className: "form-control non-border", onChange: function onChange(e) {
                        return _this3.handleGetValue("B", e);
                    }, placeholder: goodFocus.B || "购价" }),
                "\u552E\u4EF7:",
                React.createElement("input", { className: "form-control non-border", onChange: function onChange(e) {
                        return _this3.handleGetValue("S", e);
                    }, placeholder: goodFocus.S || "售价" }),
                "\u6536\u8D2D\u603B\u91CF:",
                React.createElement("input", { className: "form-control non-border", onChange: function onChange(e) {
                        return _this3.handleGetValue("NB", e);
                    }, placeholder: goodFocus.NB || "总供给量" }),
                "\u9500\u552E\u603B\u91CF:",
                React.createElement("input", { className: "form-control non-border", onChange: function onChange(e) {
                        return _this3.handleGetValue("NS", e);
                    }, placeholder: goodFocus.NS || "总销售量" }),
                React.createElement("div", { className: "mb-2" }),
                React.createElement(
                    "a",
                    { "class": "btn btn-primary", href: "#", onClick: this.handleClick, role: "button" },
                    "\u4FEE\u6539"
                )
            );
        }
    }]);

    return Good_Edit;
}(React.Component);

var TeamRank = function (_React$Component2) {
    _inherits(TeamRank, _React$Component2);

    function TeamRank(props) {
        _classCallCheck(this, TeamRank);

        var _this4 = _possibleConstructorReturn(this, (TeamRank.__proto__ || Object.getPrototypeOf(TeamRank)).call(this, props));

        _this4.state = {
            isOpen: false,
            teams: [],
            teamChooseMoney: {}
        };
        _this4.modalValue = {
            money: []
        };
        _this4.ajaxData = {};
        _this4.handleOpen = _this4.Open.bind(_this4);
        _this4.handleClose = _this4.Close.bind(_this4);
        _this4.handleClick = _this4.click.bind(_this4);
        _this4.handleChangeAsset = _this4.changeAsset.bind(_this4);
        return _this4;
    }

    _createClass(TeamRank, [{
        key: "click",
        value: function click() {
            for (var i in this.ajaxData) {
                var data = {
                    "teamId": this.modalValue.id,
                    "moneyType": this.ajaxData[i].type,
                    "num": this.ajaxData[i].num
                };
                $.ajax({
                    type: "POST",
                    url: "https://wisecity.itrclub.com/api/admin/editMoney",
                    data: data,
                    dataType: "JSON",
                    success: function success(response) {
                        if (response.code === 200) {
                            alert("修改成功！");
                        } else if (response.code === 403003) {
                            alert("抱歉，你没有执行此操作的权限");
                        } else alert("修改失败，请联系管理员，错误码：" + response.code);
                    }
                });
            }
        }
    }, {
        key: "Open",
        value: function Open(e) {
            this.modalValue = e;
            this.setState({
                isOpen: true
            });
        }
    }, {
        key: "Close",
        value: function Close() {
            this.setState({
                isOpen: false
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            var asuccess = function asuccess(e) {
                console.log(e);
                var arr = [];
                for (var i in e) {
                    var o = {};
                    o = e[i];
                    o.money = o.treasury;
                    var allData = 0.00;
                    for (var i = 0; i < 1; i++) {
                        allData = Number(allData) + Number(o.money[i].num);
                    }
                    o.allData = allData;
                    arr.push(o);
                }

                _this5.setState({
                    teams: arr
                });
            };
            asuccess = asuccess.bind(this);
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/get",
                data: {
                    type: "list"
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        asuccess(response.data.info);
                    } else {
                        alert("请联系管理员，错误码:" + response.code);
                    }
                }
            });
        }
    }, {
        key: "changeAsset",
        value: function changeAsset(e, i) {
            this.ajaxData[i] = {
                "num": e.target.value,
                "type": i
            };
            var a = this.state.teamChooseMoney;
            a[i] = e.target.value;
            this.setState({
                teamChooseMoney: a
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    T_table,
                    null,
                    React.createElement(
                        "thead",
                        { className: "thead-light" },
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u961F\u4F0D\u540D\u79F0"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u767D\u94F6\u603B\u989D"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u6240\u5C5E\u5546\u5E2E"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.state.teams.map(function (v, i) {
                            return React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    null,
                                    React.createElement(
                                        "a",
                                        { onClick: function onClick() {
                                                return _this6.handleOpen(v);
                                            } },
                                        v.name
                                    )
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    v.allData
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    v.geoupName
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.isOpen },
                    React.createElement(
                        Modal_head,
                        { close: this.handleClose },
                        this.modalValue.name
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        "\u961F\u4F0D:",
                        this.modalValue.name,
                        React.createElement("br", null),
                        "\u6240\u5C5E\u5546\u5E2E:",
                        this.modalValue.geoupName,
                        React.createElement("br", null),
                        React.createElement(
                            "div",
                            { className: "row" },
                            this.modalValue.money.map(function (v, i) {
                                if (i > 2) {
                                    return;
                                }
                                return React.createElement(
                                    React.Fragment,
                                    null,
                                    React.createElement(
                                        "div",
                                        { className: "col-3" },
                                        v.currency,
                                        ":"
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-9" },
                                        React.createElement("input", { className: "form-control mb-3", value: _this6.state.teamChooseMoney[v.moneyType] || v.num, onChange: function onChange(e) {
                                                return _this6.handleChangeAsset(e, v.moneyType);
                                            } })
                                    )
                                );
                            })
                        )
                    ),
                    React.createElement(
                        Modal_foot,
                        { close: this.handleClose },
                        React.createElement(
                            "a",
                            { role: "button", className: "btn btn-primary", onClick: this.handleClick },
                            "\u786E\u8BA4\u4FEE\u6539"
                        ),
                        React.createElement(
                            "a",
                            { role: "button", className: "btn btn-primary", onClick: function onClick(e) {
                                    return _this6.props.onClick(_this6.modalValue.id, _this6.handleClose, _this6.modalValue.name);
                                } },
                            "\u4FEE\u6539\u4ED3\u5E93"
                        )
                    )
                )
            );
        }
    }]);

    return TeamRank;
}(React.Component);

var TransactionLog = function (_React$Component3) {
    _inherits(TransactionLog, _React$Component3);

    function TransactionLog(props) {
        _classCallCheck(this, TransactionLog);

        var _this7 = _possibleConstructorReturn(this, (TransactionLog.__proto__ || Object.getPrototypeOf(TransactionLog)).call(this, props));

        _this7.state = {
            transactionlog: []
        };
        return _this7;
    }

    _createClass(TransactionLog, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this8 = this;

            var success = function success(e) {
                var arr = [];
                for (var i in e) {
                    arr.push(e[i]);
                }
                _this8.setState({
                    transactionlog: arr
                });
            };
            success = success.bind(this);
            ppss.listent("log.transcation", success);
            getLog("transcation");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                T_table,
                null,
                React.createElement(
                    "thead",
                    { className: "thead-light" },
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
                            "\u53D1\u8D77\u65B9"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u63A5\u53D7\u65B9"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u5546\u54C1\u540D\u79F0"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u5546\u54C1\u6570\u91CF"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u91D1\u989D"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u5907\u6CE8"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.transactionlog.map(function (value, index) {
                        return React.createElement(
                            "tr",
                            { key: index },
                            React.createElement(
                                "td",
                                null,
                                value.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                " ",
                                value.fromTeamName,
                                " "
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.toTeamName
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.goods_name
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.num
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.currency,
                                ":",
                                value.money || value.num
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.remark
                            )
                        );
                    })
                )
            );
        }
    }]);

    return TransactionLog;
}(React.Component);

var TransferLog = function (_React$Component4) {
    _inherits(TransferLog, _React$Component4);

    function TransferLog(props) {
        _classCallCheck(this, TransferLog);

        var _this9 = _possibleConstructorReturn(this, (TransferLog.__proto__ || Object.getPrototypeOf(TransferLog)).call(this, props));

        _this9.state = {
            transferlog: []
        };
        return _this9;
    }

    _createClass(TransferLog, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this10 = this;

            var success = function success(e) {
                var arr = [];
                for (var i in e) {
                    arr.push(e[i]);
                }
                _this10.setState({
                    transfer: arr
                });
            };
            success = success.bind(this);
            ppss.listent("log.transfer", success);
            getLog("transfer");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                T_table,
                null,
                React.createElement(
                    "thead",
                    { className: "thead-light" },
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
                            "\u53D1\u8D77\u65B9"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u63A5\u53D7\u65B9"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u91D1\u989D"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u5907\u6CE8"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.transferlog.map(function (value, index) {
                        return React.createElement(
                            "tr",
                            { key: index },
                            React.createElement(
                                "td",
                                null,
                                value.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                " ",
                                value.fromTeamName,
                                " "
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.toTeamName
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.currency,
                                ":",
                                value.money || value.num
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.remark
                            )
                        );
                    })
                )
            );
        }
    }]);

    return TransferLog;
}(React.Component);

var LonateLog = function (_React$Component5) {
    _inherits(LonateLog, _React$Component5);

    function LonateLog(props) {
        _classCallCheck(this, LonateLog);

        var _this11 = _possibleConstructorReturn(this, (LonateLog.__proto__ || Object.getPrototypeOf(LonateLog)).call(this, props));

        _this11.state = {
            transferLog: []
        };
        return _this11;
    }

    _createClass(LonateLog, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this12 = this;

            var success = function success(e) {
                var arr = [];
                for (var i in e) {
                    arr.push(e[i]);
                }
                _this12.setState({
                    transferLog: arr
                });
            };
            success = success.bind(this);
            ppss.listent("log.lonate", success);
            getLog("lonate");
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                T_table,
                null,
                React.createElement(
                    "thead",
                    { className: "thead-light" },
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
                            "\u7532\u65B9"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u4E59\u65B9"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u91D1\u989D"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u5907\u6CE8"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.transferLog.map(function (value, index) {
                        return React.createElement(
                            "tr",
                            { key: index },
                            React.createElement(
                                "td",
                                null,
                                value.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                " ",
                                value.bankName,
                                " "
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.teamName
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.currency,
                                ":",
                                value.money || value.num
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.remark
                            )
                        );
                    })
                )
            );
        }
    }]);

    return LonateLog;
}(React.Component);

var CheckboxGroup = function (_React$Component6) {
    _inherits(CheckboxGroup, _React$Component6);

    function CheckboxGroup(props) {
        _classCallCheck(this, CheckboxGroup);

        var _this13 = _possibleConstructorReturn(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

        _this13.state = {
            inputClass: "hide",
            groups: []
        };
        _this13.handleCheck = {
            "private": _this13.Check_private.bind(_this13),
            "public": _this13.Check_public.bind(_this13)
        };
        _this13.handlegetValue = _this13.getValue.bind(_this13);
        _this13.value = {};
        _this13.checked = {};
        _this13.isTop = false;
        _this13.handleClick = _this13.Click.bind(_this13);
        return _this13;
    }

    _createClass(CheckboxGroup, [{
        key: "Check_public",
        value: function Check_public(e) {
            if (e.target.checked) {
                this.setState({
                    inputClass: "hide"
                });
                this.value.private = false;
                this.value.price = undefined;
            }
        }
    }, {
        key: "IsTop",
        value: function IsTop(e) {
            this.isTop = e.target.checked;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _t = this;
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/group/getList",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        var a = [];
                        for (var i in response.data) {
                            a.push(i);
                        }
                        _t.setState({
                            groups: a
                        });
                    } else if (response.code === 403001) {
                        alert("请登录后访问");
                        location.href = "https://wisecity.itrclub.com/user/login";
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "Click",
        value: function Click(index, e) {
            // console.log(e);
            this.checked[index] = e.target.checked;
        }
    }, {
        key: "Check_private",
        value: function Check_private(e) {
            if (e.target.checked) {
                this.setState({
                    inputClass: "col-6"
                });
                this.value.private = true;
            }
        }
    }, {
        key: "getValue",
        value: function getValue(e) {
            this.value.price = e.target.value;
        }
    }, {
        key: "render",
        value: function render() {
            var _this14 = this;

            // 编辑框下面第一栏的单选框，以及输入框
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { className: "row" },
                    this.state.groups.map(function (v, i) {
                        _this14.checked.v = false;
                        // console.log(v);
                        return React.createElement(
                            "div",
                            { className: "col-1" },
                            React.createElement("input", { type: "checkbox", onClick: function onClick(e) {
                                    return _this14.handleClick(i, e);
                                } }),
                            React.createElement(
                                "label",
                                null,
                                v
                            )
                        );
                    })
                ),
                React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col-1" },
                        React.createElement("input", { name: "lzh2lyz", type: "radio", onChange: this.handleCheck.isTop }),
                        React.createElement(
                            "label",
                            null,
                            "\u7F6E\u9876"
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "col-1" },
                        React.createElement("input", { name: "lzh2lyz", type: "radio" }),
                        React.createElement(
                            "label",
                            null,
                            "\u975E\u7F6E\u9876"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col-1" },
                        React.createElement("input", { name: "lyz2lzh", type: "radio", onChange: this.handleCheck.public }),
                        React.createElement(
                            "label",
                            null,
                            "\u516C\u5F00"
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "col-1" },
                        React.createElement("input", { name: "lyz2lzh", type: "radio", onChange: this.handleCheck.private }),
                        React.createElement(
                            "label",
                            null,
                            "\u6536\u8D39"
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": this.state.inputClass },
                        React.createElement("input", { type: "text", onChange: this.handlegetValue, "class": "form-control", placeholder: "\u60C5\u62A5\u5355\u4EF7" })
                    )
                )
            );
        }
    }]);

    return CheckboxGroup;
}(React.Component);

var Editor = function (_React$Component7) {
    _inherits(Editor, _React$Component7);

    function Editor(props) {
        _classCallCheck(this, Editor);

        return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));
    }

    _createClass(Editor, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this16 = this;

            var e = document.querySelector("#editbox"); //获取取代节点
            ClassicEditor.create(e).then(function (editor) {
                // console.log(editor)
                _this16.data = function () {
                    return editor.getData();
                };
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "editbox" },
                React.createElement(
                    "p",
                    { className: "font_f", style: { "font-size": "1.3em" } },
                    "\u8BF7\u5728\u6B64\u8F93\u5165\u60C5\u62A5\uFF01"
                )
            );
        }
    }]);

    return Editor;
}(React.Component);

var NewsPublish = function (_React$Component8) {
    _inherits(NewsPublish, _React$Component8);

    function NewsPublish(props) {
        _classCallCheck(this, NewsPublish);

        var _this17 = _possibleConstructorReturn(this, (NewsPublish.__proto__ || Object.getPrototypeOf(NewsPublish)).call(this, props));

        _this17.handlenum = _this17.getNum.bind(_this17);
        _this17.myRef = React.createRef(); //the ref of the checkboxgroup
        _this17.editorRef = React.createRef(); //the ref of the editor
        _this17.handletitle = function (e) {
            _this17.publishtitle = e.target.value;
        };
        _this17.handletitle = _this17.handletitle.bind(_this17);
        _this17.handlePublish = _this17.Publish.bind(_this17); //the handle of the method to publish new news
        _this17.handleGetSummary = _this17.getSummary.bind(_this17);
        return _this17;
    }

    _createClass(NewsPublish, [{
        key: "getNum",
        value: function getNum(e) {
            this.publishnum = e.target.value;
        }
    }, {
        key: "getSummary",
        value: function getSummary(e) {
            this.newsSummary = e.target.value;
        }
    }, {
        key: "Publish",
        value: function Publish() {
            var news_data = this.editorRef.current.data();
            var type = this.myRef.current.value.private ? 0 : 1; //the news type:public or private
            var isTop = this.myRef.current.isTop ? 0 : 1;
            var price;
            if (type == 0) {
                price = this.myRef.current.value.price;
                // console.log("price"+this.myRef.current.value.price);
            } else {
                price = 0;
            }
            var receiver;
            for (var i in this.myRef.current.checked) {
                if (this.myRef.current.checked[i]) {
                    if (receiver) {
                        var p = Number(i) + Number(1);
                        receiver = receiver + "," + p;
                    } else {
                        receiver = Number(i);
                    }
                }
            }
            // console.log("data"+news_data);
            // console.log(price);
            // console.log(this.publishtitle,news_data[1],this.publishnum,receiver,price,type,news_data[0],isTop);
            News.publishNews(this.publishtitle, news_data, this.publishnum, receiver, price, type, this.newsSummary, isTop);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { className: "col-lg-6 col-sm-12 right" },
                    React.createElement(
                        "div",
                        { className: "mb-3" },
                        React.createElement("input", { type: "text", onChange: this.handletitle, "class": "form-control mb-1", placeholder: "\u6807\u9898" }),
                        React.createElement("input", { type: "text", onChange: this.handleGetSummary, "class": "form-control", placeholder: "\u6458\u8981" })
                    ),
                    React.createElement(Editor, { ref: this.editorRef }),
                    React.createElement(
                        "div",
                        { className: "buttons-right" },
                        React.createElement(CheckboxGroup, { ref: this.myRef }),
                        React.createElement(
                            "div",
                            { className: "row mb-3" },
                            React.createElement(
                                "div",
                                { className: "col-5" },
                                React.createElement("input", { type: "text", onChange: this.handlenum, "class": "form-control", placeholder: "\u60C5\u62A5\u6570\u91CF" })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row mb-3" },
                            React.createElement(
                                "a",
                                { onClick: this.handlePublish, className: "fuck btn btn-secondary", href: "#", role: "button" },
                                "\u53D1\u5E03\u60C5\u62A5"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NewsPublish;
}(React.Component);

var ListItem = function (_React$Component9) {
    _inherits(ListItem, _React$Component9);

    function ListItem(props) {
        _classCallCheck(this, ListItem);

        return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));
    }

    _createClass(ListItem, [{
        key: "render",
        value: function render() {
            if (this.props.content.length <= 30) {
                this.content = this.props.content;
            } else this.content = this.props.content.substr(1, 30);
            return React.createElement(
                "a",
                { href: "#", className: "list-group-item list-group-item-action flex-column align-items-start", onClick: this.props.onClick },
                React.createElement(
                    "div",
                    { className: "d-flex w-100 justify-content-between" },
                    React.createElement(
                        "h5",
                        { className: "mb-1" },
                        this.title
                    ),
                    React.createElement(
                        "small",
                        null,
                        this.props.team
                    )
                ),
                React.createElement(
                    "p",
                    { className: "mb-1" },
                    this.content
                )
            );
        }
    }]);

    return ListItem;
}(React.Component);

var List_News = function (_React$Component10) {
    _inherits(List_News, _React$Component10);

    function List_News(props) {
        _classCallCheck(this, List_News);

        var _this19 = _possibleConstructorReturn(this, (List_News.__proto__ || Object.getPrototypeOf(List_News)).call(this, props));

        _this19.state = {
            data: []
        };
        return _this19;
    }

    _createClass(List_News, [{
        key: "getNews",
        value: function getNews() {
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/news/get?v=33333333333",
                data: { "type": "examine" },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) ppss.publish("news.list", response.data.list);else if (response.code === 404) {
                        return;
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this20 = this;

            this.listent = function (e) {
                _this20.setState({
                    data: e
                });
            };
            this.listent = this.listent.bind(this);
            ppss.listent("news.list", this.listent);
            var running = function running() {
                _this20.getNews();
                var a = (Math.random() * 10000 + Math.random() * 10000) * 2;
                setTimeout(function () {
                    running();
                }, a);
            };
            running();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            ppss.remove("news.list", this.listent);
        }
    }, {
        key: "Click",
        value: function Click(e) {
            // To tell the onClick that this is public Item
            this.props.onClick(e);
        }
    }, {
        key: "render",
        value: function render() {
            var _this21 = this;

            return React.createElement(
                "div",
                { className: "list-group" },
                this.state.data.map(function (val, index) {
                    var handleClick = _this21.Click.bind(_this21, val); // add the click listence in the Item to open Modal
                    return React.createElement(ListItem, { team: val.authorTeamName, title: val.title, content: val.summary, onClick: handleClick, key: index });
                })
            );
        }
    }]);

    return List_News;
}(React.Component);

var LawPublish = function (_React$Component11) {
    _inherits(LawPublish, _React$Component11);

    function LawPublish(props) {
        _classCallCheck(this, LawPublish);

        var _this22 = _possibleConstructorReturn(this, (LawPublish.__proto__ || Object.getPrototypeOf(LawPublish)).call(this, props));

        _this22.state = {
            groups: [],
            lawList: []
        };
        _this22.focusGroupId = "";
        _this22.groupList = {};
        _this22.editorRef = React.createRef(); //the ref of the editor
        _this22.handlePublish = _this22.Publish.bind(_this22);
        _this22.handleChange = _this22.getChange.bind(_this22);
        _this22.onShow = true;
        return _this22;
    }

    _createClass(LawPublish, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _t = this;
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/group/getList",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        _t.groupList = response.data;
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "getLawList",
        value: function getLawList() {
            var _this23 = this;

            var data = {
                "groupId": this.groupList[this.focusGroupId]
            };
            var ssuccess = function ssuccess(e) {
                _this23.setState({
                    lawList: e
                });
            };
            ssuccess = ssuccess.bind(this);
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/group/getLaw",
                data: data,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code !== 200 && response.code !== 0) ppss.publish("erro", response.code);else if (response.code === 0) return;else {
                        ssuccess(response.data);
                    }
                }
            });
        }
    }, {
        key: "getChange",
        value: function getChange(e, i) {
            /* Name: getChange
             * :param e: the DOM of the input
             * :param i: the index of the law
             * :retrun : none   
            */
            var list = this.state.lawList;
            if (list[i] !== e.target.value) {
                list[i] = e.target.value;
                this.setState({
                    lawList: list
                });
            }
        }
    }, {
        key: "Publish",
        value: function Publish() {
            var data = this.state.lawList;
            var groupId = this.groupList[this.props.grouId];
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/group/updateLaw",
                data: {
                    "groupId": groupId,
                    "content": data
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        alert("法律推行成功！");
                    } else {
                        alert("请联系管理员，错误码:" + response.code);
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this24 = this;

            var onshow = false;
            this.groupId = this.props.grouId;
            if (this.groupId !== this.focusGroupId && this.groupId !== undefined) {
                this.focusGroupId = this.props.grouId;
                console.log(this.groupId);
                console.log(this.focusGroupId);
                console.log(this.focusGroupId !== this.props.groupId);
                this.getLawList();
            }
            if (this.focusGroupId !== "") {
                onshow = true;
            }
            if (onshow) {
                return React.createElement(
                    React.Fragment,
                    null,
                    this.state.lawList.map(function (v, i) {
                        return React.createElement("input", { className: "form-control mb-3", type: "text", value: v, onChange: function onChange(e) {
                                return _this24.handleChange(e, i);
                            } });
                    }),
                    React.createElement(
                        "a",
                        { onClick: this.handlePublish, "class": "btn btn-success", role: "button" },
                        "\u9881\u5E03"
                    )
                );
            } else {
                return React.createElement(React.Fragment, null);
            }
        }
    }]);

    return LawPublish;
}(React.Component);

var Nav = function (_React$Component12) {
    _inherits(Nav, _React$Component12);

    function Nav(props) {
        _classCallCheck(this, Nav);

        var _this25 = _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).call(this, props));

        _this25.state = {
            name: ""
        };
        return _this25;
    }

    _createClass(Nav, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _t = this;
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/admin/getRealName",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        _t.setState({
                            "name": response.data
                        });
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this26 = this;

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
                        React.createElement(
                            "a",
                            { onClick: function onClick(e) {
                                    return _this26.props.onClick("a");
                                } },
                            "\u64CD\u4F5C"
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "inline-nav box-left font-nav" },
                        React.createElement(
                            "a",
                            { onClick: function onClick(e) {
                                    return _this26.props.onClick("log");
                                } },
                            "\u8BB0\u5F55"
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "inline-nav font-nav" },
                        "\u540D\u79F0\uFF1A",
                        this.state.name
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

var WarehouseTable = function (_React$Component13) {
    _inherits(WarehouseTable, _React$Component13);

    function WarehouseTable(props) {
        _classCallCheck(this, WarehouseTable);

        var _this27 = _possibleConstructorReturn(this, (WarehouseTable.__proto__ || Object.getPrototypeOf(WarehouseTable)).call(this, props));

        _this27.state = {
            value: {}
        };
        _this27.handleChange = _this27.change.bind(_this27);
        _this27.handleClick = _this27.click.bind(_this27);
        return _this27;
    }

    _createClass(WarehouseTable, [{
        key: "change",
        value: function change(i, e) {
            var a = this.state.value;
            a[i] = e.target.value;
            this.setState({
                value: a
            });
            return;
        }
    }, {
        key: "click",
        value: function click(i) {
            this.props.onClick(i, this.state.value[i]);
            return;
        }
    }, {
        key: "render",
        value: function render() {
            var _this28 = this;

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "h4",
                    null,
                    this.props.teamName
                ),
                React.createElement(
                    "table",
                    { className: "table" },
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
                                "\u5546\u54C1\u6570\u91CF"
                            ),
                            React.createElement(
                                "th",
                                { scope: "col" },
                                "\u4FEE\u6539"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.props.data.map(function (v) {
                            return React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    v.goods_name
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    React.createElement("input", { className: "form-control", value: _this28.state.value[v.goods_name] || v.num, onChange: function onChange(e) {
                                            return _this28.handleChange(v.goods_name, e);
                                        } })
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    " ",
                                    React.createElement(
                                        "a",
                                        { className: "btn btn-primary", role: "button", onClick: function onClick(e) {
                                                return _this28.handleClick(v.goods_name);
                                            } },
                                        "Click!"
                                    ),
                                    " "
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return WarehouseTable;
}(React.Component);

var Content = function (_React$Component14) {
    _inherits(Content, _React$Component14);

    function Content(props) {
        _classCallCheck(this, Content);

        var _this29 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this29.state = {
            groupName: "",
            wholeTicketa: "",
            wholeTicketb: "",
            groupsName: [],
            isOpen: false,
            warehouse: [],
            a: "hide",
            b: "hide",
            log: "hide"
        };
        _this29.handleGetValue = _this29.getValue.bind(_this29);
        _this29.handleOpen = _this29.open.bind(_this29);
        _this29.handleClose = _this29.close.bind(_this29);
        _this29.handlePass = _this29.Pass.bind(_this29);
        _this29.handleUnPass = _this29.unPass.bind(_this29);
        _this29.modalValue = {};
        _this29.teamId = ""; //the team id of the team choosed
        _this29.teamName = "";
        _this29.handleClickChange = _this29.clickChange.bind(_this29);
        _this29.handleClickWarehouse = _this29.clickWarehouse.bind(_this29);
        _this29.handleClickEditWarehouse = _this29.clickEditWarehouse.bind(_this29);
        return _this29;
    }

    _createClass(Content, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this30 = this;

            var _success = function success(e) {
                var a = [];
                for (var i in e) {
                    a.push(i);
                }
                _this30.setState({
                    groupsName: a
                });
            };
            _success = _success.bind(this);
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/group/getList",
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        _success(response.data);
                    } else {
                        alert("请联系管理员，错误码:" + response.code);
                    }
                }
            });

            var _t = this;
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/bank/ticket/getTotalTicket",
                data: {
                    "id": 4
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        _t.setState({
                            wholeTicketa: response.data
                        });
                    } else if (response.code === 404) {
                        return;
                    } else {
                        alert("请联系管理员！");
                    }
                }
            });

            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/bank/ticket/getTotalTicket",
                data: {
                    "id": 5
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        _t.setState({
                            wholeTicketb: response.data
                        });
                    } else if (response.code === 404) {
                        return;
                    } else {
                        alert("请联系管理员！");
                    }
                }
            });
        }
    }, {
        key: "getValue",
        value: function getValue(e) {
            this.setState({
                groupName: e
            });
        }
    }, {
        key: "open",
        value: function open(e) {
            this.modalValue = e;
            this.setState({
                isOpen: true
            });
        }
    }, {
        key: "close",
        value: function close() {
            this.setState({
                isOpen: false
            });
        }
    }, {
        key: "Pass",
        value: function Pass(e) {
            var news = new News();
            news.passNews(e);
        }
    }, {
        key: "unPass",
        value: function unPass(e) {
            News.deleteNews(e);
        }
    }, {
        key: "clickChange",
        value: function clickChange(e) {
            switch (e) {
                case "log":
                    this.setState({
                        log: "log",
                        a: "hide",
                        b: "hide"
                    });
                    break;
                case "a":
                    this.setState({
                        a: "a",
                        b: "hide",
                        log: "hide"
                    });
                    break;
                default:
                    return;
            }
        }

        /*
        * @function:clickWarehouse
        * @Desc: send message to the api/editWarehouse
        * @param: {String}i the name of the goods,{Int}num the num of the goods
        * @return: undefine
        * @TODO: every
        */

    }, {
        key: "clickWarehouse",
        value: function clickWarehouse(i, num) {
            var _t = this;
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/admin/editWarehouse",
                data: {
                    "goodsName": i,
                    "num": num,
                    "teamId": _t.teamId
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        alert("修改成功！");
                        return;
                    } else alert("请联系管理员");
                }
            });
        }

        /*
        * @function:clickWarehouse
        * @Desc: ask message from the api/team/getWarehouse,and setState of the warehouse,and close the modal,
        *        and show the state of b
        * @param: {INT}teamId ,{handle}handleClose the handle of the funtion closing the modal
        * @return: undefine
        * @TODO: every
        */

    }, {
        key: "clickEditWarehouse",
        value: function clickEditWarehouse(teamId, handleClose, teamName) {
            this.teamId = teamId;
            this.teamName = teamName;
            var _t = this;
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/getWarehouse",
                data: {
                    "teamId": teamId
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        _t.setState({
                            warehouse: response.data,
                            b: "log",
                            a: "hide",
                            log: "hide"
                        });
                        handleClose();
                    } else {
                        alert("请联系管理员");
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this31 = this;

            return React.createElement(
                React.Fragment,
                null,
                React.createElement(Nav, { groupName: "\u4E3B\u5E2D\u56E2", onClick: this.handleClickChange }),
                React.createElement(
                    "div",
                    { className: "row body-monitor" },
                    React.createElement(
                        "div",
                        { className: "col-4" },
                        React.createElement(
                            "div",
                            { className: "mb-3" },
                            "市场流通的银票数:",
                            this.state.wholeTicketa
                        ),
                        React.createElement(
                            "div",
                            { className: "mb-3" },
                            "市场流通的交子数:",
                            this.state.wholeTicketb
                        ),
                        React.createElement(TeamRank, { onClick: this.handleClickEditWarehouse })
                    ),
                    React.createElement(
                        "div",
                        { className: "col-8" },
                        React.createElement(
                            "div",
                            { className: this.state.a, style: { "margin-top": "0px !important" } },
                            "\u8BF7\u9009\u62E9\u5546\u5E2E:",
                            React.createElement(Select, { options: this.state.groupsName, get_value: this.handleGetValue, value: "请选择商帮..." })
                        ),
                        React.createElement(
                            "div",
                            { className: this.state.a },
                            "\u5546\u54C1\u4FE1\u606F\u4FEE\u6539:",
                            React.createElement(Good_Edit, { groupName: this.state.groupName })
                        ),
                        React.createElement(
                            "div",
                            { className: this.state.a },
                            "\u6CD5\u5F8B:",
                            React.createElement(
                                "div",
                                { className: "hold-height" },
                                React.createElement(LawPublish, { grouId: this.state.groupName })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: this.state.a },
                            React.createElement(
                                "div",
                                { className: "hold-height" },
                                "\u65B0\u95FB\u5F85\u5BA1\u6838\u8BB0\u5F55:",
                                React.createElement("br", null),
                                React.createElement(List_News, { onClick: this.handleOpen })
                            ),
                            React.createElement(
                                "div",
                                { className: "hold-height", style: { "margin-top": "5%" } },
                                "\u65B0\u95FB\u53D1\u5E03",
                                React.createElement(NewsPublish, null)
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: this.state.log },
                            "\u5546\u54C1\u4EA4\u6613\u8BB0\u5F55:",
                            React.createElement(
                                "div",
                                { className: "hold-height" },
                                React.createElement(TransactionLog, null)
                            ),
                            React.createElement("div", { className: "mb-4" }),
                            "\u8D44\u91D1\u8F6C\u8D26\u8BB0\u5F55:",
                            React.createElement(
                                "div",
                                { className: "hold-height" },
                                React.createElement(TransferLog, null)
                            ),
                            React.createElement("div", { className: "mb-4" }),
                            "\u501F\u8D37\u8BB0\u5F55:",
                            React.createElement(
                                "div",
                                { className: "hold-height" },
                                React.createElement(LonateLog, null)
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: this.state.b },
                            React.createElement(WarehouseTable, { teamName: this.teamName, data: this.state.warehouse, onClick: this.handleClickWarehouse })
                        )
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.isOpen },
                    React.createElement(
                        Modal_head,
                        { close: this.handleClose },
                        this.modalValue.title
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        this.modalValue.is_public === 0 ? "付费情报" : "公开情报",
                        React.createElement("br", null),
                        this.modalValue.price ? "价格:" : undefined,
                        this.modalValue.price ? this.modalValue.price : undefined,
                        React.createElement("br", null),
                        this.modalValue.summary ? "摘要" : undefined,
                        this.modalValue.summary ? this.modalValue.summary : undefined,
                        React.createElement("br", null),
                        "正文:",
                        "正文:",
                        React.createElement("div", { dangerouslySetInnerHTML: { __html: this.modalValue.content } })
                    ),
                    React.createElement(
                        Modal_foot,
                        { close: this.handleClose },
                        React.createElement(
                            "a",
                            { onClick: function onClick(e) {
                                    return _this31.handlePass(_this31.modalValue.id);
                                }, "class": "btn btn-success", role: "button" },
                            "\u53D1\u8868"
                        ),
                        React.createElement(
                            "a",
                            { onClick: function onClick(e) {
                                    return _this31.handleUnPass(_this31.modalValue.id);
                                }, "class": "btn btn-danger", role: "button" },
                            "\u9A73\u56DE"
                        )
                    )
                )
            );
        }
    }]);

    return Content;
}(React.Component);

ReactDOM.render(React.createElement(Content, null), document.getElementById("root"));