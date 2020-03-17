<?php

/**
 * @file
 * Page and form callbacks.
 */

/**
 * Page callback for file selection form in ckeditor dialog.
 */
function feef_select_file_form($form, &$form_state, $format) {
  $form['fid'] = array(
    '#title' => t('Select an existing file from server'),
    '#type' => 'textfield',
    '#autocomplete_path' => 'feef-fid/autocomplete',
    '#description' => t('Start typing to see a list of suggested filenames.'),
  );
  $form['full_mode'] = array(
    '#type' => 'checkbox',
    '#title' => 'Full entity',
    '#default_value' => FALSE,
    '#description' => 'Render full file entity including wrappers and fields.',
  );
  $form['actions']['#type'] = 'actions';
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Insert'),
    '#ajax' => array(
      'callback' => 'feef_select_file_form_save',
      'event' => 'click',
    ),
  );
  // Record the dialog selector that needs to be closed if present.
  if (isset($form_state['input']['dialogOptions']['target'])) {
    $form_state['storage']['dialog_selector'] = $form_state['input']['dialogOptions']['target'];
  }

  return $form;
}

/**
 * Save file selection in ckeditor content.
 */
function feef_select_file_form_save($form, &$form_state) {
  $dialog_selector = '#backdrop-dialog';
  if (isset($form_state['storage']['dialog_selector'])) {
    $dialog_selector = $form_state['storage']['dialog_selector'];
  }
  $commands = array();
  $errors = form_get_errors();
  if (!empty($errors)) {
    $error_messages = theme('status_messages');
    $rendered_form = backdrop_render($form);
    $commands[] = ajax_command_remove('.editor-dialog .messages');
    $commands[] = ajax_command_replace('.editor-dialog form', $rendered_form);
    $commands[] = ajax_command_prepend('.editor-dialog .ui-dialog-content', $error_messages);
  }
  else {
    $full_mode = $form_state['values']['full_mode'];
    $fid = $form_state['values']['fid'];
    if ($full_mode == TRUE) {
      $fid = str_replace(']', ':full]', $fid);
    }
    $commands[] = array(
      'command' => 'editorDialogSave',
      'values' => $fid,
    );
    $commands[] = ajax_command_close_dialog($dialog_selector);
  }
  return array(
    '#type' => 'ajax',
    '#commands' => $commands,
  );
}

/**
 * Autocomplete callback that uses view results.
 */
function feef_ajax_autocomplete_file($string = '') {
  $matches = array();
  $view = views_get_view('feef_autocomplete');
  if (!$view) {
    $message = t('Accessing view "feef_autocomplete" was attempted, but it is missing.');
    $message .= '<br />' . t('The CKEditor plugin of File Entity Embed Filter module depends on that view.');
    watchdog('feef', $message, array(), WATCHDOG_ERROR);
    return $matches;
  }
  $view->set_display('master');
  $input = filter_var($string, FILTER_SANITIZE_STRING);
  if ($input != '') {
    $view->set_exposed_input(array('filename' => $input));
    $view->execute('master');
    $results = $view->result;
    if (!empty($results) && isset($results[0]->fid)) {
      $view->style_plugin->render_fields($view->result);
      $views_fields = array_keys($view->field);
      foreach ($results as $row => $result) {
        $key = "[file-embed:{$result->fid}]";
        $values = array();
        foreach ($views_fields as $views_field) {
          if ($views_field == 'fid') {
            continue;
          }
          $values[] = $view->style_plugin->get_field($row, $views_field);
        }
        $text = implode(' ', $values);
        $matches[$key] = $text;
      }
    }
  }
  return $matches;
}
