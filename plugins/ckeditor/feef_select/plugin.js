/**
 * @file
 * Backdrop File Entity Embed Filter plugin.
 */

(function ($, Backdrop, CKEDITOR) {
  "use strict";
  CKEDITOR.plugins.add('feef_select', {
    init: function (editor) {
      editor.addCommand('feef_select', {
        modes: {wysiwyg: 1},
        exec: function (editor) {
          var saveCallback = function (returnValues) {
            editor.insertHtml(returnValues);
          };
          var dialogSettings = {
            dialogClass: 'editor-feef-dialog'
          };
          // Open the dialog for the edit form.
          Backdrop.ckeditor.openDialog(editor, editor.config.backdrop.feefDialogUrl, false, saveCallback, dialogSettings);
        }
      });
      editor.ui.addButton( 'feef_select', {
        label: 'Embed a file (entity)',
        command: 'feef_select',
        icon: this.path + 'icons/feef_select.png'
      });

    }
  });
})(jQuery, Backdrop, CKEDITOR);
