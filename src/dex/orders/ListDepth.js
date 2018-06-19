import React from 'react';
import { List, InputItem,Button,WingBlank,Slider, Tabs, WhiteSpace, Badge,SegmentedControl, NavBar, Icon,Modal,Switch,Steps } from 'antd-mobile';
import { Icon as WebIcon,Switch as WebSwitch,Spin } from 'antd';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Containers from 'modules/containers';
import UiContainers from 'LoopringUI/containers'
import routeActions from 'common/utils/routeActions'
import intl from 'react-intl-universal'

const ListDepth = ({depth={},maxRows=5})=>{
  // const maxHeight = (60*maxRows+32) + 'px'
  const maxHeight = 'auto'
  return (
    <div style={{maxHeight,overflow:'auto'}}>
      <div className="row no-gutters ml0 mr0">
        <div className="col-6">
          <Spin spinning={depth.loading}>
            <table className="w-100 fs13">
              <thead>
                <tr className="">
                  <th className="zb-b-b text-left pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Amount</th>
                  <th className="zb-b-b text-right pl10 pr5 pt5 pb5 font-weight-normal color-black-3">Buy</th>
                </tr>
              </thead>
              <tbody>
                  {
                    depth.item && depth.item.buy && depth.item.buy.map((item,index)=>
                      <tr key={index}>
                        <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-left align-middle">
                          {Number(item[1]).toFixed(4)}
                        </td>
                        <td className="pl10 pr5 pt10 pb10 zb-b-b text-right color-green-500 align-middle">
                          {Number(item[0]).toFixed(8)}
                          <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                        </td>
                      </tr>
                    )
                  }
                  {
                    depth.item && depth.item.buy && depth.item.buy.length == 0 &&
                      <tr>
                        <td colSpan="10" className="p10 zb-b-b text-center align-middle">
                          {intl.get('common.list.no_data')}
                        </td>
                      </tr>
                  }
              </tbody>
            </table>
          </Spin>
        </div>
        <div className="col-6">
          <Spin spinning={depth.loading}>
            <table className="w-100 fs13">
              <thead>
                <tr className="">
                  <th className="zb-b-b text-left pl5 pr10 pt5 pb5 font-weight-normal color-black-3">Sell</th>
                  <th className="zb-b-b text-right pl10 pr10 pt5 pb5 font-weight-normal color-black-3">Amount</th>
                </tr>
              </thead>

                <tbody>
                    {
                      depth.item && depth.item.sell && depth.item.sell.map((item,index)=>
                        <tr key={index}>
                          <td className="pl5 pr10 pt10 pb10 zb-b-b text-left color-red-500 align-middle">
                            {Number(item[0]).toFixed(8)}
                            <div hidden className="fs12 color-black-4 mr5">￥8.52</div>
                          </td>
                          <td className="pl10 pr10 pt10 pb10 zb-b-b color-black-2 text-right align-middle">
                            {Number(item[1]).toFixed(4)}
                          </td>
                        </tr>
                      )
                    }
                    {
                      depth.item && depth.item.sell && depth.item.sell.length == 0 &&
                        <tr>
                          <td colSpan="10" className="p10 zb-b-b text-center align-middle">
                            {intl.get('common.list.no_data')}
                          </td>
                        </tr>
                    }
                </tbody>
            </table>
          </Spin>
        </div>
      </div>

    </div>
  )
}

export default connect(
  ({sockets:{depth}})=>({depth})
)(ListDepth)
