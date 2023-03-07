import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import React,{useState,useEffect} from 'react';


class DropDownPanel extends React.Component {
  
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { counter: 0 ,dict : props.images};
  }
  getNotUsed(char,index){

    var arr = [];
    for (let index = 0; index < this.state.dict[char].length; index++) {
      const element =this.state.dict[char][index];
      arr.push(element.name)

    }
    var filtered = arr.filter((v, i, a) => a.indexOf(v) === i);
    return  filtered
  }
   onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  render() {
    const newArray=Array.from(this.props.name.toLocaleUpperCase('tr-TR'))
    let self = this
    return (
      <div className = "topPanel">
        {newArray.map((item,index)=>{

        return(   
           <Dropdown key = {index}>
          <Dropdown.Toggle  id="dropdown-button-dark-example1" variant="secondary" className={item!=' '?'dropDownButotn':'dropDownButotnEmpty'}>
            {item}
          </Dropdown.Toggle>
  
          <Dropdown.Menu variant="dark">
            {
              item!=' ' && this.getNotUsed(item,index).map((name,index2)=>{

                return      (  <Dropdown.Item onClick={()=>{this.props.handleChange(item,index,name)}}  key= {index2}active = 
                  {name==(this.props.activesForIndex[index]&&
                  this.props.activesForIndex[index].name)}
                  >{name}</Dropdown.Item>)
              })
            }
           
          </Dropdown.Menu>
        </Dropdown>)
      })}
      </div>
      
    
    );
   }
}


export default DropDownPanel;