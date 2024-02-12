import { FunctionComponent, useMemo, useState } from 'react';
import {
    useAddTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from '../../redux';

// Styles
import './AddForm.scss';

// Icons
import { ReactComponent as DoubleTicks } from './icons/double-tick-svgrepo-com.svg';

export const AddForm: FunctionComponent = () => {
  const [title, setTitle] = useState('');
  const [addTodo] = useAddTodoMutation();
  const {data: todos = []} = useGetTodosQuery();
  const [ updateTodo ] = useUpdateTodoMutation();
  const areAllTodosCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  const createTodo = async (title: string) => {
    if (title) {
      await addTodo({
        title: title.trim(),
        completed: false,
      });
    };

    setTitle('');
  }

  const toggleAllTodosComplete = async () => {
    await Promise.all(todos.map(todo => {
      if (todo.completed === areAllTodosCompleted) {
        return updateTodo({
          id: todo.id,
          body: { completed: !areAllTodosCompleted }
        });
      };

      return todo;
    }));
  };

  return (
    <form
      className="AddForm"
      onSubmit={e => {
        e.preventDefault();
        createTodo(title);
      }}
    >
      {!!todos.length && (
        <button
          type="button"
          className="AddForm__Button"
          onClick={() => toggleAllTodosComplete()}
        >
          <DoubleTicks
            className={!areAllTodosCompleted
              ? "AddForm__ButtonIcon"
              : "AddForm__ButtonIcon AddForm__ButtonIcon--green"}
            height="40px"
            width="40px"
          />
        </button>
      )}

      <input
        className="AddForm__Field"
        type="text"
        placeholder="What need to be done?"
        value={title}
        onChange={e => setTitle(e.target.value.trimStart())}
      />
    </form>
  );
};
