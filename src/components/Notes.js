import React, { useState, useEffect, useRef } from 'react'
// import Axios from 'axios';
import noteService from '../services/notes.js'
import loginService from '../services/login'
import './Notes.css'
import NoteItem from './NoteItem'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import NoteForm from './NoteForm'

const Notification = ({ msg }) => {
  return msg === null
    ? null
    : <div className='error'>{ msg }</div>
}

const Notes = () => {

  const [notes, setNotes] = useState([])
  const [isShowAll, setIsShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const noteFormRef = useRef() // 从父组件来关闭这个表单有许多方法，我们来使用 React 的 ref机制，它提供了一个组件的引用

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
      // useEffect如果第二个参数是一个空数组 []，那么这个effect只在组件的第一次渲染时运行。
      // useEffect的第二个参数是一个包括了在当前 useEffect 中所使用的的变量的数组，如果其中某个变量变更【Object.is判断】了，那么在最近一次渲染后，这个useEffect会被重新执行；
      // 如果传入的是一个空数组，那么除了第一次挂载组件时会执行，其他时间更新组件的时候不会执行，因为不依赖任何变量，也就是依赖不会变更，经常被用于模拟 componentDidMount，但是还是存在区别的。
  }, [])

  //我们可以有多个effect hook
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObj) => {
    console.log(userObj)
    if (userObj.isRegister) {
      console.log('register with ', userObj.username, userObj.password)
      try {
        await loginService.register({
          username: userObj.username,
          password: userObj.password
        })

      } catch (exception) {
        setErrorMessage('wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    else {
      console.log('logging with ', userObj.username, userObj.password)
      try {
        const user = await loginService.login({
          username: userObj.username,
          password: userObj.password
        })

        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        noteService.setToken(user.token)
        setUser(user)
      } catch (exception) {
        setErrorMessage('wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

  }

  // 处理表单提交
  const handleAddNote = (noteObj) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObj)
      .then(res => {
        setNotes([...notes, res.data])
      })
  }


  // 处理checkbox  受控组件
  const onCheckBoxChange = () => {
    setIsShowAll(!isShowAll)
    // console.info(isShowAll) // isshowall not change after setting new value
  }

  const notesToShow = () => notes.filter(n => isShowAll || n.important)

  const showError = msg => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // 更改noet的important
  const onChangeImportance = (id) => {
    const note = notes.find(n => n.id === id)

    // 不建议这样做，因为变量 note 是对处于组件状态 notes 数组中某个项的引用，
    // 而且我们记得在 React 中绝不能直接修改状态。
    // note.important = !note.important
    const changedNote = { important: !note.important }
    noteService  // 我们可以用 HTTP PUT 请求替换 整个便笺，或者只用 HTTP PATCH 请求更改便笺的一些属性。
      .update(id, changedNote)
      .then(res => {
        console.info(res)
        setNotes(notes.map((n) => n.id === id ? res.data : n))
      })
      .catch(error => { // 当更改已经删除的note
        showError('error')
        console.error('err', error)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  const onDelete = (id) => {
    noteService
      .deleteNote(id)
      .then(() => {
        setNotes(notes.filter(n => n.id !== id))
      })
      .catch(error => {
        showError('delete error')
        console.error('delete err', error)
      })
  }


  // do not use the index offered by map func
  return (
    <div className="note-container">
      <Notification msg={errorMessage} />
      <div className="center note-input">
        <input id="showAll" type="checkbox" checked={isShowAll} onChange={onCheckBoxChange}/>
        <label htmlFor="showAll">ShowALL</label>

        { user === null ?
          <Togglable buttonLabel='login'>
            <LoginForm submitLogin={handleLogin} />
          </Togglable>
          :
          <div>
            <p>{user.name} logged in as {user.username}</p>
            <Togglable buttonLabel='new note' ref={noteFormRef}>
              <NoteForm submitNote={handleAddNote} />
            </Togglable>
          </div>
        }

        {/* <p>showing {isShowAll ? 'All' : 'important'}</p> */}
      </div>
      {
        notesToShow()
          .map(n => <NoteItem key={n.id}
            note={n}
            onChangeImportance={() => onChangeImportance(n.id)}
            onDelete={() => onDelete(n.id)} />)
      }
    </div>
  )
}
export default Notes
