
export default class AceEditor {
  constructor(id, submitter) {
    this.editor = ace.edit(id);
    this.editor.setTheme("ace/theme/monokai");
    this.editor.getSession().setMode("ace/mode/diagram");
    this.editor.setAutoScrollEditorIntoView(true);
    this.submitter = submitter;
    this.bindSubmitKey();
  }

  getCode() {
    return this.editor.getValue();
  }

  updateCode(code) {
    this.editor.session.setValue(code);
  }

  onKeybindModeChange(mode) {
    this.editor.setKeyboardHandler(mode);
  }

  bindSubmitKey() {
    this.editor.commands.addCommand({
      name: 'submit',
      bindKey: {win: 'Shift-Enter',  mac: 'Shift-Enter'},
      exec: (editor) => {
        this.submitter();
      },
      readOnly: false
    });
  }
}