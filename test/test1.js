/*
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
            log.lonate:获取贷款记录
        }
*/
var index = 0;
var show = (e)=>{
    console.log(index+":");
    console.log(e);
    index += index;
}

ppss.listent("erro",show)
ppss.listent("news.list",show);
ppss.listent("erro.detail",show)
ppss.listent("success",show)
ppss.listent("news.exchange",show)
ppss.listent("fina.rest",show)
ppss.listent("fina.num",show)
ppss.listent("bank.list",show)
ppss.listent("log.transfer",show)
ppss.listent("log.transcation",show)
ppss.listent("log.lonate",show)
