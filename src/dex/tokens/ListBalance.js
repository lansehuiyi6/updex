import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Grid,NoticeBar } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch } from 'antd';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import * as tokenFormatter from 'modules/tokens/TokenFm'
import {toNumber,toBig,toFixed} from "LoopringJS/common/formatter";
import TokensFm from 'modules/tokens/TokensFm'
import intl from 'react-intl-universal';

const Item = List.Item;
const Brief = Item.Brief;

const TokenListComp = (props)=>{
  const {tokens,balance,marketcap, dispatch} = props
  const tokensFm = new TokensFm({tokens, marketcap, balance})
  const formatedTokens = tokensFm.getList()

  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const showReceive = (symbol) => {
    dispatch({type: 'layers/showLayer', payload: {id: 'receiveToken',symbol}});
  }

  const showConvert = (token) => {
    dispatch({type: 'layers/showLayer', payload: {id: 'convertToken',token}});
  }
  return (
    <div className="fs20">
      <table className="w-100 fs13">
        <thead>
          <tr className="">
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.token')}</th>
            <th className="text-left zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.balance')}</th>
            <th className="text-right zb-b-b pl10 pr10 pt5 pb5 font-weight-normal color-black-3">{intl.get('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
            {
              formatedTokens.map((token,index)=>{
                return (
                  <tr key={index} onClick={showLayer.bind(this,{id:'tokenNotEnough'})}>
                    <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">
                      {token.symbol}
                      <span hidden className="color-black-3 ml5">{token.symbol}</span>
                    </td>
                    <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left">{toFixed(token.balance, token.precision)}</td>
                    <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right">
                      {
                        token.symbol === 'ETH' &&
                        <Button type="primary" style={{height:'24px',lineHeight:'24px'}} className="d-inline-block ml5" size="small" onClick={() => showConvert('WETH')}>{intl.get('common.convert')}</Button>
                      }
                      {
                        token.symbol === 'WETH' &&
                        <Button type="primary" style={{height:'24px',lineHeight:'24px'}} className="d-inline-block ml5" size="small" onClick={() => showConvert('ETH')}>{intl.get('common.convert')}</Button>
                      }
                      <Button type="ghost" style={{height:'24px',lineHeight:'24px'}} className="d-inline-block ml5" size="small" onClick={() => showReceive(token.symbol)}>{intl.get('common.receive')}</Button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    </div>
  )
}
export default connect(({
  sockets,
  tokens
}) => ({
  balance:sockets.balance,
  marketcap:sockets.marketcap,
  tokens
}))(TokenListComp)





