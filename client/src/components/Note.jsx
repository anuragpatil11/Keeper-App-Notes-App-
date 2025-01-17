// import React from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// function Note(props) {
//   function handleDelete() {
//     props.onDelete(props.id);
//   }

//   function handleEdit() {
//     const updatedNote = {
//       title: prompt("Enter new title:", props.title),
//       content: prompt("Enter new content:", props.content),
//     };
//     props.onEdit(props.id, updatedNote);
//   }

//   return (
//     <div className="note">
//       <h1>{props.title}</h1>
//       <p>{props.content}</p>
//       <button onClick={handleEdit}>
//         <EditIcon />
//       </button>
//       <button onClick={handleDelete}>
//         <DeleteIcon />
//       </button>
//     </div>
//   );
// }

// export default Note;
// import React, { useState } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

// function Note(props) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedNote, setEditedNote] = useState({
//     title: props.title,
//     content: props.content,
//   });

//   function handleDelete() {
//     props.onDelete(props.id);
//   }

//   function handleEditToggle() {
//     setIsEditing(!isEditing); // Toggle between edit and view modes
//   }

//   function handleChange(event) {
//     const { name, value } = event.target;
//     setEditedNote((prevNote) => ({
//       ...prevNote,
//       [name]: value,
//     }));
//   }

//   function handleSave() {
//     props.onEdit(props.id, editedNote);
//     setIsEditing(false); // Exit edit mode after saving
//   }

//   return (
//     <div className="note">
//       {isEditing ? (
//         <>
//           <input
//             name="title"
//             value={editedNote.title}
//             onChange={handleChange}
//             placeholder="Edit Title"
//           />
//           <textarea
//             name="content"
//             value={editedNote.content}
//             onChange={handleChange}
//             placeholder="Edit Content"
//             rows="3"
//           />
//           <button onClick={handleSave}>
//             <SaveIcon />
//           </button>
//         </>
//       ) : (
//         <>
//           <h1>{props.title}</h1>
//           <p>{props.content}</p>
//           <button onClick={handleEditToggle}>
//             <EditIcon />
//           </button>
//           <button onClick={handleDelete}>
//             <DeleteIcon />
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Note;
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });

  function handleDelete() {
    props.onDelete(props.id);
  }

  function handleEditToggle() {
    setIsEditing(true); // Open the modal for editing
  }

  function handleClose() {
    setIsEditing(false); // Close the modal without saving
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleSave() {
    props.onEdit(props.id, editedNote); // Save changes to the parent component
    setIsEditing(false); // Close the modal
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleEditToggle}>
        <EditIcon />
      </button>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>

      {/* Edit Modal */}
      <Dialog open={isEditing} onClose={handleClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editedNote.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={editedNote.content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Note;
