import React from 'react'
import ReactDOM from 'react-dom'
import {Card} from 'antd'
import { PickerView, NavBar,Icon } from 'antd-mobile';
import intl from 'react-intl-universal'
import {connect} from 'dva'
import moment from 'moment'
import storage from 'modules/storage'

class TTLForm extends React.Component {
  render() {
    const { placeOrder,dispatch } = this.props
    const {validUntil} = placeOrder
    let defaultTo = moment().add(1, 'months')
    if(validUntil) defaultTo = validUntil

    function timeToLiveValueChange(e) {
      const start = moment()
      const end = moment(e)
      dispatch({type:'placeOrder/validTimeChange', payload:{validSince: start, validUntil: end}})
    }
    const hideLayer = (payload = {}) => {
      dispatch({
        type: 'layers/hideLayer',
        payload: {
          ...payload
        }
      })
    }
    const options = [
      {label:'1 Hour',value:'1h'},
      {label:'1 Day',value:'1d'},
      {label:'1 Week',value:'7d'},
      {label:'1 Month',value:'1m'},
    ]
    return (
      <div className="bg-white" style={{height:'100%'}}>
        <NavBar
          className="zb-b-b"
          mode="light"
          onLeftClick={() => hideLayer({id:'setTTL'})}
          leftContent={[
            <span key='1' className=""><Icon type="cross"/></span>,
          ]}
        >
          <div className="color-black-1">{intl.get('setting_ttl.title')}</div>
        </NavBar>
        <div className="zb-b-b">
          <PickerView
            data={options}
            value={'1h'}
            cols={1}
            locale={storage.settings.get().preference.language}
            onChange={timeToLiveValueChange}
          />
        </div>
      </div>
    );
  }
}
function mapToProps(state) {
  return {
    placeOrder:state.placeOrder,
    settings:state.settings,
  }
}
export default connect(mapToProps)(TTLForm)

