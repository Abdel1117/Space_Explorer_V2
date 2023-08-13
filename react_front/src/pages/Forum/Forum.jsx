import React, { useEffect, useState } from 'react'
import ForumTable from '../../componants/ForumTable/ForumTable'


export default function Forum() {

    const [loading, setIsLoading] = useState(false)
    const [posts, setPosts] = useState([]);

    const [columns, setColumns] = useState(new Set())
    const FormData =
    {
        "messages": [
            {
                "auteur": "Alice",
                "date": "2023-07-25 10:15:00",
                "contenu": "Salut tout le monde ! Comment allez-vous ?",
                "status": "Actif"
            },
            {
                "auteur": "Bob",
                "date": "2023-07-25 11:30:22",
                "contenu": "Bonjour, je cherche des conseils pour améliorer mon jardin. Des suggestions ?",
                "status": "Actif"
            },
            {
                "auteur": "Charlie",
                "date": "2023-07-26 14:05:10",
                "contenu": "J'ai récemment lu un bon livre sur l'astronomie. Est-ce que quelqu'un d'autre est passionné par l'espace ?",
                "status": "Actif"
            },
            {
                "auteur": "Alice",
                "date": "2023-07-26 15:20:45",
                "contenu": "@Charlie Oui, l'astronomie est fascinante ! Quel est le titre du livre que tu as lu ?",
                "status": "Actif"
            },
            {
                "auteur": "Eve",
                "date": "2023-07-27 09:00:05",
                "contenu": "Je suis nouvelle ici. Salut à tous !",
                "status": "Actif"
            },
            {
                "auteur": "Charlie",
                "date": "2023-07-27 10:30:18",
                "contenu": "Bienvenue, Eve ! Nous sommes ravis de t'accueillir sur le forum.",
                "status": "Actif"
            },
            {
                "auteur": "Admin",
                "date": "2023-07-27 12:45:55",
                "contenu": "Bonjour à tous, veuillez noter qu'une maintenance du forum est prévue demain matin.",
                "status": "Annonce"
            },
            {
                "auteur": "Alice",
                "date": "2023-07-28 08:10:30",
                "contenu": "@Admin Merci pour l'annonce ! À quelle heure commencera la maintenance ?",
                "status": "Actif"
            },
            {
                "auteur": "Admin",
                "date": "2023-07-28 08:25:15",
                "contenu": "@Alice La maintenance débutera à 9h du matin. Elle devrait durer environ une heure.",
                "status": "Actif"
            },
            {
                "auteur": "Bob",
                "date": "2023-07-28 09:30:40",
                "contenu": "@Admin Parfait, merci pour l'information !",
                "status": "Actif"
            }
        ]
    }


    useEffect(() => {
        try {
            setIsLoading(true)
            const tempColumns = new Set()
            const tempPosts = [];
            FormData.messages.forEach((message) => {
                tempPosts.push(message)
                Object.keys(message).forEach((col) => {
                    tempColumns.add(col)
                })
            })
            setColumns((prevColumns) => new Set([...prevColumns, ...tempColumns]));

            setPosts((prevPosts) => [...prevPosts, ...tempPosts]);
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }, [])
    return (
        <section className='relative overflow-x-auto shadow-md sm:rounded-lg min-h-[400px] p-2 md:p-6'>
            <h1 className='mx-auto py-2 md:py-8 text-lg md:text-xl xl:text-2xl dark:text-white text-center'>Forum de Space Explorer</h1>

            <ForumTable columns={columns} datas={posts} loading={loading} />
                
        </section>
    )
}
