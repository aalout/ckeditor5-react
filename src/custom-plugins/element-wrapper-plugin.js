import { Plugin } from 'ckeditor5';
import { ButtonView } from 'ckeditor5';

export default class WrapElementsIntoPlugin extends Plugin {
    init() {
      const editor = this.editor;
      editor.commands.add('wrapElements', {
        execute() {
          const selection = editor.model.document.selection;
          const selectedElements = selection.getSelectedElements();
  
          if (selectedElements.length === 2) {
            const wrapper = editor.model.change(writer => {
              const div = writer.createElement('div', {
                style: 'display: flex',
              });
  
              writer.wrap(selectedElements[0], div);
              writer.wrap(selectedElements[1], div);
            });
  
            editor.model.enqueueChange(writer => {
              writer.moveRangeToPosition(wrapper, 0);
            });
          }
        },
      });
  
      editor.ui.componentFactory.add('wrapElements', {
        buttonView: ButtonView,
        render: view => {
          const button = view.element;
  
          button.set({
            label: 'Wrap elements',
            withText: true,
          });
  
          button.on('execute', () => {
            editor.execute('wrapElements');
          });
        },
      });
    }
  }