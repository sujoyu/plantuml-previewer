$(function() {
  $('select').material_select();

  var $mode = $("#mode");

  var ls = window.localStorage;

  if (!ls) {
    console.error("this application needs local storage.");
  }

  var uml = ls && ls.getItem("uml");

  if (uml) {
    $("#canvas").attr({
        uml: uml,
        src: null
    });
  }

  var editor = ace.edit("editor");
  editor.session.setValue(uml ? uml : "");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/diagram");
  editor.setAutoScrollEditorIntoView(true);

  var $form = $("#previewForm");

  $form.submit(function() {
    var uml = editor.getValue();

    ls && ls.setItem("uml", uml);

    $("#canvas").attr({
      uml: uml,
      src: null
    });

    plantuml_runonce();

    return false;
  }).submit();

  $mode.change(function() {
    var mode = $(this).val();

    addSubmitKey();

    ls && ls.setItem("mode", mode);
    editor.setKeyboardHandler(mode);
  });

  var mode = ls && ls.getItem("mode");
  if (mode) {
    $mode.val(mode).change();
  }

  function addSubmitKey() {
    editor.commands.addCommand({
    name: 'submit',
    bindKey: {win: 'Shift-Enter',  mac: 'Shift-Enter'},
    exec: function(editor) {
      $form.submit();
    },
    readOnly: false
    });
  }

  addSubmitKey();

});

