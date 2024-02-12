import { FunctionComponent, useMemo, useState } from 'react';
import { useGetTodosQuery } from './redux';

// Styles
import './App.scss';

// Types
import { TodoFilters } from './types/TodoFilters';

// Components
import { AddForm } from './components/AddForm';
import { TodosList } from './components/TodosList';
import { Controls } from './components/Controls';

export const App: FunctionComponent = () => {
  const {data: todos = []} = useGetTodosQuery();
  const [filter, setFilter] = useState<TodoFilters>('');

  const visibleTodos = useMemo(
    () => {
      switch (filter) {
        case 'active':
          return todos.filter(todo => !todo.completed);

        case 'completed':
          return todos.filter(todo => todo.completed);

        default:
          return todos;
      }
    },
    [filter, todos],
  );

  return (
    <div className="App">
      <h1 className="App__Title">Todos</h1>

      <div className="App__Content">
        <AddForm />

        {!!todos.length && (
          <>
            <TodosList todos={visibleTodos} />

            <Controls filter={filter} setFilter={setFilter} />
          </>
        )}
      </div>

      <p className="App__Text">Double click on the Todo text to edit it</p>
    </div>
  );
};
