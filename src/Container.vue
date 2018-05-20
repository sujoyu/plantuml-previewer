<template>
  <v-container>
    <form id="previewForm" class="row" @submit.prevent="onSubmit">
      <v-layout row wrap>
        <v-flex xs12 sm12 md12 lg4 class="px-3">
          <v-btn color="success" large class="mx-auto" type="submit" :disabled="submitDisabled">
            preview &amp; save (Shift+Enter)
          </v-btn>
        </v-flex>
        <v-flex xs12 sm12 md12 lg4 class="px-3">
          <v-select
            :items="editorModes"
            v-model="editorMode"
            label="Choose Online Editor"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs12 sm12 md12 lg4 class="px-3">
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

    <v-layout row wrap>
      <v-flex xs12 sm12 md12 lg6 class="px-3 py-3">
        <section id="editorWrapper" class="">
          <pre id="aceEditor" class="elevation-1" ref="aceEditor"></pre>
          <div id="codeFlaskEditor" class="elevation-1" ref="codeFlaskEditor"></div>
        </section>
      </v-flex>
      <v-flex xs12 sm12 md12 lg6 align-center class="px-3 py-3">
        <div id="canvasWrapper" class="">
          <section id="canvasSection" class="elevation-1 text-xs-center" v-dragscroll>
            <img id="canvas" uml="" ref="canvas">
          </section>
        </div>
      </v-flex>
    </v-layout>

    <v-container grid-list-small fluid>
      <v-layout row wrap>
        <v-flex
          v-for="(uml, index) in umls" xs4
          :key='index'
        >
          <v-card flat tile @click.native="onUmlLoad(uml)">
            <v-card-media
              :src="uml.src"
              height="200px"
            >
            </v-card-media>
            <v-card-text>{{ uml.date }}</v-card-text>
            <v-card-actions>
              <v-btn flat color="orange" @click.native="onUmlDelete(uml)">Delete</v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

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
      editorClasses:{
          codeFlask: CodeFlaskEditor,
          ace: AceEditor
      },
      editors: {},
      umls: [],
      ls: window.localStorage,
      updatedMessageVisible: false,
      observer: null,
      submitDisabled: false,
    };
  },
  computed: {
    currentEditorClass() {
      return this.editorClasses[this.editorMode];
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

    this.umls = this.ls && this.ls.getItem("umls") && JSON.parse(this.ls.getItem("umls"))
    console.log(this.umls);

    const uml = this.ls && this.ls.getItem("umls") 
      ? this.umls && this.umls[0] && this.umls[0].uml
      : this.ls && this.ls.getItem("uml") || `bob -> alice
bob <-- alice`;

    if (uml) {
      this.$refs.canvas.setAttribute("uml", uml);
      this.$refs.canvas.removeAttribute("src", null);
    }

    const editor = this.ls && this.ls.getItem("editor") || 'codeFlask';
    this.onChangeEditorMode(uml);
    this.editorMode = editor;
    this.keybindMode = this.ls && this.ls.getItem("mode");

    this.submitDisabled = true;
    plantuml_runonce(this.onPlantUmlUpdated(uml, true));
  },
  methods: {
    onSubmit() {

      const uml = this.currentEditor.getCode();

      if (uml) {
        this.$refs.canvas.setAttribute("uml", uml);
        this.$refs.canvas.removeAttribute("src", null);
      }

      this.submitDisabled = true;
      plantuml_runonce(this.onPlantUmlUpdated(uml));
    },
    onUmlLoad(uml) {
      this.currentEditor.updateCode(uml.uml);

      this.$refs.canvas.setAttribute("uml", uml.uml);
      this.$refs.canvas.removeAttribute("src", null);

      this.submitDisabled = true;
      plantuml_runonce(() => {
        this.submitDisabled = false;
        this.updatedMessageVisible = true;
      });
    },
    onUmlDelete(uml) {
      this.umls = this.umls.filter(u => u !== uml);
      this.ls && this.ls.setItem('umls', JSON.stringify(this.umls));
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

      Object.keys(this.editorClasses).forEach(key => {
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
    },
    onPlantUmlUpdated(uml, noSave) {
      return () => {
        const src = this.$refs.canvas.getAttribute('src');

        if (!noSave) {
          this.umls.unshift({
            uml: uml,
            src: src,
            date: new Date().getTime()
          });
        }

        this.ls && this.ls.setItem('umls', JSON.stringify(this.umls));
        this.submitDisabled = false;
        this.updatedMessageVisible = true;
      }
    }
  }
};
</script>
<style lang="scss">
#editorWrapper {
  position: relative;
  width: 100%;
}

#aceEditor, #codeFlaskEditor {
  height: 50rem;
  width: 100%;

  &.hidden {
    height: 0;
    display: none;
  }
  
  code {
    background-color: transparent;
    color: #888;
    box-shadow: none;
    font-size: 100%;
    font-weight: normal;

    &:before {
      letter-spacing: -1ex;
    }
  }
}

#canvasWrapper {
  position: relative;
  width: 100%;
  height: 50rem;
}

#canvasSection {
  position: absolute;
  top: 0;
  left: 0;
  max-height: 50rem;
  width: 100%;
  overflow: scroll;
	border: 1px solid #eee;
  background-color: #fff;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: -o-grab;
  cursor: grab;
}

.flex-scroll {
  min-height: min-content;
}
</style>
