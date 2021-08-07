

**前言**

> 初学 JS 的时候相信大家都写过一个经典案例 ：TodoList列表，曾经的也用 React 重写过，这次要用 React Hook 函数组件去实现了。
>
> 去Github 上把代码拉下来  👉  [react-hook-todolist](https://github.com/chen-zuo/react-hooks-todoList.git) 
>
> ```js
> // 1、clone
> git clone https://github.com/chen-zuo/react-hooks-todoList.git
> // 2、进入文件夹
> cd react-hooks-todoList
> // 3、安装依赖
> npm i
> // 4、运行✅
> npm run start
> ```
>
> <img src="/Users/chenzuo/Library/Application Support/typora-user-images/image-20210807132716967.png" alt="image-20210807132716967" style="zoom:25%;" />



## 1、Src 目录

<img src="/Users/chenzuo/Library/Application Support/typora-user-images/image-20210807133051334.png" alt="image-20210807133051334" style="zoom: 50%;float:left;" />		

​		















可以看出，todo 是整个页面（也可以看成一个组件），todo/index.js是入口，分别引入了header、section、footer，分别都用 React Hook去写

![image-20210807133804755](/Users/chenzuo/Library/Application Support/typora-user-images/image-20210807133804755.png)



## 2、todo

### 2.1、index.js

![image-20210807144925223](/Users/chenzuo/Library/Application Support/typora-user-images/image-20210807144925223.png)

作为入口，需要维护的就是一个 todo 的数组

```js
  const [todos, setTodos] = useState(() => {
    let collection = localStorage.getItem("__todo__");
    let arr = collection != null ? JSON.parse(collection) : [];
    return arr;
  });
```

可以看到这里创建的时候是读取了 local storage中的数据，没错了

那么对 `setTodo` 方法也是要封装一个读出和存储的功能

```js
  const saveTodo = useCallback(function (val) {
    let collection = localStorage.getItem("__todo__");
    let arr = collection != null ? JSON.parse(collection) : [];
    arr.push({ title: val, done: false, titleInput: false });
    localStorage.setItem("__todo__", JSON.stringify(arr));
    setTodos([...arr]);
  },[]);
```

可以看到对这`saveTodo`方法外面又用 `useCallback` 包装了一层，这里是为了对这个方法进行缓存，将来这个方法是要传给`header 组件`进行输入更新的，**如果不用useCallback封装每次父组件渲染都会是传入一个新的函数（函数组件渲染等于重新执行），导致子组件每次都去重新更新渲染**，我们需要使用React.memo让自组件的更新自己说了算



### 2.2、header.j s

`header组件`主要就是一个输入框，简单得用`useState` 创建一个值去存储输入框得值就行了，当输入的值需要更新到`localStorage` `todo列表` 时，调用父组件传入的更新方法`saveTodo`去更新 ，接着上面说的到的用`React.memo`去包裹函数组件，优化更新

```js
export default React.memo(Header)
```



### 2.3、footer

`footer组件`主要是有一个clearAll 方法，清空缓存并刷新页面，因为这个组建没有状态，所以没有用到hook， 用一个 `React.memo`包裹即可



## 3、其他

- css样式是使用的全局的，多数都是通配符，没有写成class类名
- todo列表的拖拽会在后面更新上去











