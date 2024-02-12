import { Dispatch, FunctionComponent, SetStateAction, useMemo } from 'react';
import { useDeleteTodoMutation, useGetTodosQuery } from '../../redux';
import { motion, AnimatePresence } from 'framer-motion';

// Styles
import './Controls.scss';

// Animation
import { controlsAnimation } from './controlsAnimation';

// Types
import { TodoFilters } from '../../types/TodoFilters';

type Props = {
  filter: TodoFilters;
  setFilter: Dispatch<SetStateAction<TodoFilters>>;
};

export const Controls: FunctionComponent<Props> = ({ filter, setFilter }) => {
  const { data: todos = [] } = useGetTodosQuery();
  const [deleteTodo] = useDeleteTodoMutation();

  const activeTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const completedTodos = useMemo(
    () => todos.filter(todo => todo.completed),
    [todos],
  );

  return (
    <div className="Controls" >
      <AnimatePresence>
        <motion.p className="Controls__Text" {... controlsAnimation}>
          {activeTodosCount} item{activeTodosCount !== 1 && 's'} left
        </motion.p>

        <motion.div className="Controls__Filters" {... controlsAnimation}>
          <button
            className={filter === ''
              ? "Controls__Filter Controls__Filter--active"
              : "Controls__Filter"}
            type="button"
            onClick={() => setFilter('')}
          >
            All
          </button>

          <button
            className={filter === 'active'
              ? "Controls__Filter Controls__Filter--active"
              : "Controls__Filter"}
            type="button"
            onClick={() => setFilter('active')}
          >
            Active
          </button>

          <button
            className={filter === 'completed'
              ? "Controls__Filter Controls__Filter--active"
              : "Controls__Filter"}
            type="button"
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </motion.div>

        {!!completedTodos.length && (
          <motion.button
            className="Controls__DeleteButton"
            type="button"
            onClick={() => Promise.all(completedTodos.map(todo => deleteTodo(todo.id)))}
            {... controlsAnimation}
          >
            Clear completed
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
