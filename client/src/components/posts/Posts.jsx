import { makeRequest } from '../../axios';
import Post from '../post/Post';
import './posts.scss'
import { useQuery } from '@tanstack/react-query'

const Posts = () => {

    // const {isLoading, error, data } = useQuery(['posts'], () => {
    //     makeRequest.get("/posts").then( (res) => {
    //         return res.data
    //     })
    // })

    // const { isLoading, error, data } = useQuery(['posts'], () => {
    //     return makeRequest.get("/posts").then(res => res.data);
    // });

    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await makeRequest.get("/posts");
            return res.data;
        },
    });

    console.log(data)

    //TEMPORARY
    // const posts = [
    //     {
    //     id: 1,
    //     name: "John Doe",
    //     userId: 1,
    //     profilePic:
    //         "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     },
    //     {
    //     id: 2,
    //     name: "Jane Doe",
    //     userId: 2,
    //     profilePic:
    //         "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //     desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    //     },
    // ];

    if (isLoading) {
        return <div className='posts'>Loading...</div>;
    }

    if (error) {
        return <div className='posts'>Error: {error.message}</div>;
    }

    return (
        <div className="posts">
            
            {data && data.map((post) => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
    
    // return (
    //     <div className="posts">
    //         {data.map((post) => (
    //             <Post post={post} key={post.id} />
    //         ))}
    //     </div>
    // );
}
 
export default Posts;