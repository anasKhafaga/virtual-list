import React, { useEffect, useState } from 'react'
import { Layout, Avatar, theme } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
const { Header } = Layout;

const { useToken } = theme;

const PortalHeader = () => {    
  const { token } = useToken();
  const { t } = useTranslation();
  const [switchURL, setSwitchURL] = useState('');
  const { locale } = useRouter();

  useEffect(() => {
    const switchLocale = locale === 'en'? 'ar' : '';
    setSwitchURL(`${location.origin}/${switchLocale}`);
  }, [])
  
  return (
    <Header data-testid='dashboard__hdr' className='dashboard__hdr' style={{display: 'flex', justifyContent: 'flex-end', backgroundColor: '#162560',padding: 0, paddingInline: token.paddingLG}}>
      <div style={{ alignSelf: 'center'}}>
        <a href={switchURL}>
          <Avatar style={{padding: token.paddingSM}}>
            { t('switchLang') }
          </Avatar>
        </a>
      </div>
    </Header>
  )
}

export default PortalHeader
