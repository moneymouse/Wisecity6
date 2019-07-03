class Input_select extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Input_group>
                <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">{this.props.optionName}</label>
                </div>
                <Select options={this.props.options} get_value={this.props.get_value} />
            </Input_group>
        )
    }
}

class Body extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            a:["白银"],
            b:{
                teamlist:{},
                name:[]
            },
            inputValueM:"",
            inputValueR:""
        }
        // this.b = [["a","b","c"],[1,2,3],[4,5,6]]
        this.handleget = {
            "to":this.Get.bind(this,"to"),
            "type":this.Get.bind(this,"type"),
            "num":this.Get.bind(this,"num"),
            "remark":this.Get.bind(this,"remark")
        };
        this.value =  {};
        this.handleClick = this.Click.bind(this);
    }

    Get(index,e){
        if(index==="type"){
            this.state.a.map((v,i)=>{
                if((e===v)&&(e!=="白银")){
                    e = i + 3;
                }
                if(e==="白银"){
                    e = 0;
                }
            })
        }
        if(index==="to"){
            this.state.b.teamlist.map((val)=>{
                if(val.name===e){
                    e = val.id;
                }
            })
        }
        if(index==="num"||index==="remark"){
            if(index==="num"){
                this.setState({
                    inputValueM : e.target.value
                })
            }
            else{
                this.setState({
                    inputValueR : e.target.value
                })
            }
            e = e.target.value;
        }
        this.value[index]=e;
    }

    componentDidMount(){
        var handleList = this.List.bind(this);
        $.ajax({
            type: "GET",
            url: "https://wisecity.itrclub.com/api/bank/ticket/get",
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    var data = response.data.list;
                    var mover = [];
                    for(var i in data){
                        mover.push(data[i].ticketName);
                    }
                    handleList(mover);
                }
            }
        });

        var listen_team = (e)=>{
            // get the team content
            var name = [];
            e.map((val)=>{
                name.push(val["name"])
            });
            this.setState({
                b : {
                    teamlist:e,
                    name:name
                }
            })
        }
        this.listen_team = listen_team.bind(this);
        ppss.listent("team_list_payment",this.listen_team);

        $.ajax({
            // get team value
            type: "GET",
            url: "https://wisecity.itrclub.com/api/team/getList",
            data:{"type":"list"},
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    var responsedata = response.data;
                    var response_data=[];
                    for(var i in responsedata){
                        response_data.push({"name":i,"id":responsedata[i]})
                    }
                    ppss.publish("team_list_payment",response_data);
                }
                else if(response.code===403001){
                    alert("请登录后再访问");
                    location.href = "https://wisecity.itrclub.com/";
                }
                else{
                    ppss.publish("erro",response.code);
                }
            }
        });
    }

    List(e){
        var mover;
        mover = this.state.a;
        mover = mover.concat(e);
        this.setState({
            a:mover
        })
    }

    Click(){
        // console.log(this.value);
        Transfer_Money(this.value["to"],this.value["type"],this.value["num"],this.value["remark"]);
        this.setState({
            inputValueM:"",
            inputValueR:""
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="mb-3"></div>
                <div className="row mb-3">
                    <div className="col">
                        <Input_select optionName="收款方" options={this.state.b.name} get_value={this.handleget["to"]} />
                    </div>
                    <div className="col">   
                        <Input_select optionName="货币类型" options={this.state.a} get_value={this.handleget["type"]} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input value={this.state.clearValue} className="form-control" type="text" onChange={this.handleget["num"]} placeholder="金额..." />    
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input value={this.state.clearValue} className="form-control" type="text" onChange={this.handleget["remark"]} placeholder="备注..." />
                    </div>    
                </div>
                <div className="row mb-3">
                    <div className="col">
                        {/* 发起交易按钮 */}
                        <input type="button" className="form-control" onClick={this.handleClick} value="发起交易" />
                    </div>    
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Body />,
    document.getElementById("root")
)

ReactDOM.render(
    <Nav />,
    document.getElementById("Nav")
)