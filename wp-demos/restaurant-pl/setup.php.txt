<?php
/* OGIEŃ — WordPress demo content (concept project by Maria K.) */
update_option('blogname', 'OGIEŃ');
update_option('blogdescription', 'Kuchnia na żywym ogniu · Warszawa Praga');
update_option('permalink_structure', '/%postname%/');
foreach (get_posts(['post_type'=>['page','post'],'numberposts'=>-1,'post_status'=>'any']) as $p) { wp_delete_post($p->ID, true); }

$home = <<<HTML
<!-- wp:group {"align":"full","className":"og-hero","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull og-hero"><!-- wp:html --><div class="og-sky" aria-hidden="true"><span class="og-cloud og-c1"></span><span class="og-cloud og-c2"></span><span class="og-cloud og-c3"></span><span class="og-cloud og-c4"></span></div><div class="og-tower" aria-hidden="true"><div class="og-antenna"></div><div class="og-pod"></div><div class="og-pole"></div><div class="og-ring"><div class="og-sign">OGIEŃ</div><div class="og-sign">Pierogi</div><div class="og-sign">Grill</div><div class="og-sign">Wino</div><div class="og-sign">Praga</div><div class="og-sign">Rezerwuj</div></div></div><!-- /wp:html -->
<!-- wp:paragraph {"className":"og-kicker"} --><p class="og-kicker">Kuchnia na żywym ogniu · Ząbkowska 14 · Warszawa Praga</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":1,"className":"og-word"} --><h1 class="wp-block-heading og-word">OGIEŃ</h1><!-- /wp:heading -->
<!-- wp:paragraph {"className":"og-lead"} --><p class="og-lead">Wszystko w karcie dotyka ognia: polskie produkty, żar z dębu i buka oraz krótka karta, która zmienia się razem z targiem.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"og-btn"} --><div class="wp-block-button og-btn"><a class="wp-block-button__link wp-element-button" href="#visit">Zarezerwuj stolik</a></div><!-- /wp:button -->
<!-- wp:button {"className":"og-btn-ghost"} --><div class="wp-block-button og-btn-ghost"><a class="wp-block-button__link wp-element-button" href="#menu">Dzisiejsza karta</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"menu","className":"og-menu","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div id="menu" class="wp-block-group alignfull og-menu"><!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"64px"}}}} --><div class="wp-block-columns">
<!-- wp:column {"width":"38%"} --><div class="wp-block-column" style="flex-basis:38%"><!-- wp:paragraph {"className":"og-kicker"} --><p class="og-kicker">Dziś wieczorem</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Siedem talerzy. Jeden ogień.</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Zamów trzy dania do dzielenia albo zdaj się na kuchnię — 189 zł od osoby.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"width":"62%"} --><div class="wp-block-column" style="flex-basis:62%">
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Burak pieczony w żarze</strong><span>wędzony twaróg, orzech laskowy, olej koperkowy</span></span><em>34 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Podpłomyk z pieca</strong><span>masło z czosnkiem niedźwiedzim, sól morska</span></span><em>22 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Sandacz z grilla</strong><span>palony por, masło noisette, szczaw</span></span><em>68 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Kaczka znad bukowego żaru</strong><span>wiśnia, opalany jarmuż</span></span><em>79 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Pierogi z wędzonymi ziemniakami</strong><span>konfitura z cebuli, chrupiąca szalotka</span></span><em>38 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Jabłko pieczone w ogniu</strong><span>miód, kruszonka gryczana, śmietanka</span></span><em>29 zł</em></p><!-- /wp:paragraph -->
</div><!-- /wp:column --></div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","className":"og-story","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull og-story"><!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"56px"}}}} --><div class="wp-block-columns">
<!-- wp:column {"width":"50%"} --><div class="wp-block-column" style="flex-basis:50%"><!-- wp:paragraph {"className":"og-kicker"} --><p class="og-kicker">Nasza kuchnia</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Bez gazu. Bez skrótów.</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Grill rozpalamy w południe i podsycamy przez cały wieczór. Warzywa są z gospodarstw do 100 km stąd, ryby z Zalewu Wiślanego, a drewno z mazowieckich lasów gospodarczych.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"width":"25%"} --><div class="wp-block-column" style="flex-basis:25%"><!-- wp:paragraph {"className":"og-num"} --><p class="og-num">100 km</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>najdalsze gospodarstwo w karcie</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"width":"25%"} --><div class="wp-block-column" style="flex-basis:25%"><!-- wp:paragraph {"className":"og-num"} --><p class="og-num">8 h</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>żywego ognia każdego wieczoru</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"visit","className":"og-visit","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div id="visit" class="wp-block-group alignfull og-visit"><!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"64px"}}}} --><div class="wp-block-columns">
<!-- wp:column {"width":"55%"} --><div class="wp-block-column" style="flex-basis:55%"><!-- wp:heading --><h2 class="wp-block-heading">Usiądź przy ogniu.</h2><!-- /wp:heading --><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"og-btn"} --><div class="wp-block-button og-btn"><a class="wp-block-button__link wp-element-button" href="mailto:stolik@example.com">Rezerwacja mailem</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:column -->
<!-- wp:column {"width":"45%","className":"og-hours"} --><div class="wp-block-column og-hours" style="flex-basis:45%"><!-- wp:paragraph --><p><strong>Wt–Czw</strong> 17:00–23:00</p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Pt–Sob</strong> 17:00–00:00</p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Nd</strong> 13:00–21:00 · rodzinny obiad</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>ul. Ząbkowska 14, 03-735 Warszawa</p><!-- /wp:paragraph --><!-- wp:paragraph {"fontSize":"small"} --><p class="has-small-font-size">Projekt koncepcyjny: Maria K. — fikcyjna restauracja, strona na WordPressie (Twenty Twenty-Five, edytor blokowy).</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->
HTML;

$id = wp_insert_post(['post_title'=>'Strona główna','post_name'=>'home','post_type'=>'page','post_status'=>'publish','post_content'=>$home]);
update_post_meta($id, '_wp_page_template', 'page-no-title');
update_option('show_on_front', 'page');
update_option('page_on_front', $id);
