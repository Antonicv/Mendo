// custom.js — small runtime helpers
// Generated: 2026-02-15
// Purpose: adjust header/logo behavior if needed after sticky plugin runs

(function($){
  $(document).ready(function(){
    // Ensure logo has correct max-height classes when sticky toggles
    var $header = $('#sp-header');
    function applyLogoState(){
      if($('.sticky-wrapper').hasClass('is-sticky')){
        $('#sp-logo img').css({'max-height':'80px','width':'auto'});
      } else {
        $('#sp-logo img').css({'max-height':'140px','width':'auto'});
      }
    }
    // Run initially and on scroll (sticky plugin toggles class on wrapper)
    applyLogoState();
    $(window).on('scroll resize', function(){ applyLogoState(); });
  });
})(jQuery);
