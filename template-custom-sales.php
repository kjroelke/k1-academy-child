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
    <form class="sales-form">
        <div class="the-organizaton">
            <label for="org-name">
                <h2>What's the name of your organization?</h2>
            </label>
            <input type="text" id="org-name">
        </div>
        <div class="course-container">
            <label for="courses">
                <h2>Select which courses you would like to purchase.</h2>
            </label>
            <div class="the-courses"></div>
            <div class="the-seats">
                <label for="seats">
                    <h2>How many licenses do you need?</h2>
                </label>
                <input type="number" id="seats" required="">
            </div>
            <input type="submit" value="Submit">

            <div id="custom-sales-form">This page requires Javascript to work. If you need help, please contact us at <a
                    href="mailto:hello@kingdomone.co">hello@kingdomone.co</a></div>
        </div>
    </form>
</div>
<? get_footer(); ?>