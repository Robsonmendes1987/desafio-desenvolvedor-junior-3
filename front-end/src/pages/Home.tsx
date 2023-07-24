import UserLogin from "../Componentes/User-Login";
import UserRegister from "../Componentes/User-Register";

 function Home() {
    return(
        <div>
            <h3>
                Bem vindo ao Blogs Api
            </h3>
            <UserLogin/>
            <UserRegister/>
        </div>
    )
}

export default Home