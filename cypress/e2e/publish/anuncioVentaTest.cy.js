import { HomePage } from "../../pages/homePage";
import { AnuncioVentaPage } from "../../pages/anuncioVentaPage";
const homePage = new HomePage();
const anuncioVentaPage = new AnuncioVentaPage();
//Inicializando variables para pruebas se genera con fixture y un parametro hardcodeado para facilitar visualización de la demostración
const vehiculoPrueba = 'Suzuki_Swift_2018';

describe('Pruebas de publicación de anuncio de venta de vehículo', () => {

    //Debido a que las pruebas involucran la creación de publicaciones,
    //se recomienda ejecutar estas pruebas en un entorno de pruebas o con una cuenta dedicada a testing, pero debido a que la pagina entregada no recorre el flujo completo de publicación,
    //se decidió ejecutar en el dominio de chileautos.cl, per sin publicar realmente los anuncios.

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