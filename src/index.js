import '../sass/main.scss';
import { dashboardControl } from './modules/studentDashboard';
import { myCopyright } from './modules/utilities';

function init() {
	myCopyright('Kingdom One');
	dashboardControl();
}
init();
