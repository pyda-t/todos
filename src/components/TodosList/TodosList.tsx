import { FunctionComponent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Styles
import './TodosList.scss';

// Types
import { Todo } from '../../types/Todo';

// Components
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
};

export const TodosList: FunctionComponent<Props> = ({ todos }) => (
  <ul className="TodoList" >
    <AnimatePresence>
      {todos.map(todo => (
        <motion.li
          key={todo.id}
          className="TodoList__Item"
          transition={{
            duration: 0.3,
          }}
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
            height: 'auto',
          }}
          exit={{
            opacity: 0,
            height: 0,
            marginBottom: 0,
          }}
        >
          <TodoItem todo={todo} />
        </motion.li>
      ))}
    </AnimatePresence>
  </ul>
);
