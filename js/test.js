"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Left = function (_React$Component) {
    _inherits(Left, _React$Component);

    // 左下饼图以及折线图载体
    function Left(props) {
        _classCallCheck(this, Left);

        return _possibleConstructorReturn(this, (Left.__proto__ || Object.getPrototypeOf(Left)).call(this, props));
    }

    _createClass(Left, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var i = 0;
            var listent = function listent(e) {
                // console.log("r")
                var num = 0;
                num = team.money[0].num + team.money[1].num + team.money[2].num;
                _this2.analyzeFlow = num;
                _this2.show();
            };
            listent = listent.bind(this);
            var listent_transaction = function listent_transaction(e) {
                i = i + 1;
                _this2.analyzeTranscation = [];
                for (var p in e) {
                    var total = 0;
                    for (var v in e[p]) {
                        total = total + e[p][v][0].total;
                        total = total - e[p][v][1].total;
                        // console.log(e[p][v]);
                    }
                    _this2.analyzeTranscation.push(total);
                }
                if (i == 3) {
                    listent();
                }
            };
            this.listent_transaction = listent_transaction.bind(this);
            var listent_bank = function listent_bank(e) {
                i = i + 1;
                _this2.analyzeBank = [];
                for (var p in e) {
                    var total = 0;
                    for (var v in e[p]) {
                        total = total + e[p][v][0].total;
                        total = total - e[p][v][1].total;
                        //    console.log(e[p][v])
                    }
                    _this2.analyzeBank.push(total);
                }
                if (i == 3) {
                    listent();
                }
            };
            this.listent_bank = listent_bank.bind(this);
            var listent_ticket = function listent_ticket(e) {
                i = i + 1;
                _this2.analyzeTicket = [];
                for (var p in e) {
                    var total = 0;
                    for (var v in e[p]) {
                        total = total + e[p][v]["2"].total;
                        total = total - e[p][v]["3"].total;
                        // console.log(e[p][v]);
                    }
                    _this2.analyzeTicket.push(total);
                }
                if (i == 3) {
                    listent();
                }
            };
            this.listent_ticket = listent_ticket.bind(this);

            ppss.listent("analyze.transaction", this.listent_transaction);
            ppss.listent("analyze.ticket", this.listent_ticket);
            ppss.listent("analyze.bank", this.listent_bank);

            analyze();
        }
    }, {
        key: "show",
        value: function show() {
            // 饼图以及折线图的实现
            var myChart = echarts.init(document.getElementById('main'));

            var option = { baseOption: {
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        showContent: false
                    },
                    dataset: {
                        source: [['Fina', '第一财年', '第二财年', '第三财年', '第四财年', '第五财年', '第六财年'], ['交易', this.analyzeTranscation[0], this.analyzeTranscation[1], this.analyzeTranscation[2], this.analyzeTranscation[3], this.analyzeTranscation[4], this.analyzeTranscation[5]], ['存取', this.analyzeBank[0], this.analyzeBank[1], this.analyzeBank[2], this.analyzeBank[3], this.analyzeBank[4], this.analyzeBank[5]], ['兑票', this.analyzeTicket[0], this.analyzeTicket[1], this.analyzeTicket[2], this.analyzeTicket[3], this.analyzeTicket[4], this.analyzeTicket[5]], ['流动资产', this.analyzeFlow[0], this.analyzeFlow[1], this.analyzeFlow[2], this.analyzeFlow[3], this.analyzeFlow[4], this.analyzeFlow[5]]]
                    },
                    xAxis: {
                        type: 'category',
                        name: ''
                    },
                    yAxis: {
                        gridIndex: 0
                    },
                    grid: {
                        top: "10%",
                        left: "50%",
                        height: "80%"
                    },
                    series: [{
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row'
                    }, {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row'
                    }, {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row'
                    }, {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row'
                    }, {
                        type: 'pie',
                        id: 'pie',
                        radius: '40%',
                        center: ['20%', '50%'],
                        label: {
                            formatter: '{b}: {@2012} ({d}%)'
                        },
                        encode: {
                            itemName: 'Fina',
                            value: '第一财年',
                            tooltip: '第一财年'
                        }
                    }]
                },
                media: []
            };
            myChart.on('updateAxisPointer', function (event) {
                var xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    var dimension = xAxisInfo.value + 1;
                    myChart.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });
            myChart.setOption(option);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.props.className },
                React.createElement(
                    "div",
                    { className: "font-index" },
                    "\u56FE\u5F62\u62A5\u8868"
                ),
                React.createElement("div", { id: "main" })
            );
        }
    }]);

    return Left;
}(React.Component);

var Button_transfer = function (_React$Component2) {
    _inherits(Button_transfer, _React$Component2);

    function Button_transfer(props) {
        _classCallCheck(this, Button_transfer);

        var _this3 = _possibleConstructorReturn(this, (Button_transfer.__proto__ || Object.getPrototypeOf(Button_transfer)).call(this, props));

        _this3.handleClick = _this3.Click.bind(_this3);
        return _this3;
    }

    _createClass(Button_transfer, [{
        key: "Click",
        value: function Click() {
            this.props.onClick(this.props.value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "a",
                { "class": "btn btn-secondary", onClick: this.handleClick, href: "#", role: "button" },
                "Click!"
            );
        }
    }]);

    return Button_transfer;
}(React.Component);

var T_table_a = function (_React$Component3) {
    _inherits(T_table_a, _React$Component3);

    // 交易确认
    function T_table_a(props) {
        _classCallCheck(this, T_table_a);

        var _this4 = _possibleConstructorReturn(this, (T_table_a.__proto__ || Object.getPrototypeOf(T_table_a)).call(this, props));

        _this4.state = {
            Table: []
        };
        _this4.total = 0;
        _this4.listent = _this4.listent.bind(_this4);
        console.log(_this4.state.Table);
        return _this4;
    }

    _createClass(T_table_a, [{
        key: "listent",
        value: function listent(e) {
            var arr = [];
            console.log(this.total);
            console.log(arr);
            console.log(this.state.Table);
            if (this.total > 0) {
                this.total = 0;
            } else {
                arr = this.state.Table;
                this.total = this.total + 1;
            }
            console.log(arr);
            for (var a in e) {
                e[a].num = e.money || e.num;
                if (e[a] == undefined) {
                    continue;
                } else arr.push(e[a]);
            }
            // console.log(arr);
            this.setState({
                Table: arr
            });
            // console.log(e)
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            console.log(this.state.Table);
            ppss.listent("log.transfer", this.listent);
            ppss.listent("log.transcation", this.listent);
            getLog("transfer", "confirm");
            getLog("transcation", "confirm");
            var time;
            this.running = function () {
                getLog("transfer", "confirm"); //调用函数轮询获取待交易记录
                getLog("transcation", "confirm"); //调用函数轮询获取待交易记录
                time = Math.random() * 10000 + Math.random() * 10000 + Math.random() * 1000;
                time = time * 3;
                var running = _this5.running;
                setTimeout(function () {
                    running();
                }, time);
            };
            this.running();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.running = null;
            ppss.remove("log.transfer", this.listent);
            ppss.remove("log.transcation", this.listent);
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

            return React.createElement(
                "table",
                { className: this.props.className },
                React.createElement(
                    "thead",
                    { className: "bg-brown" },
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
                            "\u53D1\u8D77\u4EBA"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u91D1\u989D"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u540C\u610F/\u62D2\u7EDD"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    { className: "transfer" },
                    this.state.Table.map(function (value, index) {
                        return React.createElement(
                            "tr",
                            { key: index },
                            React.createElement(
                                "th",
                                { scope: "row" },
                                value.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.fromTeamName
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
                                React.createElement(Button_transfer, { value: value, onClick: _this6.props.openModal })
                            )
                        );
                    })
                )
            );
        }
    }]);

    return T_table_a;
}(React.Component);

var Button_lonate = function (_React$Component4) {
    _inherits(Button_lonate, _React$Component4);

    // 还款表格的Click
    function Button_lonate(props) {
        _classCallCheck(this, Button_lonate);

        var _this7 = _possibleConstructorReturn(this, (Button_lonate.__proto__ || Object.getPrototypeOf(Button_lonate)).call(this, props));

        _this7.handleClick = _this7.Click.bind(_this7);
        return _this7;
    }

    _createClass(Button_lonate, [{
        key: "Click",
        value: function Click() {
            this.props.openModal(this.props.value);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "a",
                { "class": "btn btn-secondary", onClick: this.handleClick, href: "#", role: "button" },
                "Click!"
            );
        }
    }]);

    return Button_lonate;
}(React.Component);

var Loan_table = function (_React$Component5) {
    _inherits(Loan_table, _React$Component5);

    // 还债确认
    function Loan_table(props) {
        _classCallCheck(this, Loan_table);

        var _this8 = _possibleConstructorReturn(this, (Loan_table.__proto__ || Object.getPrototypeOf(Loan_table)).call(this, props));

        _this8.state = {
            Table: []
        };
        return _this8;
    }

    _createClass(Loan_table, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this9 = this;

            var listent = function listent(e) {
                var lonate = [];
                var start = 0;
                var long = e.length;
                for (var i = start; i < long; i++) {
                    if (e[i].status == 1) {
                        lonate.push(e[i]);
                    }
                    if (e[i].status > 1) {
                        break;
                    }
                }
                _this9.setState({
                    Table: lonate
                });
            };
            this.listent = listent.bind(this);
            ppss.listent("log.lonate", this.listent);
            this.running = function () {
                getLog("credit", 1); //调用函数轮询获取待交易记录
                var time = Math.random() * 10000 + Math.random() * 10000 + Math.random() * 10000;
                time = 3 * time;
                var running = _this9.running;
                setTimeout(function () {
                    running();
                }, time);
            };
            this.running();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.running = null;
            ppss.remove("log.lonate", this.listent);
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            return React.createElement(
                "table",
                { className: this.props.className },
                React.createElement(
                    "thead",
                    { className: "bg-brown" },
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
                            "\u8D37\u6B3E\u65B9"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u91D1\u989D"
                        ),
                        React.createElement(
                            "th",
                            { scope: "col" },
                            "\u8FD8\u6B3E/\u5EF6\u671F"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    { className: "lonate" },
                    this.state.Table.map(function (value, index) {
                        return React.createElement(
                            "tr",
                            { key: index },
                            React.createElement(
                                "th",
                                { scope: "row" },
                                value.id
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.bankName
                            ),
                            React.createElement(
                                "td",
                                null,
                                value.currency + ":" + value.num
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement(Button_lonate, { openModal: _this10.props.openModal, value: value })
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Loan_table;
}(React.Component);

var Fina_box = function (_React$Component6) {
    _inherits(Fina_box, _React$Component6);

    // 财年倒计时
    function Fina_box(props) {
        _classCallCheck(this, Fina_box);

        var _this11 = _possibleConstructorReturn(this, (Fina_box.__proto__ || Object.getPrototypeOf(Fina_box)).call(this, props));

        _this11.state = {
            time: "00:00:00"
        };
        return _this11;
    }

    _createClass(Fina_box, [{
        key: "formate",
        value: function formate(time) {
            var timehour = parseInt(time / 3600);
            timehour = timehour >= 1 ? timehour : 0;
            var timemin = parseInt((time - timehour * 3600) / 60);
            timemin = timemin >= 1 ? timemin : 0;
            var timesec = time - timehour * 3600 - timemin * 60;
            timesec = timesec >= 1 ? timesec : 0;
            function zero(i) {
                if (i < 10) {
                    return "0" + i;
                } else {
                    return i;
                }
            }
            return zero(timehour) + ":" + zero(timemin) + ":" + zero(timesec);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this12 = this;

            var handleFina = function handleFina(e) {
                _this12.setState({
                    time: _this12.formate(e)
                });
            };
            handleFina = handleFina.bind(this);
            ppss.listent("fina.rest", handleFina);
            this.finaID = Finayear.getFina();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            ppss.remove("fina.rest", this.finaID);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.props.className, onClick: this.handleclick },
                React.createElement(
                    "h4",
                    { style: { "font-size": "1.3em" } },
                    "\u7B2C\u4E00\u8D22\u5E74\u5012\u8BA1\u65F6"
                ),
                React.createElement(
                    "h4",
                    { className: "h" },
                    this.state.time
                )
            );
        }
    }]);

    return Fina_box;
}(React.Component);

var Asset = function (_React$Component7) {
    _inherits(Asset, _React$Component7);

    function Asset(props) {
        _classCallCheck(this, Asset);

        return _possibleConstructorReturn(this, (Asset.__proto__ || Object.getPrototypeOf(Asset)).call(this, props));
    }

    _createClass(Asset, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.props.className },
                team.money.map(function (v, i) {
                    if (i <= 2) {
                        if (i === 0 || i === 1) {
                            return React.createElement(
                                React.Fragment,
                                null,
                                React.createElement(
                                    "div",
                                    { className: "asset-each inline" },
                                    React.createElement(
                                        "div",
                                        { style: { "float": "left", "color": "#856B53" } },
                                        React.createElement(
                                            "b",
                                            null,
                                            v.num
                                        )
                                    ),
                                    React.createElement("br", null),
                                    React.createElement(
                                        "div",
                                        { style: { "float": "left" } },
                                        v.currency
                                    )
                                ),
                                React.createElement("div", { className: "line-index-asset inline" })
                            );
                        } else return React.createElement(
                            "div",
                            { className: "asset-each inline" },
                            React.createElement(
                                "div",
                                { style: { "float": "left", "color": "#856B53" } },
                                React.createElement(
                                    "b",
                                    null,
                                    v.num
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "div",
                                { style: { "float": "left" } },
                                v.currency
                            )
                        );
                    }
                })
            );
        }
    }]);

    return Asset;
}(React.Component);

var Content = function (_React$Component8) {
    _inherits(Content, _React$Component8);

    // 挂载于content上的页面主体,最高层级
    function Content(props) {
        _classCallCheck(this, Content);

        var _this14 = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this14.state = {
            isOpen: false,
            isOpenL: false
        };
        _this14.modalValue = {};
        _this14.modalValue.extra_param = {};
        _this14.handleOpen = _this14.open.bind(_this14);
        _this14.handleclose = _this14.close.bind(_this14);
        _this14.handleOpenL = _this14.openL.bind(_this14);
        _this14.handlecloseL = _this14.closeL.bind(_this14);
        _this14.handleInterest = _this14.interest.bind(_this14);
        _this14.handleInterestTime = _this14.interestTime.bind(_this14);
        _this14.handleReceiveL = _this14.receiveL.bind(_this14);
        _this14.handleReceiveT = _this14.receive_t.bind(_this14);
        _this14.handleRejectL = _this14.rejectL.bind(_this14);
        _this14.handleRejectT = _this14.reject_t.bind(_this14);
        return _this14;
    }

    _createClass(Content, [{
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
        key: "receive_t",
        value: function receive_t(type) {
            if (type) {
                confirm(this.modalValue.id, 1, "transaction");
            } else {
                confirm(this.modalValue.id, 1, "transfer");
            }
            this.close();
        }
    }, {
        key: "reject_t",
        value: function reject_t(type) {
            if (type) {
                confirm(this.modalValue.id, -1, "transaction");
            } else {
                confirm(this.modalValue.id, -1, "transfer");
            }
            this.close();
        }
    }, {
        key: "openL",
        value: function openL(e) {
            this.modalValue = e;
            this.setState({
                isOpenL: true
            });
        }
    }, {
        key: "closeL",
        value: function closeL(e) {
            this.setState({
                isOpenL: false
            });
        }
    }, {
        key: "receiveL",
        value: function receiveL() {
            var data = {
                "id": this.modalValue.id
            };
            var _t = this;
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/repay",
                data: data,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        alert("还款成功！");
                        _t.closeL();
                    } else {
                        alert("请寻找管理员，错误码:" + response.code);
                        // console.log(response.message);
                    }
                }
            });
        }
    }, {
        key: "rejectL",
        value: function rejectL() {
            var data = {
                "id": this.modalValue.id,
                "delayTime": this.modalValue.interestTime,
                "interest": this.modalValue.interest
            };
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/delay",
                data: data,
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        alert("延期待审核！");
                    } else {
                        alert("请寻找管理员，错误码:" + response.code);
                        // console.log(response.message);
                    }
                }
            });
        }
    }, {
        key: "interest",
        value: function interest(e) {
            this.modalValue.interest = e.target.value;
        }
    }, {
        key: "interestTime",
        value: function interestTime(e) {
            this.modalValue.interestTime = e.target.value;
        }
    }, {
        key: "render",
        value: function render() {
            var _this15 = this;

            var good = false;
            console.log(this.modalValue.goods_name);
            if (this.modalValue.goods_name) {
                good = true;

                this.modalValue.goods_name = "商品:" + this.modalValue.goods_name;
            }
            if (this.modalValue.extra_param && this.modalValue.extra_param.repayTime) {
                var returnTime = new Date(this.modalValue.extra_param.repayTime * 1000);
                returnTime = returnTime.getFullYear() + "." + returnTime.getMonth() + "." + returnTime.getDay() + " " + returnTime.getHours() + ":" + returnTime.getMinutes() + ":" + returnTime.getSeconds();
            }
            if (this.modalValue.extra_param == undefined) {
                this.modalValue.extra_param = {};
            }
            return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                    "div",
                    { className: "welcome" },
                    React.createElement(
                        "b",
                        { style: { "color": "#856B53" } },
                        "\u4F60\u597D\uFF0C",
                        team.name
                    )
                ),
                React.createElement(
                    "div",
                    { className: "top-explain" },
                    React.createElement(
                        "div",
                        { className: "font-index inline time" },
                        React.createElement(
                            "b",
                            null,
                            "\u65F6\u95F4"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "font-index inline wholeTell" },
                        React.createElement(
                            "b",
                            null,
                            "\u6982\u51B5"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "top" },
                    React.createElement(Fina_box, { className: "Finayear inline" }),
                    React.createElement(Asset, { className: "Asset inline" })
                ),
                React.createElement(Left, { className: "maina" }),
                React.createElement(
                    "div",
                    { className: "font-index top-explain" },
                    "\u5F85\u5904\u7406"
                ),
                React.createElement(
                    "div",
                    { className: "bottom" },
                    React.createElement(
                        "div",
                        { className: "inline a" },
                        React.createElement(T_table_a, { openModal: this.handleOpen, className: "table inline" })
                    ),
                    React.createElement(
                        "div",
                        { className: "inline b" },
                        React.createElement(Loan_table, { openModal: this.handleOpenL, className: "table inline" })
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.isOpen },
                    React.createElement(
                        Modal_head,
                        { close: this.handleclose },
                        good ? "商品交易确认" : "转账确认"
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        "\u4EA4\u6613\u5355\u53F7:",
                        this.modalValue.id,
                        React.createElement("br", null),
                        good ? this.modalValue.goods_name : undefined,
                        good ? React.createElement("br", null) : undefined,
                        "\u53D1\u8D77\u961F\u4F0D:",
                        this.modalValue.fromTeamName,
                        React.createElement("br", null),
                        good ? "数量:" : undefined,
                        good ? this.modalValue.num : undefined,
                        good ? React.createElement("br", null) : undefined,
                        "\u91D1\u989D:",
                        this.modalValue.currency,
                        ":",
                        this.modalValue.money || this.modalValue.num,
                        React.createElement("br", null),
                        "\u5907\u6CE8:",
                        this.modalValue.remark
                    ),
                    React.createElement(
                        Modal_foot,
                        { close: this.handleclose },
                        React.createElement(
                            "a",
                            { onClick: function onClick() {
                                    _this15.handleReceiveT(good);
                                }, "class": "btn btn-primary", href: "#", role: "button" },
                            "\u63A5\u6536"
                        ),
                        React.createElement(
                            "a",
                            { onClick: function onClick() {
                                    _this15.handleRejectT(good);
                                }, "class": "btn btn-warning", href: "#", role: "button" },
                            "\u9000\u8FD8"
                        )
                    )
                ),
                React.createElement(
                    Modal,
                    { isOpen: this.state.isOpenL },
                    React.createElement(
                        Modal_head,
                        { close: this.handlecloseL },
                        "\u5F85\u8FD8\u6B3E"
                    ),
                    React.createElement(
                        Modal_body,
                        null,
                        "\u4EA4\u6613\u5355\u53F7:",
                        this.modalValue.id,
                        React.createElement("br", null),
                        "\u94B1\u5E84:",
                        this.modalValue.bankName,
                        React.createElement("br", null),
                        "\u8FD8\u6B3E\u91D1\u989D:",
                        this.modalValue.currency,
                        ":",
                        this.modalValue.extra_param.repayNum,
                        React.createElement("br", null),
                        "\u8FD8\u6B3E\u671F\u9650:",
                        returnTime,
                        React.createElement("br", null),
                        "\u5907\u6CE8:",
                        this.modalValue.remark,
                        React.createElement("br", null),
                        "\u5EF6\u671F\u5229\u606F:",
                        React.createElement("input", { className: "form-control", type: "text", onChange: this.handleInterest, placeholder: "\u7533\u8BF7\u5EF6\u671F\u65F6\u586B\u5199..." }),
                        React.createElement("br", null),
                        "\u5EF6\u671F\u65F6\u957F:",
                        React.createElement("input", { className: "form-control", type: "text", onChange: this.handleInterestTime, placeholder: "\u5C0F\u65F6..." })
                    ),
                    React.createElement(
                        Modal_foot,
                        { close: this.handlecloseL },
                        React.createElement(
                            "a",
                            { onClick: this.handleReceiveL, "class": "btn btn-primary", href: "#", role: "button" },
                            "\u8FD8\u6B3E"
                        ),
                        React.createElement(
                            "a",
                            { onClick: this.handleRejectL, "class": "btn btn-warning", href: "#", role: "button" },
                            "\u5EF6\u671F"
                        )
                    )
                )
            );
        }
    }]);

    return Content;
}(React.Component);

ReactDOM.render(
// 渲染导航栏
React.createElement(Nav, { teamName: team.name, choosed: 0 }), document.getElementById("Nav"));
ReactDOM.render(
// 渲染content
React.createElement(Content, null), document.getElementById("content"));