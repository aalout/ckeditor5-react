import { Plugin } from 'ckeditor5';
import { ButtonView } from 'ckeditor5';

export default class PaddingPlugin extends Plugin {
  init() {
    console.log('PaddingPlugin is initialized!');

    this.editor.commands.add('padding', {
      execute: () => {
        console.log('Execute padding command');
        this.setPadding(100);
      },
      refresh: () => {
        console.log('Refresh padding command');
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
        console.log('Button execute');
        this.editor.execute('padding');
        this.editor.editing.view.focus();
      });

      return button;
    });
  }

  setPadding(value) {
    console.log('Set padding');
    const editor = this.editor;
    const selection = editor.model.document.selection;
    const firstPosition = selection.getFirstPosition();
    const lastPosition = selection.getLastPosition();

    if (firstPosition && lastPosition) {
      console.log('Selection found');
      const firstElement = firstPosition.parent;
      const lastElement = lastPosition.parent;

      if (firstElement && lastElement) {
        console.log('Elements found');
        editor.model.change((writer) => {
          console.log('Change model');
          const newStyle = `"margin-left: ${value}px"`;
          writer.setAttribute('style=', newStyle, firstElement);
          console.log('New style:', newStyle);
          console.log('Element style after change:', firstElement.getAttribute('style'));
        });
      } else {
        console.log('No elements found');
      }
    } else {
      console.log('No selection found');
    }
  }
}