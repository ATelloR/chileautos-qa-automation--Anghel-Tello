
const HEADER = '[data-id="homepage:header"]';
const HEADER_OPT = '[id*="-trigger"]';
const HEADER_SLIDER = '[id*="-content"]';
const BARRA_BUSQUEDA = '#search-card';
const SECCIONES = 'div >.iompba0.iompba3.animated';
const SECCIONES_ICON = '.iompba0.iompba3._1lalutr3so';
const BUSQUEDA_ELE_ID_INPUTS = '[id^="mantine-"]';
const BUSQUEDA_DROPDOWN = '.bt07uzg';
const PALABRA_CLAVE_INPUT = '[placeholder="Escribe palabra clave"]';
const BTN_BUSCAR = '#search-form-submit';

export class HomePage {

    //Verificación de elementos basicos en la pagina principal
    //hearer, barra de busqueda, secciones hoy, tipos de auto, revisar noticias, showroom y testdrive y footer
    headerVisible(){
        return cy.get(HEADER).should('be.visible');
    }

    barraBusquedaVisible(){
        return cy.get(BARRA_BUSQUEDA).should('be.visible'); 
    }

    //Validación por secciones nota: flujo se puede mejorar con un array y un ciclo
    seccion_hoy_visible(){
        return cy.get(SECCIONES).eq(0).contains('¿Qué harás hoy?').should('be.visible');
    }

    seccion_tipos_auto_visible(){
        return cy.get(SECCIONES).eq(1).contains('Tipos de autos').should('be.visible');
    }

    seccion_noticias_visible(){
        return cy.get(SECCIONES).eq(2).contains('Revisar todas las noticias').should('be.visible');
    }

    seccion_showroom_visible(){
        return cy.get(SECCIONES_ICON).eq(1).contains('¿Buscas un auto cero Kilómetros?').should('be.visible');
    }

    seccion_test_drive_visible(){
        return cy.get(SECCIONES).eq(4).contains('Test drive').should('be.visible');
    }

    selector_tipo_modelo_disable(){
        return cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(7).should('be.disabled');
    }

    //Validación de funcionalidad de barra de búsqueda

    buscar_por_tipo_auto(tipo_auto){
        cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(1).click();
        cy.get(BUSQUEDA_DROPDOWN).eq(0).contains(new RegExp("^" + tipo_auto + "$","g")).click();
        cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(1).should('have.value', tipo_auto);
    }

    buscar_por_marca_auto(marca_auto){
        cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(4).click();
        cy.get(BUSQUEDA_DROPDOWN).eq(1).contains(new RegExp("^" + marca_auto + "$","g")).click();
        cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(4).should('have.value', marca_auto);
    }

    buscar_por_modelo_auto(modelo_auto){
        cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(7).click();
        //Pequeña funcionalidad para limitar busqueda de modelo solo a los que correspondan a la marca seleccionada
        //cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(7).type(modelo_auto);
        cy.get(BUSQUEDA_DROPDOWN).eq(2).contains(new RegExp("^" + modelo_auto + "$","g")).click();
        cy.get(BUSQUEDA_ELE_ID_INPUTS).eq(7).should('have.value', modelo_auto);
    }

    buscar_por_palabra_clave(palabra_clave){
        cy.get(PALABRA_CLAVE_INPUT).type(palabra_clave);
        cy.get(PALABRA_CLAVE_INPUT).should('have.value', palabra_clave);
    }

    //validar busqueda por boton de buscar vehiculos

    funcion_guardado_vehiculos_encontrados_btn_buscar(alias){
    var regex = /[\d,.]+/g;
    cy.get(BTN_BUSCAR).invoke('text').
        then((resultadoBusqueda) => {
            cy.wrap(resultadoBusqueda.match(regex)).as(alias)
        });
    }

    validar_btn_buscar_busqueda(){
        
    }

    submit_busqueda(){
        cy.get(BTN_BUSCAR).should('be.visible').and('be.enabled')
        cy.get(BTN_BUSCAR).click();
    }

    irPaginaCompra_Todos() {
        cy.get(HEADER_OPT).eq(0).click();
        cy.get(HEADER_SLIDER).eq(0).contains('Todos los Autos').click();    
    }

    irPaginaPublicarVehiculo(){
        cy.get(HEADER_OPT).eq(1).click();
        cy.get(HEADER_SLIDER).eq(1).contains('Publicar mi vehículo').click(); 
    }

    irPaginaLogIn() {
        cy.contains('Ingresar/Registrarse').first().click();
    }

    //Screenshots
    tomar_screenshot_barrabusqueda(nombre){
        cy.get(BARRA_BUSQUEDA).screenshot(nombre, {overwrite: true});
    }
}

