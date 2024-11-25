import Content1 from "./component/Content1"
import Navbar from "./component/Navbar"
import SlideMain from "./component/SlideMain"

const Home = () => {
    return (
        <div>
            <div className="max-w-full m-auto">
                <div>
                    <SlideMain />
                </div>
                <div>
                    <Content1 />
                </div>
            </div>
        </div>
    )
}

export default Home