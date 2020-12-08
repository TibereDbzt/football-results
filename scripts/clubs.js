// ================================================================
// CALLER : selectLeague() || CALLING : /
// Affiche le nom et le logo de toutes les équipes
// RETURN : none
// ================================================================
function displayClubs(leagueID) {

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "php/all-teams.php",
    "data": "leagueID=" + leagueID,
    "method": "GET",
  }
  $.ajax(settings).done(function (response) {
    response = JSON.parse(response);
    response = response.teams;

    $.get('templates/one-club.mst', function(template) {
      var rendered = Mustache.render(template, { "results": response });
      $('.results.clubs').html(rendered);
    });
  });
}
