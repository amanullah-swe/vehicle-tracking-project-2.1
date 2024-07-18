import React from 'react'
import { useTranslation } from 'react-i18next';

const NoMoreDataComp = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className='no-more-data-wrapper'>
        <label>{t("No more data to show")}</label>
    </div>
  )
}

export default NoMoreDataComp