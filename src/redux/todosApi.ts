import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
import { Todo } from '../types/Todo';
import { TodoPartial } from '../types/TotoPartial';

const baseUrl = 'https://mate.academy/students-api/';
const tagTypes = ['Todos'];
const endpoint = tagTypes[0].toLowerCase();
const invalidatesTags = [{ type: tagTypes[0], id: 'LIST' }];
const userId = 3863;

export const todosApi = createApi({
  reducerPath: 'Api',
  tagTypes,
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => `${endpoint}?userId=${userId}`,
      providesTags: (result: Todo[] | undefined) => result
      ? [
          ...result.map(({ id }) => ({ type: 'todos' as const, id })),
          invalidatesTags[0],
        ]
      : invalidatesTags,
    }),
    addTodo: builder.mutation<Todo, TodoPartial>({
      query: (body) => ({
        url: endpoint,
        method: 'POST',
        body: { userId, ...body },
      }),
      invalidatesTags,
    }),
    updateTodo: builder.mutation<Todo, { id: number, body: TodoPartial }>({
      query: ({ id, body }) => ({
        url: `${endpoint}/${id}`,
        method: 'PATCH',
        body: { userId, ...body },
      }),
      invalidatesTags,
    }),
    deleteTodo: builder.mutation<Todo, number>({
      query: (id) => ({
        url: `${endpoint}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags,
    })
  })
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
