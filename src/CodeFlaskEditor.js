import CodeFlask from 'codeflask';
import plantUmlOptions from './plantuml-options';

export default class CodeFlaskEditor {
  constructor(id, submitter) {
    this.id = id;
    this.editor = new CodeFlask(`#${id}`, {
      language: 'plantuml',
      lineNumbers: true,
    });
  
    this.editor.addLanguage('plantuml', plantUmlOptions);
    this.submitter = submitter;
    this.bindSubmitKey()
  }

  getCode() {
    return this.editor.getCode();
  }

  updateCode(code) {
    this.editor.updateCode(code);
  }

  bindSubmitKey() {
    document.getElementById(this.id).addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault();
        this.submitter();
      }
    })
  }
}