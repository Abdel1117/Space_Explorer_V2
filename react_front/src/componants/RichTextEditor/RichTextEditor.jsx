import React from 'react'
import { CKEditor } from 'ckeditor4-react'

const TOOLBAR = [
    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
    { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Blockquote'] },
    { name: 'links', items: ['Link', 'Unlink'] },
    { name: 'styles', items: ['Format'] },
    { name: 'undo', items: ['Undo', 'Redo'] },
]

export default function RichTextEditor({ initData, onChange }) {
    return (
        <CKEditor
            editorUrl="/ckeditor4/ckeditor.js"
            initData={initData}
            config={{
                toolbar: TOOLBAR,
                format_tags: 'p;h2;h3;h4',
                removePlugins: 'image,uploadimage,uploadwidget,easyimage,elementspath',
                allowedContent: 'p br strong em u s h2 h3 h4 ul ol li blockquote a[!href,target]',
                resize_enabled: false,
            }}
            onChange={(event) => onChange(event.editor.getData())}
        />
    )
}
