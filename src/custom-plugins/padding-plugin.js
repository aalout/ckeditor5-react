import { Plugin } from 'ckeditor5';
import { ButtonView } from 'ckeditor5';

export default class PaddingPlugin extends Plugin {
  init() {
    console.log('PaddingPlugin is initialized!');

    this.editor.commands.add('padding', {
      execute: () => {
        this.setPadding(10);
      },
      refresh: () => {
        const selectedElement = this.editor.model.document.selection.getSelectedElement();
        this.isEnabled = !!selectedElement;
      }
    });

    this.editor.ui.componentFactory.add('padding', (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Padding',
        withText: true,
        tooltip: true,
      });

      button.on('execute', () => {
        this.editor.execute('padding');
        this.editor.editing.view.focus();
      });

      return button;
    });
  }
  setPadding(value) {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    const firstPosition = selection.getFirstPosition();
    const lastPosition = selection.getLastPosition();
  
    console.log('Selected element:', firstPosition, lastPosition);
  
    if (firstPosition && lastPosition) {
      const firstElement = firstPosition.parent;
      const lastElement = lastPosition.parent;
  
      if (firstElement && lastElement) {
        editor.model.change((writer) => {
          const div = writer.createElement('div');
          const range = writer.createRangeIn(firstElement);
          range.end = writer.createPositionAfter(lastElement);
  
          writer.wrap(div, range);
          writer.setAttribute('style', `padding: ${value}px`, div);
        });
      } else {
        console.warn('No element selected to apply padding.');
      }
    } else {
      console.warn('No element selected to apply padding.');
    }
  }
}