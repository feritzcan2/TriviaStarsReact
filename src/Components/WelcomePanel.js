import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React,{useState,useEffect} from 'react';

function WelcomePanel(name) {
  const newArray=Array.from(name)

  return (
    <div className = "welcomePanel">
      <h1 style={{color:'#352477'}}>{name.toLocaleUpperCase('tr-TR')} </h1>
      <h6 style={{color:'#352477'}}>için hazırlanmış özel bir kitap</h6>
      <h6 style={{color:'#352477'}}>Aşağıdaki harflere tıklayarak istediğiniz öyküyü seçebilirsiniz..</h6>
    </div>
  );
}

export default WelcomePanel;