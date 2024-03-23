import { loginAuth, registerUser, validarToken } from '../../modulos/login/session.js';
import { openLoader, closeLoader } from './utils.js';
import { routers } from './routes.js';


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
    registerUser

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
      const statRsp = await validarToken();
      closeLoader();
      if (statRsp) {
        var skuprop = localStorage.getItem("sku");
        console.log(skuprop)
        const urlget= `/book/${skuprop}/asdasdad`;
        window.location.href = urlget;
        //page.router.navigate(urlget);

      } else {
        closeLoader();
      }
    } catch (error) {
      console.error("Error al validar el token:", error);
      closeLoader();
    }

  }


  async function redirectLogin() {
    try {
      const datosResulta = await validarToken();
      closeLoader();
      if (!datosResulta) {
        page.router.navigate('/login/');

      } else {
        closeLoader();
      }
    } catch (error) {
      console.error("Error al validar el token:", error);
      closeLoader();
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

