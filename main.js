function onHomepage(e) {
  return createCard(null, null, null);
}

function createCard(method, coo1, coo2) {
  var title = "Welcome";
  var label1 = "";
  var label2 = "";
  var coordinate1 = "";
  var coordinate2 = "";

  switch(method) {
    case "1":
      title = "Apply a percent change";
      label1 = "Original value";
      label2 = "Percent change";
      break;
    case "2":
      title = "Get original value";
      label1 = "New value";
      label2 = "Percent change";
      break;
    case "3":
      title = "Get percent change";
      label1 = "Original value";
      label2 = "New value";
      break;
    default:
      title = "Welcome";
      label1 = "";
      label2 = "";
      break;
  }

  if (coo1 != null) {
    coordinate1 = coo1;
  }

  if (coo2 != null) {
    coordinate2 = coo2;
  }

  var cardHeader = CardService.newCardHeader()
    .setTitle(title);

  var section = CardService.newCardSection();

  var dropdown = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.DROPDOWN)
    .setTitle("Select a method")
    .setFieldName("dropdown_selection")
    .addItem("Apply a percent change", "1", method == "1")
    .addItem("Get original value", "2", method == "2")
    .addItem("Get percent change", "3", method == "3")
    .setOnChangeAction(CardService.newAction().setFunctionName('onDropdownChange'));
  section.addWidget(dropdown);

  var helpButton = CardService.newTextButton()
      .setText("Help")
      .setOpenLink(CardService.newOpenLink()
        .setUrl("https://www.augmoo.xyz/percent-change")
        .setOpenAs(CardService.OpenAs.FULL_SIZE)
        .setOnClose(CardService.OnClose.NOTHING));

  if (method == null) {
    section.addWidget(helpButton);
  }
  else {
    var dividerMethod = CardService.newDivider();
    section.addWidget(dividerMethod);

    var textButton1 = CardService.newTextButton()
      .setText("Get selection")
      .setOnClickAction(CardService.newAction()
        .setFunctionName("getSelectionOne"));

    var decoratedText1 = CardService.newDecoratedText()
      .setText(coordinate1)
      .setTopLabel(label1)
      .setButton(textButton1);
    section.addWidget(decoratedText1);

    var textButton2 = CardService.newTextButton()
      .setText("Get selection")
      .setOnClickAction(CardService.newAction()
          .setFunctionName("getSelectionTwo")
          .setParameters({ coordinate1: coordinate1 }));

    var decoratedText2 = CardService.newDecoratedText()
      .setText(coordinate2)
      .setTopLabel(label2)
      .setButton(textButton2);
    section.addWidget(decoratedText2);

    var dividerResult = CardService.newDivider();
    section.addWidget(dividerResult);

    var formulaButton = CardService.newTextButton()
      .setText("Insert formula")
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED)
      .setOnClickAction(CardService.newAction()
        .setFunctionName("handleFormula")
        .setParameters({ method: method, coordinate1: coordinate1, coordinate2: coordinate2 }));

    var buttonSet = CardService.newButtonSet();
    buttonSet
      .addButton(formulaButton)
      .addButton(helpButton);
    section.addWidget(buttonSet);
  }

  var card = CardService.newCardBuilder()
    .setHeader(cardHeader)
    .addSection(section)
    .build();
  return card;
}

function onDropdownChange(e) {
  var dropdownValue = e.commonEventObject.formInputs.dropdown_selection.stringInputs.value[0];
  var nav = CardService.newNavigation().updateCard(createCard(dropdownValue, null, null));
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}

function getSelectionOne(e) {
  var dropdownValue = e.commonEventObject.formInputs.dropdown_selection.stringInputs.value[0];
  var coordinate1 = SpreadsheetApp.getActiveSheet().getActiveCell().getA1Notation();
  var nav = CardService.newNavigation().updateCard(createCard(dropdownValue, coordinate1, null));
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}

function getSelectionTwo(e) {
  var dropdownValue = e.commonEventObject.formInputs.dropdown_selection.stringInputs.value[0];
  var coordinate1 = e.parameters.coordinate1;
  var coordinate2 = SpreadsheetApp.getActiveSheet().getActiveCell().getA1Notation();
  if (coordinate1 == null) {
    return notify('Get first selection before');
  }
  if (coordinate1 == coordinate2) {
    return notify('Selected cell cannot be the same');
  }
  var nav = CardService.newNavigation().updateCard(createCard(dropdownValue, coordinate1, coordinate2));
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}

function handleFormula(e) {
  var method = e.parameters.method;
  var coordinate1 = e.parameters.coordinate1;
  var coordinate2 = e.parameters.coordinate2;
  var cellFormula = SpreadsheetApp.getActiveSheet().getActiveCell();
  var coordinateFormula = cellFormula.getA1Notation();
  if (method == null || coordinate1 == null || coordinate2 == null) {
    return notify('Missing selection');
  }
  if (coordinateFormula == coordinate1 || coordinateFormula == coordinate2) {
    return notify('Selected cell cannot be the same');
  }
  var formula = getFormula(method, coordinate1,coordinate2);
  cellFormula.setValue(formula);
  var nav = CardService.newNavigation().updateCard(createCard(null, null, null));
  return CardService.newActionResponseBuilder().setNavigation(nav).build();
}

function getFormula(method, coordinate1, coordinate2) {
  if (method == "1") {
    return "=" + coordinate1 + "*(1+" + coordinate2 + ")";
  }
  else if (method == "2") {
    return "=" + coordinate1 + "/(1+" + coordinate2 + ")";
  }
  else if (method == "3") {
    return "=(" + coordinate2 + "-" + coordinate1 + ")/" + coordinate1;
  }
  return "=#ERROR";
}

function notify(message) {
  const notification = CardService.newNotification().setText(message);
  return CardService.newActionResponseBuilder()
    .setNotification(notification)
    .build();
}
