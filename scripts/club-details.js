// ================================================================
// CALLER : / || CALLING : /
// Ferme la section club quand la croix est cliquée
// RETURN : none
// ================================================================
function hideClubDetails() {
  $('body').on('click', 'img.close', function() {
    $('article.club').toggleClass('is-open');
    $('.close-container').toggleClass('is-open');
    $('.leagues-clubs').toggleClass('no-scroll');
  });
}
hideClubDetails();


// ================================================================
// CALLER : clubDetails() || CALLING : formatDateAge(), retrieveCountryFlag()
// Affiche les informations détaillées du club sélectionné
// RETURN : none
// ================================================================
function clubDetails(clubID) {
  $('.leagues-clubs').toggleClass('no-scroll');
  // Supprime les infos du dernier club sélectionné
  $('.container-resume').children().remove();
  $('.container-players').children().remove();
  $('input[name="search-player"]').val('');

  // Récupère les informations
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "php/one-team.php",
    "method": "GET",
    "data": "id=" + clubID,
  }
  $.ajax(settings).done(function (response) {
    var club = JSON.parse(response);
    var team = [];
    var coach = "";
    var code_nation = "";

    // Formate la date de naissance et récupère le coach
    jQuery.each(club.squad, function(i) {
      club.squad[i].dateOfBirth = formatDateAge(new Date(club.squad[i].dateOfBirth));

      if (club.squad[i].role !== "INTERIM_COACH" && club.squad[i].role !== "COACH") {

        if ( club.squad[i].nationality == "England" || club.squad[i].nationality == "Wales" || club.squad[i].nationality == "Scotland") {
          club.squad[i].nationality = "GB";
        }

        // Récupère le drapeau du pays du joueur
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://restcountries.eu/rest/v2/name/" + club.squad[i].nationality + "/",
          "method": "GET"
        }
        $.ajax(settings).done(function (response) {
          team[i].flagURL = response[0].flag;

          if ( club.squad[i].nationality == "GB") {
            club.squad[i].nationality = "Great Britain";
          }

        });
        team.push(club.squad[i]);
      } else {
        coach = club.squad[i];
      }
    });

    // Affiche les infos générales du club
    $.get('templates/club-global.mst', function(template) {
      var rendered = Mustache.render(template, { "resume": club, "coach": coach.name });
      $('.resume').html(rendered);
    });

    // Affiche les infos des joueurs de l'équipe
    $.get("templates/one-player.mst", function(template) {
      var rendered = Mustache.render(template, { "players": team  });
      $('.players').html(rendered);
    });
  });

  $('article.club').addClass('is-open');
  $('.close-container').addClass('is-open');
}

// ================================================================
// CALLER : clubDetails() || CALLING : calculateAge()
// Formate des dates de naissance
// RETURN : date_age (int)
// ================================================================
function formatDateAge(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var age = calculateAge(date);

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  date_age = day + "/" + month + "/" + year + " (" + age + ")";

  return date_age;
}


// ================================================================
// CALLER : formatDateAge() || CALLING : /
// Calcule l'age à partir d'une date donnée
// RETURN : int
// ================================================================
function calculateAge (birthDate) {
    birthDate = new Date(birthDate);
    todayDate = new Date();

    var age = (todayDate.getFullYear() - birthDate.getFullYear());

    if (todayDate.getMonth() < birthDate.getMonth() || todayDate.getMonth() == birthDate.getMonth() && todayDate.getDate() < birthDate.getDate()) {
        age--;
    }

    return age;
}
