<?php
/* Wiśniewska Legal — WordPress demo content (concept project by Maria K.) */
update_option('blogname', 'Wiśniewska Legal');
update_option('blogdescription', 'Business law in Warsaw');
update_option('permalink_structure', '/%postname%/');
foreach (get_posts(['post_type'=>['page','post'],'numberposts'=>-1,'post_status'=>'any']) as $p) { wp_delete_post($p->ID, true); }

$home = <<<HTML
<!-- wp:group {"align":"full","className":"wl-hero","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull wl-hero"><!-- wp:html --><div class="wl-section-sign" aria-hidden="true">§</div><!-- /wp:html -->
<!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">Business law · Warsaw · since 2009</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":1} --><h1 class="wp-block-heading">Clear answers <em>before</em> you sign.</h1><!-- /wp:heading -->
<!-- wp:paragraph {"className":"wl-lead"} --><p class="wl-lead">We help founders, investors and foreign companies set up, contract and grow in Poland — in plain English and Polish, with a fixed quote before we start.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"wl-btn-primary"} --><div class="wp-block-button wl-btn-primary"><a class="wp-block-button__link wp-element-button" href="#contact">Book a 20-minute review</a></div><!-- /wp:button -->
<!-- wp:button {"className":"wl-btn-ghost"} --><div class="wp-block-button wl-btn-ghost"><a class="wp-block-button__link wp-element-button" href="#practice">Practice areas</a></div><!-- /wp:button --></div><!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:html --><div class="wl-marquee alignfull" aria-hidden="true"><div class="wl-track"><span>Company formation</span><span>§</span><span>Commercial contracts</span><span>§</span><span>Employment &amp; B2B</span><span>§</span><span>Data &amp; GDPR</span><span>§</span><span>Company formation</span><span>§</span><span>Commercial contracts</span><span>§</span><span>Employment &amp; B2B</span><span>§</span><span>Data &amp; GDPR</span><span>§</span></div></div><!-- /wp:html -->

<!-- wp:group {"align":"full","className":"wl-strip","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull wl-strip"><!-- wp:columns --><div class="wp-block-columns">
<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p><strong>Fixed-fee quotes</strong> for company set-up and contracts</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p><strong>EN / PL / DE</strong> — every document explained in your language</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:paragraph --><p><strong>48-hour first answer</strong> on any written question</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"practice","className":"wl-practice","style":{"spacing":{"padding":{"top":"96px","bottom":"96px"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
<div id="practice" class="wp-block-group alignfull wl-practice" style="padding-top:96px;padding-bottom:96px"><!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">Practice areas</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2 class="wp-block-heading">Four things we do, and do properly.</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"48px"},"margin":{"top":"48px"}}}} --><div class="wp-block-columns" style="margin-top:48px">
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">01</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Company formation</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Sp. z o.o., branch offices and simple joint-stock companies, from KRS registration to the first board resolution.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">02</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Commercial contracts</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Supply, distribution, SaaS and NDA templates your team can reuse — written to be read, not just signed.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">03</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Employment &amp; B2B</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Hiring in Poland, B2B contractor agreements, IP transfer clauses and remote-work policies.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-area"} --><div class="wp-block-column wl-area"><!-- wp:paragraph {"className":"wl-num"} --><p class="wl-num">04</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">Data &amp; GDPR</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Privacy policies, processing agreements and practical RODO audits for websites and apps.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","className":"wl-dark","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull wl-dark"><!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">How we work</p><!-- /wp:paragraph -->
<!-- wp:heading --><h2 class="wp-block-heading">No surprises on the invoice. Ever.</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"margin":{"top":"56px"},"blockGap":{"left":"40px"}}}} --><div class="wp-block-columns" style="margin-top:56px">
<!-- wp:column {"className":"wl-step"} --><div class="wp-block-column wl-step"><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">1. You write to us</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Describe the situation in a few lines. We reply within 48 hours with the questions that matter.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-step"} --><div class="wp-block-column wl-step"><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">2. Fixed quote</h3><!-- /wp:heading --><!-- wp:paragraph --><p>You get a written scope and a fixed fee. Nothing starts until you approve it.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
<!-- wp:column {"className":"wl-step"} --><div class="wp-block-column wl-step"><!-- wp:heading {"level":3} --><h3 class="wp-block-heading">3. Plain-language delivery</h3><!-- /wp:heading --><!-- wp:paragraph --><p>Every document comes with a one-page summary of what it means for your business.</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"96px","bottom":"96px"}}},"layout":{"type":"constrained","contentSize":"1180px"}} -->
<div class="wp-block-group alignfull" style="padding-top:96px;padding-bottom:96px"><!-- wp:paragraph {"className":"wl-quote"} --><p class="wl-quote">“The first lawyers who told us what could go wrong before it did — and then fixed the contract in two days.”</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"wl-kicker"} --><p class="wl-kicker">Sample testimonial · concept text</p><!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","anchor":"contact","className":"wl-contact","layout":{"type":"constrained","contentSize":"1180px"}} -->
<div id="contact" class="wp-block-group alignfull wl-contact"><!-- wp:columns --><div class="wp-block-columns">
<!-- wp:column {"width":"60%"} --><div class="wp-block-column" style="flex-basis:60%"><!-- wp:heading --><h2 class="wp-block-heading">Tell us what you're about to sign.</h2><!-- /wp:heading --></div><!-- /wp:column -->
<!-- wp:column {"width":"40%"} --><div class="wp-block-column" style="flex-basis:40%"><!-- wp:paragraph --><p>ul. Złota 44, 00-120 Warszawa<br>office@example.com · +48 22 000 00 00</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"className":"wl-btn-primary"} --><div class="wp-block-button wl-btn-primary"><a class="wp-block-button__link wp-element-button" href="mailto:office@example.com">Write to us</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
<!-- wp:paragraph {"fontSize":"small"} --><p class="has-small-font-size">Concept website by Maria K. — fictional firm, built on WordPress (Twenty Twenty-Five, block editor).</p><!-- /wp:paragraph --></div><!-- /wp:column -->
</div><!-- /wp:columns --></div>
<!-- /wp:group -->
HTML;

$id = wp_insert_post([
  'post_title'   => 'Home',
  'post_name'    => 'home',
  'post_type'    => 'page',
  'post_status'  => 'publish',
  'post_content' => $home,
]);
update_post_meta($id, '_wp_page_template', 'page-no-title');
update_option('show_on_front', 'page');
update_option('page_on_front', $id);
