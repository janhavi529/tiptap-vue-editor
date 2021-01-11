<template>
  <div>
    <h2>TipTap WYSIWYG Editor</h2>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="tiptap-editor-menu">
        <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
        Bold
      </button>
      <button :class="{ 'is-active': isActive.table() }" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: true })">
          Create Table
      </button>
      <button :class="{ 'is-active': isActive.table() }" @click="commands.deleteTable()">
          Delete Table
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
    
  },
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      // Create an `Editor` instance with some default content. The editor is 
      // then passed to the `EditorContent` component as a `prop`
      editor: new Editor({
        content: '<p>This is just a test paragraph</p>',
        extensions: [
          new Bold(),
          new Table({ resizable: true }),
          new TableCell(),
          new TableHeader(),
          new TableRow()
        ]
      }),
    }
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy()
  },
  methods: {
    testHandler(commands, isActive) {
      console.log("Test Handler...");
      console.log("COMMANDS--->>>", commands);
      console.log("IS ACTIVE--->>>", isActive);
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
.tiptap-editor-menu {
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