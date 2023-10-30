/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Runs when the add-on is installed.
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Runs when the document is opened, creating the add-on's menu. Custom function
 * add-ons need at least one menu item, since the add-on is only enabled in the
 * current spreadsheet when a function is run.
 */
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Use in this spreadsheet', 'use')
    .addToUi();
}

/**
 * Enables the add-on on for the current spreadsheet (simply by running) and
 * shows a popup informing the user of the new functions that are available.
 */
function use() {
  var title = 'Percent Change custom functions';
  var message = 'The functions PCNEW(), PCORIGINAL() and PC() are now available in ' +
      'this spreadsheet. More information is available in the function help ' +
      'box that appears when you start using them in a formula.';
  var ui = SpreadsheetApp.getUi();
  ui.alert(title, message, ui.ButtonSet.OK);
}
