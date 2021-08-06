import React, { useMemo } from 'react'


const Section = ({todos, setTodos}) => {
  console.log('render section');

  const listLength = useMemo(() => {
    let todoCount = 0 , doneCount = 0
    todos.forEach(item => {
      item.done ? doneCount++ : todoCount++
    })
    return [todoCount, doneCount]
  } , [todos])

  function save(arr) {
    localStorage.setItem("__todo__",JSON.stringify(arr));
    setTodos(arr)
  }
  function remove(index){
    let arr = [...todos]
    arr.splice(index,1)
    save(arr)
  }

  function checkChange(index, status) {
    let arr = [...todos]
    arr[index].done = status
    save(arr)
  }

  function focus(index){
    let arr = [...todos]
    arr[index].titleInput = true
    setTodos([...arr])
  }
  function blur(e, index){
    let arr = [...todos]
    arr[index].titleInput = false
    arr[index].title = e.target.value
    save(arr)
  }


  return (
    <section>
      <h2>正在进行 <span id="todocount">{listLength[0]}</span></h2>
      <ol id="todolist" className="demo-box">
        {todos.map((item, index) => {
          return (
            !item.done && 
            <li draggable={false} key={index}>
              <input type='checkbox' onChange={ () => checkChange(index, true)} />
              <p id={'p-' + index} onClick={ () =>  focus(index)} >{ item.title }
                { item.titleInput && <input defaultValue={item.title} type="text" onBlur={e => blur(e, index)} autoFocus/>}
              </p>
              <a onClick={ () => remove(index) }>-</a>
            </li>
          )
        })}
      </ol>
      <h2>已经完成 <span id="donecount">{listLength[1]}</span></h2>
        <ul className="donelist">
          {todos.map((item, index) => {
            return (
              item.done && 
              <li draggable={false} key={index}>
                <input type='checkbox' onChange={ () => checkChange(index ,false)} defaultChecked='checked' />
                <p id={'p-' + index} >{ item.title }</p>
                <a onClick={ () => remove(index) }>-</a>
              </li>
            )
          })}
        </ul>
			<ul id="donelist"></ul>
    </section>
  )
}
  
export default Section
