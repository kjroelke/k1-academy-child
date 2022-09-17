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
    <div id="jsNotice">This page requires Javascript to work. If you need help, please contact us at <a
            href="mailto:hello@kingdomone.co">hello@kingdomone.co</a></div>
    <form class="sales-form" id="custom-sales-form">
        <div class="the-user">
            <div class="the-user__name">
                <label for="user-first-name">First Name</label>
                <!-- required  -->
                <input type="text" name="user-first-name" id="user-first-name" value="Steven">
                <label for="user-last-name">Last Name</label>
                <!-- required  -->
                <input type="text" name="user-last-name" id="user-last-name" value="Bush">
            </div>
            <div class="the-user__email">
                <label for="user-email">Your email</label>
                <input type="email" name="email" id="user-email" value="hello@kingdomone.co">
            </div>
        </div>
        <div class="the-organizaton">
            <label for="org-type">
                <h2>What type of organization are you?</h2>
            </label>
            <!-- required  -->
            <select name="org-type" id="org-type">
                <option selected value="Church">Church</option>
                <option value="School">School</option>
                <option value="Non-Profit Organization">Non-Profit Organization</option>
            </select>
            <label for="org-name">
                <h2>What's the name of your organization?</h2>
            </label>
            <!-- required  -->
            <input type="text" id="org-name" value="Kingdom One">

        </div>
        <div class="the-seats">
            <div class="licenses">
                <label for="employee--full">
                    <span>How many <strong>full-time employees</strong> do you have that need access?</span>
                </label>
                <!-- required  -->
                <input type="number" id="employee--full" value=6>
            </div>
            <div class="licenses"><label for="employee--part">
                    <span>How many <strong>part-time employees</strong> do you have that need access?</span>
                </label>
                <!-- required  -->
                <input type="number" id="employee--part" value=24>
            </div>
            <div class="licenses"><label for="volunteers">
                    <span>How many <strong>volunteers</strong> do you have that need access?</span>
                </label>
                <!-- required  -->
                <input type="number" id="volunteers" value=4>
            </div>
        </div>
        <div class="course-container">
            <label for="courses">
                <h2>Select which courses you would like to purchase.</h2>
            </label>
            <div class="the-courses"></div>
        </div>
        <div class="the-price"></div>
        <input type="submit" value="Submit">
    </form>
    <? endif; ?>
</div>
<? get_footer(); ?>