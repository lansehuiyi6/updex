import React from 'react'
import Containers from 'modules/containers'
import UiContainers from 'LoopringUI/containers'
import Settings from 'mobile/account/Settings'
import UserCenter from './UserCenter'
import Tasks from 'mobile/notifications/ListTodos'

function Modals(props) {
  return (
    <div>
      <Containers.Layers id="settings">
        <UiContainers.Panels position="right" id="settings" style={{width:'480px',height:'100%'}}>
          <Settings />
        </UiContainers.Panels>
      </Containers.Layers>
      <Containers.Layers id="usercenter">
        <UiContainers.Panels position="right" id="usercenter">
          <UserCenter />
        </UiContainers.Panels>
      </Containers.Layers>
      <Containers.Layers id="tasks">
        <UiContainers.Panels position="right" id="tasks" wrapClassName="modal-wrapper">
          <Tasks />
        </UiContainers.Panels>
      </Containers.Layers>

    </div>
  )
}
export default Modals
