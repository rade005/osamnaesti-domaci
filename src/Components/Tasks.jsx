import {useRecoilValue, useSetRecoilState} from "recoil";
import {CreateTasks} from "./CreateTasks";
import {tasksState} from "../States/tasksState";
import {UserState} from "../States/UserState";
import {useEffect, useState} from "react";
import {categories} from "../Utils/Categories";
import {useForm} from "react-hook-form";
import CommentForm from "./CommentForm";
import GetAllCommentsForPost from "./GetAllCommentsForPost";


export const Tasks = () => {

    const userData = useRecoilValue(UserState);
    const taskData = useRecoilValue(tasksState);
    const SetTaskData = useSetRecoilState(tasksState);
    const [editTaskId, setEditTaskId] = useState();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();


    const deleteTask = (taskId) => {
        const filteredTask = taskData.filter(task => task.id !== taskId);
        SetTaskData(filteredTask);
    }


    const updateTask = (data) => {
        setEditTaskId(null);



        const updateTasks = taskData.map((task) => {
            if (task.id === data.taskId) {
                return {
                    ...task,
                    name: data.taskName,
                    category: data.category,
                };
            }
            return task;
        });
        SetTaskData(updateTasks);
    };

    const newCommentPosted = (data) => {
        console.log(data);


        const tasksWithComments = taskData.map(task => {
            if (task.id === parseInt(data.taskId)) {

                let existingComments = [];
                if(Array.isArray(task.comments)) {
                    existingComments = task.comments;
                }
                return {
                    ...task,
                    comments: [...existingComments, data.comment]
                }
            }
            return task;
        });
        SetTaskData(tasksWithComments);
    };

    useEffect(() => {
        if (editTaskId !== undefined) {
            const task = taskData.find(t => t.id === editTaskId);
            if (task) {
                reset({
                    taskId: task.id,
                    taskName: task.name,
                    category: task.category,
                });
            }
        }
    }, [editTaskId, reset, taskData]);


    return (
        <>
            <div>
                {userData.loggedIn && (
                    <CreateTasks/>
                )}
            </div>

            {userData.loggedIn && taskData.map(task => (
                <div key={task.id}>
                    {editTaskId === task.id ? (
                        <form onSubmit={handleSubmit(updateTask)}>
                            <input {...register("taskId")} type="hidden" defaultValue={task.id}/>
                            <input {...register("taskName")} type="text" defaultValue={task.name}/>
                            <select {...register("category")} defaultValue={task.category}>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <button>Update task</button>
                        </form>
                    ) : (
                        <div>
                            <p onClick={() => setEditTaskId(task.id)}>{task.name}</p>
                            <p onClick={() => setEditTaskId(task.id)}>{task.category}</p>

                            <CommentForm task={task} callbackPostComment={newCommentPosted}/>

                            <button onClick={() => deleteTask(task.id)} type="button">Delete task</button>
                        </div>
                    )}

                    <GetAllCommentsForPost comments={task.comments} taskId={task.id}/>
                </div>
            ))}
        </>
    );
};