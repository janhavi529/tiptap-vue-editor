<template>
  <div>
    <h2>TipTap WYSIWYG Editor</h2>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <!-- TODO: Optimize using a loop and config object -->
      <div class="menubar">
        <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
        Bold
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table() }" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: true })">
          Create Table
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table() }" @click="commands.deleteTable()">
          Delete Table
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.addRowBefore()">
          Add Row Before
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.addRowAfter()">
          Add Row After
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_row() }" @click="commands.deleteRow()">
          Delete Row
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.addColumnBefore()">
          Add Column Before
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.addColumnAfter()">
          Add Column After
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.deleteColumn()">
          Delete Column
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.toggleHeaderRow()">
          Toggle Header Row
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.toggleHeaderColumn()">
          Toggle Header Column
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.toggleHeaderCell()">
          Toggle Header Cell
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.toggleCellMerge()">
          Toggle Cell Merge
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.mergeCells()">
          Merge Cells
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.splitCell()">
          Split Cell
      </button>
      <button @click="testHandler(commands, isActive)">
          Test
      </button>
     
      </div>
      
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
// Import the basic building blocks
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import { Bold, Table, TableCell, TableHeader, TableRow } from 'tiptap-extensions';

export default {
  name: 'TipTapEditor',
  props: {
    content: {
      type: String,
      default: '<p> Enter content here... </p>'
    }
  },
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: null,
      localHTML: '',  // TODO: Send back to parent component
      localJSON: {}
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },
  methods: {
    init() {
      const editorOptions = {
        content: '',
        extensions: [
          new Bold(),
          new Table({ resizable: true }),
          new TableCell(),
          new TableHeader(),
          new TableRow()
        ]
      };

      // Create an `Editor` instance with some default content. The editor is 
      // then passed to the `EditorContent` component as a `prop`
      this.editor = new Editor(editorOptions);

      this.editor.on('init', ({ state, view}) => {
          console.log('Init args', state, view);
          // TODO: Fetch content from previous input
          this.editor.setContent(this.content, true); // Set initial content and emit an update event.
      });

      this.editor.on('update', ({ state, getHTML, getJSON, transaction }) => {
            console.log(`Editor content updated...`);
            console.log(state, getHTML(), getJSON(), transaction);
            this.localHTML = getHTML();
            this.localJSON = getJSON();
            // this.editor.setContent(getHTML());
      });

      this.editor.on('paste', () => {
          console.log(`Some new content was added from the user's clipboard`);
      });

      this.editor.on('drop', (view, event, slice, moved) => {
          console.log(`New image or file was dragged into the editor`);
          console.log(view, event, slice, moved);
      });

    },
    testHandler(commands, isActive) {
      console.log("Test Handler...");
      console.log("COMMANDS--->>>", commands);
      console.log("IS ACTIVE--->>>", isActive);
      console.log("LOCAL HTML--->>>", this.localHTML);
      console.log("LOCAL JSON--->>>", this.localJSON);
      console.log("CONTENT--->>>", this.editor.content);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

/* .ProseMirror [contenteditable="false"] {
  white-space: normal;
}

.ProseMirror [contenteditable="true"] {
  white-space: pre-wrap;
} */
.menubar {
  display: flex;
  flex-wrap: wrap;
}
table, td, th {
  border: 1px solid black !important;
}

table {
  width: 100%;
  border-collapse: collapse;
}
</style>