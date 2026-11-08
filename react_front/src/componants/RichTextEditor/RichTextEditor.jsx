import React, { useRef } from 'react'
import { CKEditor } from 'ckeditor4-react'
import { addUploadAuthHeader, buildEditorConfig, registerEditorStyles } from './editorConfig'

const EDITOR_CONFIG = buildEditorConfig(import.meta.env.VITE_API_URL)

export default function RichTextEditor({ initData, onChange }) {
    // ckeditor4-react garde les handlers reçus au montage de l'éditeur.
    // La ref permet d'appeler le onChange le plus récent, sinon il travaille sur un état des sections périmé.
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    return (
        <CKEditor
            editorUrl="/ckeditor4/ckeditor.js"
            initData={initData}
            config={EDITOR_CONFIG}
            onNamespaceLoaded={registerEditorStyles}
            onFileUploadRequest={addUploadAuthHeader}
            onChange={(event) => onChangeRef.current(event.editor.getData())}
        />
    )
}
