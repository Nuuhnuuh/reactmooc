import { useState, useImperativeHandle } from 'react'

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
        return { toggleVisibility }
    })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.labelVisible}</button>
      </div>
      <div style={showWhenVisible}>

        {props.children}
        <button onClick={toggleVisibility}>{props.labelHidden}</button>
      </div>
    </div>
  )
}

export default Toggleable
