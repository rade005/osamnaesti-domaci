import {useRecoilValue, useSetRecoilState} from "recoil";
import React from "react";
import {tasksState} from "../States/tasksState";
import {useForm} from "react-hook-form";
import {categories} from "../Utils/Categories";



export const CreateTasks = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const setTasks = useSetRecoilState(tasksState);
    const tasks = useRecoilValue(tasksState);

    const onSubmit = (data) => {
        let taskFound = tasks.some(task => task.name === data.taskName);

        const newTask = {
            id: Date.now(),
            name: data.taskName,
            category: data.category,
        };

        if (!taskFound) {
            setTasks(oldTasks => [...oldTasks, newTask]);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("category")}>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            {errors.taskName && <p>{errors.taskName.message}</p>}
            <input
                {...register("taskName", { required: "Taskname is required" })}
                type="text"
                placeholder="Enter title of task"
            />

            <button type="submit">Create task</button>
        </form>
    );
};