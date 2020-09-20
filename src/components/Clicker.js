import React, { useState } from 'react'

// Part1 Clicker

// const ClicksHistory = ({clicks}) => {
//   let msg = ""
//   if (clicks.length == 0) {
//     msg = "recording click history"
//   }
//   else {
//     msg = clicks.join('')
//   }
//   return (
//      <div>{msg}</div>
//   )
// }

const ClicksHistory = ({ clicks }) =>
  (clicks.length === 0)? 'recording click history':clicks.join('')

const Clicker = () => {
  // const [left, setLeft] = useState(0)
  // const [right, setRight] = useState(0)
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    setClicks({
      left: clicks.left + 1,
      right: clicks.right // 不可省略？
    })
    setAllClicks(allClicks.concat('L'))
  }
  // 或者按以下方式省略
  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1
    })
    setAllClicks(allClicks.concat('R'))
  }

  return (
    <div>
      <p>
        left: {clicks.left} &nbsp;
        <button onClick={handleLeftClick}>setLeft</button>
      </p>
      <p>
        right: {clicks.right} &nbsp;
        <button onClick={handleRightClick}>setRight</button>
      </p>
      <p><ClicksHistory clicks={allClicks}/></p>
    </div>
  )
}
export default Clicker