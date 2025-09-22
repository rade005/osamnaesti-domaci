import {useForm} from "react-hook-form";

const CommentForm = ({task, callbackPostComment}) => {

    const {
        register,
        handleSubmit
    } = useForm();

    const postComment = (data) => {
        callbackPostComment(data);
    }

    return (

        <form onSubmit={handleSubmit(postComment)}>
            <input {...register ("comment")} type="text" placeholder="Unesite vas komentar"/>
            <input {...register("taskId")} type="hidden" defaultValue={task.id}/>
            <button>Post comment</button>
        </form>
    )

}

export default CommentForm;