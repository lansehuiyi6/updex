import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import routeActions from 'common/utils/routeActions'
import {getTokensByMarket} from 'modules/formatter/common'
import * as tokenFormatter from 'modules/tokens/TokenFm'

const HelperOfBalance = (props)=>{
  const {dispatch,pair,balance} = props
  const marketTokens = getTokensByMarket(pair)
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const tokens = getTokensByMarket(pair)
  const relatedTokens = new Array()
  const balanceL = {
    symbol:tokens.left,
    name:tokens.left,
    ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokens.left, toUnit:true})
  }
  const balanceR = {
    symbol:tokens.right,
    name:tokens.right,
    ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:tokens.right, toUnit:true})
  }
  relatedTokens.push(balanceL)
  relatedTokens.push(balanceR)
  if(tokens.right === 'WETH') {
    relatedTokens.push({
      symbol:'ETH',
      name:'ETH',
      ...tokenFormatter.getBalanceBySymbol({balances:balance, symbol:'ETH', toUnit:true})
    })
  }
  // TODO
  // get market Related Tokens
  // const relatedTokens = [
  //   {
  //     symbol:"LRC",
  //     name:"Loopring",
  //     balance:12680.0001,
  //     required:15000.0001,
  //   },
  //   {
  //     symbol:"WETH",
  //     name:"Wrap ETH",
  //     balance:21.3652,
  //     required:20.1278,
  //   },
  //   {
  //     symbol:"ETH",
  //     name:"Ethereum",
  //     balance:85.0001,
  //     required:0.0001,
  //   },
  // ]
  const gotoReceive = (payload)=>{
    // TODO
    // routeActions.gotoPath('/dex/receive')
  }
  const gotoConvert = (payload)=>{
    // TODO
    // routeActions.gotoPath('/dex/convert')
  }
  const gotoAll = (payload)=>{
    // TODO
    // routeActions.gotoPath('/dex/convert')
  }

  return (
    <div className="fs20">
      <table className="w-100 fs13">
        <thead>
          <tr className="">
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Token</th>
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Balance</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Actions</th>
          </tr>
        </thead>
        <tbody>
            {
              relatedTokens.map((token,index)=>
                <tr key={index} onClick={()=>{}}>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">
                    {token.symbol}
                    <span hidden className="color-black-3 ml5">{token.name}</span>
                  </td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{token.balance.toString(10)}</td>
                  <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">
                    {
                      false && token.symbol === 'ETH' &&
                      <a onClick={gotoConvert.bind(this,{type:"eth2weth"})}>Convert</a>
                    }
                    {
                      token.symbol === 'WETH' &&
                      <a onClick={gotoConvert.bind(this,{type:"weth2eth"})}>Convert</a>
                    }
                    {
                      token.symbol !== 'WETH' &&
                      <a onClick={gotoReceive.bind(this,{symbol:token.symbol})}>Receive</a>
                    }
                  </td>
                </tr>
              )
            }
        </tbody>
      </table>
      <div className="p10 zb-b-b mb15">
        <Button onClick={gotoAll} type="" size="small" style={{height:"36px",lineHeight:'36px'}}className="d-block w-100 fs14 bg-none">View all assets</Button>
      </div>
    </div>
  )
}
export default connect(({
  placeOrder:{pair},
  sockets,
})=>({
  pair,balance:sockets.balance.items
}))(HelperOfBalance)





