class Groupdata extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            publishTicketNum:"",
            moneyDopsit:""
        }
    }

    render(){
            return (<React.Fragment>
                {this.props.groupAsset.map((v,i)=>{
                    if(i<2){
                        return (<React.Fragment>
                            <div className="asset-each inline">
                                <div style={{"color":"#856B53"}}><b>{v.num}</b></div>
                                <br />
                                <div>{v.currency}</div>
                            </div>
                            <div className="line-index-asset inline"></div>
                            </React.Fragment>)
                    }
                    else {
                        return (<React.Fragment>
                            <div className="asset-each inline">
                                <div style={{"color":"#856B53"}}><b>{v.num}</b></div>
                                <br />
                                <div>{v.currency}</div>
                            </div>
                            </React.Fragment>)
                    }
        })}
            </React.Fragment>)
    }
}

class SureExchange extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            willConfirm:[]
        }
        this.handleClick = this.Click.bind(this);
    }

    componentDidMount(){
        var success = (e)=>{
            this.setState({
                willConfirm:e
            })
        }
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/bank/getCreditOrder",
            data: {
                "type":"ticketConfirm",
                "value":this.props.groupId
            },
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    success(response.data.list);
                }
                else if(response.code===404){
                    return;
                }
                else{
                    ppss.publish("erro",response.code);
                }
            }
        });
    }

    Click(e){
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/bank/ticket/exchangeToMoneyConfirm",
            data: {
                orderId:e
            },
            dataType: "JSON",
            success: function (response) {
                if(response.code === 200){
                    ppss.publish("success","成功！");
                }
                else{
                    ppss.publish("erro",response.code);
                }
            }
        });
    }

    render(){
        return(
            <table className={this.props.className}>
                <thead class={"bg-brown"}>
                    <tr>
                        <th scope="col">交易ID</th>
                        <th scope="col">发起队伍</th>
                        <th scope="col">数额</th>
                        <th scope="col">处理</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.willConfirm.map((v)=>{
                        return (<tr>
                            <th>{v.id}</th>
                            <td>{v.teamName}</td>
                            <td>{v.num}</td>
                            <td><a onClick={(e)=>{this.handleClick(v.id);}} class="btn btn-success" href="#" role="button">同意</a></td>
                        </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}

class Response extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            credit:[]
        }
    }

    componentDidMount(){
        var listent = (e)=>{
            for(var i in e){
                var date = new Date(Number(e[i].extra_param.repayTime)*1000);
                e[i].extra_param.repayTime = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
            }
            this.setState({
                credit:e
            })
        };
        this.listent = listent.bind(this);
        ppss.listent("log.lonate",this.listent)
        getLog("lonate",4);
        this.running = ()=>{
            getLog("lonate",4);//调用函数轮询获取待交易记录
            var time = Math.random()*10000 + Math.random()*10000 + Math.random()*1000;
            var running = this.running;
            setTimeout(function(){running()},time);
        }
    }

    render(){
        var status = ["已还","未还","申请延期","申请贷款"];
        var _t = this;
        return(<React.Fragment>
                <table className={this.props.className}>
                    <thead className="bg-brown">
                        <tr>
                            <th scope="col">交易号</th>
                            <th scope="col">发起队伍</th>
                            <th scope="col">金额</th>
                            <th scope="col">状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.credit.map((v,i)=>{
                            return (<tr key={i}>
                                <th><a onClick={()=>{_t.props.onClick(v)}}>{v.id}</a></th>
                                <td>{v.teamName}</td>
                                <td>{v.currency}:{v.num}</td>
                                <td>{status[v.status]}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

class Transfer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            teamList:[],
            currencyList:["白银"],
            input:[]
        }
        this.team = [];//the Object of teamName and teamId
        this.ajaxData = {};
        this.currency = []; //the Object of currencyName and currencyId;
        this.handleTeamFocus = this.getTeam.bind(this);
        this.handleCurrencyFocus = this.getType.bind(this);
        this.handleClick = this.Click.bind(this);
        this.handleMoneyNum = this.getMoney.bind(this);
        this.handleGetRemark = this.getRemark.bind(this);
        this.handleClear = this.clear.bind(this);
    }

    getMoney(e){
        // console.log(e.target.value);
        this.ajaxData.num = e.target.value;
        var arr = this.state.input;
        arr[0] = e.target.value;
        this.setState({
            input:arr
        })
    }

    getRemark(e){
        this.ajaxData.remark = e.target.value;
        var arr = this.state.input;
        arr[1] = e.target.value;
        this.setState({
            input:arr
        })
    }

    getTeam(e){
        var _t = this;
        this.team.map((v)=>{
            if(v.name===e){
                // console.log(v.id);
                _t.ajaxData.teamId = v.id;
            }
        })
    }

    getType(e){
        if(e==="白银"){
            this.ajaxData.moneyType = 0
        }
        else{
            for(var i=0;i<this.currency.length;i++){
            if(this.currency[i].currencyName===e){
                this.ajaxData.moneyType = this.currency[i].currencyId;
            }
        }}
    }

    Click(){
        if(this.ajaxData.moneyType===undefined||this.ajaxData.num===undefined||this.ajaxData.remark===undefined){
            alert("请选择数据后再点击！");
            return ;
        }
        var send = {
            "fromOrgType":2,
            "toOrgType":1,
            "fromOrgId":this.props.groupId,
            "toOrgId":this.ajaxData.teamId,
            "moneyType":this.ajaxData.moneyType,
            "num":this.ajaxData.num,
            "remark":this.ajaxData.remark
        }
        this.setState({
            input:["",""]
        })
        this.ajaxData={};
        // console.log(send);
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/group/transfer",
            data: send,
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    alert("转账成功");
                }
                else if(response.code===403001){
                    alert("请先登录再访问");
                    location.href="https://wisecity.itrclub.com/user/login"
                }
                else{
                    alert("请寻找管理员,错误代码"+response.code);
                }
            }
        });
    }

    componentDidMount(){
        var listen = (e)=>{
            var list = this.state.currencyList;
            console.log(e)
            for(var i=0;i<e.length;i++){
                if(e[i].bankId>=4){
                    list.push(e[i].ticketName);
                    var curren = {name:e[i].ticketName,id:e[i].bankId}
                    this.currency.push(curren);
                }
            }
            this.setState({
                currencyList:list
            });
        };
        ppss.listent("bank.list",listen);
        bank_ask.list();

        var asuccess = (e)=>{
            var list = [];
            var listb = [];
            for(var i in e){
                var o ={
                    name:e[i].name,
                    id:e[i].id
                }
                list.push(o);
                listb.push(e[i].name);
            }
            console.log(listb);
            this.team = list;
            this.setState({
                teamList:listb
            })
        }
        asuccess = asuccess.bind(this);
        var data = {
            type:"groupId",
            value:this.props.groupId
        }
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/team/get",
            data: data,
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    asuccess(response.data.info);
                }
                else alert("请寻找管理员协助，错误码："+response.code);
            }
        });
        
    }

    clear(){
        this.setState({
            input:["",""]
        });
    }

    render(){
        return (
            <React.Fragment>
                <div className="col-3 tip">收款方：</div>
                <div className="col-3">
                    <Select value="请选择..." options={this.state.teamList} get_value={this.handleTeamFocus} />
                </div>
                <div className="col-3 tip">货币类型：</div>
                <div className="col-3">
                    <Select value="请选择..." options={this.state.currencyList} get_value={this.handleCurrencyFocus} />
                </div>
                <div className="col-2 tip">金额：</div>
                <div className="col-4">
                    <input value={this.state.input[0]} className="form-control" type="text" onChange={this.handleMoneyNum} placeholder="金额..." />
                </div>
                <div className="col-2 tip">备注：</div>
                <div className="col-4">
                    <input value={this.state.input[1]} className="form-control" type="text" onChange={this.handleGetRemark} placeholder="备注..." />
                </div>   
                <div className="col-8"></div>
                <div className="col-2">
                    <a className="btn bg-brown" role="button" onClick={this.handleClick}>转账</a>
                </div>
                <div className="col-2">
                    <a className="btn border-brown" role="button" onClick={this.handleClear}>重置</a>
                </div>  
            </React.Fragment>
    )

    }
}

class Issue extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input:undefined
        }
        this.handlegetNum = this.getNum.bind(this);
        this.handleClick = this.click.bind(this);
        this.ajaxData = {};
        this.handleClear = this.clear.bind(this);
    }

    getNum(e){
        this.ajaxData.num = e.target.value;
        this.setState({
            input:e.target.value
        })
    }

    click(){
        if(this.ajaxData.num === undefined){
            alert("请输入发行数量！");
            return ;
        }
        var data={
            "num":this.ajaxData.num
        }
        this.setState({
            input:""
        })
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/bank/ticket/issue",
            data: data,
            dataType: "JSON",
            success: function (response) {
                if(response.code==200){
                    alert("票号发行成功！");
                }
                else{
                    alert("请寻找管理员，错误码："+response.code);
                    console.log(response.message);
                }
            }
        });
    }

    clear(){
        this.setState({
            input:""
        });
    }

    render(){
        return(<React.Fragment>
                <div className="col-2" style={{"font-family":"微软雅黑","font-size":"0.8em"}}>数量：</div>
                <div className="col-5">
                    <input value={this.state.input} className="form-control" type="text" onChange={this.handlegetNum} placeholder="数量...." />
                </div>
                <div className="col-2">
                    <a className="btn bg-brown" onClick={this.handleClick} role="button">发行</a>
                </div>
                <div className="col-2">
                    <a className="btn border-brown" onClick={this.handleClear} role="button">重置</a>
                </div>
        </React.Fragment>)
    }
}

class Deposit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            team:[{
                name:"",
                asset:{},
                all:{}
            }]
        }
    }

    componentDidMount(){
        var data = {
            "bankId": this.props.groupId
        }
        var l = [];
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/bank/money/getLog",
            data: data,
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    var list = response.data.list;
                    for(var i in list){
                        var o = {
                            name:list[i].name,
                            asset:{
                                currency:list[i].currency,
                                num:list[i].num
                            },
                            all:list[i]
                        };
                        l.push(o);
                    }
                }
                else{
                    alert("请寻找管理员协助，错误码："+response.code);
                }
            }
        });
        this.setState({
            team:l
        })
    }

    render(){
        var _t = this;
        return (<React.Fragment>
            <T_table>
                <thead className="bg-brown">
                    <tr>
                        <th scope="col">交易单号</th>
                        <th scope="col">队伍名</th>
                        <th scope="col">存入资金额</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.team.map((v,i)=>{
                        <tr key={i}>
                            <td>{v.all.id}</td>
                            <th>{v.name}</th>
                            <td>{v.asset.currency}:{v.asset.num}</td>
                        </tr>
                    })}
                </tbody>
            </T_table>
        </React.Fragment>
        )
    }
}

// props: type : the type of bank -- value("money":"ticket")
//        groupName
class Nav extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div class="Nav">
                <div class="nav-logo">
                    <img src="https://wisecity.itrclub.com/resource/img/Nav_logo.png" alt="WISECITY" />
                </div>
                <div class="float-right">
                    <div class="inline-nav box-left font-nav">商帮名称：{this.props.groupName}</div>
                    <div class="inline-nav font-nav">商帮产业：{this.props.type==="money" ? "钱庄":"票庄"}</div>
                    <div class="inline-nav font-nav line box-center"></div>
                    <div class="inline-nav box-right font-nav"><a href="https://wisecity.itrclub.com/user/logout">退出登录</a></div>
                </div>
            </div>
        )
    }
}

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpenDeposit:false,
            isOpenResponse:false
        };
        this.modalValueD={};
        this.modalValueR={};
        this.handleOpenDeposit = this.openDeposit.bind(this);
        this.handleCloseDeposit = this.closeDeposit.bind(this);
        this.handleOpenResponse = this.openResponse.bind(this);
        this.handleCloseResponse = this.closeResponse.bind(this);
        this.sureCredit = this.sureCredit.bind(this);
    }

    sureCredit(e){
        var _this = this;
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/bank/creditExamine",
            data: {
                "id":_this.modalValueR.id,
                "status":e
            },
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    ppss.publish("success","成功！");
                }
                else if(response.code===1){
                    ppss.publish("erro.detail","请确认商帮资产后再尝试...")
                }
                else{
                    ppss.publish("erro",response.code);
                }
            }
        });
    }

    openDeposit(e){
        this.modalValueD = e;
        this.setState({
            isOpenDeposit:true
        })
    }

    closeDeposit(){
        this.setState({
            isOpenDeposit:false
        })
    }

    openResponse(e){
        this.modalValueR = e;
        this.setState({
            isOpenResponse:true
        })
    }

    closeResponse(){
        this.setState({
            isOpenResponse:false
        })
    }

    componentDidMount(){
    }

    render(){
        var status = ["已还","未还","申请延期","申请贷款"];
        if(this.props.type==="money"){
            return (<React.Fragment>
                    <Nav type={"money"} groupName={this.props.group.name} />
                    <div className="welcome"><b>商帮资产</b></div>
                    <div className="top-asset">
                        <Groupdata type="money" groupAsset={this.props.group.treasury} groupWork={this.props.group.bankName} groupId={this.props.group.id}  />
                    </div>
                    <div className="operate-title">
                        <div className="welcome-b operate-title-l inline"><b>介系钱庄</b></div>
                        <div className="welcome-b inline"><b>转账</b></div>
                    </div>
                    <div className="middle-operate">
                        <div className="logo-b">
                            <img src={"https://wisecity.itrclub.com/resource/img/logo/bank-2.png"} alt={"logo"} />
                        </div>
                        <div className="transfer inline border-brown">
                            <Transfer groupId={this.props.group.id} />
                        </div>
                    </div>
                    <div className="operate-title">
                        <div className="welcome-b operate-title-l inline"><b>借贷申请:</b></div>
                        <div className="welcome-b inline"><b>钱庄记录:</b></div>
                    </div>
                    <div className="bottom">
                        <div className="inline a">
                            <Response onClick={this.handleOpenResponse} className="table inline" />
                        </div>
                        <div className="inline b">
                            <Deposit onClick={this.handleOpenDeposit} groupId={this.props.group.id} />  
                        </div>
                    </div>
               
                <Modal isOpen={this.state.isOpenResponse}>
                    <Modal_head close={this.handleCloseResponse}>借贷业务详情</Modal_head>
                    <Modal_body>
                        交易ID:{this.modalValueR.id}
                        <br />
                        发起队伍:{this.modalValueR.teamName}
                        <br />
                        金额:{this.modalValueR.currency}:{this.modalValueR.num}
                        <br />
                        还款金额:{this.modalValueR.extra_param!==undefined?this.modalValueR.extra_param.repayNum:undefined}
                        <br />
                        还款时间:{this.modalValueR.extra_param!==undefined?this.modalValueR.extra_param.repayTime:undefined}
                        <br />
                        备注:{this.modalValueR.remark}
                        <br />
                        状态:{status[this.modalValueR.status]}
                    </Modal_body>
                    <Modal_foot close={this.handleCloseResponse} >
                        <a class="btn btn-success" onClick={()=>this.sureCredit(1)} role="button">同意</a>
                        <a class="btn btn-danger" onClick={()=>this.sureCredit(-1)} role="button">拒绝</a>
                    </Modal_foot>
                </Modal>

            </React.Fragment>
            )
        }
        else {
            return (<React.Fragment>
                    <Nav type={"ticket"} groupName={this.props.group.name} />
                    <div className="welcome"><b>商帮资产</b></div>
                    <div className="top-asset">
                        <Groupdata type="money" groupAsset={this.props.group.treasury} groupWork={this.props.group.bankName} groupId={this.props.group.id}  />
                    </div>
                    <div className="operate-title">
                        <div className="welcome-b operate-title-l inline"><b>发行票号</b></div>
                        <div className="welcome-b inline"><b>转账</b></div>
                    </div>
                    <div className="middle-operate">
                        <div className="issue inline border-brown">
                            <Issue />
                        </div>
                        <div className="logo">
                            <img src={"https://wisecity.itrclub.com/resource/img/logo/bank-2.png"} alt={"logo"} />
                        </div>
                        <div className="transfer inline border-brown">
                            <Transfer groupId={this.props.group.id} />
                        </div>
                    </div>
                    <div className="operate-title">
                        <div className="welcome-b operate-title-l inline"><b>借贷申请:</b></div>
                        <div className="welcome-b inline"><b>兑现申请:</b></div>
                    </div>
                    <div className="bottom">
                        <div className="inline a">
                            <Response onClick={this.handleOpenResponse} className="table inline" />
                        </div>
                        <div className="inline b">
                            <SureExchange groupId={this.props.group.id} className="table inline" />
                        </div>
                    </div>
                    
                <Modal isOpen={this.state.isOpenResponse}>
                    <Modal_head close={this.handleCloseResponse}>借贷业务详情</Modal_head>
                    <Modal_body>
                        交易ID:{this.modalValueR.id}
                        <br/>
                        发起队伍:{this.modalValueR.teamName}
                        <br/>
                        金额:{this.modalValueR.currency}:{this.modalValueR.num}
                        <br/>
                        还款金额:{this.modalValueR.extra_param!==undefined?this.modalValueR.extra_param.repayNum:undefined}
                        <br/>
                        还款时间:{this.modalValueR.extra_param!==undefined?this.modalValueR.extra_param.repayTime:undefined}
                        <br/>
                        备注:{this.modalValueR.remark}
                        <br/>
                        状态:{status[this.modalValueR.status]}
                    </Modal_body>
                    <Modal_foot close={this.handleCloseResponse} >
                        <a class="btn btn-success" onClick={()=>this.sureCredit(1)} role="button">同意</a>
                        <a class="btn btn-danger" onClick={()=>this.sureCredit(-1)} role="button">拒绝</a>
                    </Modal_foot>
                </Modal>

            </React.Fragment>
            )
        }
    }
}
$.ajax({
    type: "GET",
    url: "https://wisecity.itrclub.com/api/user/getGroupId",
    dataType: "JSON",
    success: function (response) {
        if(response.code === 200){
            var type;
            $.ajax({
                type: "GET",
                url: "https://wisecity.itrclub.com/api/group/get",
                data: {
                    type:"id",
                    value:response.data.id
                },
                dataType: "JSON",
                success: function (data) {
                    if(data.code===200){
                        console.log(data.data.info[0])
                        if(data.data.info[0].bankId>=4){
                            type = "ticket";
                        }
                        else if(data.data.info[0].bankId>=1&&data.data.info[0].bankId<4){
                            type = "money";
                        }
                        else{
                            alert("请切换身份！");
                            location.href = "https://wisecity.itrclub.com/user/login"
                        }
                        ReactDOM.render(
                            <Content type={type} group={data.data.info[0]} />,
                            document.getElementById("root")
                        )
                    }
                }
            });
        }
        else if(data.code === 403001){
            alert("请登录后再访问!");
            location.href="https://wisecity.itrclub.com/user/login"
        }
        else{
            ppss.publish("erro",data.code);
        }
    }
});

