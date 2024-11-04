/* eslint-disable no-undef */
//import React from 'react'
import './App.css'
//import Button from './components/Button/Button'
//import CardButton from './components/CardButton/CardButton'
//import JournalItem from './components/JournalItems/JournalItem'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Body from './layouts/Body/Body'
import Header from './components/Header/Header'
import JournalList from './components/JournalList/JournalList'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import {useState} from 'react'

const INITIAL_DATA = [
    
]

function App() {
  const [items, setItems] = useState(INITIAL_DATA);

  const addItem = item => {
    setItems(oldItems => [...oldItems,{
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
    }]);
  }
    
  return (
    <div className='app'>

      <LeftPanel>
        <Header/>
        <JournalAddButton/>
        <JournalList items = {items} />
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem}/>
      </Body>
     
    </div>    
  )
}

export default App
