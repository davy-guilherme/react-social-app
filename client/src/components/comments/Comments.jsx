import { useContext, useState } from 'react';
import {AuthContext} from '../../context/authContext'
import './comments.scss'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from 'moment';

const Comments = ({postId}) => {

    const {currentUser} = useContext(AuthContext);

    const [desc, setDesc] = useState("")

    const {isLoading, error, data} = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const res = await makeRequest.get('/comments?postId=' + postId)
            console.log(res.data)
            return res.data
        },
    })

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newComment) => {
            return makeRequest.post('/comments?postId=' + postId, newComment)
        },
        onSuccess: (data, variables, context) => {
            // Invalidate and refetch
            // queryClient.invalidateQueries(["comments"])
            queryClient.invalidateQueries(["[comments]"])
        }
    })


    const handleClick = async (e) => {
        e.preventDefault()
        mutation.mutate({desc})
        setDesc("")   
    }


    //Temporary
    // const comments = [
    //     {
    //         id: 1,
    //         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //         name: "John Doe",
    //         userId: 1,
    //         profilePicture:
    //             "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 2,
    //         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
    //         name: "Jane Doe",
    //         userId: 2,
    //         profilePicture:
    //             "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     },
    // ];

    if (isLoading) {
        return <div className='comments'>Loading...</div>;
    }

    if (error) {
        return <div className='comments'>Error: {error.message}</div>;
    }
    
    return ( 
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder='Write a comment' value={desc} onChange={ (e) => setDesc(e.target.value) } />
                <button onClick={handleClick}>Send</button>
            </div>
            { data && data.map( comment => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>{ moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    );
}
 
export default Comments;