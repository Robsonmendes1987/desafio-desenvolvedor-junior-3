import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { AppContext } from "../Context/UserProvider";
import { api } from "../Api/http";
import { AxiosError } from "axios";
import { ArchiveX } from "lucide-react";

interface IPosts {
  name: string;
  id: string;
  authorId: string;
  title: string;
  content: string;
  email: string 
  // password: string
}


function DeletPosts() {
  // const { register, handleSubmit, reset } = useForm();
  const [state, setState] = useState<IPosts[]>([]);

  const [posts, setPosts] = useState<IPosts[] | []>([]);
  const [modalPost, setModalPost] = useState(false);
  const { post, handleSubmitUser} = useContext(AppContext);
  const [errors, SetErrors] = useState("");
  const navigate = useNavigate()


  // const AllPosts = async () => {
  //   const result = await api.get("/getallposts");
  //   console.log("POSTS COM NAME", result.data);
 
  // };

  interface IUser {
    email: string 
    password: string
  }
  
  // const handleSubmitPost: SubmitHandler<IPosts> = async (data: IPosts) => {
  //      await api.post("/post", data);
  //      setModalPost(false);
  //      reset();
  // };




const deletePOsts = async (id: string) => {
  const getIdPOst = post.map(({id}) =>
  id)
  console.log('POSTS DELET', getIdPOst)
  console.log('POSTS ID', id)


    await api.delete(`/${getIdPOst}`)
    state.filter((del: {id: string}) => del.id !== id)
    // setPosts(result.data);

}




  

  useEffect(() => {
    deletePOsts
  });

  return (
    <div className="w-full h-full">
      <button onClick={deletePOsts} >

<ArchiveX />
</button>
    </div>
  );
}

export default DeletPosts;
