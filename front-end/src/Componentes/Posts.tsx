import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext, useEffect, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { ArchiveX} from 'lucide-react'

const DeletPosts = lazy(() => import('../Componentes/DeletPost'));


import { AppContext } from "../Context/UserProvider";
import { api } from "../Api/http";
import { AxiosError } from "axios";

interface IPosts {
  name: string;
  id: string;
  authorId: string;
  title: string;
  content: string;
  email: string 
  // password: string
}


function Posts() {
  const { register, handleSubmit, reset } = useForm();
  const [posts, setPosts] = useState<IPosts[] | []>([]);
  const [modalPost, setModalPost] = useState(false);
  const { post, handleSubmitUser} = useContext(AppContext);
  const [errors, SetErrors] = useState("");
  const navigate = useNavigate()


  const AllPosts = async () => {
    const result = await api.get("/getallposts");
    console.log("POSTS COM NAME", result.data);
    setPosts(result.data);
  };

  interface IUser {
    email: string 
    password: string
  }
  
  



  const registersPosts = async (data: IPosts) => {
    const token = localStorage.getItem("token");
    
    const result = JSON.parse(token)
    console.log('DATA', result)

     await api.post("/post", data, {headers:{Authorization:result.token}})
     setModalPost(false)

  };
  




  

  useEffect(() => {
    AllPosts;
  });

  return (
    <div className="w-full h-full">
        
      {post.map((element) => (
        <div
          key={element.id} 
          className="max-h-54 w-1/2 mt-2 mx-4 text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <DeletPosts/>
          <h1 className="">
            Titulo:
            <p className="mt-1 px-5 mt-0.25 text-sm text-gray-800 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400">
              {element.title}
            </p>
          </h1>
          <p className="mt-1 text-sm px-5 text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400">
            Author: {element.name}
          </p>
          <h1 className="flex px-5 mt-10 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400">
            Post: {element.content}
          </h1>
        </div>
      ))}
      POSTS
      <div>
        <button
          data-modal-target="large-modal"
          data-modal-toggle="large-modal"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => setModalPost(true)}
        >
          You Post
        </button>

        {modalPost ? (
          <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="w-full h-100 bg-white p-4 rounded-lg shadow-lg dark:bg-gray-800">
              <form onSubmit={handleSubmit(registersPosts)}>
                <div className="mb-6">
                  <label
                    // htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Titulo
                  </label>
                  <input
                    type="text"
                    // id="email"

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                    {...register("title")}
                  />
                </div>
                <div className="mb-6">

                  <label
                    htmlFor="text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    
                    // id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    {...register("name")}
                  />
                </div>
                You Post
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
9                  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                      <label htmlFor="editor" className="sr-only">
                        Publish post
                      </label>
                      <textarea
                        id="editor"
                        rows="8"
                        class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="Write an article..."
                        required
                        {...register("content")}
                      ></textarea>
                      
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setModalPost(false)}
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-700"
                  >
                    Decline
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    // onClick={() => handleSubmitPost}
                  >
                    Publish post
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Posts;
