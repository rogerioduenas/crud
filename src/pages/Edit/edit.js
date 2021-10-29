import React, { useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, useParams} from "react-router-dom";


const validationPost = yup.object().shape({
    title: yup.string().required("O titulo é obrigatorio").max(40, "O titulo pode ter até 40 caracteres"),
    description: yup.string().required("A descrição é obrigatoria").max(150, "A descrição pode ter até 150 caracteres"),
    content: yup.string().required("O conteúdo é obrigatório").max(500, "O conteúdo precisa ter menosde 500 caracteres")
})

function Edit(){

    const {id} = useParams()

    let history = useHistory();

    // const addPost = data => axios.post("https://gorest.co.in/public/v1/users?access-token=25cf80e10a3005cca1533a684fca1f71803c9810ed960e5524d8b728e7a01a8e", data)
    // .then(() => {
    const addPost = data => axios.put(`https://upload-my-api.herokuapp.com/post/edit/${id}`, data)
    .then(() => {
    console.log("deu certo")
    history.push("/")
    })
    .catch(() => {
    console.log("erro")
    })

    const { register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(validationPost)
    })

    useEffect(() => {
    axios.get(`https://upload-my-api.herokuapp.com/post/${id}`)
    .then((response) => {
    reset(response.data)
    })
    }, [])
    
    return(
        <div>
            <Header />
            <main>
                <div className="card-post">
                    <h1>Editar Usuário</h1>
                    <div className="line-post"></div>

                    <div className="body-post">
                        <form onSubmit={handleSubmit(addPost)}>
                            {/* <div className="fields">
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
                            </div> */}
                            <div className="fields">
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
                            </div>
                            <div className="btn-post">
                                <button type="submit">Atualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edit;