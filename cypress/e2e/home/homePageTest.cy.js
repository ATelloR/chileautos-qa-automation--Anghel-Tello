import { HomePage } from "../../pages/homePage";
const homePage = new HomePage();
//Inicializando variables para pruebas se genera con fixture y un parametro hardcodeado para facilitar visualización de la demostración de la demo
const vehiculoPrueba = 'Suzuki_Swift_2018';

describe('Pruebas en pagina principal del sitio', () => {
    
    beforeEach(() => {
        cy.visit('/');
    });

    it('Barrido de existencia de elementos basicos en la pagina principal', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;

        homePage.headerVisible();
        homePage.barraBusquedaVisible();
        homePage.seccion_hoy_visible();
        homePage.seccion_tipos_auto_visible();
        homePage.seccion_noticias_visible();
        homePage.seccion_showroom_visible();
        homePage.seccion_test_drive_visible();
        cy.screenshot(rutaScreenshot, {overwrite: true});
    });

    it('Validación de funcionalidad de barra de búsqueda por tipo de auto - usado', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        const tipo_auto = 'Usado';

        homePage.buscar_por_tipo_auto(tipo_auto);
        homePage.tomar_screenshot_barrabusqueda(rutaScreenshot);
        //Se comenta la parte de submit y validación de URL dado a que el entorno inicia protección captcha
        //homePage.submit_busqueda();
        //cy.url().should('include', `/${tipo_auto}`);
    });

    it('Validación de funcionalidad de barra de búsqueda por tipo de auto - nuevo', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        const tipo_auto = 'Nuevo';

        homePage.buscar_por_tipo_auto(tipo_auto);
        homePage.tomar_screenshot_barrabusqueda(rutaScreenshot);
        //Se comenta la parte de submit y validación de URL dado a que el entorno inicia protección captcha
        //homePage.submit_busqueda();
        //cy.url().should('include', `/${tipo_auto}`);
    });

    //Este caso de prueba valida el comportamiento del buscador al no ingresar ningun parametro, se escoge para validar comportamiento de la ejecución del flujo y entrega de reporte
    it('Validación de funcionalidad de barra de búsqueda por tipo de auto - sin parametro', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        const tipo_auto = '123';

        homePage.buscar_por_tipo_auto(tipo_auto);
        homePage.tomar_screenshot_barrabusqueda(rutaScreenshot);
        //Se comenta la parte de submit y validación de URL dado a que el entorno inicia protección captcha
        //homePage.submit_busqueda();
        //cy.url().should('include', `/${tipo_auto}`);
    });

    it('Validación de funcionalidad de barra de búsqueda por Marca', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        const marca = 'Suzuki';

        homePage.buscar_por_marca_auto(marca);
        homePage.tomar_screenshot_barrabusqueda(rutaScreenshot);
        //Se comenta la parte de submit y validación de URL dado a que el entorno inicia protección captcha
        //homePage.submit_busqueda();
        //cy.url().should('include', `/${marca}`);
    });

    it('Validación de funcionalidad de barra de búsqueda por marca y modelo', function()  {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        let contador_ss = 1;
        const marca = 'Suzuki';
        const modelo = 'Swift';
        //una validacion extra para asegurar que el elemento de modelo este disable hasta seleccionar marca
        homePage.selector_tipo_modelo_disable();
        homePage.tomar_screenshot_barrabusqueda(rutaScreenshot + '_' + contador_ss++);
        //inicio de flujo
        homePage.buscar_por_marca_auto(marca);
        homePage.buscar_por_modelo_auto(modelo);
        homePage.tomar_screenshot_barrabusqueda(rutaScreenshot + '_' + contador_ss++);
    });

    it('Validación de funcionalidad de barra de búsqueda por uso, marca, modelo y Palabra Clave', function() {
        //configurando ruta de screenshot con estructura de carpetas
        const rutaScreenshot = this.test.parent.title + '/' +this.test.title;
        //Inicializando variables
        const tipo_auto = 'Usado';
        const marca = 'Suzuki';
        const modelo = 'Swift';
        
        //inicio de flujo
        homePage.funcion_guardado_vehiculos_encontrados_btn_buscar('valorInicialBusqueda'); //guardando valor inicial de vehiculos encontrados
        homePage.buscar_por_tipo_auto(tipo_auto)
        cy.wait(500); //espera para evitar fallos en dropdown
        homePage.buscar_por_marca_auto(marca);
        homePage.buscar_por_modelo_auto(modelo);
        homePage.buscar_por_palabra_clave('manual');
        cy.wait(1000); //espera para cargar bien el valor antes de la captura
        homePage.funcion_guardado_vehiculos_encontrados_btn_buscar('valorFinalBusqueda'); //guardando valor final de vehiculos encontrados
        //Validación de que la cantidad de vehiculos encontrados haya disminuido con los filtros aplicados
        cy.get('@valorInicialBusqueda').then((inicial) => {
            cy.get('@valorFinalBusqueda').then((final) => {
                expect(parseInt(final[0].replace(/[,\.]/g, ''))).to.be.lessThan(parseInt(inicial[0].replace(/[,\.]/g, '')));
            });
        });
        homePage.tomar_screenshot_barrabusqueda(rutaScreenshot);
    });

})
