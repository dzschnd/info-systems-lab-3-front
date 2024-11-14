import {ClimbingBoxLoader} from "react-spinners";

function Loader() {
    return (
        <div className={'h-screen w-full fixed flex justify-center items-center'}>
                <ClimbingBoxLoader size={20}/>
        </div>
    )
}

export default Loader;