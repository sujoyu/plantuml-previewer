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

$(function() {
  var ls = window.localStorage;

  var uml = ls && ls.getItem("uml");
  if (uml) {
    $("#editor").html(uml);
    $("#canvas").attr({
        uml: uml,
        src: null
    });
  }
})
