(function (Backdrop, CKEditor5) {
  "use strict";

  class FeefSelect extends CKEditor5.core.Plugin {
    init() {
      const editor = this.editor;

      editor.ui.componentFactory.add( 'feef_select', function () {
        const button = new CKEditor5.ui.ButtonView();
        button.set({
          icon: '<svg width="20" height="20" version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m1 1v18h18v-8h-2v6h-14v-14h6v-2zm10 0v8h3v-2h-1v-4h1v-2zm5 0v2h1v4h-1v2h3v-8zm-11 6v8h8z"/></svg>',
          tooltip: 'Select file entities to embed'
        });
        button.on('execute', function () {
          let dialogUrl = editor.config.get('feef').feefDialogUrl;
          let saveCallback = function (returnValue) {
            editor.model.change(function (writer) {
              const insertPosition = editor.model.document.selection.getLastPosition();
              writer.insertText(returnValue, insertPosition);
            });
          };

          Backdrop.ckeditor5.openDialog(editor, dialogUrl, null, saveCallback, {});
        });
        return button;
      });
    }
  }

  // Expose the plugin to the CKEditor5 namespace.
  CKEditor5.feefSelect = {
    'FeefSelect': FeefSelect
  };

})(Backdrop, CKEditor5);
