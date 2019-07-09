class Left extends React.Component{
    // 左下饼图以及折线图载体
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var i=0;
        var listent = (e)=>{
            // console.log("r")
            var num = 0;
            num = team.money[0].num + team.money[1].num + team.money[2].num;
            this.analyzeFlow = num;
            this.show();
        }
        listent = listent.bind(this);
        var listent_transaction = (e)=>{
            i = i + 1;
            this.analyzeTranscation = [];
            for(var p in e){
                var total = 0;
                for(var v in e[p]){
                    total = total + e[p][v][0].total;
                    total = total - e[p][v][1].total;
                    // console.log(e[p][v]);
                }
                this.analyzeTranscation.push(total);
            }
            if(i==3){
                listent();
            }
        }
        this.listent_transaction = listent_transaction.bind(this);
        var listent_bank = (e)=>{
            i = i + 1;
            this.analyzeBank = [];
            for(var p in e){
                var total = 0;
                for(var v in e[p]){
                    total = total + e[p][v][0].total;
                    total = total - e[p][v][1].total;
                //    console.log(e[p][v])
                }
                this.analyzeBank.push(total);
            }
            if(i==3){
                listent();
            }
        }
        this.listent_bank = listent_bank.bind(this);
        var listent_ticket = (e)=>{
            i = i + 1;
            this.analyzeTicket = [];
            for(var p in e){
                var total = 0;
                for(var v in e[p]){
                    total = total + e[p][v]["2"].total;
                    total = total - e[p][v]["3"].total;
                    // console.log(e[p][v]);
                }
                this.analyzeTicket.push(total);
            }
            if(i==3){
                listent();
            }
        }
        this.listent_ticket = listent_ticket.bind(this);


        ppss.listent("analyze.transaction",this.listent_transaction);
        ppss.listent("analyze.ticket",this.listent_ticket);
        ppss.listent("analyze.bank",this.listent_bank);
        
        analyze();
    }

    show(){
         // 饼图以及折线图的实现
    var myChart = echarts.init(document.getElementById('main'));

    var option = { baseOption: {
        legend: {},
        tooltip: {
            trigger: 'axis',
            showContent: false
        },
        dataset: {
            source: [
                ['Fina', '第一财年', '第二财年', '第三财年', '第四财年', '第五财年', '第六财年'], 
                ['交易', this.analyzeTranscation[0], this.analyzeTranscation[1],this.analyzeTranscation[2],this.analyzeTranscation[3],this.analyzeTranscation[4],this.analyzeTranscation[5]],
                ['存取', this.analyzeBank[0], this.analyzeBank[1],this.analyzeBank[2],this.analyzeBank[3],this.analyzeBank[4],this.analyzeBank[5]],
                ['兑票', this.analyzeTicket[0], this.analyzeTicket[1],this.analyzeTicket[2],this.analyzeTicket[3],this.analyzeTicket[4],this.analyzeTicket[5]],
                ['流动资产', this.analyzeFlow[0], this.analyzeFlow[1],this.analyzeFlow[2],this.analyzeFlow[3],this.analyzeFlow[4],this.analyzeFlow[5]]
            ]
        },
        xAxis: {
            type: 'category',
            name: ''
        },
        yAxis: {
            gridIndex: 0
        },
        grid: {
            top:"10%",
            left:"50%",
            height:"80%"
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
    

    render(){
        return (<div className={this.props.className} >
            <div id="main"></div>
        </div>
        );
    }
}

class Button_transfer extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.Click.bind(this);
    }

    Click(){
        this.props.onClick(this.props.value);
    }

    render(){
        return(
            <a class="btn btn-secondary" onClick={this.handleClick} href="#" role="button">Click!</a>
        )
    }
}

class T_table_a extends React.Component{
    // 交易确认
    constructor(props){
        super(props);
        this.state = {  
            Table:[]
        }
        this.total = 0;
        this.listent = this.listent.bind(this);
        console.log(this.state.Table);
    }

    listent(e){
        var arr = [];
        console.log(this.total);
        console.log(arr);
        console.log(this.state.Table);
        if(this.total>0){
            this.total = 0;
        }
        else{
            arr = this.state.Table;
            this.total = this.total + 1;
        }
        console.log(arr);
        for(var a in e){
            e[a].num = e.money||e.num;
            if(e[a]==undefined){continue;}
            else arr.push(e[a]);
        }
        // console.log(arr);
        this.setState({
            Table : arr
        })
        // console.log(e)
    }

    componentDidMount(){
        console.log(this.state.Table);
        ppss.listent("log.transfer",this.listent);
        ppss.listent("log.transcation",this.listent);
        getLog("transfer","confirm")
        getLog("transcation","confirm")
        var time;
        this.running = ()=>{
            getLog("transfer","confirm");//调用函数轮询获取待交易记录
            getLog("transcation","confirm");//调用函数轮询获取待交易记录
            time = Math.random()*10000 + Math.random()*10000 + Math.random()*1000;
            time = time*3;
            var running = this.running;
            setTimeout(function(){running()},time);
        }
        this.running()
    }

    componentWillUnmount() {
        this.running = null
        ppss.remove("log.transfer",this.listent);
        ppss.remove("log.transcation",this.listent);
      }


    render(){
        return (
        <table className={this.props.className}>
            <thead className="bg-brown" style={{"color":"white"}}>
                <tr>
                <th scope="col">交易ID</th>
                <th scope="col">发起人</th>
                <th scope="col">金额</th>
                <th scope="col">同意/拒绝</th>
                </tr>
            </thead>
            <tbody className="transfer">
                {this.state.Table.map((value,index)=>{
                    return (<tr key={index}>
                        <th scope="row">{value.id}</th>
                        <td>{value.fromTeamName}</td>
                        <td>{value.currency}:{value.money||value.num}</td>
                        <td><Button_transfer value={value} onClick={this.props.openModal}/></td>
                    </tr>)
                })}
            </tbody>
        </table>)
    }

}

class Button_lonate extends React.Component{
    // 还款表格的Click
    constructor(props){
        super(props);
        this.handleClick = this.Click.bind(this);
    }

    Click(){
        this.props.openModal(this.props.value);
    }

    render(){
        return(
            <a class="btn btn-secondary" onClick={this.handleClick} href="#" role="button">Click!</a>
        )
    }
}

class Loan_table extends React.Component{
    // 还债确认
    constructor(props){
        super(props);
        this.state = {
            Table:[]
        }
    }

    componentDidMount(){
        var listent = (e)=>{
            var lonate = [];
            var start = 0;
            var long = e.length;
            for(var i=start;i<long;i++){
                if(e[i].status==1){
                   lonate.push(e[i]); 
                }
                if(e[i].status>1){
                    break;
                }
            }
            this.setState({
                Table : lonate
            })
        };
        this.listent = listent.bind(this);
        ppss.listent("log.lonate",this.listent)
        this.running = ()=>{
            getLog("credit",1);//调用函数轮询获取待交易记录
            var time = Math.random()*10000 + Math.random()*10000 + Math.random()*10000;
            time = 3*time;
            var running = this.running;
            setTimeout(function(){running()},time);
        }
        this.running()
    }

    componentWillUnmount() {
        this.running = null;
        ppss.remove("log.lonate",this.listent)
      }

    render(){
        return (
        <table className={this.props.className}>
            <thead className="bg-brown" style={{"color":"white"}}>
                <tr>
                <th scope="col">交易ID</th>
                <th scope="col">贷款方</th>
                <th scope="col">金额</th>
                <th scope="col">还款/延期</th>
                </tr>
            </thead>
            <tbody className="lonate">
                {this.state.Table.map((value,index)=>{
                    return (<tr key={index}>
                        <th scope="row">{value.id}</th>
                        <td>{value.bankName}</td>
                        <td>{value.currency+":"+value.num}</td>
                        <td><Button_lonate openModal={this.props.openModal} value={value} /></td>
                    </tr>)
                })}
            </tbody>
        </table>
        )
    }
}

class Fina_box extends React.Component{
    // 财年倒计时
    constructor(props){
        super(props);
        this.state={
            time:"00:00:00",
            num:0
        };
    }

    formate(time){
        var timehour = parseInt(time/3600);
        timehour = (timehour>=1) ? timehour : 0;
        var timemin = parseInt((time-timehour*3600)/60);
        timemin = (timemin>=1)? timemin : 0;
        var timesec = (time-timehour*3600-timemin*60);
        timesec = (timesec>=1)?timesec : 0;
        function zero(i){
            if(i<10){
                return "0"+i;
            }
            else{
                return i;
            }
        }
        return (zero(timehour)+":"+zero(timemin)+":"+zero(timesec));
    }

    componentDidMount(){
        var handleFina = (e)=>{
            this.setState({
                time:this.formate(e)
            })
            
        }
        var handleFinaNum = (e)=>{
            if(e===0){
                return ;
            }
            this.setState({
                num:e
            })
        };
        handleFinaNum = handleFinaNum.bind(this);
        handleFina = handleFina.bind(this)
        this.finaNumID =  ppss.listent("fina.num",handleFinaNum);
        this.finaID = ppss.listent("fina.rest",handleFina)
        Finayear.getFina();
    }

    componentWillUnmount(){
        ppss.remove("fina.num",this.finaNumID)
        ppss.remove("fina.rest",this.finaID)
    }

    render(){
        return (<div className={this.props.className} onClick={this.handleclick}>
            <h4 style={{"font-size":"1.3em"}}>第{this.state.num}财年倒计时</h4>
            <h4 className="h">{this.state.time}</h4>
        </div>);
    }
}

class Asset extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<div className={this.props.className}>
        {team.money.map((v,i)=>{
            if(i<=2){
                if(i===0||i===1){
                    return (<React.Fragment>
                    <div className="asset-each inline">
                        <div style={{"color":"#856B53"}}><b>{v.num}</b></div>
                        <br />
                        <div>{v.currency}</div>
                    </div>
                    <div className="line-index-asset inline"></div>
                    </React.Fragment>)
                }
                else return (<div className="asset-each inline">
                <div style={{"color":"#856B53"}}><b>{v.num}</b></div>
                <br />
                <div>{v.currency}</div>
            </div>)
            }
        })}
    </div>)
    }
}

class Content extends React.Component{
    // 挂载于content上的页面主体,最高层级
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            isOpenL:false
        }
        this.modalValue={};
        this.modalValue.extra_param={}
        this.handleOpen = this.open.bind(this);
        this.handleclose = this.close.bind(this);
        this.handleOpenL = this.openL.bind(this);
        this.handlecloseL = this.closeL.bind(this);
        this.handleInterest = this.interest.bind(this);
        this.handleInterestTime = this.interestTime.bind(this);
        this.handleReceiveL = this.receiveL.bind(this);
        this.handleReceiveT = this.receive_t.bind(this);
        this.handleRejectL = this.rejectL.bind(this);
        this.handleRejectT = this.reject_t.bind(this);
    }

    open(e){
        this.modalValue=e;
        this.setState({
            isOpen:true
        })
    }

    close(){
        this.setState({
            isOpen:false
        })
    }

    receive_t(type){
        if(type){
            confirm(this.modalValue.id,1,"transaction");
        }
        else{
            confirm(this.modalValue.id,1,"transfer");
        }
        this.close();
    }

    reject_t(type){
        if(type){
            confirm(this.modalValue.id,-1,"transaction");
        }
        else{
            confirm(this.modalValue.id,-1,"transfer");
        }
        this.close()
    }

    openL(e){
        this.modalValue = e;
        this.setState({
            isOpenL:true
        })
    }

    closeL(e){
        this.setState({
            isOpenL:false
        })
    }

    receiveL(){
        var data = {
            "id":this.modalValue.id
        }
        var _t = this;
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/bank/repay",
            data: data,
            dataType: "JSON",
            success: function (response) {
                if(response.code==200){ alert("还款成功！")
                    _t.closeL();
                }
                else { 
                    alert("请寻找管理员，错误码:"+response.code);
                    // console.log(response.message);
                }
            }
        });
    }

    rejectL(){
        var data = {
            "id":this.modalValue.id,
            "delayTime":this.modalValue.interestTime,
            "interest":this.modalValue.interest
        }
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/bank/delay",
            data: data,
            dataType: "JSON",
            success: function (response) {
                if(response.code==200){ alert("延期待审核！") }
                else { 
                    alert("请寻找管理员，错误码:"+response.code);
                    // console.log(response.message);
                }
            }
        });
    }

    interest(e){
        this.modalValue.interest = e.target.value
    }

    interestTime(e){
        this.modalValue.interestTime = e.target.value
    }

    render(){
        var good = false;
        console.log(this.modalValue.goods_name);
        if(this.modalValue.goods_name){
            good = true;
            
            this.modalValue.goods_name = "商品:"+this.modalValue.goods_name;
        }
        if(this.modalValue.extra_param&&this.modalValue.extra_param.repayTime){
            var returnTime = new Date(this.modalValue.extra_param.repayTime*1000);
            returnTime = returnTime.getFullYear() + "." + returnTime.getMonth() + "." + returnTime.getDay() + " " + returnTime.getHours() + ":" + returnTime.getMinutes() + ":" + returnTime.getSeconds()
        }
        if(this.modalValue.extra_param==undefined){
            this.modalValue.extra_param = {};
        }
        return (
            <React.Fragment>
                <div className="welcome">
                    <b style={{"color":"#856B53"}}>你好，{team.name}</b>
                </div>
                <div className="top-explain">
                    <div className="font-index inline time"><b>时间</b></div>
                    <div className="font-index inline wholeTell"><b>概况</b></div>
                </div>
                <div className="top">
                    <Fina_box className="Finayear inline"/>
                    <div className="inline asset-t">
                        <Asset className="Asset" />
                    </div>
                </div>
                <div className="font-index top-explain">图形报表</div>
                <Left className="maina" />
                <div className="font-index top-explain">待处理</div>
                <div className="bottom">
                    <div className="inline a">
                        <T_table_a openModal={this.handleOpen} className="table inline" />
                    </div>
                    <div className="inline b">
                        <Loan_table openModal={this.handleOpenL} className="table inline" />
                    </div>
                </div>
                <Modal isOpen={this.state.isOpen}>
                    <Modal_head close={this.handleclose}>{good?"商品交易确认":"转账确认"}</Modal_head>
                    <Modal_body>
                        交易单号:{this.modalValue.id}
                        <br />
                        {good?(this.modalValue.goods_name):undefined}
                        {good?<br />:undefined}
                        发起队伍:{this.modalValue.fromTeamName}
                        <br />
                        {good?"数量:":undefined}{good?this.modalValue.num:undefined}
                        {good?<br />:undefined}
                        金额:{this.modalValue.currency}:{this.modalValue.money||this.modalValue.num}
                        <br />
                        备注:{this.modalValue.remark}
                    </Modal_body>
                    <Modal_foot close={this.handleclose}>
                        <a onClick={()=>{this.handleReceiveT(good)}} class="btn btn-primary" href="#" role="button">接收</a>
                        <a onClick={()=>{this.handleRejectT(good)}} class="btn btn-warning" href="#" role="button">退还</a>
                    </Modal_foot>
                </Modal>
                <Modal isOpen={this.state.isOpenL}>
                    <Modal_head close={this.handlecloseL}>待还款</Modal_head>
                    <Modal_body>
                        交易单号:{this.modalValue.id}
                        <br />
                        钱庄:{this.modalValue.bankName}
                        <br />
                        还款金额:{this.modalValue.currency}:{this.modalValue.extra_param.repayNum}
                        <br />
                        还款期限:{returnTime}
                        <br />
                        备注:{this.modalValue.remark}
                        <br />
                        延期利息:<input className="form-control" type="text" onChange={this.handleInterest} placeholder="申请延期时填写..." />
                        <br />
                        延期时长:<input className="form-control" type="text" onChange={this.handleInterestTime} placeholder="小时..." />
                    </Modal_body>
                    <Modal_foot close={this.handlecloseL}>
                        <a onClick={this.handleReceiveL} class="btn btn-primary" href="#" role="button">还款</a>
                        <a onClick={this.handleRejectL} class="btn btn-warning" href="#" role="button">延期</a>
                    </Modal_foot>
                </Modal>

            </React.Fragment>
        );
    }
}

ReactDOM.render(
    // 渲染导航栏
    <Nav teamName={team.name} choosed={0} />,
    document.getElementById("Nav")
)
ReactDOM.render(
    // 渲染content
    <Content />,
    document.getElementById("content")
)
