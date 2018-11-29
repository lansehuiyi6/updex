import React from 'react'
import { Icon } from 'antd'
import { NavBar, Button } from 'antd-mobile'
import intl from 'react-intl-universal'
import { connect } from 'dva'
import {MetaItem} from 'LoopringUI/components/Metas'

function Resend(props) {
  const {dispatch} = props
  // if(!order){
  //   return null
  // }
  const showLayer = (payload={})=>{
    dispatch({
      type:'layers/showLayer',
      payload:{
        ...payload
      }
    })
  }
  const hideLayer = (payload={})=>{
    dispatch({
      type:'layers/hideLayer',
      payload:{
        ...payload
      }
    })
  }
  return (
    <div className="bg-white d-flex-column" style={{height:"100%"}}>
      <NavBar
        className="bg-white"
        mode="light"
        onLeftClick={()=>hideLayer({id:'resend'})}
        leftContent={[
          <span key='1' className=""><Icon type="close"/></span>,
        ]}
        rightContent={null && [
          <Icon key="1" type="question-circle-o"/>,
        ]}
      >
        <div className="color-black">{intl.get('tx_resend.page_title')}</div>
      </NavBar>
      <div className="bg-white"><div className="divider 1px zb-b-t"></div> </div>
      <div style={{flex:1,overflow:'auto',minHeight:'30vh'}}>
        <div className="">
          <MetaItem className="fs14" label={intl.get('tx.type')} value={'x'}/>
          <MetaItem className="fs14" label={intl.get('tx.gas')} onClick={()=>showLayer({id:'helperOfGas'})} value={<span className="text-primary fs12">0.0000 ETH</span>}
            showArrow={true}
          />
        </div>
      </div>
      <div className="p15">
        <Button size="" type="primary" className="text-normal">{intl.get('tx_resend.actions_send')}</Button>
      </div>
      
    </div>
  )
}
export default connect()(Resend)
