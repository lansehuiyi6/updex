import React from 'react'
import { NavBar, Tabs } from 'antd-mobile'
import { Icon as WebIcon } from 'antd'
import { connect } from 'dva'
import routeActions from 'common/utils/routeActions'
import { getTokensByMarket } from 'modules/formatter/common'
import Face2FaceOrders from './Face2FaceOrders'
import HelperOfBalances from './HelperOfBalances'
import Face2FaceForm from './Face2FaceForm'
import intl from 'react-intl-universal'

class Face2FacePage extends React.Component {
  render() {
    const {dispatch,placeOrder} = this.props
    const {side,pair} = placeOrder
    const pairTokens = getTokensByMarket(pair)
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
    const sideChange = (side)=>{
      dispatch({
        type:'placeOrder/sideChangeEffects',
        payload:{
          side
        }
      })
   }

   const gotoTrade = ()=>{
      routeActions.gotoPath(`/dex/markets/${pair}`)
    }
    return (
        <div className="">
          <div className="bg-white">
            <NavBar
              className="zb-b-b"
              mode="light"
              leftContent={[
                <span onClick={()=>showLayer({id:'helperOfFAQ'})} className="text-primary" key="1"><WebIcon type="question-circle-o" /></span>
              ]}
              rightContent={[
                <span  onClick={()=>{}} className="text-primary" key="1" ><WebIcon type="swap" /></span>
              ]}
            >
              <div className="color-black">
                Person To Person
              </div>
            </NavBar>
          </div>
          <div className="bg-white">
            <Face2FaceForm side="sell" showLayer={showLayer} />
            <div className="divider 1px zb-b-t"></div>
          </div>
          <div className="bg-white mt10">
            <div className="fs16 pt10 pb10 pl15 color-black-1">Markets</div>
            <div className="zb-b-t">
              <HelperOfBalances />
            </div>
          </div>
          
          <div className="bg-white mt10">
            <div className="fs16 pt10 pb10 pl15 color-black-1">My Wallet</div>
            <div className="zb-b-t">
              <HelperOfBalances />
            </div>
          </div>
          <div className="bg-white mt10">
            <div className="fs16 pt10 pb10 pl15 color-black-1">My Orders</div>
            <div className="zb-b-t">
              <Face2FaceOrders />
            </div>
          </div>
        </div>
    );
  }
}
export default connect(({placeOrder})=>({placeOrder}))(Face2FacePage)





