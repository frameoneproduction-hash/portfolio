<?php
/* Wiśniewska Legal — WordPress demo content (concept project by Maria K.) */
update_option('blogname', 'Wiśniewska Legal');
update_option('blogdescription', 'Prawo gospodarcze w Warszawie');
update_option('permalink_structure', '/%postname%/');
foreach (get_posts(['post_type'=>['page','post'],'numberposts'=>-1,'post_status'=>'any']) as $p) { wp_delete_post($p->ID, true); }

$home = <<<HTML
<!-- wp:group {"align":"full","className":"wl-hero","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull wl-hero"><!-- wp:html --><div class="wl-section-sign" aria-hidden="true">§</div><!-- /wp:html -->
<!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">Prawo gospodarcze · Warszawa · od 2009</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":1} --><h1 class="wp-block-heading">Jasne odpowiedzi, <em>zanim</em> podpiszesz.</h1><!-- /wp:heading -->
<!-- wp:paragraph {"className":"wl-lead"} --><p class="wl-lead">Pomagamy założycielom, inwestorom i firmom zagranicznym zakładać spółki, podpisywać umowy i rozwijać się w Polsce — prostym językiem, ze stałą wyceną przed rozpoczęciem pracy.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"wl-btn-primary"} --><div class="wp-block-button wl-btn-primary"><a class="wp-block-button__link wp-element-button" href="#contact">Umów 20-minutową konsultację</a></div><!-- /wp:button -->
<!-- wp:button {"className":"wl-btn-ghost"} --><div class="wp-block-button wl-btn-ghost"><a class="wp-block-button__link wp-element-button" href="#practice">Obszary praktyki</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","className":"wl-strip","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull wl-strip"><!-- wp:columns --><div class="wp-block-columns">
<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p><strong>Stała wycena</strong> zakładania spółek i umów</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p><strong>PL / EN / DE</strong> — każdy dokument wyjaśniony w Twoim języku</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p><strong>Odpowiedź w 48 godzin</strong> na każde pisemne pytanie</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"practice","className":"wl-practice","style":{"spacing":{"padding":{"top":"96px","bottom":"96px"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
<div id="practice" class="wp-block-group alignfull wl-practice" style="padding-top:96px;padding-bottom:96px"><!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">Obszary praktyki</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2 class="wp-block-heading">Cztery rzeczy, które robimy porządnie.</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"48px"},"margin":{"top":"48px"}}}} --><div class="wp-block-columns" style="margin-top:48px">
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">01</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Zakładanie spółek</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Sp. z o.o., oddziały i proste spółki akcyjne — od rejestracji w KRS do pierwszej uchwały zarządu.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">02</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Umowy handlowe</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Umowy dostaw, dystrybucji, SaaS i NDA do wielokrotnego użytku — napisane tak, żeby dało się je przeczytać, a nie tylko podpisać.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">03</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Zatrudnienie i B2B</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Zatrudnianie w Polsce, umowy B2B, przeniesienie praw autorskich i regulaminy pracy zdalnej.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">04</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Dane i RODO</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Polityki prywatności, umowy powierzenia i praktyczne audyty RODO dla stron i aplikacji.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","className":"wl-dark","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull wl-dark"><!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">Jak pracujemy</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2 class="wp-block-heading">Bez niespodzianek na fakturze. Nigdy.</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"margin":{"top":"56px"},"blockGap":{"left":"40px"}}}} --><div class="wp-block-columns" style="margin-top:56px">
<!-- wp:column {"className":"wl-step"} --><div class="wp-block-column wl-step"><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">1. Piszesz do nas</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Opisz sytuację w kilku zdaniach. W ciągu 48 godzin odpiszemy z pytaniami, które naprawdę mają znaczenie.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-step"} --><div class="wp-block-column wl-step"><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">2. Stała wycena</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Dostajesz pisemny zakres i stałe wynagrodzenie. Nic nie zaczynamy bez Twojej akceptacji.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-step"} --><div class="wp-block-column wl-step"><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">3. Prosty język</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Do każdego dokumentu dołączamy jednostronicowe podsumowanie: co oznacza dla Twojej firmy.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"96px","bottom":"96px"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull" style="padding-top:96px;padding-bottom:96px"><!-- wp:paragraph {"className":"wl-quote"} --><p class="wl-quote">„Pierwsi prawnicy, którzy powiedzieli nam, co może pójść nie tak, zanim się stało — i poprawili umowę w dwa dni.”</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">Przykładowa opinia · tekst koncepcyjny</p><!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"contact","className":"wl-contact","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div id="contact" class="wp-block-group alignfull wl-contact"><!-- wp:columns --><div class="wp-block-columns">
<!-- wp:column {"width":"60%"} --><div class="wp-block-column" style="flex-basis:60%"><!-- wp:heading --><h2 class="wp-block-heading">Powiedz nam, co zamierzasz podpisać.</h2><!-- /wp:heading --></div><!-- /wp:column -->
<!-- wp:column {"width":"40%"} --><div class="wp-block-column" style="flex-basis:40%"><!-- wp:paragraph --><p>ul. Złota 44, 00-120 Warszawa<br>office@example.com · +48 22 000 00 00</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"wl-btn-primary"} --><div class="wp-block-button wl-btn-primary"><a class="wp-block-button__link wp-element-button" href="mailto:office@example.com">Napisz do nas</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
<!-- wp:paragraph {"fontSize":"small"} --><p class="has-small-font-size">Projekt koncepcyjny: Maria K. — fikcyjna kancelaria, strona na WordPressie (Twenty Twenty-Five, edytor blokowy).</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->
HTML;

$id = wp_insert_post([
  'post_title'   => 'Strona główna',
  'post_name'    => 'home',
  'post_type'    => 'page',
  'post_status'  => 'publish',
  'post_content' => $home,
]);
update_post_meta($id, '_wp_page_template', 'page-no-title');
update_option('show_on_front', 'page');
update_option('page_on_front', $id);
