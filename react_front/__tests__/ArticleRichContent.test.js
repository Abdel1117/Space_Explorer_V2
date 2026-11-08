import { describe, it, expect, vi, afterEach } from 'vitest';
import { resolveArticleMedia } from '../src/Functions/TextRendering/resolveArticleMedia';
import { addUploadAuthHeader, buildEditorConfig } from '../src/componants/RichTextEditor/editorConfig';

const API = 'http://api.test';

describe('resolveArticleMedia', () => {
    it('préfixe par l\'URL de l\'API les images uploadées via l\'éditeur', () => {
        const html = '<figure class="image-captioned image-align-right"><img alt="Saturne" src="/article_contenu/saturne_1.png"><figcaption>Saturne</figcaption></figure>';
        expect(resolveArticleMedia(html, API)).toBe(
            '<figure class="image-captioned image-align-right"><img alt="Saturne" src="http://api.test/article_contenu/saturne_1.png"><figcaption>Saturne</figcaption></figure>'
        );
        expect(resolveArticleMedia('<img src="article_contenu/a.png">', API)).toBe('<img src="http://api.test/article_contenu/a.png">');
    });

    it('ne touche pas aux URL absolues ni aux liens', () => {
        const html = [
            '<img src="https://example.com/a.png">',
            '<img src="//cdn.example.com/b.png">',
            '<img src="data:image/png;base64,AAAA">',
            '<a href="/article/42">lien interne</a>'
        ].join('');
        expect(resolveArticleMedia(html, API)).toBe(html);
    });

    it('renvoie une chaîne vide sans contenu', () => {
        expect(resolveArticleMedia(undefined, API)).toBe('');
        expect(resolveArticleMedia('', API)).toBe('');
    });
});

describe('configuration CKEditor des articles', () => {
    afterEach(() => sessionStorage.clear());

    it('active les images légendées et alignées avec upload vers l\'API', () => {
        const config = buildEditorConfig(API);
        expect(config.extraPlugins.split(',')).toEqual(expect.arrayContaining(['image2', 'uploadimage']));
        expect(config.removePlugins.split(',')).toContain('image');
        expect(config.imageUploadUrl).toBe('http://api.test/article/uploadImage');
        expect(config.filebrowserImageUploadUrl).toBe('http://api.test/article/uploadImage');
        expect(config.filebrowserUploadMethod).toBe('xhr');
        expect(config.baseHref).toBe('http://api.test/');
        expect(config.image2_alignClasses).toEqual(['image-align-left', 'image-align-center', 'image-align-right']);
        expect(config.toolbar.flatMap((group) => group.items)).toContain('Image');
    });

    it('n\'intercepte que les formats d\'image acceptés par le back', () => {
        const { uploadImage_supportedTypes: types } = buildEditorConfig(API);
        ['image/png', 'image/jpeg', 'image/webp'].forEach((type) => expect(types.test(type)).toBe(true));
        ['image/gif', 'image/svg+xml', 'image/bmp'].forEach((type) => expect(types.test(type)).toBe(false));
    });

    it('ajoute le token de l\'administrateur aux uploads', () => {
        const setRequestHeader = vi.fn();
        const evt = { data: { fileLoader: { xhr: { setRequestHeader } } } };

        addUploadAuthHeader(evt);
        expect(setRequestHeader).not.toHaveBeenCalled();

        sessionStorage.setItem('token', 'jwt-admin');
        addUploadAuthHeader(evt);
        expect(setRequestHeader).toHaveBeenCalledWith('Authorization', 'Bearer jwt-admin');
    });
});
