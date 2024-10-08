import { Plugin } from 'ckeditor5';
import { ButtonView } from 'ckeditor5';
import {Command} from 'ckeditor5';

class StyleCommand extends Command {
    execute() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;

        model.change(writer => {
            const range = selection.getFirstRange();
            for (const item of range.getItems()) {
                if (item.is('textProxy')) {
                    writer.setAttribute('customStyle', true, item);
                }
            }
        });
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const isAllowed = model.schema.checkAttributeInSelection(selection, 'customStyle');

        this.isEnabled = isAllowed;
    }
}

export default class CustomStylePlugin extends Plugin {
    init() {
        const editor = this.editor;

        editor.commands.add('applyCustomStyle', new StyleCommand(editor));
        editor.ui.componentFactory.add('customStyle', locale => {
            const button = new ButtonView(locale);

            button.set({
                label: 'Custom Style',
                withText: true,
                tooltip: true,
            });

            button.on('execute', () => {
                editor.execute('applyCustomStyle');
            });

            return button;
        });

        editor.conversion.attributeToElement({
            model: 'customStyle',
            view: {
                name: 'span',
                styles: {
                    'font-weight': 'bold',
                    'color': 'red',
                    'padding': '100px',
                    'display': 'block',
                    'border': '1px solid red',
                    'background-color': 'gray',
                }
            }
        });

        editor.model.schema.extend('$text', { allowAttributes: 'customStyle' });
    }
}