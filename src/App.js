import { useState } from "react";
import "./App.css";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [inputValue, setinputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [color, setColor] = useState("bg-gray-300");
  const [btnShow, setbtnShow] = useState(false);
  const [globalId, setGlobalId] = useState(0);

  const messageToast = (status,text) => {
    if(status){
      toast.success(text, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }else{
      toast.error(text, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };


  const add = () => {
    if(inputValue===""){
      messageToast(false,"Lütfen boş alanları doldurunuz")
    }
    else{
      messageToast(true,"Başarıyla Eklendi")
      const newObject = {
        text: inputValue,
        color: color,
        id: Math.floor(Math.random() * 999590),
        isCompleted: false,
      };
      setTodos([...todos, newObject]);
      setinputValue("")
    }
    
    
  };

  const getTodoCount = (status) => {
    const newArray = todos.filter((item) => item.isCompleted == status);
    return newArray.length;
  };

  const remove = (id) => {
    const removeArray = todos.filter((item) => item.id !== id);
    setTodos(removeArray);
    messageToast(true,"Todo Silindi")
  };

  const funcSuccess = (id) => {
    const funcSuccess = todos.map(item => {
      if (item.id == id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      }
      return item;
    });
    setTodos(funcSuccess);
    setinputValue("");
  };

  const beforeUpdate = (id) => {
    const getItem = todos.find((item) => item.id == id);
    setGlobalId(id)
    setinputValue(getItem.text);
    setbtnShow(true);
  };

  const update=()=>{
    const funcUpdate = todos.map(item=>{
      if(item.id == globalId){
        return{
          ...item,
          text:inputValue,
          color:color
        }
      }
      return item
    })
    setTodos(funcUpdate)
    setinputValue("")
    setbtnShow(false)
    messageToast(true,"Başarıyla Güncellendi")
  }



  return (
    <div>
      <ToastContainer/>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Todo Interface
          </h1>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                value={inputValue}
                onChange={(e) => setinputValue(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="New todo"
              />
              {btnShow ? (
                <button
                  onClick={update}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  <BsFillPencilFill />
                </button>
              ) : (
                <button
                  onClick={add}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                >
                  <AiOutlinePlus />
                </button>
              )}
            </div>
            <div className="flex justify-start gap-4">
              <button
                onClick={() => setColor("bg-red-300")}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
              >
                Red
              </button>
              <button
                onClick={() => setColor("bg-green-300")}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
              >
                Green
              </button>
              <button
                onClick={() => setColor("bg-blue-300")}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
              >
                Blue
              </button>
            </div>
          </div>
          <ul className="mt-6 space-y-4">
            <div className="flex flex-col">
              <h1>Toplam Todo Sayısı : {todos.length}</h1>
              <h1>Tamamlanan Todo Sayısı : {getTodoCount(true)}</h1>
              <h1>Tamamlanmayan Todo Sayısı : {getTodoCount(false)}</h1>
            </div>
            {todos.map((item, index) => (
              <li
                key={index}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg justify-between ${item.color}`}
              >
                <span
                  className={`font-semibold text-gray whitespace-nowrap  overflow-hidden ${
                    item.isCompleted ? "line-through" : "no-underline"
                  }`}
                  onClick={() => funcSuccess(item.id)}
                >
                  {item.text}
                </span>
                <div className="flex ml-auto space-x-2 gap-4">
                  <button
                    onClick={() => beforeUpdate(item.id)}
                    className="text-blue-500 hover:text-blue-600 focus:outline-none"
                  >
                    <BsFillPencilFill />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    <BsFillTrashFill />
                  </button>
                </div>
              </li>
            ))}
            {/*  */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
