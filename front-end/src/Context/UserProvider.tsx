import { useState, ReactNode, createContext } from "react";
import { useEffect } from "react";
import { api } from "../Api/http";
import { IUser } from "../Interfaces/IUser"
import {IPosts} from "../Interfaces/IPosts"
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";


export interface UserContextProps {
    children: ReactNode;
  }

  type contextType = {
    user: IUser[]
    post: IPosts[]
    handleSubmitUser: ({ email, password }: IUser) => Promise<void>
  }



export const AppContext = createContext({} as contextType);

export function UserProvaider({children}: UserContextProps) {
    const [user, setUser] = useState<IUser[]>([])
    const [post, setPost] = useState<IPosts[]>([])
    const [errors, SetErrors] = useState("");
    const navigate = useNavigate()



    const handleSubmitUser = async ({ email, password }: IUser) => {
        try {
          const token = await api.post("/authenticate", { email, password });
          console.log("EMAIL, PASSWORD", email, password);
    
          localStorage.setItem("token", JSON.stringify(token.data));
          navigate("/posts")
        } catch (error: AxiosError | any) {
          if (error.result.data as AxiosError) {
            SetErrors(error.result.data)
          }
        }
      }

    const allApi = async (): Promise<any> => {
        const result = await api.get('/getallposts')
        setPost(result.data)
    }
    
    const allUser =  async (): Promise<any> => {
        const result = await api.get('/user')
        setUser(result.data)
    }
    console.log("USER DO CONTEXT",user)

    useEffect(() => {
        // handleSubmitUser
        allApi()
    }, [])

    return(
        <AppContext.Provider value={{user, post,  handleSubmitUser}}>
            {children}
        </AppContext.Provider>
    )
}