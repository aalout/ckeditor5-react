import { Plugin } from '@ckeditor/ckeditor5-core';

export default class PaddingPlugin extends Plugin {
    init() {
        console.log('PaddingPlugin is initialized!');
    
        this.editor.commands.add('padding', {
          execute: (command) => {
            this.setPadding(command);
          },
        });
      }

  setPadding(command) {
    const editor = this.editor;
    const selection = editor.model.document.selection;
    const selectedElement = selection.getSelectedElement();

    if (selectedElement) {
      selectedElement.setAttribute('style', `padding: ${command.value}px`);
    }
  }
}