<template>
  <div>
    <h2>TipTap WYSIWYG Editor</h2>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <!-- TODO: Optimize using a loop and config object -->
      <div class="menubar">
        <button class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
        <i class="material-icons">format_bold</i>
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
        <i class="material-icons">format_italic</i>
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
        <i class="material-icons">strikethrough_s</i>
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
        <i class="material-icons">format_underline</i>
      </button>
       <button type="button" class="menubar__button" :class="{ 'is-active': isActive.code() }" @click="commands.code">
        <i class="material-icons">code</i>
      </button>
       <button type="button" class="menubar__button" :class="{ 'is-active': isActive.blockquote() }" @click="commands.blockquote">
        <i class="material-icons">format_quote</i>
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({ level: 1})">
        H1
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
        H2
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({ level: 3})">
        H3
      </button>
      <!-- <v-select
          item-text="name"
          item-value="value"
          v-model="selectedHeading"
          @click="headingHandler(commands, isActive)"
          :items="headingOptions"
          label="Heading"
          solo
        ></v-select> -->
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
        <i class="material-icons">format_list_bulleted</i>
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
        <i class="material-icons">format_list_numbered</i>
      </button>
      <button type="button" class="menubar__button" :class="{ 'is-active': isActive.link() }" @click="commands.link">
        <i class="material-icons">link</i>
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table() }" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: true })">
          <i class="material-icons">table_view</i>
      </button>
      <span v-if="isActive.table()">
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
      <!-- <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.toggleCellMerge()">
          Toggle Cell Merge
      </button> -->
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.mergeCells()">
          Merge Cells
      </button>
      <button class="menubar__button" :class="{ 'is-active': isActive.table_cell() }" @click="commands.splitCell()">
          Split Cell
      </button>
      </span>
      <button type="button" class="menubar__button" @click="commands.undo">
          <i class="material-icons">undo</i>
        </button>
        <button type="button" class="menubar__button" @click="commands.redo">
          <i class="material-icons">redo</i>
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
import { 
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Blockquote,
  Heading,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  History
} from 'tiptap-extensions';

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
      // ,
      // selectedHeading: 1,
      // headingOptions: [
      //   {
      //     name: 'Heading 1',
      //     value: 1
      //   },
      //   {
      //     name: 'Heading 2',
      //     value: 2
      //   },
      //   {
      //     name: 'Heading 3',
      //     value: 3
      //   }
      // ]
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
          new Italic(),
          new Strike(),
          new Underline(),
          new Code(),
          new Blockquote(),
          new Heading({
            levels: [1, 2, 3],
          }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new Link(),
          new Table({ resizable: true }),
          new TableCell(),
          new TableHeader(),
          new TableRow(),
          new History()
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
    // ,
    // headingHandler(commands, isActive) {
    //   console.log("commands----->>>", commands);
    //   console.log("isActive----->>>", isActive);
    //   console.log("SELECTED HEADING--->>>", this.selectedHeading);
    //   commands.heading({ level: this.selectedHeading });
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* TODO: Add icons, styles */

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

.menubar__button {

}

table, td, th {
  border: 1px solid black !important;
}
td.selectedCell {
  background-color: rgb(0, 173, 239, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
}
</style>