import React, {useEffect,useRef,useState} from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props){
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  function handleChange(e){
    setNewName(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input id={props.id} 
        className="todo-text" 
        type="text" 
        value={newName} 
        onChange={handleChange}
        ref={editFieldRef}/>
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={()=> setEditing(false)}>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAw0lEQVRIS+2U3Q2CQBCEPzqwEyxBO5BKtQMtQTuxBDOJJCfuHyYXX+ANssy3Ozt3A52fobM+GyB1+O8WnYAb8HRa3QEH4OKNEk0g8TNwB44GROJXYA9MHiQCSEDdjwakFX+8pzCnzHZgQeTG3HkorsIMoJolRN9kSypeBSwhei+JrwXMtug/b/FfYapa1HouEWvxZlIzgJUWCXnpWjVBFMUowh+QykHzFtpCfjpo6qTrVZHelJWCbMkVjbBmA6QWdrfoBQwINBmYmmoWAAAAAElFTkSuQmCC"/>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" 
          className="btn" 
          onClick={()=> setEditing(true)}
          ref={editButtonRef}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAA1klEQVRIS8WTvRHCMAxGXzagYg8KBmASYBAoYABqKmAHtqBhBEZgAzjdOXdOTv6RTA61Tt77ZMkdE1c3MZ9WwS4EPKaCtggEfgjgPaBKvIIlcAfmUXJV4hHMgDcwlkgHIhmUVbABTsAKeEaSswYXk0Ug8EuIJx3EkkfrkGN4zxLJAnjlVr2mAw0uzBsgZ9kqCa7AWiFUwUszaIbnBD+BpwQp+BaQM1NpM/goBBc81cFY4IbXCJrgpS0y3XXrS3bLSg/NDe5/rN0ii2jA/IvAkrb47eQz+AL6iyUZyr1/fAAAAABJRU5ErkJggg=="/>
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAw0lEQVRIS+2U3Q2CQBCEPzqwEyxBO5BKtQMtQTuxBDOJJCfuHyYXX+ANssy3Ozt3A52fobM+GyB1+O8WnYAb8HRa3QEH4OKNEk0g8TNwB44GROJXYA9MHiQCSEDdjwakFX+8pzCnzHZgQeTG3HkorsIMoJolRN9kSypeBSwhei+JrwXMtug/b/FfYapa1HouEWvxZlIzgJUWCXnpWjVBFMUowh+QykHzFtpCfjpo6qTrVZHelJWCbMkVjbBmA6QWdrfoBQwINBmYmmoWAAAAAElFTkSuQmCC"/>
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );


  useEffect(()=> {
    if(!wasEditing && isEditing){
      editFieldRef.current.focus();
    }
    if(wasEditing && !isEditing){
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);


  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}