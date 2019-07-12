"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* 
Author:Tony
Editer:Tony(2019.4.26)

ppss发布接口: {erro:传出错误码,
            erro.detail:错误详情，直接输出,
            success:成功返回详情，直接输出,
            news.list:新闻列表,
            news.exchange:新闻交换,
            fina.rest:财年剩余时间,
            fina.num:财年数,
            bank.list:所有的钱庄票庄的信息,
            log.transfer:转账记录,
            log.transcation:商品交易记录,
            log.lonate:获取贷款记录,
            analyze.transcation:交易总计,analysist/transactionTotalNum,
            analyze.bank:钱庄总计,analysist/bankTotalNum,
            analyze.ticket:票庄总计,analysist/ticketTotalNum
        }

*/

var ppss = new PS();

var Team = function () {
    function Team() {
        _classCallCheck(this, Team);

        var type;
        var value;
        var _t = this;

        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/user/getTeamId",
            dataType: "JSON",
            async: false,
            success: function success(data) {
                if (data.code === 200) _t.id = data.data;else if (data.code === 403003) {
                    _t.id = undefined;
                    return _t;
                } else if (data.code === 403001) {
                    alert("请登录后再访问!");
                    location.href = "https://wisecity.itrclub.com/user/login";
                } else {
                    alert("请联系管理员，错误码:" + data.code);
                    location.href = "https://wisecity.itrclub.com/user/login";
                }
            }
        });
        if (this.id === undefined) {
            return;
        } else {
            type = "id";value = this.id;
        }
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/team/get",
            data: { "type": type, "value": value },
            dataType: "JSON",
            async: false,
            success: function success(response) {
                if (response.code === 200 && _t.id !== "admin") {
                    response = response.data;
                    _t.name = response.info.name;
                    _t.groupId = response.info.groupId;
                    _t.money = response.info.treasury;
                    _t.all = response.info;
                    _t.credit = response.credit;
                } else if (response.code === 200 && _t.id === "admin") {
                    _t.list = response.info;
                } else {
                    alert("请寻找管理员，错误码" + response.code);
                }
            }
        });
    }

    _createClass(Team, null, [{
        key: "getTeaminfo",
        value: function getTeaminfo(type, value) {
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/team/get",
                data: { "type": type, "value": value },
                dataType: "JSON",
                async: false,
                success: function success(response) {
                    if (response.code == 200) {
                        window.a = response.data.info;
                        console.log(window.a);
                    } else {
                        console.log("a");
                    }
                }
            });
            return window.a;
        }
    }]);

    return Team;
}();

var team = new Team();

// 情报类

var News = function () {
    // 实例化类传入参数list/examine，参数为list时，对象公开情报为实例的public属性，购买情报为private属性，主席团为examine
    function News(data) {
        _classCallCheck(this, News);
    }
    // this.list = {"private":data.private,"public":data.public} || data;
    // 各属性格式{
    //   id,title(购买情报私有),content,receiver,price(购买情报私有),total,surplus(剩余情报量),publishTime,authorTeamName 
    // }


    // 兑换情报


    _createClass(News, [{
        key: "passNews",


        // 审核情报
        value: function passNews(id) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/news/toExamine",
                data: { "id": id },
                dataType: "JSON",
                success: function success(response) {
                    switch (response.code) {
                        case 200:
                            ppss.publish("success", "情报审核完成！");
                            break;
                        default:
                            ppss.publish("erro", response.code);
                    }
                }
            });
        }

        //驳回情报

    }, {
        key: "unPassNews",
        value: function unPassNews(id) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/news/toExamine",
                data: { "id": id },
                dataType: "JSON",
                success: function success(response) {
                    switch (response.code) {
                        case 200:
                            ppss.publish("success", "情报审核完成！");
                            break;
                        default:
                            ppss.publish("erro", response.code);
                    }
                }
            });
        }

        // 购买情报

    }], [{
        key: "exchangeNews",
        value: function exchangeNews(password) {
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/news/get",
                data: { "type": "detail", "password": password },
                dataType: "JSON",
                success: function success(response) {
                    switch (response.code) {
                        case 200:
                            ppss.publish("news.exchange", response.data.list);
                            break;
                        case 404:
                            ppss.publish("erro.detail", "抱歉，您输入的情报码错误");
                            break;
                        default:
                            ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }, {
        key: "buyNews",
        value: function buyNews(id) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/news/toBuy",
                data: { "id": id },
                dataType: "JSON",
                success: function success(response) {
                    switch (response.code) {
                        case 200:
                            alert("恭喜您成功购买情报，本情报码：" + response.data.password + "\n温馨提示，系统将不会为您储存情报码");
                            ppss.publish("newsPass", response.data.password);
                            break;
                        default:
                            ppss.publish("erro", response.code);
                    }
                }
            });
        }

        // 删除情报

    }, {
        key: "deleteNews",
        value: function deleteNews(id) {
            //主席团才有此权限
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/news/toDelete",
                data: { "id": id },
                dataType: "JSON",
                success: function success(response) {
                    switch (response.code) {
                        case 200:
                            ppss.publish("success", "删除成功");
                            break;
                        default:
                            ppss.publish("erro", response.code);
                    }
                }
            });
        }

        // 发布新情报

    }, {
        key: "publishNews",
        value: function publishNews(title, content, total, receiver, price, isPublic, summary, isTop) {
            // isPublic是int，0为不公开，1为公开
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/news/publish",
                data: {
                    "title": title,
                    "content": content,
                    "total": total,
                    "receiver": receiver,
                    "price": price,
                    "isPublic": isPublic,
                    "summary": summary,
                    "isTop": isTop
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        if (team.id === undefined) {
                            ppss.publish("success", "情报发布成功");
                        } else ppss.publish("success", "情报已成功发布，请等待审核！");
                    } else ppss.publish("error", response.code);
                }
            });
        }
    }]);

    return News;
}();

function getNews() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "list";
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "none";

    // 传入参数list/examine，参数为list时，对象公开情报为实例的public属性，购买情报为private属性，主席团/红顶为examine
    if (team.id !== "admin") {
        type = "groupId";
        password = team.groupId;
    }
    $.ajax({
        type: "GET",
        url: "https://wisecity.itrclub.com/api/news/get?v=33333333333",
        data: { "type": type, "password": password },
        dataType: "JSON",
        success: function success(response) {
            if (response.code !== 200 && response.code !== 404) {
                ppss.publish("erro", response.code);
            } else {
                var ret = {
                    public: [],
                    private: [],
                    market: []
                };
                for (var i in response.data.list) {
                    // console.log(Number(response.data.list[i]["is_official"])===1&&Number(response.data.list[i]["is_public"])===1);
                    if (Number(response.data.list[i]["is_official"]) === 1 && Number(response.data.list[i]["is_public"]) === 1) {
                        console.log(response.data.list[i]);
                        ret.public.push(response.data.list[i]);
                    } else if (Number(response.data.list[i]["is_official"]) === 1 && Number(response.data.list[i]["is_public"]) === 0) {
                        ret.private.push(response.data.list[i]);
                    } else {
                        ret.market.push(response.data.list[i]);
                    }
                }
                ppss.publish("news.list", ret);
            }
        }
    });
}

// FinaYear
var timing = function timing() {
    $.get("https://wisecity.itrclub.com/api/financeYear/getNow", function (data) {
        if (data.code == 200) {
            var now = new Date();
            now = Math.round(now.getTime() / 1000);
            var rest = data.data.list.end_time - now;
            if (data.data.list.end_time <= now) {
                alert("财年结束！");
                location.href = "https://wisecity.itrclub.com";
            } else {
                ppss.publish("fina.rest", rest);
                ppss.publish("fina.num", data.data.list.num);
            }
        } else if (data.code == 404) {
            alert("请至财年开始再登录。");
            location.href = "https://wisecity.itrclub.com/user/login";
        } else ppss.publish("erro", response.code);
    }, "JSON");
};

//FinaYear

var Finayear = function () {
    function Finayear(num) {
        _classCallCheck(this, Finayear);

        this.num = num;
        // 创建财年
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/financeYear/operate",
            data: {
                "type": "start",
                "num": num
            },
            dataType: "JSON",
            success: function success(response) {
                switch (response.code) {
                    case 200:
                        alert("第" + num + "财年开始");
                        ppss.publish("fina", num);
                        break;
                    case 0:
                        ppss.publish("erro.detail", "请输入数字作为财年序数！");
                        break;
                    default:
                        ppss.publish("erro", response.code);
                }
            }
        });
        ppss.listent("fina.num", timing);
    }

    _createClass(Finayear, null, [{
        key: "getFina",
        value: function getFina() {
            var t = function t(rest) {
                setTimeout(function () {
                    if (rest == 0) return;
                    ppss.publish("fina.rest", rest - 1);
                }, "1000");
            };
            ppss.listent("fina.rest", t);
            timing();
            // ppss.remove("fina.rest", t)
        }
    }]);

    return Finayear;
}();

// 商品操作


var good_ask = {
    "list": function list() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "teamId";

        var teamId = team.id || ""; //从Team中得到id，Team类调用user/getTeamId获取id
        if (type === "teamId") {
            teamId === 1 ? type = "list" : type = "teamId";
        }
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/goods/get",
            data: { "type": type, "value": teamId },
            dataType: "JSON",
            success: function success(response) {
                switch (response.code) {
                    case 200:
                        // 发布整个列表
                        ppss.publish("good.list", response.data.list);
                        break;
                    default:
                        ppss.publish("erro", response.code);
                }
            }
        });
    }
};

var Good = function () {
    function Good(data) {
        _classCallCheck(this, Good);

        // data应被传入为整个列表
        this.list = [];
        // Use for RedHead and Common Team
        for (var i = 0; i < data.length; i++) {
            this.list[i] = {
                "id": data[i].id,
                "buy": (Number(data[i].B) + Number(data[i].kb) * Number(data[i].PB) / Number(data[i].NB)).toFixed(2) >= 0 ? (Number(data[i].B) + Number(data[i].kb) * Number(data[i].PB) / Number(data[i].NB)).toFixed(2) : 0,
                "sell": (Number(data[i].S) - Number(data[i].ks) * Number(data[i].PS) / Number(data[i].NS)).toFixed(2) >= 0 ? (Number(data[i].S) - Number(data[i].ks) * Number(data[i].PS) / Number(data[i].NS)).toFixed(2) : 0,
                "n": data[i].N,
                "name": data[i].goodsName,
                "place": { "id": data[i].groupId, "name": data[i].groupName }
            };
        }
    }

    _createClass(Good, [{
        key: "Edit",
        value: function Edit(name, place, k, B, S, N) {
            // 用于主席团
            if (team.id !== "admin") {
                alert("请以主席团账号登陆后再访问。");
                location.href = "https://wisecity.itrclub.com/";
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var l = _step.value;

                    if (l[name].place.name == place) {
                        place = l[name].place.id;
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/goods/edit",
                data: {
                    "name": name,
                    "groupId": place,
                    "k": k,
                    "B": B,
                    "S": S,
                    "N": N
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code == 200) {
                        ppss.publish("success", "修改成功!");
                    } else ppss.publish("erro", response.code);
                }
            });
        }
    }, {
        key: "BuyOrSell",
        value: function BuyOrSell() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "buy";
            var id = arguments[1];
            var num = arguments[2];

            // q = new Good();
            // total = q.BuyOrSell()  //(q.BuyOrSell():return (Bool or totalprice))
            // if(total{
            //     ...        
            // }
            var url = "https://wisecity.itrclub.com/api/goods/" + type;
            // var _t = this;
            var price = 0;
            this.list.map(function (v) {
                if (v.id === id) {
                    price = v[type];
                }
                return;
            });
            console.log(num * price);
            $.ajax({
                type: "POST",
                url: url,
                data: { "id": id, "num": num },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) {
                        if (type == "buy") {
                            ppss.publish("success", "购买" + num + "个" + name + "成功" + "\n" + "支出：" + Number(num) * Number(price));
                            // _t.list[team.groupId][name].price * num
                        } else if (type == "sell") {
                            ppss.publish("success", "出售" + num + "个" + name + "成功" + "\n" + "收入：" + Number(num) * Number(price));
                            // _t.list[team.groupId][name].price * num
                        }
                    } else if (response.code === 2) {
                        ppss.publish("erro.detail", "资金不足");
                    } else if (response.code === 1) {
                        ppss.publish("erro.detail", "库存不足");
                    } else if (response.code === 5) {
                        ppss.publish("erro.detail", "超出单次购买限额");
                    } else {
                        ppss.publish("erro", response.code);
                    }
                }
            });
        }
    }]);

    return Good;
}();

var bank_ask = {
    "list": function list() {
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/bank/money/get",
            dataType: "JSON",
            success: function success(response) {
                if (response.code == 200) {
                    $.ajax({
                        type: "POST",
                        url: "https://wisecity.itrclub.com/api/bank/ticket/get",
                        dataType: "JSON",
                        success: function success(data) {
                            if (response.code == 200) {
                                for (var i = 0; i < data.data.list.length; i++) {
                                    response.data.list.push(data.data.list[i]);
                                }
                                ppss.publish("bank.list", response.data.list);
                            } else ppss.publish("erro", data.code);
                        }
                    });
                } else ppss.publish("erro", response.code);
            }
        });
    }
};

var Bank = function () {
    function Bank(list) {
        _classCallCheck(this, Bank);

        if (list) {
            this.list = {};
            for (var i in list) {
                this.list[i.name] = i.id;
            }
        }
    }

    _createClass(Bank, null, [{
        key: "Exchange_Ticket",
        value: function Exchange_Ticket(num, bankId, currency) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/ticket/exchangeToTicket",
                data: {
                    "bankId": bankId,
                    "num": num
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) ppss.publish("success", "您已成功兑换" + num + "张" + currency);else ppss.publish("erro", response.code);
                }
            });
        }
    }, {
        key: "Exchange_Money",
        value: function Exchange_Money(num, bankId) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/ticket/exchangeToMoney",
                data: {
                    "bankId": bankId,
                    "num": num
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) ppss.publish("success", "您已成功兑换" + num + "两白银");else ppss.publish("erro", response.code);
                }
            });
        }
    }, {
        key: "Deposit_Money",
        value: function Deposit_Money(num, bankId, bankName, moneyId) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/money/deposit",
                data: {
                    "bankId": bankId,
                    "num": num,
                    "moneyType": moneyId
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) ppss.publish("success", "您已成功向" + bankName + "存入" + num);else ppss.publish("erro", response.code);
                }
            });
        }
    }, {
        key: "Withdrawals_Money",
        value: function Withdrawals_Money(num, bankId, bankName, moneyId) {
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/api/bank/money/withdrawals",
                data: {
                    "bankId": bankId,
                    "num": num,
                    "moneyType": moneyId
                },
                dataType: "JSON",
                success: function success(response) {
                    if (response.code === 200) ppss.publish("success", "您已成功向" + bankName + "取出" + num);else ppss.publish("erro", response.code);
                }
            });
        }
    }]);

    return Bank;
}();

function Transfer_Money(Team_id, currency, num, remark) {
    if (!remark) {
        alert("请输入备注！");
        return;
    }
    $.ajax({
        type: "POST",
        url: "https://wisecity.itrclub.com/api/transfer/add",
        data: {
            "teamId": Team_id,
            "moneyType": currency,
            "num": num,
            "remark": remark
        },
        dataType: "JSON",
        success: function success(response) {
            if (response.code === 200) {
                ppss.publish("success", "恭喜您发起转账成功！\n交易ID:" + response.data.orderId);
            } else if (response.code === 1) {
                ppss.publish("erro.detail", "资金不足");
            } else ppss.publish("erro", response.code);
        }
    });
}

function Transaction_goods(Team_id, currency, good_num, remark, action, good_name, price) {
    // action=1为buy,action=0为sell
    if (!remark) {
        alert("请输入备注！");
        return;
    }
    $.ajax({
        type: "POST",
        url: "https://wisecity.itrclub.com/api/transaction/add",
        data: {
            "teamId": Team_id,
            "moneyType": currency,
            "num": good_num,
            "remark": remark,
            "id": good_name,
            "money": price,
            "type": action
        },
        dataType: "JSON",
        success: function success(response) {
            if (response.code === 200) {
                ppss.publish("success", "恭喜您发起交易成功\n交易ID:" + response.data.orderId);
            } else if (response.code === 1) {
                ppss.publish("erro.detail", "请确认库存后再发起交易");
            } else if (response.code === 5) {
                ppss.publish("erro.detail", "数量超出一次性购买限额,请减少购买数量...");
            } else ppss.publish("erro", response.code);
        }
    });
    return window.a;
}

function getLog(type) {
    var datatype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

    if (type == "transcation") {
        $.get("https://wisecity.itrclub.com/api/transaction/get?v=3333333", { "type": datatype }, function (data) {
            if (data.code == 200) {
                ppss.publish("log.transcation", data.data.list);
            } else if (data.code == 404) {
                return;
            } else ppss.publish("erro", data.code);
        }, "JSON");
    } else if (type == "transfer") {
        $.get("https://wisecity.itrclub.com/api/transfer/get?v=3333333333", { "type": datatype }, function (data) {
            if (data.code == 200) {
                ppss.publish("log.transfer", data.data.list);
            } else if (data.code == 404) {
                return;
            } else ppss.publish("erro", data.code);
        }, "JSON");
    } else {
        $.get("https://wisecity.itrclub.com/api/bank/getCreditOrder?v=333333333", { "type": type, "value": datatype }, function (data) {
            if (data.code == 200) {
                ppss.publish("log.lonate", data.data.list);
            } else if (data.code == 404) {
                return;
            } else ppss.publish("erro", data.code);
        }, "JSON");
    }
}

function confirm(orderId, action, type) {
    // action:1/-1 -- 接收或退回
    var url = "https://wisecity.itrclub.com/api/" + type + "/confirm";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "orderId": orderId,
            "status": action
        },
        dataType: "JSON",
        success: function success(response) {
            if (response.code == 200) {
                if (action == 1) {
                    ppss.publish("success", "接收成功！");
                } else {
                    ppss.publish("success", "退回成功！");
                }
            } else if (response.code === 3) {
                ppss.publish("erro.detail", "商队资产不足或卖方库存不足，请确认资产以及库存后再尝试");
            } else if (response.code === 5) {
                ppss.publish("erro.detail", "商队资产不足或卖方库存不足，请确认资产以及库存后再尝试");
            } else {
                // console.log(response.code);
                ppss.publish("erro", response.code);
            }
        }
    });
}

function analyze() {
    $.get("https://wisecity.itrclub.com/api/analysis/transactionTotalNum", function (data) {
        if (data.code == 200) {
            var data_copied = data.data;
            ppss.publish("analyze.transaction", data_copied);
        } else if (data.code == 403001 || data.code == 403003) {
            alert("请先登录后再访问");
            location.href = "https://wisecity.itrclub.com/user/login";
        } else {
            alert("请联系管理员,错误码：" + data.code);
            console.log(data.message);
        }
    }, "JSON");
    $.get("https://wisecity.itrclub.com/api/analysis/bankTotalNum", function (data) {
        if (data.code == 200) {
            var data_copied = data.data;
            ppss.publish("analyze.bank", data_copied);
        } else if (data.code == 403001 || data.code == 403003) {
            alert("请先登录后再访问");
            location.href = "https://wisecity.itrclub.com/user/login";
        } else {
            alert("请联系管理员,错误码：" + data.code);
            console.log("data.message");
        }
    }, "JSON");
    $.get("https://wisecity.itrclub.com/api/analysis/ticketTotalNum", function (data) {
        if (data.code == 200) {
            var data_copied = data.data;
            ppss.publish("analyze.ticket", data_copied);
        } else if (data.code == 403001 || data.code == 403003) {
            alert("请先登录后再访问");
            location.href = "https://wisecity.itrclub.com/user/login";
        } else {
            alert("请联系管理员,错误码：" + data.code);
            console.log("data.message");
        }
    }, "JSON");
}

var success = function success(e) {
    alert(e);
};
var erro = function erro(e) {
    alert("请联系管理员，错误码:" + e);
};
var errow = function errow(e) {
    alert(e);
};
ppss.listent("success", success);
ppss.listent("erro", erro);
ppss.listent("erro.detail", errow);