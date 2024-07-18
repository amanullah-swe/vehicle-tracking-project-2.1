import React, { useContext, useEffect, useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'
import { AppContext } from '../../../context/AppContext'
// import './mentionsStyles.css'
import mentionStyles from './mentionStyles'

export default function Mesnsion ({

  sendMessage,
  replyTo,
  uploadedFiles,
  setUploadedFiles,
  message,
  setMessage,
  setMenstionedUsers,
  menstionedUsers,
  inputRef,

}) {
  const {
    userTyping,
    membersArray,
    setMembersArray,

    currentSChannel,
    socket,
    customerData
  } = useContext(AppContext)
  const mentionStyle = {
    control: {
      border: 'none',
      outline:'none',
      height: '85%',
      width: '90%',  // Set width to 90%
      marginLeft: '2.5rem', // Adjust margin as needed
      padding: 0,
      fontSize: 14,
      fontWeight: 'normal',
      '&:focus': {
        border: 'none',  // Ensure no border on focus
        outline: 'none'  // Remove outline on focus
      }
    },
    '&multiLine': {
      control: {
        // minHeight: 63
        outline:'none',
      },
      highlighter: {
        padding: 9,
        border: 'none',
        outline:'none',
      },
      input: {
        padding: 9,
        border: 'none',
        outline:'none',
      }
    },
    '&singleLine': {
      display: 'inline-block',
      border: 'none',
      outline:'none',

    },
    suggestions: {
      list: {
        backgroundColor: 'white',
        border: '1px solid #9C4900',
        outline:'none',
        boxShadow :'2px 2px', 
        fontSize: 14
      },
      item: {
        padding: '5px 15px',
        border: 'none',
        outline:'none',
        '& :focuse': {
          backgroundColor: '#9C4900',
          color: 'white',
          border:'none',
          borderRadius : 'none',
        },
        // '&hovered': {
        //   backgroundColor: 'aqua', // Example hover background color
        //   color: '#333',              // Example hover text color
        // }
      }
    },
    mention: {
      backgroundColor: '#9C4900',
      color: '#007bff',
      outline:'none',
      
    },
    textarea: {  // Directly style the textarea
      // width: '10% !important',  // Set width to 90% with !important
      height: '100%',  // Ensure height matches control height
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      letterSpacing: 'inherit',
      resize: 'none',
      border: 'none',
      outline:'none',
      padding: '9px',
      outline: 'none',  // Ensure no outline on textarea
      boxSizing: 'border-box',
    }
  };
  
  
  
  
  




console.log("membersArray",membersArray);
  const mentionMembers = membersArray
    .filter(user => Number(customerData.User_id) !== user.user_id)
    .map(user => {
      return {
        id: user?.user_id,
        display: user?.user_name 
      }
    })
console.log("mentionMembers",mentionMembers);

  // menstionedUsers




  return (
    <>
      <MentionsInput
        inputRef={inputRef}
        // id='mentionInput'
        // className='form-data'
        value={message}
        onChange={e => {
          setMessage(e.target.value)
        }}
        placeholder={"Type a message here Or Mention people using '@'"}
        a11ySuggestionsListLabel={'Suggested mentions'}
        allowSpaceInQuery={true}
        style={mentionStyle}
        // style={{ 
        //   border: 'none',      // Ensure no border
        //   height: '85%',       // Set height to 85% (adjust as needed)
        //   width: '92%',        // Set width to 92% (adjust as needed)
        //   marginLeft: '2.4rem' // Adjust marginLeft as needed
        // }}
        spellCheck={true}
        onKeyUp={e => {
        
          
          if (e.key === 13 && !e.shiftKey) {
            e.preventDefault()
          }
          if (e.key === 'Enter' && !e.shiftKey) {
            // if (message.length ) {
              
              sendMessage(message, replyTo, menstionedUsers)
         
              setMessage('')
              setMenstionedUsers([])
            // }
          }
        }}
        appendSpaceOnAdd={true}
        allowSuggestionsAboveCursor={true}
        forceSuggestionsAboveCursor={true}
      >
        <Mention
          appendSpaceOnAdd={true}
          onAdd={selectedUser => {
            let filterObj =
              mentionMembers &&
              mentionMembers.find(item => item.id === selectedUser)

            let filterMembersWithoutEveryone =
              mentionMembers &&
              mentionMembers.filter(ele => ele.id !== 'everyone')
            selectedUser === 'everyone'
              ? setMenstionedUsers(filterMembersWithoutEveryone)
              : setMenstionedUsers([...menstionedUsers, filterObj])
          }}
          data={mentionMembers && mentionMembers}
          // className="mention"
        style={{backgroundColor:'red'}}
        />
      </MentionsInput>
    </>
  )
}
