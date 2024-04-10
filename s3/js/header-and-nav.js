
(function() {

    $(function(){
        const $includeHeader = $('#include-header');
        $includeHeader.load("/apps/html/include/header.html", function() {
            const $header = $includeHeader.children();
            $includeHeader.after($header);
            $includeHeader.remove();
        });

        const $includeNav = $('#include-nav');
        $includeNav.load("/apps/html/include/nav.html", function() {
            const $nav = $includeNav.children();
            $includeNav.after($nav);
            $includeNav.remove();
        });
    });

})();