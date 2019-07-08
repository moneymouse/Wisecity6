/*
    这是整个项目最最最最最恶心的代码页，相信没有之一，我花了三天去实现此功能，其中两天在拼搭它的逻辑....
    by:作者
    --2019年5月11日18:20:49

    我现在感觉好多了
    by:作者
    --2019年5月18日12:56:31
*/

class PS {
    constructor() {
        this.event = [];
        this.message = [];
    }

    listent(key, fn) {
        this.event[key] = this.event[key] || [];
        this.event[key].push(fn);
        if (this.message[key]) {
            for (var i = 0; i < this.message[key].length; i++) {
                fn(this.message[key][i].pop());
            }
        }
    }

    publish(key, message) {
        this.message[key] = this.message[key] || [];
        this.message[key].push(message);
        if (this.event[key]) {
            for (var i = 0; i < this.event[key].length; i++) {
                this.event[key][i](message);
                this.message[key].pop(message);
            }
        }
    }

    remove(key, fn) {
        for (var i = 0; i <= this.event[key].length; i++) {
            if (this.event[key][i] == fn) {
                this.event[key].splice(i, 1);
            }
        }
    }

}

// 模态框组件
class Modal extends React.Component{
    constructor(props){
        //渲染一个隐藏的模态框
        super(props);
        this.state = {
            show:"modal fade",
            style:"none",
            opc:"1"
        }
        this.state_renderd = false;//状态渲染
    }
    
    open(){
        this.state_renderd = true;//To tell the component it's state is open
        var _t=this
        this.setState({
            style:"block"
        })
        // 延时是为了让其动画正常进行
        setTimeout(function(){_t.setState({
            show:"modal fade show",
            opc:".5"
        })},100);
        //调暗背景
        ReactDOM.render(
            <Fade isOpen={true}/>,
            document.getElementById("fade")
        );
    }
    
    close(){
        this.state_renderd = false;//To tell the component it's state of render is close;
        var _t = this
        // modal_state = false;
        this.setState({
            show:"modal fade",
            opc:"1"
        })
        // 延时是为了让其动画正常进行
        setTimeout(function(){_t.setState({
            style:"none"
        })},300);
        //调亮背景
        ReactDOM.render(
            <Fade isOpen={false}/>,
            document.getElementById("fade")
        );
    }

    render(){
        if(this.props.isOpen&&(this.state_renderd!==this.props.isOpen)){
            this.open();
        }
        if((!this.props.isOpen)&&(this.state_renderd!==this.props.isOpen)){
            this.close();
        }
            return (<div>
                <div className={this.state.show} id="exampleModalLong" style={{display:this.state.style}} tabindex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>)
    }
}

class Modal_head extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="modal-header">
                {/* 标题 */}
                <h5 className="modal-title" id="exampleModalLongTitle">{this.props.children}</h5>
                <button type="button" className="close" onClick={this.props.close}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
        
    }
}

class Modal_body extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="modal-body">
                {/* 身体 */}
                {this.props.children}
            </div>           
        )
        
    }
}

class Modal_foot extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="modal-footer">
                {/* 底部 */}
                {this.props.children}
                {/* <button type="button" className="btn btn-primary" data-dismiss="modal" onClick>出售</button> */}
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.close}>Close</button>
            </div>           
        )
    }
}

class Fade extends React.Component{
    // 背景颜色
    constructor(props){
        super(props);
        this.state={
            shows:"",
            is:null
        }
        this.state_renderd = false;//渲染状态
    }

    toggle(){
        if(this.props.isOpen){
            this.state_renderd = true;
            this.setState({
                shows:"modal-backdrop fade show",
                is:()=>{
                    console.log("click")
                }
            })
        }
        else{
            this.state_renderd = false;
            this.setState({
                shows:"",
                is:null
            })
        }
    }



    render(){
        if(this.state_renderd!==this.props.isOpen){
            // this.state_renderd = !this.state_renderd//否认状态
            this.toggle()
        }
        return(
            <div className={this.state.shows} onClick={this.state.is}></div>
        )
    }


}

/*
    name:Nav
    props: teamName -- the team.name,
           choosed -- the ordinal num of the choosed nav.0.首页, 1.转账, 2.仓库, 3.情报, 
           4.商店, 5.资产管理, 6.金融操作
    return: a Nav component
*/
class Nav extends React.Component {
    // 导航栏组件
    constructor(props) {
        super(props);
        this.state = {
            navClass:["onChoose inline hide",
            "onChoose inline hide",
            "hide inline onChoose",
            "onChoose inline hide",
            "onChoose inline hide",
            "onChoose inline hide",
            "onChoose inline hide",
            "onChoose inline hide"],
            isOpen:false,
            value : {}
        };
        this.state.navClass[this.props.choosed] = "onChoose inline";
        this.handleClose = this.close.bind(this);
        this.handleOpen = this.open.bind(this);
        this.handleGetValue = this.getValue.bind(this);
        this.handleClick = this.Click.bind(this);
    }

    close(){
        this.setState({
            isOpen:false
        })
    }

    open(){
        this.setState({
            isOpen:true
        })
    }

    getValue(e,i){
        var oj = this.state.value;
        oj[i] = e.target.value;
        this.setState({
            value:oj
        })
    }

    Click(){
        if(this.state.value["surepass"]!==this.state.value["newpass"]){
            alert("新密码与确认密码不同！");
            return ;
        }
        
        var _t = this;
        $.ajax({
            type: "POST",
            url: "https://wisecity.itrclub.com/api/user/changePassword",
            data: {
                "oldPwd":_t.state.value["oldpass"],
                "newPwd":_t.state.value["newpass"]
            },
            dataType: "JSON",
            success: function (response) {
                if(response.code===200){
                    alert("修改成功");
                    _t.handleClose();
                }
                else if(response.code === 403){
                    alert("旧密码错误");
                }
                else{
                    alert("请联系管理员！");
                }
            }
        });

    }

    render() { 
        return (<React.Fragment>
            <div class="Nav">
        <div class="nav-top">
            <div class="f inline">{this.props.teamName}</div>
            <div class="d inline"><a href="https://wisecity.itrclub.com/user/logout">退出登录</a></div>
        </div>
        <div class="nav-logo">
            <img src="https://wisecity.itrclub.com/resource/img/Nav_logo.png" alt="WISECITY" />
        </div>
        <div class="first navBar">
            <div className={this.state.navClass[0]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/home.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a style={{"color":"white"}} href="index">首页</a></div>
        </div>
        <div class="navBar">
            <div className={this.state.navClass[1]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/exchange-alt.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a style={{"color":"white"}} href="payment">转账</a></div>
        </div>
        <div class="navBar">
            <div className={this.state.navClass[2]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/chart-pie.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a style={{"color":"white"}} href="warehouse">仓库</a></div>
        </div>
        <div class="navBar">
            <div className={this.state.navClass[3]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/chart-bar.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a style={{"color":"white"}} href="news">情报</a></div>
        </div>
        <div class="navBar">
            <div className={this.state.navClass[4]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/shopping-cart.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a style={{"color":"white"}} href="goods">商店</a></div>
        </div>
        <div class="navBar">
            <div className={this.state.navClass[5]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/dollar-sign.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a style={{"color":"white"}} href="asset">资产管理</a></div>
        </div>
        <div class="navBar">
            <div className={this.state.navClass[6]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/hand-pointer.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a style={{"color":"white"}} href="investment">金融操作</a></div>
        </div>
        <div class="navBar">
            <div className={this.state.navClass[7]}></div>
            <div class="icon inline">
                <span><img src="https://wisecity.itrclub.com/resource/img/icon/user-shield.png" alt="WISECITY" /></span>
            </div>
            <div class="option inline"><a onClick={this.handleOpen}>修改密码</a></div>
        </div>
        
    </div>  
    <Modal isOpen={this.state.isOpen}>
        <Modal_head close={this.handleClose}><b>修改密码</b></Modal_head>
        <Modal_body>
            <div className="row mb-3">
                <div className="col-4">原密码</div>
                <div className="col-7"><input className="form-control" value={this.state.value.oldpass} onChange={e=>this.handleGetValue(e,"oldpass")} /></div>
            </div>
            <div className="row mb-3">
                <div className="col-4">新密码</div>
                <div className="col-7"><input className="form-control" value={this.state.value.newpass} onChange={e=>this.handleGetValue(e,"newpass")} /></div>
            </div>
            <div className="row mb-3">
                <div className="col-4">确认新密码</div>
                <div className="col-7"><input className="form-control" value={this.state.value.surepass} onChange={e=>this.handleGetValue(e,"surepass")} /></div>
            </div>
        </Modal_body>
        <Modal_foot close={this.handleClose}>
            <a className="btn bg-brown" role="button" onClick={this.handleClick} >确认</a>
        </Modal_foot>
    </Modal>
    </React.Fragment>)
    }
}

// 表格组件
class T_head extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <thead className="thead-light">
                <tr>
                    {this.props.content.map((value,index)=>{
                        return(
                            <th scope="col" key={index}>{value}</th>
                        )
                    })}
                </tr>
            </thead>
        )
    }
}

class T_body extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <tbody>
                    {this.props.content.map((value,index)=>{
                        return(
                            <tr key={index}>{value.map((val,index)=>{
                                    return (<td key={index} >{val}</td>)
                                })}</tr>
                        )
                        {/* return value; */}
                    })}
            </tbody>
        )
    }
}

class T_table extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <table className="table">
                {this.props.children}
            </table>
        )
    }
}

// select 
class Select extends React.Component{
    constructor(props){
        super(props);
        this.handleget = this.Get.bind(this);
    }

    Get(e){
        this.props.get_value(e.target.value)
    }

    render(){
        return (
        <select class="custom-select" id="inputGroupSelect01" onChange={this.handleget}>
            <option selected>{this.props.value||"Choose..."}</option>
            {this.props.options.map((value,index)=>{
                return (
                    <option value={value} key={index}>{value}</option>
                )
            })}
        </select>
        )
    }
}

// Input
class Input_group extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="input-group mb-3">
                {this.props.children}
            </div>
        )
    }
}


// class ES extends React.Component{
//     // erro or success
//     constructor(props){
//         super(props);
//         this.state = {
//             isOpen:false
//         }
//     }

//     componentDidMount(){
        
//     }

//     render(){
//         return(
//             <Modal isOpen={this.state.isOpen}>

//             </Modal>
//         )
//     }
// }
    