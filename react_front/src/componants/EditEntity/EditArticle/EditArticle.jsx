import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useFetch } from '../../../Hooks/useFetch';
import { ErrorMessage } from '@hookform/error-message';
import _ from "lodash/fp";
import Toast_validation from '../../Toast_valide/Toast_valide';
import Toast_invalide from '../../Toast_invalide/Toast_invalide';

export const EditArticle = () => {

    const [article, setArticle] = useState({});
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [Titre, setTitre] = useState("");
    const [Slug, setSlug] = useState([]);
    const [sections, setSections] = useState([
        { contenu: "", image: "", titre: "" }
    ]);
    const [image, setImages] = useState("");

    const { register, formState: { errors }, handleSubmit, getValues, watch, setValue } = useForm({
        criteriaMode: 'all',

    });

    useEffect(() => {
            
    }, [])

    return (
        <div>EditArticle</div>
    )
}
