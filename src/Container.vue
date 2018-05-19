<template>
  <v-container>
    <form id="previewForm" class="row" @submit.prevent="onSubmit">
      <v-layout row wrap>
        <v-flex xs4 class="px-3">
          <v-btn color="success" large class="mx-auto" type="submit">preview &amp; save (Shift+Enter)</v-btn>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-select
            :items="editorModes"
            v-model="editorMode"
            label="Choose Online Editor"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-select
            :items="keybindModes"
            v-model="keybindMode"
            label="Choose Key Binding"
            single-line
            v-if="editorMode === 'ace'"
          ></v-select>
        </v-flex>
      </v-layout>
    </form>
      <v-divider></v-divider>
      <section id="editorWrapper" class="">
    <pre id="aceEditor" class="elevation-1" ref="aceEditor"></pre>
    <div id="codeFlaskEditor" class="elevation-1" ref="codeFlaskEditor"></div>
    </section>
    <div id="canvasWrapper" class="">
      <section id="canvasSection" class="elevation-1">
        <img id="canvas" uml="
          Bob->Alice : foo
          Bob<--Alice : foo
          " ref="canvas">
      </section>
    </div>

    <v-snackbar
      :timeout="3000"
      bottom
      right
      v-model="updatedMessageVisible"
    >
      UML Diagram updated.
      <v-btn flat color="pink" @click.native="updatedMessageVisible = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import CodeFlaskEditor from "./CodeFlaskEditor";
import AceEditor from "./AceEditor";

export default {
  data: () => {
    return {
      editorModes: [
        {
          text: "CodeFlask",
          value: "codeFlask"
        },
        {
          text: "Ace",
          value: "ace"
        }
      ],
      editorMode: "codeFlask",
      keybindModes: [
        {
          text: "Default",
          value: ""
        },
        {
          text: "Emacs",
          value: "ace/keyboard/emacs"
        },
        {
          text: "Vim",
          value: "ace/keyboard/vim"
        }
      ],
      keybindMode: "",
      editors: {},
      ls: window.localStorage,
      updatedMessageVisible: false,
    };
  },
  computed: {
    currentEditorClass() {
      return this.editorMode === "ace" ? AceEditor : CodeFlaskEditor;
    },
    currentEditor() {
      return this.editors[this.editorMode];
    }
  },
  watch: {
    editorMode(newEditor, oldEditor) {
      this.onChangeEditorMode(this.editors[oldEditor].getCode());
    },
    keybindMode(newMode, oldMode) {
      this.onKeybindModeChange();
    }
  },
  mounted() {
    if (!this.ls) {
      console.error("this application needs local storage.");
    }

    const uml = this.ls && this.ls.getItem("uml");
    if (uml) {
      this.$refs.canvas.setAttribute("uml", uml);
      this.$refs.canvas.removeAttribute("src", null);
    }

    this.onChangeEditorMode(
      uml
        ? uml
        : `bob -> alice
bob <-- alice`
    );
    this.editorMode = this.ls && this.ls.getItem("editor");
    this.keybindMode = this.ls && this.ls.getItem("mode");

    plantuml_runonce();
  },
  methods: {
    onSubmit() {
      const uml = this.currentEditor.getCode();

      this.ls && this.ls.setItem("uml", uml);

      if (uml) {
        this.$refs.canvas.setAttribute("uml", uml);
        this.$refs.canvas.removeAttribute("src", null);
      }

      plantuml_runonce();
      this.updatedMessageVisible = true;
    },
    onChangeEditorMode(oldCode) {
      if (!this.editors.hasOwnProperty(this.editorMode)) {
        this.editors[this.editorMode] = new this.currentEditorClass(
          `${this.editorMode}Editor`,
          this.onSubmit
        );
      }
      this.currentEditor.updateCode(oldCode);
      this.ls && this.ls.setItem("editor", this.editorMode);

      Object.keys(this.editors).forEach(key => {
        const classList = this.$refs[`${key}Editor`].classList;
        if (this.editorMode === key) {
          classList.remove("hidden");
        } else {
          classList.add("hidden");
        }
      });
    },
    onKeybindModeChange() {
      if (this.currentEditor.onKeybindModeChange) {
        this.ls && this.ls.setItem("mode", this.keybindMode);
        this.currentEditor.onKeybindModeChange(this.keybindMode);
      }
    }
  }
};
</script>
<style lang="postcss" scoped>
#aceEditor,
#codeFlaskEditor {
  code {
    background-color: #fff;
    color: #888;
    box-shadow: none;
  }
}
</style>
