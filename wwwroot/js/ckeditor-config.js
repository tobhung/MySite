import {
    ClassicEditor,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    Essentials,
    FileRepository,
    GeneralHtmlSupport,
    Heading,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsert,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Paragraph,
    PasteFromOffice,
    SimpleUploadAdapter,
    SourceEditing,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline
} from 'ckeditor5';

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        
        // Use absolute path to the upload controller
        xhr.open('POST', '/api/file', true);
        xhr.responseType = 'json';
    }
    
    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            console.log('Server response:', response);

            if (!response || response.error) {
                return reject(response && response.error ? response.error.message : genericErrorText);
            }

            resolve({
                default: response.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest(file) {
        const data = new FormData();
        data.append('upload', file);
        
        // Add antiforgery token if your app uses it
        const antiforgeryToken = document.querySelector('input[name="__RequestVerificationToken"]')?.value;
        if (antiforgeryToken) {
            data.append('__RequestVerificationToken', antiforgeryToken); 
            console.log('Anti-forgery token added to FormData:', antiforgeryToken);
        } else {
            console.warn('Anti-forgery token not found in the DOM');
        }
        
        this.xhr.send(data);
    }

}

function MyCustomUploadAdapterPlugin( editor ) {
	editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
		// Configure the URL to the upload script in your backend here!
		return new MyUploadAdapter( loader );
	};
}

const LICENSE_KEY = 'GPL';

const editorConfig = {
    toolbar: {
        items: [
            'sourceEditing',
			'|','heading', '|',
            'bold', 'italic', 'underline','|',
            'specialCharacters', 'link', 'insertImage', 'mediaEmbed', 'insertTable', 'blockQuote', '|',
            'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
        ],
        shouldNotGroupWhenFull: false
    },
    plugins: [
        FileRepository, Autoformat, AutoImage, Autosave, BlockQuote, Bold, Essentials, GeneralHtmlSupport, Heading, HtmlEmbed,
        ImageBlock, ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl,
        ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload,
        Indent, IndentBlock, Italic, Link, LinkImage, List, ListProperties,
        MediaEmbed, Paragraph, PasteFromOffice, SimpleUploadAdapter, SourceEditing,
        SpecialCharacters, SpecialCharactersArrows, SpecialCharactersCurrency,
        SpecialCharactersEssentials, SpecialCharactersLatin, SpecialCharactersMathematical,
        SpecialCharactersText, Table, TableCaption, TableCellProperties,
        TableColumnResize, TableProperties, TableToolbar, TextTransformation,
        TodoList, Underline
    ],
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true
            },
            {
                name: 'i',
                attributes: ['class'],
            },
            {
                name: 'a',
                attributes: ['href', 'target', 'rel', 'class']
            },
            {
                name: 'li',
                attributes: ['class']
            },
            // Allow div elements with all attributes, classes, and styles
            {
                name: 'div',
                attributes: true,
                classes: true,
                styles: true
            },
            // Allow span elements with all attributes, classes, and styles
            {
                name: 'span',
                attributes: true,
                classes: true,
                styles: true
            },
            // Allow section, article, aside, header, footer, main, nav elements
            {
                name: /^(section|article|aside|header|footer|main|nav)$/,
                attributes: true,
                classes: true,
                styles: true
            },
            // Allow common inline elements
            {
                name: /^(small|code|kbd|samp|var|mark|del|ins|sub|sup)$/,
                attributes: true,
                classes: true,
                styles: true
            },
            // Allow data attributes on all elements
            {
                name: /.*/,
                attributes: /^data-.*$/
            },
            // Allow id attributes on all elements
            {
                name: /.*/,
                attributes: ['id']
            },
            // Allow custom classes on paragraphs and headings
            {
                name: /^(p|h[1-6])$/,
                classes: true
            },
            {
                name: /^(i|em|strong|b|span)$/,
                attributes: ['class']
            }
            
        ],
        disallow: [
            // You can add elements to disallow here if needed
            // For example, to disallow script tags:
            // { name: 'script' }
        ]
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
    },
    image: {
        toolbar: [
            'toggleImageCaption', 'imageTextAlternative', '|',
            'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
            'resizeImage'
        ]
    },
    language: 'zh',
    licenseKey: LICENSE_KEY,
    link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: { download: 'file' }
            }
        }
    },
    list: {
        properties: { styles: true, startIndex: true, reversed: true }
    },
    placeholder: 'Type or paste your content here!',
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    extraPlugins: [MyCustomUploadAdapterPlugin]
};


document.addEventListener('DOMContentLoaded', () => {
    const editorElement = document.querySelector('#editor');
    const formElement = editorElement.closest('form'); // Find the parent form

    if (editorElement && formElement) {
        ClassicEditor
            .create(editorElement, editorConfig)
            .then(editor => {
                window.editor = editor;

                // Access the FileRepository plugin
                const fileRepository = editor.plugins.get('FileRepository');

                // Prevent form submission during upload
                formElement.addEventListener('submit', (event) => {
                    if (fileRepository.isUploading) {
                        event.preventDefault();
                        console.log('Form submission prevented because an upload is in progress');
                    }
                });

                // Optional: Add logging for debugging
                fileRepository.on('uploadStart', () => {
                    console.log('Upload started');
                });
                fileRepository.on('uploadComplete', () => {
                    console.log('Upload completed');
                });
            })
            .catch(error => {
                console.error('CKEditor initialization error:', error);
            });
    }
});


