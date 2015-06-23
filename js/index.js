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

