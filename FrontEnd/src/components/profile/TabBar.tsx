import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TabBarPropsType } from '@src/types/ProfileType'
import * as t from '@src/components/styles/profile/TabBarStyle'

const TabBar = (props: TabBarPropsType) => {
  const { tabs } = props
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(tabs[0].label)

  // 경로 변경 감지 및 activeTab 업데이트
  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === location.pathname)
    if (currentTab) {
      setActiveTab(currentTab.label)
    }
  }, [location, tabs])

  const handleTabClick = (path: string) => {
    navigate(path) // 지정된 경로로 이동
  }

  return (
    <t.Container>
      {tabs.map(tab => (
        <t.TabItem
          key={tab.label}
          $isActive={activeTab === tab.label}
          onClick={() => {
            setActiveTab(tab.label)
            handleTabClick(tab.path)
          }}
        >
          {tab.label}
        </t.TabItem>
      ))}
    </t.Container>
  )
}

export default TabBar
