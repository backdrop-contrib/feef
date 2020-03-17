# File Entity Embed Filter   ![](https://raw.githubusercontent.com/backdrop-contrib/feef/1.x-1.x/img/feef_select_30.png)

Backdrop CMS module to embed file entities in content using a token-like placeholder.

To embed file entities use a placeholder with brackets like `[file-embed:7]` or
`[file-embed:7:full]`, where "7" is the numeric file id.
The second example shows as full entity including wrappers and attached fields (if any).

For easier embedding, this module ships with a CKEditor plugin with autocomplete.
Start typing in the _Select an existing file from server_ form field to get suggestions
(filter is based on file names).

The widget has no upload feature. To select files (audio/video...), these files already need to exist on the server.

Embedding files only requires _View files_ permission.

**Why a placeholder and not directly embedding the rendered file?**

Because if you change something with the file itself or the file display, it's only a
matter of flushing caches to update the file display everywhere.

**Advanced usage**

By default this modules' autocomplete plugin filters for audio and video file entities on your server.
To include additional file types, you can edit the view _(feef_autocomplete)_.
Adapt the views filters to your needs.

To adjust the way the matches in the dropdown list get displayed, you can add fields and/or override their display.
Please note: a `fid` (file ID) field is necessary for this widget to work properly.

## Installation

- Install this module using the official 
  [Backdrop CMS instructions](https://backdropcms.org/guide/modules)
- Make sure that visitors can "View files" (admin/config/people/permissions#module-file).
- Go to the text format(s) of your choice and enable the "File Entity Embed Filter" (_Enabled filters_ section).
  If CKEditor is active for this text format, drag the plugin ![](https://raw.githubusercontent.com/backdrop-contrib/feef/1.x-1.x/plugins/feef_select/icons/feef_select.png)
  to the "Active toolbar".

## Issues

Bugs and Feature requests should be reported in the 
[Issue Queue](https://github.com/backdrop-contrib/feef/issues)

## Current Maintainers

- [Indigoxela](https://github.com/indigoxela)

## License

This project is GPL v2 software. See the LICENSE.txt file in this directory for complete text.
