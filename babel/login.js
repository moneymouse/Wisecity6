class Input extends React.Component{
    constructor(props){
        super(props)
        this.handleget = this.Get.bind(this);//在输入时调用函数向上传递input中的值
        this.props.value = this.props.value || "";
        this.handlekey = this.Key.bind(this);//在键盘被点击时向上返回键盘对象
    }

    Get(e){
        var value = e.target.value;//input框中的值
        // console.log(value);
        this.props.onGet(value);
    }

    Key(e){
        this.props.onKey(e)
    }

    render(){
        return (
            <React.Fragment>
                <input className="form-control" type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleget} onKeyDown={this.handlekey} />
            </React.Fragment>
        )
    }
}

class Button extends React.Component{
    constructor(props){
        super(props);
        this.props.class = this.props.class || ""
        this.props.value = this.props.value || "button"
    }

    render(){
        return (
            <button type="button" className={this.props.class} onClick={this.props.click} >{this.props.value}</button>
        )
    }
}

class Form extends React.Component{
    constructor(props){
        super(props)
        this.props.class = this.props.class ? (this.props.class+" "+"form") : "form";
        this.handleget = [this.Get.bind(this,0),this.Get.bind(this,1)];
        this.handleclick = this.Click.bind(this);
        this.handlekey = this.Keydown.bind(this);
        this.input_value = [];
    }

    Get(index,value){
        this.input_value[index] = value;
    }

    Click(){
        if(this.input_value[0]!=undefined&&this.input_value[1]!=undefined){
            $.ajax({
                type: "POST",
                url: "https://wisecity.itrclub.com/user/toLogin",
                data: {
                    "userName":this.input_value[0],
                    "password":this.input_value[1]
                },
                dataType: "JSON",
                success: function (response) {
                    if(response.code==200){
                        // alert("登录成功");
                        location.href = response.data['url'];
                    }
                    else if(response.code === 403){
                        alert("用户名或密码错误！")
                    }
                    else{
                        alert("登录失败\n错误码:"+response.code+"\n错误内容:"+response.message);
                    }
                }
            });
        }
    }

    Keydown(e){
        if(e.keyCode=="13"){
            this.Click();
        }
    }

    render(){
        return (
            <React.Fragment>
                <div className={this.props.class}>
                    <div className="hh"><img src="https://wisecity.itrclub.com/resource/img/wisecity_logo.png" alt="wisecity" /></div>
                    <div className={"tips"}>用户名/user ID</div>
                    <Input type="text" onGet={this.handleget[0]} onKey={this.handlekey} />
                    <div className={"tips tip"}>密码/password</div>
                    <Input type="password" onGet={this.handleget[1]} onKey={this.handlekey} />
                    <div className="forget"><a onClick={e=>{alert("请联系 穿着荧光黄外套 的技术支持(小生蚝)~")}}>忘记密码？/Forget？</a></div>
                    <Button value="登录" class="t btn btn-p" click={this.handleclick} />
                    
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <Form  />,
    document.getElementById("root")
)
