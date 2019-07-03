class List_Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            class : "list-group-item list-group-item-action"
        };
        this.active = false;
    }

    Active(){
        this.active = true;
        this.setState({
            class: "list-group-item list-group-item-action active"
        });
    }

    unActive(){
        this.active = false;
        this.setState({
            class: "list-group-item list-group-item-action"
        })
    }

    render(){
        if(this.props.active&&(!this.active)){
            this.Active();
        }
        if((!this.props.active)&&this.active){
            this.unActive();
        }
		return (
			<a href="#" className={this.state.class} onClick={this.props.onClick}>{this.props.children}</a>
		)
	}
}

class  List_Group extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<ul className="list-group">
            {this.props.children}
        </ul>
        )
    }
}

class Teamtransfer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allClass:"row hidden",
            banks:[]
        }
        this.showState = false;
        this.ajaxData = {};
        this.handleGet = this.getValue.bind(this);
        this.handlegetMoney = this.getMoney.bind(this);
        this.handlegetRemark = this.getRemark.bind(this);
        this.handleClick = this.Click.bind(this);
    }

    hide(){
        this.showState = false;
        this.setState({
            allClass:"row hidden"
        })
    }

    show(){
        this.showState = true;
        this.setState({
            allClass:"row"
        })
    }

    getValue(e){
        if(e==="白银"){
            this.ajaxData.moneyType=0;
        }
        else{
            for(var i=3;i<=4;i++){
                if(this.state.banks[i].ticketName===e){
                    this.ajaxData.moneyType=this.state.banks[i].bankId;
                }
            }
        }
    }

    getMoney(e){
        this.ajaxData.num = e.target.value;
    }

    getRemark(e){
        this.ajaxData.remark = e.target.value;
    }
    
    componentDidMount(){
        var listen = (e)=>{
            this.setState({
                banks:e
            });
        };
        ppss.listent("bank.list",listen);
        bank_ask.list();
    }

    Click(){
        var send = {
            "fromOrgType":1,
            "toOrgType":2,
            "fromOrgId":team.id,
            "toOrgId":team.groupId,
            "moneyType":this.ajaxData.moneyType,
            "num":this.ajaxData.num,
            "remark":this.ajaxData.remark
        }

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

    render(){
        if((this.props.show)&&(!this.showState)){
            this.show();
        }
        if((!this.props.show)&&(this.showState)){
            this.hide();
        }
        return (<div className={this.state.allClass}>
            <div className="col-2">
                <Select value="货币类型" options={this.props.options} get_value={this.handleGet} ></Select>
            </div>
            <div className="col-4">
                <input className="form-control" type="text" onChange={this.handlegetMoney} placeholder="金额..." />
            </div>
            <div className="col-4">
                <input  className="form-control" type="text" onChange={this.handlegetRemark} placeholder="备注..." />
            </div>
            <div className="col-2">
                <a onClick={this.handleClick} className="btn btn-primary" href="#" role="button">转账</a>
            </div>
        </div>
        )
    }
}

class Investment extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            banks:[],
            itemActive:[false,false,false,false,false],
            bank_money:"hidden",
            bank_ticket:"hidden",
            teamShow:false
        };
        this.preactive;//指向前一active的listItem
        this.curactive;//指向当前active的listItem
        this.focusItem={};//当前被点击的item的详细信息
        this.ajaxData={};//传给后端的数据
        this.handleItemclick = this.itemClick.bind(this);
        this.handleAchange = this.aChange.bind(this);
        this.handleBchange = this.bChange.bind(this);
        this.handleCchange = this.cChange.bind(this);
        this.handleDchange = this.dChange.bind(this);
        this.handleCredit = this.Credit.bind(this);
        this.handleRecredit = this.ReCredit.bind(this);
        this.handleDeposit = this.Deposit.bind(this);
        this.handleWithdrawal = this.Withdrawal.bind(this);
        this.handleExchangeticket = this.exchangeTicket.bind(this);
        this.handleExchangemoney = this.exchangeMoney.bind(this);
        this.handleTypeA = this.TypeA.bind(this);
        this.handleTypeB = this.TypeB.bind(this);
        this.handleCreditTime = this.creditTime.bind(this);
        this.handleRemark = this.remarkGet.bind(this);
        this.handleRechange = this.reCreditChange.bind(this);
    }

    itemClick(e, index){
        if(!this.state.itemActive[index]){
            this.focusItem = e;
            this.ajaxData.id = e.bankId;
            var a = this.state.itemActive;//copy the array of item active state
            this.curactive = index; // to point to to the item which is clicked
            a[this.curactive]=true;// to turn the item which is pointed and is clicked to active
            if(this.preactive!==undefined){//the pre item is active
                a[this.preactive] = false; // turn it unactivated
            }
            this.preactive = this.curactive;// to point the pre_item to cur_item
            var teamShow=false;
            if(team.groupId === e.groupId) teamShow=true;
            if(e.bankId<=3){
                this.setState({
                    itemActive:a, // run the change
                    bank_money:"",
                    bank_ticket:"hidden",
                    teamShow:teamShow
                })
            }
            else{
                this.setState({
                    itemActive:a, // run the change
                    bank_money:"hidden",
                    bank_ticket:"",
                    teamShow:teamShow
                })
            }
        }
    }

    aChange(e){
        this.ajaxData.A_value = e.target.value;
    }

    bChange(e){
        this.ajaxData.B_value = e.target.value;
    }

    cChange(e){
        this.ajaxData.A_value = e.target.value;
    }

    dChange(e){
        this.ajaxData.B_value = e.target.value;
    }

    creditTime(e){
        this.ajaxData.creditTime = e.target.value;
    }

    remarkGet(e){
        this.ajaxData.remark = e.target.value;
    }

    reCreditChange(e){
        this.ajaxData.reCreditNum = e.target.value;
    }

    TypeA(e){
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

    TypeB(e){
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

    componentDidMount(){
        var listen = (e)=>{
            this.setState({
                banks:e
            });
        };
        ppss.listent("bank.list",listen);
        bank_ask.list();
    }

    Credit(){
    /* To credit money */
        var time = new Date();
        time = time.getTime();
        time = parseInt(time/1000);
        this.ajaxData.creditTime = this.ajaxData.creditTime*60 + time;
        var ajaxData = {
            "groupId":this.focusItem.bankId,
            "moneyType":this.ajaxData.typeB,
            "num":this.ajaxData.B_value,
            "repayNum":this.ajaxData.reCreditNum,
            "repayTime":this.ajaxData.creditTime,
            "remark":this.ajaxData.remark
        };
        // console.log(ajaxData)
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/bank/credit",
            data:ajaxData,
            dataType: "JSON",
            success: function (response) {
                if (response.code === 200) ppss.publish("success", "您已成功发起借贷申请，交易ID:"+"");
                else ppss.publish("erro", response.code);
            }
        });
    }

    ReCredit(){
        alert("还贷请返回首页！");
    }

    Deposit(){
        Bank.Deposit_Money(this.ajaxData.A_value,this.ajaxData.id,this.focusItem.name,this.ajaxData.typeA);
    }

    Withdrawal(){
        Bank.Withdrawals_Money(this.ajaxData.A_value,this.ajaxData.id,this.focusItem.name,this.ajaxData.typeA);
    }

    exchangeTicket(){
        Bank.Exchange_Ticket(this.ajaxData.A_value,this.ajaxData.id,this.focusItem.ticketName);
    }

    exchangeMoney(){
        Bank.Exchange_Money(this.ajaxData.B_value,this.ajaxData.id);
    }

    render(){
        var tickets = ["白银"];
        for(var i in this.state.banks){
            if(this.state.banks[i].bankId>=4){tickets.push(this.state.banks[i].ticketName)}
        }
        return(
            <React.Fragment>
            <div className="mb-3"></div>
            <div className="row">
                <div class="col">
                    <List_Group>
                        {this.state.banks.map((v,i)=>{
                            return (<List_Item active={this.state.itemActive[i]} onClick={()=>{this.handleItemclick(v,i)}}>{v.name}庄</List_Item>)
                        })}
                    </List_Group>
                </div>
                <div class="col">
                    <div class={this.state.bank_money}>
                        {/* 可以隐藏，可以显现，右半边 */}
                        <h3>{this.focusItem.name}钱庄</h3>
                        <h4>商队:{team.name}</h4>
                        <h4>存款:{team.money.map((v)=>{
                            if(v.bankName === this.focusItem.name){
                                return (<div>{v.currency}:{v.num}</div>)
                            }
                        })}</h4>
                        <h4 className="mb-3">贷款:{team.credit.map((v)=>{
                            if(v.bankName === this.focusItem.name){
                                return(<div>{v.currency}:{v.num}</div>)
                            }
                        })} 剩余额度:白银:999999</h4>
                        <h4>存取款</h4>
                        <div className="row mb-3">
                            <div className="col-2">
                                <Select value="货币类型" options={tickets} get_value={this.handleTypeA} ></Select>
                            </div>
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleAchange} placeholder="金额..." />
                            </div>
                            <div className="col-2">
                                <a class="btn btn-success" href="#" role="button" onClick={this.handleDeposit}>存</a>
                            </div>
                            <div className="col-2">
                                <a class="btn btn-warning" onClick={this.handleWithdrawal} href="#" role="button">取</a>
                            </div>
                        </div>
                        <div className="mb-3"></div>
                        <h4 className="mb-3" >贷还款</h4>
                        <div className="row mb-2">
                            <div className="col-4">
                                <Select value="货币类型" options={tickets} get_value={this.handleTypeB}></Select>
                            </div>
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleBchange} placeholder="贷款金额..." />
                            </div>
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleRechange} placeholder="还款金额..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleCreditTime} placeholder="还贷时间...分钟" />
                            </div>
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleRemark} placeholder="备注..." />
                            </div>
                            <div className="col-2">
                                <a class="btn btn-success" onClick={this.handleCredit} href="#" role="button">借</a>
                            </div>
                            <div className="col-2">
                                <a class="btn btn-warning" onClick={this.handleRecredit} href="#" role="button">还</a>
                            </div>
                        </div>
                    </div>
                    <div class={this.state.bank_ticket}>
                        {/* 可以显现，可以隐藏，右半边 */}
                        <h3>{this.focusItem.name}票庄</h3>
                        <h4>商队:{team.name}</h4>
                        <h4>持有票数:{(team.money[1].moneyType===this.focusItem.bankId)?(team.money[1].num):(team.money[2].num)}</h4>
                        <h4>汇率:{this.focusItem.rate}</h4>
                        <div className="row mb-3">
                            <div className="col-9">
                                <input className="form-control" type="text" onChange={this.handleCchange} placeholder="数额..." />
                            </div>
                            <div className="col-3">
                                <a class="btn btn-primary" onClick={this.handleExchangeticket} href="#" role="button">兑票</a>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-9">
                                <input className="form-control" type="text" onChange={this.handleDchange} placeholder="数额..." />
                            </div>
                            <div className="col-3">
                                <a class="btn btn-success" onClick={this.handleExchangemoney} href="#" role="button">兑钱</a>
                            </div>
                        </div>
                        <div className="mb-3"></div>
                        <h4 className="mb-3" >贷还款</h4>
                        <div className="row mb-2">
                            <div className="col-4">
                                <Select value="货币类型" options={tickets} get_value={this.handleTypeB}></Select>
                            </div>
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleBchange} placeholder="贷款金额..." />
                            </div>
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleRechange} placeholder="还款金额..." />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleCreditTime} placeholder="还贷时间...分钟" />
                            </div>
                            <div className="col-4">
                                <input className="form-control" type="text" onChange={this.handleRemark} placeholder="备注..." />
                            </div>
                            <div className="col-2">
                                <a class="btn btn-success" onClick={this.handleCredit} href="#" role="button">借</a>
                            </div>
                            <div className="col-2">
                                <a class="btn btn-warning" onClick={this.handleRecredit} href="#" role="button">还</a>
                            </div>
                        </div>
                    </div>
                    <Teamtransfer show={this.state.teamShow} options={tickets}></Teamtransfer>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Investment />,
    document.getElementById("root")
);
ReactDOM.render(
    <Nav />,
    document.getElementById("Nav")
);