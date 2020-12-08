// ================================================================
// CALLER : selectLeague() || CALLING : /
// Affiche le classement des équipes dans la section tables
// RETURN : string
// ================================================================
function displayTable(leagueID) {
  // Récupère le classement
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "php/tables.php",
    "data": "leagueID=" + leagueID,
    "method": "GET"
  }
  $.ajax(settings).done(function (response) {
    response = JSON.parse(response);

    // Supprime le "FC" du nom
    jQuery.each(response.standings[0].table, function(i) {
      if (response.standings[0].table[i].team.name.indexOf(" FC") !== -1) {
        response.standings[0].table[i].team.name = response.standings[0].table[i].team.name.substring(0, response.standings[0].table[i].team.name.length-3);
      }
    })

    response = response.standings[0].table;

    // Affiche le classement
    $.get('templates/table.mst', function(template) {
      var rendered = Mustache.render(template, { "ranking": response });
      $('.ranking').html(rendered);
    });
  });
}
