import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./post.css"

const validationPost = yup.object().shape({
    name: yup.string().required("O nome é obrigatorio").max(30, "O nome pode ter até 30 caracteres"),
    email: yup.string().required("O email é obrigatorio")
})




function Post(){

    let history = useHistory();

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(validationPost)
    })
    const addPost = data => axios.post("https://gorest.co.in/public/v1/users?access-token=25cf80e10a3005cca1533a684fca1f71803c9810ed960e5524d8b728e7a01a8e", data)
    .then((response) => {
        // const addPost = data => axios.post("https://upload-my-api.herokuapp.com/post/create", data)
        // .then(() => {
        console.log("deu certo")
        console.log(response)
        history.push("/")
        
    })
    .catch((error) => {
        console.log("erro")
        console.log(error)
    })
    return(
        <div>
            <Header />
            <main>
                <div className="card-post">
                    <h1>Cadastrar usuário</h1>
                    <div className="line-post"></div>

                    <div className="body-post">
                        <form onSubmit={handleSubmit(addPost)}>
                            <div className="fields">
                                <label>nome</label>
                                <input type="text" name="name" {...register("name")}/>
                                <p className="error-message">{errors.name?.message}</p>
                            </div>
                            <div className="fields">
                                <label>email</label>
                                <input type="text" name="email" {...register("email")}/>
                                <p className="error-message">{errors.email?.message}</p>
                            </div>
                            <div className="fields">
                                <label>sexo</label>
                                <select {...register("gender")}>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            </div>
                            <div className="status">
                                <label>status</label>
                                <select {...register("status")}>
                                    <option value="active">active</option>
                                </select>
                            </div>
                            {/* <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="title" {...register("title")}/>
                                <p className="error-message">{errors.title?.message}</p>
                            </div>
                            <div className="fields">
                                <label>Email</label>
                                <input type="email" name="description" {...register("description")}/>
                                <p className="error-message">{errors.description?.message}</p>
                            </div>
                            <div className="fields">
                                <label>Gênero</label>
                                <select {...register("content")}>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div> */}
                            <div className="btn-post">
                                <button type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Post;