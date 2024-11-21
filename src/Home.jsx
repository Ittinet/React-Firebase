import Content1 from "./component/Content1"
import Navbar from "./component/Navbar"
import SlideMain from "./component/SlideMain"

const Home = () => {
    return (
        <div>
            <div className="max-w-[1600px] m-auto">
                <div>
                    <Navbar />
                </div>
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