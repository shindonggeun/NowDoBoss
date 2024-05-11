import { useState } from 'react'
import * as t from '@src/components/styles/profile/TabBarStyle'

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('전체')

  return (
    <t.Container>
      <t.TabItem
        $isActive={activeTab === '전체'}
        onClick={() => setActiveTab('전체')}
      >
        전체
      </t.TabItem>
      <t.TabItem
        $isActive={activeTab === '상권분석'}
        onClick={() => setActiveTab('상권분석')}
      >
        상권분석
      </t.TabItem>
      <t.TabItem
        $isActive={activeTab === '상권추천'}
        onClick={() => setActiveTab('상권추천')}
      >
        상권추천
      </t.TabItem>
      <t.TabItem
        $isActive={activeTab === '창업시뮬레이션'}
        onClick={() => setActiveTab('창업시뮬레이션')}
      >
        창업시뮬레이션
      </t.TabItem>
    </t.Container>
  )
}

export default TabBar
