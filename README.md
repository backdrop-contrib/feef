# File Entity Embed Filter   ![](img/feef_select_30.png)

Backdrop CMS module to embed file entities in content using a token-like placeholder.

To embed file entities use a placeholder with brackets like "[file-embed:N]"
or "[file-embed:N:full]", where "N" is the numeric file id. The second
example shows as full entity including wrappers and attached fields (if any).

For easier embedding, this module ships with a CKEditor plugin with
autocomplete. Start typing in the "Select an existing file from server" form field
to get suggestions (filter is based on file names).

The widget has no upload feature. To select files (audio/video...), these
files already need to exist on the server.

Embedding files only requires "View files" permissions.

**Why a placeholder and not directly embedding the rendered file?**

Because if you change something with the file itself or the file display, it's only a
matter of flushing caches to update the file display everywhere.

**Advanced usage**

By default this module filters for audio and video file entities on your server.
To include additional file types, you can edit the view (feef_autocomplete).
Adapt the views filters to your needs.

To adjust the way the matches in the dropdown list get displayed, you can add
fields and/or override their display.
Please note: a "fid" (file id) field is necessary for this widget to work
properly.

## Installation

- Install this module using the official 
  [Backdrop CMS instructions](https://backdropcms.org/guide/modules)
- Make sure that visitors can "View files"
  (admin/config/people/permissions#module-file).
- Go to the text format(s) of your choice and enable the "File Entity Embed
  Filter" (Enabled filters section) and drag the plugin to the "Active
  toolbar".

## Issues

Bugs and Feature requests should be reported in the 
[Issue Queue](https://github.com/backdrop-contrib/feef/issues)

## Current Maintainers

- [Indigoxela](https://github.com/indigoxela)

## License

This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.
