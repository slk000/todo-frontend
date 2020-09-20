import React, { useState, useImperativeHandle } from 'react'

// 创建组件的函数被包裹在了forwardRef(...) 函数调用。利用这种方式可以访问赋给它的引用。
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // 组件利用useImperativeHandle Hook来将toggleVisibility 函数能够被外部组件访问到
  // 通过调用 noteFormRef.current.toggleVisibility() 控制表单的可见性了
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )

})

Togglable.displayName = 'Togglable'
export default Togglable