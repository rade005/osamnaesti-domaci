import { useRecoilValue, useSetRecoilState } from "recoil";
import { tasksState } from "../States/tasksState";

const GetAllCommentsForPost = ({ comments = [], taskId }) => {
    const taskData = useRecoilValue(tasksState);
    const setTaskData = useSetRecoilState(tasksState);

    const handleDelete = (comment) => {
        const updatedTasks = taskData.map(task =>
            task.id === taskId
                ? { ...task, comments: (task.comments || []).filter(c => c !== comment) }
                : task
        );
        setTaskData(updatedTasks);
    };

    return (
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>
                    {comment}
                    <button onClick={() => handleDelete(comment)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default GetAllCommentsForPost;
