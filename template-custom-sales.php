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
                <input type="text" name="user-first-name" id="user-first-name" placeholder="Steven">
                <label for="user-last-name">Last Name</label>
                <input type="text" name="user-last-name" id="user-last-name" placeholder="Bush">
            </div>
            <div class="the-user__email">
                <label for="user-email">Your email</label>
                <input type="email" name="email" id="user-email" placeholder="hello@kingdomone.co">
            </div>
        </div>
        <div class="the-organization">
            <label for="org-type">
                <h2>What type of organization are you?</h2>
            </label>
            <select name="org-type" id="org-type">
                <option selected value="Church">Church</option>
                <option value="School">School</option>
                <option value="Non-Profit Organization">Non-Profit Organization</option>
            </select>
            <div class="volunteers__container">
                <h4>Do you have volunteers who need training?</h4>
                <div class="volunteers--yes">
                    <input checked type="radio" name="volunteers" id="True" value="True">
                    <label for="Yes">Yes</label>
                </div>
                <div class="volunteers--no">
                    <input type="radio" name="volunteers" id="False" value="False">
                    <label for="No">No</label>
                </div>
            </div>
        </div>
        <label for="org-name">
            <h2>What's the name of your organization?</h2>
        </label>
        <input type="text" id="org-name" placeholder="Kingdom One">
        <div class="the-seats">
            <div class="licenses licenses__employees">
                <label for="employee--full">
                    <span>How many <strong>full-time employees</strong> do you have that need access?</span>
                </label>
                <input type="number" id="employee--full" placeholder=0>
            </div>
            <div class="licenses licenses__employees">
                <label for="employee--part">
                    <span>How many <strong>part-time employees</strong> do you have that need access?</span>
                </label>
                <input type="number" id="employee--part" placeholder=0>
            </div>
            <div class="licenses licenses__volunteers">
                <label for="volunteers">
                    <span>How many <strong>volunteers</strong> do you have that need access?</span>
                </label>
                <input type="number" id="volunteers" placeholder=0>
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