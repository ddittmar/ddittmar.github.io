(function ($) {
    
    $.fn.blink = function() {
        
        this.each(function() {
            
            var $this = $(this);
            
            var fade = function() {
                $this
                    .animate({ opacity: 0.0 }, 400)
                    .animate({ opacity: 1.0 }, 400, fade);
            };
            fade();
        });
        
        return this;
    }
    
})(jQuery);