export const formMarkup = `<form class="sales-form" id="custom-sales-form">
        <div class="the-user">
            <div class="the-user__name">
                <label for="user-first-name">First Name</label>
                <input required type="text" name="user-first-name" id="user-first-name" placeholder="Steven">
                <label for="user-last-name">Last Name</label>
                <input type="text" required name="user-last-name" id="user-last-name" placeholder="Bush">
            </div>
            <div class="the-user__email">
                <label for="user-email">Your email</label>
                <input type="email" name="email" required id="user-email" placeholder="hello@kingdomone.co">
            </div>
        </div>
        <div class="the-organization">
            <label for="org-name">
                <h2>What's the name of your organization?</h2>
            </label>
            <input type="text" required id="org-name" placeholder="Kingdom One">
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
        <div class="the-seats">
            <div class="licenses licenses__employees">
                <label for="employee--full">
                    <span>How many <strong>full-time employees</strong> do you have that need access?</span>
                </label>
                <input type="number" required inputmode="numeric" id="employee--full" placeholder=0>
            </div>
            <div class="licenses licenses__employees">
                <label for="employee--part">
                    <span>How many <strong>part-time employees</strong> do you have that need access?</span>
                </label>
                <input type="number" inputmode="numeric" id="employee--part" placeholder=0>
            </div>
            <div class="licenses licenses__volunteers">
                <label for="volunteers">
                    <span>How many <strong>volunteers</strong> do you have that need access?</span>
                </label>
                <input type="number" inputmode="numeric" id="volunteers" placeholder=0>
            </div>
        </div>
        <div class="course-container">
                <h2>Select which courses you would like to purchase.</h2>
            <div class="the-courses"></div>
        </div>
        <div class="the-price"></div>
        <input type="submit" value="Submit">
    </form>`;
