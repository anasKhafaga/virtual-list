import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;

const PortalHeader = () => {    
  return (
    <Header data-testid='dashboard__hdr' className='dashboard__hdr' style={{display: 'flex', backgroundColor: '#162560',padding: 0}}>
    </Header>
  )
}

export default PortalHeader
