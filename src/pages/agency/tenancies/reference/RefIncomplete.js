import React from 'react'

const RefIncomplete = (props) => {
  return (
    <div className={props?.className ? `ref-incomplete ${props.className}`: 'ref-incomplete'}>Reference Form Not Completed</div>
  )
}

export default RefIncomplete