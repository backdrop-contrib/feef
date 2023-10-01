/**
 * @file
 * TinyMCE File Entity Embed plugin.
 */
"use strict";

tinymce.PluginManager.add('feef_select', function (editor, url) {
  editor.ui.registry.addButton('feefselect', {
    icon: 'feef',
    tooltip: 'Select file entities to embed',
    onAction: function () {
      let dialogUrl = editor.options.get('feefDialogUrl');
      let saveCallback = function (returnValue) {
        editor.insertContent(returnValue);
      }
      Backdrop.tinymce.openDialog(editor, dialogUrl, null, saveCallback, {});
    }
  });
});
