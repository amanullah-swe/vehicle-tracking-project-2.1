import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const BackDropLoader = () => {
  return (
    <div id='backdrop'>
      <div class='center-loading loading'>
        {/* <div class="spinner-border text-light" role="status">
        </div> */}
        <RotatingLines
          strokeColor='#9c4900'
          strokeWidth='1.3'
          animationDuration='0.75'
          width='80'
          visible={true}
        />
      </div>
    </div>
  )
}

export default BackDropLoader
