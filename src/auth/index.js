import React from 'react'
import { Button, NavBar, Modal,List,InputItem,TextareaItem,Toast } from 'antd-mobile'
import routeActions from 'common/utils/routeActions'
import UserAgent from 'common/utils/useragent'
import { connect } from 'dva'
import { Icon } from 'antd'
import storage from 'modules/storage'
import uuidv4 from 'uuid/v4'
import intl from 'react-intl-universal'


class Auth extends React.Component {


  state={
    address:''
  }

  componentWillReceiveProps(newProps){
    const {uuid,item} = newProps
    if(uuid === item.uuid){
      Modal.alert(intl.get('notifications.title.log_in_suc'))
      storage.wallet.storeUnlockedAddress('address', item.owner)
      window.RELAY.account.register(item.address)
       routeActions.gotoPath('/dex')
      this.props.dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid:""}}
      })
      this.props.dispatch({type: 'sockets/unlocked'});
    }
  }

  authByThirdPartyWallet = (wallet) => {
    const ua = new UserAgent()
    if(ua.isWechat()){
      Modal.alert('Open Wallet in Safari','Please click top-right corner button')
    }else{
      const {dispatch} = this.props
      const uuid = uuidv4().substring(0, 8)
      dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid}}
      })
      dispatch({type:'sockets/fetch',payload:{id:'addressUnlock'}});
      const data = {type: 'UUID', value: uuid}
      window.location = `${wallet}://${JSON.stringify(data)}`
    }
    
  }

  authByAddress = () => {
    const {address} = this.state;
    const re = new RegExp("^0x[0-9a-fA-F]{40}$")
    if(address && re.test(address)){
      storage.wallet.storeUnlockedAddress('address', address)
      window.RELAY.account.register(address)
      routeActions.gotoPath('/dex')
      this.props.dispatch({
        type: 'sockets/extraChange',
        payload: {id: 'addressUnlock', extra: {uuid:""}}
      })
      this.props.dispatch({type: 'sockets/unlocked'});
    }else{
      Toast.fail(intl.get("notifications.title.invalid_address_tip"))
    }
  }

  amountChange = (value) => {
    this.setState({address:value})
  }

  render () {
    const {uuid,item} = this.props
    const {address} = this.state;
    

    const _this = this
    return (
      <div className="bg-white" style={{height:'100vh'}}>
        <div className="pt50 pb35 pl15 pr15">
          <div className="text-center pb30">
            <img style={{height:'5rem'}} src={require('../assets/images/up-logo-notext.png')} alt=""/>
            <div className="text-primary fs20 font-weight-bold mt5 mb5">UP DEX</div>
          </div>
          <List className="no-border am-list-bg-none selectable">
            <InputItem
              type="text"
              onChange={this.amountChange}
              value={address}
              className="circle h-default color-black-2 fs13"
              placeholder="ETH Address"
              extra={<Icon hidden type="scan" />}
              clear
            >
            </InputItem>
          </List>
          <Button onClick={this.authByAddress} className="mt15" type="primary"> {intl.get('signIn.title')}</Button>
        </div>
        <div className="">
          <div className="divider 1px zb-b-t"></div>
          <div className="pt20">
            <div className="fs16 color-black-2 text-center">{intl.get('signIn.tp_title')}</div>
          </div>
          <div className="row pt15 pb15 align-items-center justify-content-center ml0 mr0">
            <div className="col-auto pl20 pr20">
              <div className="text-center" onClick={() => this.authByThirdPartyWallet('loopr-ios')}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '32px',
                  height: '36px',
                  lineHeight:'36px',
                }}>
                  <img width="100%" src={require('../assets/images/up-logo-notext.png')} alt=""/>
                </div>
                <div className="pt10 fs13 color-black-4">UP Wallet</div>
              </div>
            </div>
            <div className="col-auto pl20 pr20">
              <div className="text-center" onClick={() => {Toast.info('Coming Soon！',3,null,false)}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '36px',
                  height: '36px',
                }}>
                  <img style={{borderRadius: '6px'}} width="100%" src={require('../assets/images/loopr.png')} alt=""/>
                </div>
                <div className="pt10 fs13  color-black-4">Loopr</div>
              </div>
            </div>
            <div className="col-auto pl20 pr20">
              <div className="text-center" onClick={() => {Toast.info('Coming Soon！',3,null,false)}}>
                <div className="d-inline-block color-black-1 text-center" style={{
                  width: '36px',
                  height: '36px',
                }}>
                  <img style={{borderRadius: '6px'}} width="100%" src={require('../assets/images/imtoken.png')} alt=""/>
                </div>
                <div className="pt10 fs13 color-black-4">imToken</div>
              </div>
            </div>
            <div className="p510 pb10 text-center"style={{position:'absolute',bottom:'0',left:'0',right:'0'}}>
              <div className="fs12 color-black-4">v1.0.3</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps (state) {
  return {
    item: state.sockets.addressUnlock.item,
    uuid:state.sockets.addressUnlock.extra.uuid
  }
}

export default connect(mapStateToProps)(Auth)
