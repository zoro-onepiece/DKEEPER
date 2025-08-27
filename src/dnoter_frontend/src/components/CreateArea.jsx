import React ,{useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";


function CreateArea(props) {

 const [isExpanded, setIsExpanded] = useState(false); 
  
const [newNote,setNewNote] =useState({
  title:"",
  content:""
})

  function updateNotes(event) {
          event.preventDefault();

    if(newNote.title.trim() ==="" || newNote.content.trim()===""){return;}
    props.onAdd(newNote);
    setNewNote({
      title: "",
      content:""

    })

      console.log("New note added:", newNote);

  }

 function handleChange(event){
  const {name,value} =event.target;
  setNewNote((prevValue)=>{
    return{
      ...prevValue,
      [name]:value
    }}); }

    function expand() {
      setIsExpanded(true);
    }


  return (
    <>
    <div>
      <form className="create-note">
        {isExpanded && ( <input
          name="title"
          onChange={handleChange}
          value={newNote.title}
          placeholder="Title"
        />)}
       
        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={newNote.content}
          placeholder="Take a note..."
          rows={isExpanded  ?3:1}
        />
        <Zoom in={isExpanded}>
        <Fab onClick={updateNotes}><AddIcon/></Fab></Zoom>
      </form>
    </div>
</>
  );

}
export default CreateArea;
