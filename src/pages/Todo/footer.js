import React from 'react'
const Footer = () => {  
  console.log('render footer');
  function clear(){
    localStorage.clear();
    window.location.reload()
  }
  return (
    <footer>
			Copyright &copy; 2014 todolist.cn <a onClick={clear}> &nbsp; Clear All </a>
		</footer>
  )
}

export default React.memo(Footer)
