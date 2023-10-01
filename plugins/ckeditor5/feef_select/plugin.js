(function (Backdrop, CKEditor5) {
  "use strict";

  class FeefSelect extends CKEditor5.core.Plugin {
    init() {
      const editor = this.editor;

      editor.ui.componentFactory.add( 'feef_select', function () {
        const button = new CKEditor5.ui.ButtonView();
        // Caution: this icon is modified, so CKE5 doesn't render it blurry!
        button.set({
          icon: '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m12 1h-1v6h1m4 0h1v-6h-1" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="2"/><path d="m7 1h-6v16h16v-6" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="2"/><path d="m4 14 8 1e-5-8-8z" fill="currentColor"/></svg>',
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
