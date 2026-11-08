import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../Hooks/useFetch';
import Toast_validation from '../Toast_valide/Toast_valide';
import Toast_invalide from '../Toast_invalide/Toast_invalide';
import ArticleForm from '../ArticleForm/ArticleForm';
import { apiErrorMessage } from '../ArticleForm/articleRules';

export default function AjoutArticle() {
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL

  const createArticle = async (formData) => {
    setIsSubmitting(true)
    setErrorMessage("")

    const response = await useFetch(`${apiUrl}/article/ajoutArticle`, "POST", formData)

    if (response?.status === 201) {
      setMessage(response.data.message)
      setTimeout(() => {
        navigate("/dashboard")
      }, 3000);
      return
    }

    setIsSubmitting(false)
    if (!response) {
      setErrorMessage("Votre session a expiré, veuillez vous reconnecter")
    } else {
      setErrorMessage(apiErrorMessage(response.data, "Une erreur lors de l'insertion de l'article est survenue"))
    }
  }

  return (
    <section>
      {message &&
        <Toast_validation message={message} />
      }
      {errorMessage &&
        <Toast_invalide message={errorMessage} deletePopUp={() => setErrorMessage("")} />
      }
      <ArticleForm onSubmit={createArticle} submitLabel="Publier article" isSubmitting={isSubmitting} />
    </section>
  )
}
