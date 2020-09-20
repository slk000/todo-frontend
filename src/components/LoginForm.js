import React, { useState } from 'react'
const LoginForm = (props) => {
  // 状态以及所有相关的函数都在组件外进行定义，并作为属性传递给组件。
  const {
    submitLogin,
  } = props

  const [username ,setUsername] = useState('')
  const [password ,setPassword] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    submitLogin({
      username: username,
      password: password,
      isRegister: event.target['isRegister'].checked
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input type="text" value={username} name="username" onChange={handleUsernameChange}/>
      </div>
      <div>
        password
        <input type="password" value={password} name="password" onChange={handlePasswordChange}/>
      </div>
      <label htmlFor="isRegister">register?</label>
      <input type="checkbox" name="isRegister" id="isRegister"></input>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm