import React from 'react';
import {Link, Redirect, Route, Switch} from 'dva/router'
import {connect} from 'dva'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal';
import { TabBar,NavBar,Icon,Tabs } from 'antd-mobile';
import { Icon as WebIcon } from 'antd';
import UserCenter from '../account/UserCenter';
import Markets from '../tickers/Markets';
import PlaceOrderForm from '../orders/PlaceOrderForm';
import PlaceOrder from 'mobile/orders/PlaceOrderPage';
import HelperOfDepth from '../orders/HelperOfDepth';
import HelperOfMyMarketOrders from 'mobile/orders/HelperOfMyMarketOrders';
import ListMarketFills from '../fills/ListMarketFills';
import HelperOfBalance from '../orders/HelperOfBalance';
import MarketTitckers from 'mobile/tickers/ListMarketTickers';
import Header from './Header'
import PanelHeader from './PanelHeader'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {match,location,dispatch} = this.props;
    const showLayer = (id)=>{
      dispatch({
        type:"layers/showLayer",
        payload:{id}
      })
    }
    return (
      <div style={{height:'100vh',overflow:'none' }}>
        <div className="pl5 pr0" style={{height:'6.5rem',paddingTop:'0rem'}}>
         <Header />
        </div>
        <div className="row no-gutters ml0 mr0">
          {
            false &&
            <div className="col-auto p5 pr0" style={{height:'94vh',width:'35rem'}}>
              <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
                <PanelHeader title="Markets" />
                <div className="divider 1px zb-b-t"></div>
                <MarketTitckers />
              </div>
            </div>
          }
          <div className="col-auo p5 pr0" style={{height:'94vh',width:'40rem'}}>
            <div className="bg-white" style={{overflow:'auto',height:'auto'}}>
              <PanelHeader title="Place Order" />
              <div className="divider 1px zb-b-t"></div>
              <div className="pt5 pb5">
                <PlaceOrderForm location={location} match={match} />
              </div>
            </div>
            <div className="bg-white mt5" style={{overflow:'auto',height:'auto'}}>
              <PanelHeader title="Balances" />
              <div className="divider 1px zb-b-t"></div>
              <HelperOfBalance />
            </div>
            <div className="bg-white mt5" style={{overflow:'auto',height:'auto'}}>
              <PanelHeader title="Orders" extra={"All"}/>
              <div className="divider 1px zb-b-t"></div>
              <HelperOfMyMarketOrders/>
            </div>

          </div>
          <div className="col-auto p5 pr0" style={{height:'94vh',width:'32.5rem'}}>
            <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
              <PanelHeader title="Order Book" />
              <div className="divider 1px zb-b-t"></div>
              <HelperOfDepth />
            </div>
          </div>
          <div className="col p5 pr0" style={{height:'94vh'}}>
            <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
              <PanelHeader title="Kline Chart" />
              <div className="divider 1px zb-b-t"></div>
            </div>
          </div>
          <div className="col-auto p5 pr0" style={{height:'94vh',width:'32.5rem'}}>
            <div className="bg-white pb5" style={{overflow:'auto',height:'100%'}}>
              <PanelHeader title="Trade History" />
              <div className="divider 1px zb-b-t"></div>
              <ListMarketFills />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default connect()(Home)
