import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//Other
import Todo from './Todo';
import { useState , useEffect , useMemo} from 'react';
import { useContext } from 'react'; 
import { v4 as idv4 } from 'uuid';
import {ToDosContext} from '../context/ToDoContext'


export default function ToDoList() {

  const {toDos,setToDos} = useContext(ToDosContext)
  const [titleInput, setTitleInput] = useState("");
  const [displayedToDosType,setDisplayedToDosType] = useState("all")


  //USE MEMO:
  const completedToDos = useMemo(()=>{
     return toDos.filter((t)=>{
      return t.isDone
    })    
  },[toDos])

  const notCompletedToDos = useMemo(()=>{
      return toDos.filter((t)=>{
      return !t.isDone 
    })
  },[toDos])

 

  let toDosToBeRender = toDos
  if(displayedToDosType === "done"){
   toDosToBeRender = completedToDos 
  }
  else if(displayedToDosType === "notYet"){
    toDosToBeRender = notCompletedToDos
  }
  else{
    toDosToBeRender = toDos
  }

  function changeDisplayedType(e){
    setDisplayedToDosType(e.target.value)
  }

  const toDosJsx = toDosToBeRender.map((t) => {
    return (<Todo key={t.id} toDo={t}  />);
  });  

  useEffect(() => {
    const storageToDos = JSON.parse(localStorage.getItem("toDos")) || [];
    if (Array.isArray(storageToDos)) {
      setToDos(storageToDos);
    }
  }, []);
  
  
  
  function handelAddClicked() {
    const newToDo = {
      id: idv4(),
      Title: titleInput,
      details: "",
      isDone: false
    };

    const updatedToDos = [...toDos, newToDo]
    setToDos(updatedToDos);
    localStorage.setItem("toDos", JSON.stringify(updatedToDos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          minWidth: 275,
          background: "#000430",
          color: "white",
          border: "5px solid #6764d8",
          maxHeight: "90vh",
          overflow: "auto",
          scrollbarWidth: "thin", // For Firefox
          '&::-webkit-scrollbar': {
            width: '3px', // Width of the scrollbar
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#6764d8', // Color of the scrollbar thumb
            borderRadius: '4px', // Rounded edges for the scrollbar thumb
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#5a54b4', // Color when hovering over the scrollbar
          },
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            To do list 📖🖊️
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "#b1d7e6",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "10px",
              textShadow: "1px 1px 2px black",
            }}
          >
            Keep it up!
            <EmojiEmotionsIcon sx={{ marginRight: "5px" }} />
          </Typography>

          <Divider sx={{ backgroundColor: "white", marginTop: "9px" }} />

          {/* Toggle Btn */}
          <ToggleButtonGroup
            style={{ marginTop: "30px", marginBottom: "20px" }}
            exclusive
            aria-label="text alignment"
            value={displayedToDosType}
            onChange={changeDisplayedType}
          >
            <ToggleButton
              value="all"
              aria-label="left aligned"
              sx={{ color: "white", borderColor: "white" }}
            >
              All
            </ToggleButton>

            <ToggleButton
              value="done"
              aria-label="centered"
              sx={{ color: "white", borderColor: "white" }}
            >
              Done
            </ToggleButton>

            <ToggleButton
              value="notYet"
              aria-label="right aligned"
              sx={{ color: "white", borderColor: "white" }}
            >
              Not yet
            </ToggleButton>
          </ToggleButtonGroup>
          {/*  === Toggle Btn === */}

          {/* to do */}
          {toDosJsx}
          {/* ==== to do ==== */}

          {/* Input */}
          <Grid container spacing={2} sx = {{ marginTop: "16px" }}>
            <Grid item xs={8}>
              <TextField
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
                id="filled-basic"
                label="Title"
                variant="filled"
                sx={{
                  background: "#ffffff",
                  width: "100%",
                  '& .MuiInputBase-input': {
                    color: "#000000",
                  },
                  '& .MuiInputLabel-root': {
                    color: "#000000",
                  },
                  '& .MuiFilledInput-root': {
                    backgroundColor: "#ffffff",
                  },
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <Button
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: titleInput.length === 0 ? "#cccccc" : "#6764d8",
                  color: titleInput.length === 0 ? "black" : "#ffffff",
                  '&:hover': {
                    backgroundColor: "#5a54b4",
                  },
                }}
                onClick={() => {
                  handelAddClicked();
                }}
                disabled={titleInput.length === 0}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
          {/* ====  Input ==== */}

        </CardContent>
      </Card>
    </Container>
  );
}
