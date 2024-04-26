import React from 'react'
import { Layout, theme } from 'antd'

const { useToken } = theme;

const Content = ({ children }: { children: React.ReactNode }) => {
  const { token } = useToken();
  return (
    <Layout.Content style={{ backgroundColor: '#F0F1F2', overflow: 'auto', height: 'calc(100vh - 64px)', padding: token.paddingLG }}>
      { children }
    </Layout.Content>
  )
}

export default Content