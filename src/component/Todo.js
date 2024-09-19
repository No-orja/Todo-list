import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
//Other 
import { useContext, useState } from 'react';
import { ToDosContext } from '../context/ToDoContext';

export default function Todo({ toDo, handelClicked, handelDClicked }) {
  const { toDos, setToDos } = useContext(ToDosContext);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedToDo, setUpdatedToDo] = useState({ title: toDo.Title, Details: toDo.body });

  console.log(toDos); 

  function handelCheckClick(toDoId) {
    const updatedToDos = toDos.map((t) => {
      if (toDoId === t.id) {
        return { ...t, isDone: !t.isDone }; 
      }
      return t;
    });
  
    setToDos(updatedToDos);
    localStorage.setItem("toDos", JSON.stringify(updatedToDos));
  }
  

  function handelDeleteClicked() {
    const newToDo = toDos.filter((t) => t.id !== toDo.id);
    setToDos(newToDo);
    localStorage.setItem("toDos", JSON.stringify(newToDo));

  }

  function handelEditClose() {
    setShowUpdateDialog(false);
  }
  
  function handelEditClicked() {
    setShowUpdateDialog(true);
  }

  function handelUpdateConfirm() {
    const updatedToDos = toDos.map((t) => {
      if (t.id === toDo.id) {
        return { ...t, Title: updatedToDo.title, details: updatedToDo.Details };
      } else {
        return t;
      }
    });
    setToDos(updatedToDos);
    setShowUpdateDialog(false);
    localStorage.setItem("toDos", JSON.stringify(updatedToDos));

  }



  return (
    <>
      <Dialog
        open={showUpdateDialog} 
        onClose={handelEditClose}
        PaperProps={{
          style: {
            width: '100vh', // Set the height to 100vh
            display: 'flex',
            flexDirection: 'column',
            background: "rgb(55 59 106)",
          },
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Update the Task: </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            fullWidth
            variant="standard"
            value={updatedToDo.title}
            onChange={(e) => setUpdatedToDo({ ...updatedToDo, title: e.target.value })}
            sx={{
              input: { color: 'white' }, 
              label: { color: 'white' }, 
            }}

          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Details"
            fullWidth
            variant="standard"
            value={updatedToDo.Details}
            onChange={(e) => setUpdatedToDo({ ...updatedToDo, Details: e.target.value })}
            sx={{
              input: { color: 'white' }, 
              label: { color: 'white' }, 
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handelEditClose} sx={{ color: "white" }}>Cancel</Button>
          <Button autoFocus onClick={handelUpdateConfirm} sx={{ color: "white" }}>Update</Button>
        </DialogActions>

      </Dialog>

      <Card className='toDoCard' sx={{ minWidth: 275, background: "#171c48", color: "white", borderRadius: "10px", marginBottom: "7px" }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography variant='h5' style={{ textAlign: "left" }}>{toDo.Title}</Typography>
              <Typography variant='h6' style={{ textAlign: "left" }}>{toDo.body}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>

              <IconButton 
                onClick={() => handelCheckClick(toDo.id)}
                className='iconBtn' 
                sx={{ color: toDo.isDone ? "green" : "white" }} 
                aria-label="mark as done">
                <CheckCircleIcon />
              </IconButton>

              <IconButton  
                onClick={handelEditClicked}
                className='iconBtn' 
                sx={{ color: "white" }} 
                aria-label="edit">
                <EditIcon />
              </IconButton>

              <IconButton 
                onClick={handelDeleteClicked}
                className='iconBtn' 
                sx={{ color: "red" }} 
                aria-label="delete">
                <DeleteIcon />
              </IconButton>

            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
