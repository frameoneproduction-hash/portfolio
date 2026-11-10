<?php
/* OGIEŃ — WordPress demo content (concept project by Maria K.) */
update_option('blogname', 'OGIEŃ');
update_option('blogdescription', 'Wood-fire kitchen · Warsaw Praga');
update_option('permalink_structure', '/%postname%/');
foreach (get_posts(['post_type'=>['page','post'],'numberposts'=>-1,'post_status'=>'any']) as $p) { wp_delete_post($p->ID, true); }

$home = <<<HTML
<!-- wp:group {"align":"full","className":"og-hero","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull og-hero"><!-- wp:html --><div class="og-sky" aria-hidden="true"><span class="og-cloud og-c1"></span><span class="og-cloud og-c2"></span><span class="og-cloud og-c3"></span><span class="og-cloud og-c4"></span></div><div class="og-tower" aria-hidden="true"><div class="og-antenna"></div><div class="og-pod"></div><div class="og-pole"></div><div class="og-ring"><div class="og-sign">OGIEŃ</div><div class="og-sign">Pierogi</div><div class="og-sign">Grill</div><div class="og-sign">Natural wine</div><div class="og-sign">Praga</div><div class="og-sign">Book now</div></div></div><!-- /wp:html -->
<!-- wp:paragraph {"className":"og-kicker"} --><p class="og-kicker">Wood-fire kitchen · Ząbkowska 14 · Warsaw Praga</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":1,"className":"og-word"} --><h1 class="wp-block-heading og-word">OGIEŃ</h1><!-- /wp:heading -->
<!-- wp:paragraph {"className":"og-lead"} --><p class="og-lead">Everything on the menu touches the fire: Polish produce, oak and beech embers, and a short list that changes with the market.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"og-btn"} --><div class="wp-block-button og-btn"><a class="wp-block-button__link wp-element-button" href="#visit">Book a table</a></div><!-- /wp:button -->
<!-- wp:button {"className":"og-btn-ghost"} --><div class="wp-block-button og-btn-ghost"><a class="wp-block-button__link wp-element-button" href="#menu">Tonight's menu</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"menu","className":"og-menu","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div id="menu" class="wp-block-group alignfull og-menu"><!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"64px"}}}} --><div class="wp-block-columns">
<!-- wp:column {"width":"38%"} --><div class="wp-block-column" style="flex-basis:38%"><!-- wp:paragraph {"className":"og-kicker"} --><p class="og-kicker">Tonight</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">Seven plates. One fire.</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Order three to share, or let the kitchen choose for you — 189 zł per person.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"width":"62%"} --><div class="wp-block-column" style="flex-basis:62%">
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Ember-roasted beetroot</strong><span>smoked twaróg, hazelnut, dill oil</span></span><em>34 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Flatbread from the oven</strong><span>wild garlic butter, sea salt</span></span><em>22 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Grilled pike-perch</strong><span>burnt leek, brown butter, sorrel</span></span><em>68 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Duck over beech coals</strong><span>sour cherry, charred kale</span></span><em>79 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Smoked potato pierogi</strong><span>onion jam, crispy shallots</span></span><em>38 zł</em></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"og-dish"} --><p class="og-dish"><span class="og-d"><strong>Fire-baked apple</strong><span>honey, buckwheat crumble, cream</span></span><em>29 zł</em></p><!-- /wp:paragraph -->
</div><!-- /wp:column --></div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","className":"og-story","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull og-story"><!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"56px"}}}} --><div class="wp-block-columns">
<!-- wp:column {"width":"50%"} --><div class="wp-block-column" style="flex-basis:50%"><!-- wp:paragraph {"className":"og-kicker"} --><p class="og-kicker">Our kitchen</p><!-- /wp:paragraph --><!-- wp:heading --><h2 class="wp-block-heading">No gas. No shortcuts.</h2><!-- /wp:heading --><!-- wp:paragraph --><p>The grill is lit at noon and fed all evening. Vegetables come from farms within 100 km, fish from the Vistula lagoon, and the wood from managed Masovian forests.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"width":"25%"} --><div class="wp-block-column" style="flex-basis:25%"><!-- wp:paragraph {"className":"og-num"} --><p class="og-num">100 km</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>furthest farm on the menu</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"width":"25%"} --><div class="wp-block-column" style="flex-basis:25%"><!-- wp:paragraph {"className":"og-num"} --><p class="og-num">8 h</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>of live fire every evening</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"visit","className":"og-visit","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div id="visit" class="wp-block-group alignfull og-visit"><!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"64px"}}}} --><div class="wp-block-columns">
<!-- wp:column {"width":"55%"} --><div class="wp-block-column" style="flex-basis:55%"><!-- wp:heading --><h2 class="wp-block-heading">Pull up a chair by the fire.</h2><!-- /wp:heading --><!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"og-btn"} --><div class="wp-block-button og-btn"><a class="wp-block-button__link wp-element-button" href="mailto:stolik@example.com">Reserve by email</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div><!-- /wp:column -->
<!-- wp:column {"width":"45%","className":"og-hours"} --><div class="wp-block-column og-hours" style="flex-basis:45%"><!-- wp:paragraph --><p><strong>Tue–Thu</strong> 17:00–23:00</p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Fri–Sat</strong> 17:00–00:00</p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Sun</strong> 13:00–21:00 · family lunch</p><!-- /wp:paragraph --><!-- wp:paragraph --><p>ul. Ząbkowska 14, 03-735 Warszawa</p><!-- /wp:paragraph --><!-- wp:paragraph {"fontSize":"small"} --><p class="has-small-font-size">Concept website by Maria K. — fictional restaurant, built on WordPress (Twenty Twenty-Five, block editor).</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->
HTML;

$id = wp_insert_post(['post_title'=>'Home','post_name'=>'home','post_type'=>'page','post_status'=>'publish','post_content'=>$home]);
update_post_meta($id, '_wp_page_template', 'page-no-title');
update_option('show_on_front', 'page');
update_option('page_on_front', $id);
