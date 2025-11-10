import { HomePage } from "../../pages/homePage";
import { AnuncioVentaPage } from "../../pages/anuncioVentaPage";
const homePage = new HomePage();
const anuncioVentaPage = new AnuncioVentaPage();
//Inicializando variables para pruebas se genera con fixture y un parametro hardcodeado para facilitar visualización de la demostración
const vehiculoPrueba = 'Suzuki_Swift_2018';

describe('Pruebas de publicación de anuncio de venta de vehículo', () => {

    // Debido a que las pruebas involucran la creación de publicaciones, 
    // y la pagina es utilizada por los usuarios finales se decide llegar hasta final del flujo de ingreso de anuncio previo log in t sin publicar realmente los anuncios,
    // se recomienda ejecutar estas pruebas en un entorno de pruebas o con una cuenta dedicada a testing,
    // Adicionalmente se decide ejecutar en el dominio de chileautos.cl (hardcodeado), dado a que cypress no maneja de manera dinamica los cambios de origenes (url), para 
    // la identifación de elementos y screenshoots estos fallan y generan errores, esto solucionable actualizando el origen por cada elemento pero eso implica generar una solución que
    // o si bien que de todas maneras se ingrese la url(harcodeada) o tomar la url al ingresar a la pantalla de "Generar un anuncio" y guardarla, pero esto podria afectar 
    // la usabilidad del codigo y adicionalmente no seria capas de detectar errores de actualizacion entre ambientes porque podria ocurrir en que se generen diferencias entre los #href
    // de todas maneras en el Page de anuncioVenta deje comentado un pequeño ejemplo de como se podria implementar.

    beforeEach(() => {
        cy.visit('https://www.chileautos.cl/');
    });

    it('Validar navegación a página de publicación de anuncio de venta', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        let contador_ss = 1;
        //Inicio de flujo de prueba
        homePage.irPaginaPublicarVehiculo();
        anuncioVentaPage.seleccionarTipoVehiculo(vehiculoPrueba,rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacionVisible(vehiculoPrueba,vehiculoPrueba,rutaScreenshot + '_' + contador_ss++);
        cy.screenshot(rutaScreenshot, {overwrite: true});
    });

    it('Crear una publicacion', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        let contador_ss = 1;
        //Pre inicio de flujo de creacion de publicacion
        homePage.irPaginaPublicarVehiculo();
        anuncioVentaPage.seleccionarTipoVehiculo(vehiculoPrueba);
        //Flujo completo de creacion de publicacion
        anuncioVentaPage.crearPublicacion_marca(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacion_modelo(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacion_anno(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacion_transmicion(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacion_segmento(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacion_combustible(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacion_insignia(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.validar_coincidencias_vehiculos_encontrados(rutaScreenshot + '_' + contador_ss++);
    });

    //un par de casos de borde dentro del flujo de creacion de publicacion (campos obligatorios)

    it('Validar campo de seleccion de marca, impida continuar flujo y solicita seleccionar una marca de la lista', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        let contador_ss = 1;
        ///Inicio de flujo de creacion de publicacion
        homePage.irPaginaPublicarVehiculo();
        anuncioVentaPage.seleccionarTipoVehiculo(vehiculoPrueba,rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.validarCamposObligatoriosDropdowns(rutaScreenshot);

    });

    it('Validar campo de seleccion de modelo, impida continuar flujo y solicita seleccionar un modelo de la lista', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        let contador_ss = 1;
        //Inicio de flujo de creacion de publicacion
        homePage.irPaginaPublicarVehiculo();
        anuncioVentaPage.seleccionarTipoVehiculo(vehiculoPrueba,rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.crearPublicacion_marca(vehiculoPrueba, rutaScreenshot + '_' + contador_ss++);
        anuncioVentaPage.validarCamposObligatoriosDropdowns(rutaScreenshot);
    });
});