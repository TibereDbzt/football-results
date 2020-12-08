// ================================================================
// CALLER : / || CALLING : /
// Gère le preloader
// RETURN : none
// ================================================================
function loader() {
  $(document).ajaxStop(function () {
    $("#loading").fadeOut(500);
  });
}
$(document).ready(function() {
  loader();
});

// ================================================================
// CALLER : / || CALLING : displayClubs(), displayTable()
// Switch entre les leagues
// RETURN : currentLeagueID (int)
// ================================================================
function selectLeague() {
  var currentLeagueID = $('.select-league ul li:first-of-type').data("leagueid");

  $('body').on('click', '.select-league ul li', function() {
    var posX = $(this).position().left;
    var width = $(this).width();
    var id = $(this).data("leagueid");

    $('.select-league span.marker').css('left', posX, 'width', width).css('width', width);
    $('nav ul li img').addClass('disabled')
    $(this).children('img').removeClass('disabled')

    $('body').removeClass();
    switch (id) {
      case 2021:
        $('body').addClass('premierleague');
        $('.tables header img').attr('src', 'images/logo_premier-league.svg');
        $(document).prop('title', 'Premier League | Football Results');
        break;
      case 2015:
        $('body').addClass('ligue1');
        $('.tables header img').attr('src', 'images/logo_ligue-1.png');
        $(document).prop('title', 'Ligue 1 | Football Results');
        break;
      case 2019:
        $('body').addClass('laliga');
        $('.tables header img').attr('src', 'images/logo_laliga.svg');
        $(document).prop('title', 'La Liga | Football Results');
        break;
      case 2002:
        $('body').addClass('seriea');
        $('.tables header img').attr('src', 'images/logo_seriea.png');
        $(document).prop('title', 'Serie A | Football Results');
        break;
      case 2014:
        $('body').addClass('bundesliga');
        $('.tables header img').attr('src', 'images/logo_bundesliga.svg');
        $(document).prop('title', 'Bundesliga | Football Results');
        break;
      default:
        console.log('color scheme error');
    }

    currentLeagueID = $(this).data("leagueid");

    displayClubs(currentLeagueID);
    displayTable(currentLeagueID);
  });

  displayClubs(currentLeagueID);
  displayTable(currentLeagueID);
}
$(document).ready(function() {
  selectLeague();
});



// =============================================== //
// ===============<| TEST |>===================== //
// ============================================= //


// $(document).ready(function() {
//   loader();
// });
//
// $("<img>").onload = function() {
//   // $("#loading").fadeOut(500);
//   console.log('ok');
// }
//
// function IsImageOk() {
//   var img = $('<img>');
//   // During the onload event, IE correctly identifies any images that
//   // weren’t downloaded as not complete. Others should too. Gecko-based
//   // browsers act like NS4 in that they report this incorrectly.
//   if (!img.complete) {
//       return false;
//   }
//
//   // However, they do have two very useful properties: naturalWidth and
//   // naturalHeight. These give the true size of the image. If it failed
//   // to load, either of these should be zero.
//   if (img.naturalWidth === 0) {
//       return false;
//   }
//
//   // No other way of checking: assume it’s ok.
//   return true;
// }

// console.log(IsImageOk());


// switch (document.readyState) {
//   case "loading":
//     // The document is still loading.
//     console.log('loading');
//     break;
//   case "interactive":
//     console.log('loading');
//     break;
//   case "complete":
//     // The page is fully loaded.
//     console.log('OK');
//     break;
// }
