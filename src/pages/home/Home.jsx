import Posts from '../../components/posts/Posts';
import Stories from '../../components/stories/Storeis';
import './home.scss'

const Home = () => {
    return (
        <div className="home">
            <Stories />
            <Posts />
        </div>
    );
}
 
export default Home;