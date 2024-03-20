import { loginAuth, registerUser, validarToken } from '../../modulos/login/session.js';
import { registerStore } from '../../modulos/company/register.js'
import { openLoader, closeLoader } from './utils.js';
import { detailBooks } from "../../modulos/company/getCompany.js";
import { routers } from './routes.js';
import { listCategory } from '../../modulos/list-category/list-category.js';


const $ = Dom7;
const theme = 'ios';
export const app = new Framework7({
  el: '#app',
  router: true,
  routes: routers,
  pushState: true,
  theme,
  view: {
    browserHistory: true,
  },
  utils: {
    closeLoader,
    openLoader,
    registerUser,
    registerStore,
    detailBooks,
    listCategory

  },
  popup: {
    closeOnEscape: true,
  },
  sheet: {
    closeOnEscape: true,
  },
  popover: {
    closeOnEscape: true,
  },
  actions: {
    closeOnEscape: true,
  },
  vi: {
    placementId: 'pltd4o7ibb9rc653x14',
  },
});


app.on('pageAfterIn', async function (page) {

  async function redirectDashboard() {

    try {
      const datosResulta = await validarToken();
      closeLoader();
      if (datosResulta) {
        page.router.navigate('/dashboard/');

      }
    } catch (error) {
      console.error("Error al validar el token:", error);
    }

  }


  async function redirectLogin() {
    try {
      const datosResulta = await validarToken();
      closeLoader();
      if (!datosResulta) {
        page.router.navigate('/login/');

      }
    } catch (error) {
      console.error("Error al validar el token:", error);
    }
  }


  const currentPagePath = page.route.route.path;
  const isLoginPage = currentPagePath === '/login' || currentPagePath === '/register';

  if (isLoginPage) {
    initializeLoginPage();
    redirectDashboard()

  } else {
    handleAuthenticatedPage();
    redirectLogin()

  }

  function initializeLoginPage() {
    window.loginAuth = loginAuth;
    $('.panel.panel-left').hide();
    $('footer').hide();
    $('header').hide()
    $('.view.view-main').removeAttr('style');
  }

  function handleAuthenticatedPage() {

    const name = localStorage.getItem('user_display_name');
    $('#name').text(name);
    $('footer').show();
    $('header').show()

  }


});

