<?php
/* Template Name: Custom Sales Page */
// =============================================================================
// VIEWS/INTEGRITY/TEMPLATE-Custom-Sales.PHP (No Container | Header, Footer)
// -----------------------------------------------------------------------------
// A blank Sales page for creating unique layouts.
// =============================================================================
get_header();
?>
<div class="x-container max width">
    <header>
        <h1>Hello there.</h1><span>Let's Get Started.</span>
    </header>
    <? if (!is_user_logged_in()) : ?> <span class="alert">You must be logged in to continue.</span>
    <? else : ?>
        <div id="app">This page requires Javascript to work. If you need help, please contact us at <a href="mailto:hello@kingdomone.co">hello@kingdomone.co</a></div>
    <? endif; ?>
</div>
<? get_footer(); ?>