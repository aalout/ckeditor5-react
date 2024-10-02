import { Plugin } from 'ckeditor5/core';
import ContainerElement from './container-element';
import ContainerView from './container-view';
import { ButtonView } from 'ckeditor5';
import {WidgetWrapperElement} from 'ckeditor5'

export default class BigBoxPlugin extends Plugin {
  static get requires() {
    return [ContainerElement];
  }

  init() {
    const editor = this.editor;
    const locale = editor.locale;

    editor.conversion.elementToWidget({
      element: ContainerElement,
      widget: ContainerView,
    });

    editor.commands.add('createContainer', {
      exec: editor => {
        editor.model.change(writer => {
          writer.insertContent(writer.createElement(ContainerElement));
        });
      }
    });

    // Add a button to the toolbar
    editor.ui.componentFactory.add('createContainer', locale => {
      const button = new ButtonView(locale);
      button.set({
        label: 'Create Container',
        withText: true,
        tooltip: true,
      });
      button.on('execute', () => {
        editor.execute('createContainer');
      });
      return button;
    });

    editor.ui.toolbar.add('createContainer');

    
  }
}

class BoxElement extends HTMLElement {
  constructor() {
    super();
    this.setProperties({
      padding: '10px',
      display: 'block',
      borderRadius: '5px',
      border: '1px solid #ccc',
      backgroundColor: '#fff',
    });
  }

  setProperties(properties) {
    Object.entries(properties).forEach(([key, value]) => {
      this.setAttribute(key, value);
    });
  }
}

class BoxView extends WidgetWrapperElement {
  constructor(editor) {
    super(editor);

    this.setTemplate({
      template: (editor, element, view, { style }) => {
        return <div style={style} ref={this.setElementRef} />;
      },
      getAttributes: element => {
        const style = {
          padding: element.getAttribute('padding'),
          display: element.getAttribute('display'),
          borderRadius: element.getAttribute('borderRadius'),
          border: element.getAttribute('border'),
          backgroundColor: element.getAttribute('backgroundColor'),
        };
        return { style };
      }
    });

    // Implement drag-and-drop functionality here
    // ...
  }

  setElementRef(element) {
    this.element = element;
    // Add event listeners for drag-and-drop here
    // ...
  }
}
