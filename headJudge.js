var contest_name;
var div_name;
var round;
var clicker_judges;
var eval_judges;
var players;

function enterInfo() {
  spreadsheet = $('#sheet-link').val();
  var beginId = spreadsheet.indexOf("d/") + 2;
  var endId = spreadsheet.indexOf("/e");
  spreadsheetId = spreadsheet.slice(beginId, endId);
  contest_name = $('#contest-name').val();
  div_name = $('#div-name').val();
  round = $('#round').val();
  clicker_judges = $('#clicker-judges').val().split('\n');
  eval_judges = $('#eval-judges').val().split('\n');
  appendInfo();
  var params = {
       spreadsheetId: '1FCssxQv3_yPsPt6c-Poeicj_ODNH0ZJyCUI6gwxGFS4',
       range: 'A1:C101',
       valueInputOption: 'RAW',
       insertDataOption: 'OVERWRITE',
     };
     var valueRangeBody = {
       "range": 'A1:C101',
       "majorDimension": "ROWS",
       "values": [[contest_name, div_name, spreadsheet]],
     };
     var addSpreadsheet = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
     addSpreadsheet.then(function(response) {
     }, function(reason) {
       console.error('error: ' + reason.result.error.message);
     });
}
function appendInfo() {
  var contestParams = {
    spreadsheetId: spreadsheetId,
    range: "SET-UP!B3:B6",
    valueInputOption: "RAW",
  };
  var contestRangeBody = {
    "range": "SET-UP!B3:B6",
    "majorDimension": "COLUMNS",
    "values": [
      [contest_name,
      "",
      div_name,
      round]
    ],
  };
  var clickerjudgeParams = {
    spreadsheetId: spreadsheetId,
    range: "SET-UP!F3:F8",
    valueInputOption: "RAW",
  };
  var clickerjudgeRangeBody = {
    "range": "SET-UP!F3:F8",
    "majorDimension": "COLUMNS",
    "values": [clicker_judges],
  };
  var evaljudgeParams = {
    spreadsheetId: spreadsheetId,
    range: "SET-UP!F16:F21",
    valueInputOption: "RAW",
  };
  var evaljudgeRangeBody = {
    "range": "SET-UP!F16:F21",
    "majorDimension": "COLUMNS",
    "values": [eval_judges],
  };
  var request1 = gapi.client.sheets.spreadsheets.values.update(contestParams, contestRangeBody);
  var request2 = gapi.client.sheets.spreadsheets.values.update(clickerjudgeParams, clickerjudgeRangeBody);
  var request3 = gapi.client.sheets.spreadsheets.values.update(evaljudgeParams, evaljudgeRangeBody);
  request1.then(function(response) {
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
  });
  request2.then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
  });
  request3.then(function(response) {
    $('#contest-info').hide();
    $('#player-info').show();
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  }
  function enterPlayer() {
    players = $('#player-list').val().split('\n');
    appendPlayer();
  }
  function appendPlayer() {
    var playerParams = {
      spreadsheetId: spreadsheetId,
      range: "PLAYER!B4:B103",
      valueInputOption: "RAW",
    };
    var playerRangeBody = {
      "range": "PLAYER!B4:B103",
      "majorDimension": "COLUMNS",
      "values": [players],
    };
    var request4 = gapi.client.sheets.spreadsheets.values.update(playerParams, playerRangeBody);
    request4.then(function(response) {
      $('#player-info').hide();
  });
}
