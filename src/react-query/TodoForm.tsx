import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Todo } from '../hooks/useTodos';
import axios from 'axios';
import useAddTodo from '../hooks/useAddTodo';

const TodoForm = () => {
  const addTodo = useAddTodo( () => {
    if (ref.current) ref.current.value = '';
  })

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error &&
        <div className="alert alert-danger">
          {addTodo.error.message}
        </div>
      }
      <form className="row mb-3" onSubmit={event => {
        event.preventDefault();
        if (ref.current && ref.current.value) {
          addTodo.mutate({
            id: 0,
            title: ref.current?.value,
            completed: false,
            userId: 1,
          })
        }
      }}>
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary" disabled={addTodo.isLoading}>
            {addTodo.isLoading? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
