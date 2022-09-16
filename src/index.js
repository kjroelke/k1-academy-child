import '../sass/main.scss';
import { customSalesApp } from './modules/customSales';
import { dashboardControl } from './modules/studentDashboard';
import { myCopyright } from './modules/utilities';

function init() {
	myCopyright('Kingdom One');
	dashboardControl();
	if (window.location.pathname === '/sales/') customSalesApp();
}
init();
