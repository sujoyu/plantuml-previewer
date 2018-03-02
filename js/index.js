$(function() {
  $('select').material_select();

  var $mode = $("#mode");

  var ls = window.localStorage;

  if (!ls) {
    console.error("this application needs local storage.");
  }

  var uml = ls && ls.getItem("uml");
  // if (uml) {
  //   $("#editor").html(uml);
  // }

  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/diagram");
  editor.setAutoScrollEditorIntoView(true);

  var $form = $("#previewForm");

  plantumlPreviewer.finalize();

  interact('#canvasSection').resizable({
    edges: { right: true, bottom: true },
    restrictEdges: {
      outer: 'self',
      endOnly: true,
    },
    restrictSize: {
      min: { width: 100, height: 50 },
    },

    inertia: true,
  })
  .on('resizemove', onResizeMove);

  $form.submit(function() {
    var uml = editor.getValue();
    // console.log(uml);

    ls && ls.setItem("uml", uml);

    $("#canvas").attr({
      uml: uml,
      src: null
    });

    plantumlPreviewer.initialize();
    plantuml_runonce();
    plantumlPreviewer.finalize();

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

  function onResizeMove(event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
  }

  addSubmitKey();

});

