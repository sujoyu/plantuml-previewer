$(function() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/diagram");

  var $form = $("#previewForm");
  
  editor.commands.addCommand({
    name: 'submit',
    bindKey: {win: 'Shift-Enter',  mac: 'Shift-Enter'},
    exec: function(editor) {
      $form.submit();
    },
    readOnly: false
  });

  plantumlPreviewer.finalize();

  $form.submit(function() {
    $("#canvas").attr({
      uml: editor.getValue(),
      src: null
    });

    plantumlPreviewer.initialize();
    plantuml_runonce();
    plantumlPreviewer.finalize();
    
    return false;
  });
});

var plantumlPreviewer = {

  SharedWorker: null,
  Worker: null,

  initialize: function() {
    if (window.SharedWorker) {
      this.SharedWorker = window.SharedWorker;
      window.SharedWorker = undefined;
    }

    if (window.Worker) {
      this.Worker = window.Worker;
      window.Worker = undefined;
    }
  },

  finalize: function() {
    if (this.SharedWorker) {
      window.SharedWorker = this.SharedWorker;
    }

    if (this.Worker) {
      window.Worker = this.Worker;
    }
  }
}

plantumlPreviewer.initialize();
