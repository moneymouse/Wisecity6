class Asset extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            teamName:"",
            Asset:[],
            Asset_data:[],
            Asset_flow:[],
            isOpen:false,
            asset_class:"collapse",
            assetData_class:"collapse"
        }
        this.modal_value={};
        this.handleclose = this.close.bind(this); // Close the modal 
        this.handleopen = this.open.bind(this);// Open the modal
        this.handleAssetcollapse = this.assetCollapse.bind(this); // Asset collapse toggle
        this.handleAssetdatacollapse = this.assetDatacollapse.bind(this); // Asset data collapse toggle
    }

    componentDidMount(){
        // the asset
        var teamname = team.name;
        var asset = [];
        for(var i=0;i<3;i++){
            var ass = {
                "type":team.money[i]["currency"],
                "num":team.money[i]["num"]
            }
            asset.push(ass);
        }
        this.setState({
            teamName:teamname,
            Asset:asset
        })

        // the asset_data
        var asset_data = this.state.Asset_data;
        var handlelistent_data = (name,e)=>{4
            // console.log(e);
            var total = 0;
            for(var i in e){
                for(var p in e[i]){
                    if(e[i][p][2]){
                        total = total + e[i][p][2].total - e[i][p][3].total
                    }
                    else{
                        total = total + e[i][p][0].total - e[i][p][1].total
                    }
                    // console.log(e[i][p][3]);
                }
            }
            console.log(total);
            var obj = {
                "name":name,
                "num":total
            }
            asset_data.push(obj);
            this.setState({
                Asset_data:asset_data
            })
        }
        this.handlelistent_data = {
            "transaction":handlelistent_data.bind(this),
            "bank":handlelistent_data.bind(this),
            "ticket":handlelistent_data.bind(this)
        }
        ppss.listent("analyze.transaction",(e)=>this.handlelistent_data.transaction("商品交易",e));
        ppss.listent("analyze.bank",(e)=>this.handlelistent_data.bank("钱庄",e));
        ppss.listent("analyze.ticket",(e)=>this.handlelistent_data.ticket("票庄",e));

        analyze();

        // the asset_flow
        this.handlelistent_flow = (e)=>{
            var arr = this.state.Asset_flow;
            console.log(arr);
            for(var i in e){
                arr.push(e[i])
            }
            this.setState({
                Asset_flow:arr
            })
        }
        var handlelistent_flow = this.handlelistent_flow.bind(this);
        ppss.listent("log.transfer",handlelistent_flow);
        ppss.listent("log.transcation",handlelistent_flow);
        ppss.listent("log.lonate",handlelistent_flow);

        getLog("transcation");
        getLog("transfer");
        getLog("lonate");
    }

    close(){
        // close the modal
        this.setState({
            isOpen:false
        })
    }

    open(e){
        // open the modal and send the value to modal_value
        this.modal_value = e;
        this.setState({
            isOpen:true
        })
    }

    assetCollapse(){
        if(this.state.asset_class=="collapse"){
            this.setState({
                asset_class:"collapsing"
            })
            var _t = this;
            setTimeout(()=>{
                _t.setState({
                    asset_class:"collapse show"
                })
            },500)
        }
        if(this.state.asset_class=="collapse show"){
            this.setState({
                asset_class:"collapsing"
            })
            var _t = this;
            setTimeout(()=>{
                _t.setState({
                    asset_class:"collapse"
                })
            },500)
        }
    }

    assetDatacollapse(){
        if(this.state.assetData_class=="collapse"){
            this.setState({
                assetData_class:"collapsing"
            })
            var _t = this;
            setTimeout(()=>{
                _t.setState({
                    assetData_class:"collapse show"
                })
            },500)
        }
        if(this.state.assetData_class==="collapse show"){
            this.setState({
                assetData_class:"collapsing"
            })
            var _t = this;
            setTimeout(()=>{
                _t.setState({
                    assetData_class:"collapse"
                })
            },500)
        }
    }

    render(){
        var buyStatus = ["卖出","买入"];
        var confirmStatus = ["退回","未签收","已签收"];
        return(
            <React.Fragment>
                <div className="welcome"><b>资产管理</b></div>
                <div className="assetBox">
                    <div className="top-explain">
                        <div className="detail inline"><b>资金详情</b></div>
                        <div className="total inline"><b>资金流动总额</b></div>
                    </div>
                    <div className="top">
                        <div className="detail-box inline">
                        {this.state.Asset.map((v,i)=>{
                            if(i<=2){
                                if(i===0||i===1){
                                    return (<React.Fragment>
                                    <div className="asset-each inline">
                                        <div style={{"float":"left","color":"#856B53"}}><b>{v.num}</b></div>
                                        <br />
                                        <div style={{"float":"left"}}>{v.type}</div>
                                    </div>
                                    <div className="line-index-asset inline"></div>
                                    </React.Fragment>)
                                }
                                else return (<div className="asset-each inline">
                                    <div style={{"float":"left","color":"#856B53"}}><b>{v.num}</b></div>
                                    <br />
                                    <div style={{"float":"left"}}>{v.type}</div>
                                </div>)
                            }
                        })}
                        </div>
                        <div className="total-box inline">
                        {this.state.Asset_data.map((v,i)=>{
                            if(i<=2){
                                if(i===0||i===1){
                                    return (<React.Fragment>
                                    <div className="asset-each inline">
                                        <div style={{"float":"left","color":"#856B53"}}><b>{v.num.toFixed(2)}</b></div>
                                        <br />
                                        <div style={{"float":"left"}}>{v.name}</div>
                                    </div>
                                    <div className="line-index-asset inline"></div>
                                    </React.Fragment>)
                                }
                                else return (<div className="asset-each inline">
                                    <div style={{"float":"left","color":"#856B53"}}><b>{v.num.toFixed(2)}</b></div>
                                    <br />
                                    <div style={{"float":"left"}}>{v.name}</div>
                                </div>)
                            }
                        })}    
                    </div>
                </div>
                </div>
                <div className="logo">
                    <img src={"https://wisecity.itrclub.com/resource/img/logo/summary.png"} alt={"logo"} />
                </div>
                <div className="top-explain" style={{"margin-left":"8.3%","margin-top":"1.02%"}} >资金流量记录</div>
                <div className="bottom">
                    <T_table>
                        <thead className="bg-brown" style={{"color":"white"}}>
                            <tr>
                            <th scope="col">交易ID</th>
                            <th scope="col">发起方</th>
                            <th scope="col">接受方</th>
                            <th scope="col">商品名称</th>
                            <th scope="col">商品数量</th>
                            <th scope="col">金额</th>
                            <th scope="col">备注</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Asset_flow.map((value,index)=>{
                                return (<tr key={index} >
                                    <td><a href="#" onClick={()=>{this.handleopen(value)}}>{value.id}</a></td>
                                    <td> {value.fromTeamName} </td>
                                    <td>{value.toTeamName}</td>
                                    <td>{value.goods_name}</td>
                                    <td>{value.num}</td>
                                    <td>{value.currency}:{value.money||value.num}</td>
                                    <td>{value.remark}</td>
                                </tr>)
                            })}
                        </tbody>
                    </T_table>
                </div>
                
                {/* <Modal isOpen={this.state.isOpen}>
                    <Modal_head close={this.handleclose}></Modal_head>
                    <Modal_body>
                        <div>交易ID:{this.modal_value.id}</div>
                        <div>发起方:{this.modal_value.fromTeamName}</div>
                        <div>接收方:{this.modal_value.toTeamName}</div>
                        {this.modal_value.goods_name?"商品:":undefined}{this.modal_value.goods_name||""}
                        <div>买卖:{buyStatus[this.modal_value.type]}</div>
                        <div>状态:{confirmStatus[this.modal_value.status+1]}</div>
                        <div>金额:{this.modal_value.currency}:{this.modal_value.money||this.modal_value.num}</div>
                        <div>备注:{this.modal_value.remark}</div>
                    </Modal_body>
                    <Modal_foot close={this.handleclose}></Modal_foot>
                </Modal> */}
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Asset />,
    document.getElementById("root")
)
ReactDOM.render(
    <Nav choosed={5} teamName={team.name} />,
    document.getElementById("Nav")
)