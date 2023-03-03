import { Header } from '../components/Header';
import Checkbox from '@mui/material/Checkbox';
import { FormEvent, useEffect, useState } from 'react';

import Circle from '@mui/icons-material/CircleRounded';
import CircleChecked from '@mui/icons-material/CheckCircle';
import Trash from '@mui/icons-material/RestoreFromTrash';
import { FormControlLabel } from '@mui/material';

import plusIcon from '../assets/plus.svg';
import emptyTaskIcon from '../assets/empty.svg';
import styles from './home.module.css';

interface TasksProps {
  id: string;
  description: string;
  isCompleted: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [myTasksCompleted, setMyTasksCompleted] = useState(0);

  useEffect(() => {
    const numberOfTasksCompleted = tasks.filter(
      task => task.isCompleted === true
    ).length;

    setMyTasksCompleted(numberOfTasksCompleted);
  }, [tasks]);

  function handleCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTask = {
      id: String(new Date().getTime()),
      description: taskDescription,
      isCompleted: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);

    setTaskDescription('');
  }

  function handleToggleCheckBox(id: string) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    const newTasksList = [...tasks];
    const hasComplete = newTasksList[taskIndex].isCompleted;

    newTasksList[taskIndex].isCompleted = !hasComplete;

    setTasks(newTasksList);
  }

  function handleRemoveTask(id: string) {
    const newTasksList = tasks.filter(task => task.id !== id);
    setTasks(newTasksList);
  }

  return (
    <div className={styles.container}>
      <Header />

      <form onSubmit={handleCreateTask} className={styles.form_container}>
        <input
          type="text"
          name="task"
          value={taskDescription}
          onChange={e => setTaskDescription(e.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">
          Criar
          <img src={plusIcon} alt="icon plus" />
        </button>
      </form>

      <div className={styles.tasks_container}>
        <header className={styles.tasks_header}>
          <div>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div>
            <p>Concluídas</p>
            <span>
              {myTasksCompleted} de {tasks.length}
            </span>
          </div>
        </header>

        {tasks.length > 0 ? (
          <main>
            {tasks.map(myTask => (
              <div key={myTask.id} className={styles.task}>
                <FormControlLabel
                  control={
                    <Checkbox
                      className={styles.checkbox}
                      onClick={() => handleToggleCheckBox(myTask.id)}
                      checked={myTask.isCompleted}
                      icon={<Circle color="primary" />}
                      checkedIcon={<CircleChecked color="success" />}
                    />
                  }
                  label={myTask.description}
                />

                <Trash
                  className={styles.task_trash_icon}
                  onClick={() => handleRemoveTask(myTask.id)}
                />
              </div>
            ))}
          </main>
        ) : (
          <div className={styles.empty_tasks_container}>
            <img src={emptyTaskIcon} />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong> <br />
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
