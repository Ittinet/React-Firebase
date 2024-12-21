import Content0 from "./component/Content0"
import Content1 from "./component/Content1"
import Content2 from "./component/Content2"
import Content3 from "./component/Content3"
import Navbar from "./component/Navbar"
import SlideMain from "./component/SlideMain"

const Home = () => {
    
    return (
        <div>
            <div className="max-w-full m-auto">
                <div>
                    <SlideMain />
                </div>
                <div className="max-w-[1600px] m-auto">
                    <div>
                        <Content0 />
                    </div>
                    <div>
                        <Content2 />
                    </div>
                    <div>
                        <Content3 />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home