import React, { useState } from 'react'

const Header = (props) => {
  console.log('render header');
  const { saveTodo } = props
  const [val, setVal] = useState('')

  function postaction(e){
    e.preventDefault()||(e.returnValue=false)
    saveTodo(val)
    setVal('')
  }

  function input(e){ 
    setVal(e.target.value)
  }
  
  return (
    <header>
      <section>
        <form onSubmit={postaction} id="form">
          <label htmlFor="title">ToDoList</label>
          <input value={val} onInput={input} type="text" id="title" name="title" placeholder="添加ToDo" required="required" autoComplete="off"/>
        </form>
      </section>
    </header>
  )
}

export default React.memo(Header)

