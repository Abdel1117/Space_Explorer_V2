import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useFetch } from '../../Hooks/useFetch';
import { ErrorMessage } from '@hookform/error-message';
import _ from "lodash/fp";
import Toast_validation from '../Toast_valide/Toast_valide';
import Toast_invalide from '../Toast_invalide/Toast_invalide';

export default function ajoutImage() {



    return (
        <section>
            <form encType="multipart/form-data" method='POST' className="w-[280px] sm:w-[520px] md:w-[500px] lg:w-10/12 h-full bg-white dark:bg-blue-900 rounded-lg p-4 mx-auto">





            </form>
        </section>
    )
}
