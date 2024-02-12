import { FunctionComponent, useState, KeyboardEventHandler } from 'react';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../redux';

// Styles
import './TodoItem.scss';

// Icons
import { ReactComponent as Circle } from './icons/circle-svgrepo-com.svg';
import { ReactComponent as Tick } from './icons/circle-check-svgrepo-com.svg';
import { ReactComponent as Cross } from './icons/Icon-Close.svg';

// Types
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: FunctionComponent<Props> = ({ todo }) => {
  const [hovered, setHovered] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const saveEditedTodo = async () => {
    if (title !== todo.title) {
      await updateTodo({
        id: todo.id,
        body: { title },
      });
    }

    setEdit(false);
  };

  const toggleTodoComplete = () => {
    updateTodo({
      id: todo.id,
      body: { completed: !todo.completed }
    })
  };

  const editTodoTitle: KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case 'Enter':
        saveEditedTodo();
        return;

      case 'Escape':
        setTitle(todo.title);
        setEdit(false);
        return;

      default:
        return;
    };
  };

  return (
    <div
      className={todo.completed
        ? "TodoItem TodoItem--completed"
        : "TodoItem"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {edit ? (
        <input
          className="TodoItem__TextInput"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value.trimStart())}
          onKeyDown={editTodoTitle}
          onBlur={() => saveEditedTodo()}
        />
      ) : (
        <>
          <label className="TodoItem__Label">
            {todo.completed ? (
              <Tick className="TodoItem__Icon TodoItem__Icon--green" />
            ) : (
              <Circle className="TodoItem__Icon" />
            )}

            <input
              className="TodoItem__CheckInput"
              type="checkbox"
              checked={todo.completed}
              onChange={toggleTodoComplete}
            />
          </label>

          <p
            onDoubleClick={() => setEdit(true)}
          >
            {todo.title}
          </p>

          {hovered && (
            <button
              className="TodoItem__Button"
              type="button"
              onClick={() => deleteTodo(todo.id)}
            >
              <Cross className="TodoItem__Icon TodoItem__Icon--red"/>
            </button>
          )}
        </>
      )}
    </div>
  );
};
