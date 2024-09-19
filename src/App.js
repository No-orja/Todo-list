import './App.css';
import ToDoList from './component/Todolist'
import { ToDosContext } from './context/ToDoContext';  
import { v4 as idv4 } from 'uuid';
import { useState } from 'react';
import { Snackbar } from '@mui/material';
const initialState = [
  {
    id: idv4(),
    Title: "Sample Task 1",
    body: "Details of Task 1",
    isDone: false
  },
  {
    id: idv4(),
    Title: "Sample Task 2",
    body: "Details of Task 2",
    isDone: false
  },
  {
    id: idv4(),
    Title: "Sample Task 3",
    body: "Details of Task 3",
    isDone: false
  },
];
function App() {

  const [toDos, setToDos] = useState(initialState);
  
  return (
    <div className="App" style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"#000430"
    }}>
      <ToDosContext.Provider value={{toDos,setToDos}}>
        <Snackbar/>
        <ToDoList/>
      </ToDosContext.Provider>
      
    </div>
  );
}

export default App;
