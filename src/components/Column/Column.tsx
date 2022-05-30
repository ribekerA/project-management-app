/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import { LegacyRef, useState, useContext } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';
import deleteColumn from '../../api/deleteColumn';
import { AppContext } from '../../App';
import { TaskResponse } from '../../data/interfaces';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import ColHeader from './ColHeader/ColHeader';
import './Column.scss';
import Task from './Task/Task';

function Column({
  columnId,
  title,
  order,
  boardId,
  tasks,
  loadBoard,
  innerRef,
  drProps,
  drHandleProps,
  isDragging,
}: {
  columnId: string;
  title: string;
  order: number;
  boardId: string;
  tasks: TaskResponse[];
  loadBoard: () => Promise<void>;
  drProps: DraggableProvidedDraggableProps;
  drHandleProps: DraggableProvidedDragHandleProps;
  innerRef: LegacyRef<HTMLDivElement> | undefined;
  isDragging: boolean;
}) {
  const [isTaskCreateOpen, setIsTaskCreateOpen] = useState(false);
  const { logoutUser, setSpinner } = useContext(AppContext);

  const onDelete = async () => {
    await deleteColumn(boardId, columnId, logoutUser, setSpinner);
    loadBoard();
  };

  return (
    <div className="list-wrapper" ref={innerRef} {...drProps} {...drHandleProps}>
      <div className={`list ${isDragging ? 'list-dragging' : ''}`}>
        {tasks.length > 0 && <span className="list__badge">{tasks.length}</span>}
        <ColHeader
          columnId={columnId}
          boardId={boardId}
          title={title}
          order={order}
          onDelete={onDelete}
          loadBoard={loadBoard}
        />
        <Droppable droppableId={columnId} key={columnId} type="TASK">
          {(providedTasks, snapTasks) => (
            <div
              className={`list__tasks ${snapTasks.isDraggingOver ? 'list-dragged-on' : ''}`}
              {...providedTasks.droppableProps}
              ref={providedTasks.innerRef}
            >
              {tasks.map((task, ind) => {
                return (
                  <Task
                    key={task.id}
                    task={task}
                    boardId={boardId}
                    columnId={columnId}
                    userId={task.userId}
                    loadBoard={loadBoard}
                    ind={ind}
                  />
                );
              })}
              {providedTasks.placeholder}
            </div>
          )}
        </Droppable>
        <div className="add-task-container">
          <button className="add-task" type="button" onClick={() => setIsTaskCreateOpen(true)}>
            <i className="fa-solid fa-plus"> </i>
            Add a task
          </button>
        </div>
      </div>
      {isTaskCreateOpen && (
        <CreateTaskModal
          columnId={columnId}
          boardId={boardId}
          loadBoard={loadBoard}
          setIsTaskCreateOpen={setIsTaskCreateOpen}
        />
      )}
    </div>
  );
}

export default Column;
