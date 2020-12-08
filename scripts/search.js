// ================================================================
// CALLER : / || CALLING : inputFilter()
// Gère la recherche d'une équipe et d'un joueur
// RETURN : none
// ================================================================
function findClub() {
  var id;

  $('input[type="text"]').click(function() {
    inputFilter(this);
  });

  // Au clique sur un club, récupère l'ID du club et lance la fonction displayClubDetails()
  $('body').on('click', '.one-club', function() {
    id = $(this).data('teamid');
    clubDetails(id);
  });
}

$(document).ready(function() {
  findClub();
});


// ================================================================
// CALLER : findClub || CALLING : restOneResult()
// Filtre dynamiquement les résultats de la recherche d'un joueur
// RETURN : none
// ================================================================
function inputFilter(input_text) {
  $(input_text).on("keyup", function(event) {
    if(event.which!==13){
      // Enter pressed... do anything here...
      var value = $(this).val().toLowerCase();
      var result = $(this).parent().siblings('.results');
      var rest;

      // Fait disparaître les résultats qui ne correspondent pas
      $(result.children('.one-result')).filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });

      rest = result.children('.one-club.one-result:visible');
      restOneResult(rest);
    }
  });
}


// ================================================================
// CALLER : inputFilter() || CALLING : clubDetails()
// Lance la fonction clubDetails() si il ne reste qu'un résultat
// RETURN : none
// ================================================================
function restOneResult(the_result) {
  if (the_result.length == 1) {
    $('.results .one-club:visible').css('box-shadow', '0 0 20px 0 rgba(0, 0, 0, 0.1)');

    // quand appuie sur la touche "entrer"
    $(document).on('keyup',function(e) {
      if(e.which == 13) {
        id = the_result.data('teamid');
        clubDetails(id);
      }
    });

    // quand clique sur la loupe
    $('svg.submit').click(function() {
      id = the_result.data('teamid');
      clubDetails(id);
    });

  } else {
    $('.one-club.one-result').css('box-shadow', 'none');
  }
}
