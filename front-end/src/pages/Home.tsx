import UserLogin from "../Componentes/User-Login";
import UserRegister from "../Componentes/User-Register";

 function Home() {
    return(
        <div>
            <UserLogin/>
            <UserRegister/>
        </div>
    )
}

export default Home