import './App.css';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	AccessibilityHelp,
	Autoformat,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	FullPage,
	GeneralHtmlSupport,
	Heading,
	HtmlComment,
	HtmlEmbed,
	Indent,
	IndentBlock,
	Italic,
	Link,
	Paragraph,
	SelectAll,
	ShowBlocks,
	SourceEditing,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	Title,
	Underline,
	Undo,
  CodeBlock,
} from 'ckeditor5';
import ReactHtmlParser from 'react-html-parser'

import 'ckeditor5/ckeditor5.css';

function App() {
  const [addData, setData] = useState('');
  const [addedData, showData] = useState(1);
  const handleChange = (e, editor) => {
    const data = editor.getData();
    setData(data)
  }
  const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'sourceEditing',
				'showBlocks',
				'textPartLanguage',
				'|',
				'heading',
				'|',
				'bold',
				'italic',
				'underline',
				'|',
				'link',
				'insertTable',
				'blockQuote',
				'htmlEmbed',
				'|',
				'outdent',
				'indent',
        '|',
        'codeBlock',
        '|',
        ''
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			Autoformat,
			Autosave,
			BlockQuote,
			Bold,
			Essentials,
			FullPage,
			GeneralHtmlSupport,
			Heading,
			HtmlComment,
      CodeBlock,
			HtmlEmbed,
			Indent,
			IndentBlock,
			Italic,
			Link,
			Paragraph,
			SelectAll,
			ShowBlocks,
			SourceEditing,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextPartLanguage,
			TextTransformation,
			Title,
			Underline,
			Undo
		],
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			]
		},
    initialData: '<h1>Что умеет CKEditor в базовой версии?</h1><h3>Умеет писать заголовки</h3><p>Умеет делать текст <strong>таким,</strong> <i>таким </i>и <u>таким,</u> или сразу вот <i><strong><u>таким</u></strong></i></p><p>Умеет делать таблицы</p><figure class="table"><table><tbody><tr><td>Правда под это нужны стили…</td><td>да</td><td>точно</td></tr><tr><td>Ведь в выводе снизу</td><td>нет никаких</td><td>border</td></tr><tr><td>и в целом таблица</td><td>не</td><td>стилизована</td></tr></tbody></table></figure><p>Умеет прикреплять <a href="ссылка">ссылки</a></p><div class="raw-html-embed">Можно вставить html код <div> <h2 style="color:orange; text-shadow: #FC0 1px 0 10px;">И здесь можно разогнаться</h2> </div></div><p style="margin-left:160px;">Умеет добавлять отступы</p><p>Да в целом можно редактировать все, что можно редактировать</p><p>в html/css, как через код, так и через настраиваемою панель сверху</p><pre><code class="language-javascript">const CKEditor = "Умеет вставлять код"</code></pre>',
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		placeholder: 'Контент тут',
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		}
	};
  return (
    <div className="App">
      <h2>
        CKEditor React тест
      </h2>
      <div style={{display: 'inline-block', textAlign:'left'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent: 'center', gap: '200px'}}>
          <h2 style={{minWidth: '200px'}}>Редактор</h2>
          <div>
        <div style={{width: '700px', display: 'inline-block', textAlign:'right', marginBottom: '5px'}}>
          <button onClick={() => showData(!addedData)}>{addedData ? 'Скрыть' : 'Показать'}</button>
        </div>
        <CKEditor style={{minWidth: '785px', maxWidth: '785px'}} editor={ClassicEditor} config={editorConfig} data={addData} onChange={handleChange} />
        </div>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent: 'center', gap: '200px'}}>
          <h2 style={{minWidth: '200px'}}>Вывод</h2>
        <div style={{border: '1px solid rgba(0,0,0,0.2)', padding: '10px', minWidth: '785px', maxWidth: '785px'}}>
          {addedData ? ReactHtmlParser(addData) : ''}
        </div>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent: 'center', gap: '200px'}}>
        <h2 style={{minWidth: '200px'}}>Вывод HTML</h2>
        <div style={{border: '1px solid rgba(0,0,0,0.2)', padding: '10px', borderTop: 'none', minHeight:'120px', minWidth: '785px', maxWidth: '785px'}}>
          {addedData ? addData : ''}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
