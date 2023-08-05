'use client';

import {Toaster} from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        style:{
          border:"2px solid navy",
          padding:"20px",
          width:"820px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          fontSize:'24px'
        }
      }}
    />
  )
}
