
import React, { useState, useRef, useContext } from 'react'
import Highlighter from 'react-highlight-words'
// import { BASE_URL_CHAT_Image } from '../api/ApiConfig'
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
// import user_pic2 from '../assets/images/profile_img.svg'
import { AppContext } from "../../../context/AppContext";

export default function MensionUsersForTeam ({ users, text, index }) {
  const {
   
        membersArray,
      } = useContext(AppContext);

      console.log('usssss---->>>', users)
      
  let mensionUsersWithEveryoneArr = /* membersArray */ users && [
    // ...membersArray,
    ...users,
    {
      User_Id: 'everyone',
      FirstName: 'Everyone',
      LastName: ''
    }
  ]
  // let mensionUsersWithEveryoneArr = users && [
  //   ...users,
  //   {
  //     User_Id: 'everyone',
  //     FirstName: 'Everyone',
  //     LastName: ''
  //   }
  // ]
  const [currentUser, setCurrentUser] = useState(null)


  let resText =
    text &&
    text
      .split(' ')
      .map(item => {
        if (item[0] === '@') {
          return item?.replace('@', '')
        } else {
          return item
        }
      })
      .join(' ')

  text = resText
 
  


 
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)
  const handleClick = event => {
    console.log('event firee tal')
    setShow(!show)
    setTarget(event.target)
    let innerText = event.target.outerText
    if (users && users.length)
      setCurrentUser(
        users.filter(
          // user => innerText && innerText.includes(user.LastName, user.FirstName)
          user => innerText && innerText.includes(user.user_name)
        )[0]
      )
  }
  const highlightStyle = {
    // backgroundColor: 'yellow',
color :'#9C4900',
    fontWeight: 'bold',
    fontSize :'15px',
    backgroundColor : '#FFFFFF'

  };
 const searchWords=   mensionUsersWithEveryoneArr
  ? mensionUsersWithEveryoneArr.map(
      user => user.user_name
    )
  : []
  return (
    <div ref={ref} onClick={handleClick} className='msg-text'>
  { console.log('textrrr--->', text)}
      <Highlighter
        // highlightClassName='HighlightClass'
        highlightStyle={highlightStyle}
        onMouseLeave={e => {
          setShow(false)
        }}
        // searchWords={
        //   mensionUsersWithEveryoneArr
        //     ? mensionUsersWithEveryoneArr.map(
        //         user => user.user_name
        //       )
        //     : []
        // }
        searchWords={searchWords}
        autoEscape={true}
        // textToHighlight={text.replace('@', '')}
        textToHighlight={text}
      />
  
    </div>
  )
}
