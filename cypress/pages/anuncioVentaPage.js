const  SELECCION_TIPO_VEHICULO = '.vehicle-selection.row';
const CREAR_PUBLICACION_BTN = '.btn.btn-primary';
const DROPDOWN_MARCA = '[placeholder="Seleccione la marca"]';
const DROPDOWN_MODELO = '[placeholder="Seleccione modelo"]';
const DROPDOWN_ANNO = '[placeholder="Seleccione año"]'
const DROPDOWN_SEGMENTO = '[placeholder="Selecciona el segmento"]';
const DROPDOWN_VERSION = '[placeholder="Selecciona la insignia"]';
const FORMULARIO_DROPDOWNS = '.form-control-filtered-select'; //Selector comun para validar formularios de los dropdowns y realizar aserciones (como campos obligatorios)
const SELECTOR_DROPDOWN = 'app-control-filtered-select > div > div.control-filtered-select-footer > div > ul'; //Selector comun para todas las opciones de los dropdowns en flujo de creacion de publicacion
const BTN_SIGUIENTE = '.btn.btn-primary'; //Boton siguiente comun en flujo de creacion de publicacion
const TRANSMICION_COMBUSTIBLE_OPT = '.control-tabs'; //Selector comun para opciones de transmision y combustible
const OPT_SELECCIONADAS = '.breadcrumbs-container'; //Selector comun para validar opciones seleccionadas en el flujo de creacion de publicacion
const COINCIDENCIAS_VEHICULOS_ENCONTRADOS = '.wizard-final-step-option';

export class AnuncioVentaPage {

    //Validar que el boton de crear publicacion este visible y habilitado
    crearPublicacionVisible(ssData){
        cy.get(CREAR_PUBLICACION_BTN).should('be.visible').and('be.enabled');
        cy.screenshot(ssData, {overwrite: true});
    }
    
    //Seleccionar tipo de vehiculo para la publicacion
    seleccionarTipoVehiculo(vehiculo, ssData){
        
        //Pequeño ejemplo de como se podria utilizar url y origin para solucionar el problema de elementos orignes
        //let newUrl;
        // cy.url().then((urlStr) => {
        //     newUrl = urlStr;
        //         cy.origin(newUrl, (ssData) => {
        //         cy.wait(1500);
        //         cy.screenshot(ssData, {overwrite: true});
        //     })
        // });
 
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.screenshot(ssData, {overwrite: true});
             cy.get(SELECCION_TIPO_VEHICULO).contains(new RegExp("^" + datos.tipo + "$","g")).click();
        });
        cy.get(CREAR_PUBLICACION_BTN).should('be.visible').click();
        cy.screenshot(ssData, {overwrite: true});
    }

    validarCamposObligatoriosDropdowns(ssData){
        cy.get(FORMULARIO_DROPDOWNS).should('be.visible');
        //Esperar para que carga de elementos este completa * debe ser optimizado con esperas inteligentes * 
        //pero cumple funcion en este caso de prueba y fines del demo
        cy.wait(1500);
        cy.get(BTN_SIGUIENTE).click();
        cy.get(FORMULARIO_DROPDOWNS).contains('Este campo es obligatorio').should('be.visible');
        cy.screenshot(ssData, {overwrite: true});
    }

    //Flujo completo de creacion de publicacion
    //Se pasan como parametros los datos necesarios para la creacion de la publicacion
    //Se dividen en varios metodos para facilitar la lectura y mantenimiento

    crearPublicacion_marca(vehiculo, ssData){ 
        cy.get(DROPDOWN_MARCA).click();
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.get(SELECTOR_DROPDOWN).contains(datos.marca).click();
             expect(cy.get(DROPDOWN_MARCA).should('have.value', datos.marca));
        });
        cy.screenshot(ssData, {overwrite: true});
        cy.get(BTN_SIGUIENTE).click();
    }

    crearPublicacion_modelo(vehiculo, ssData){
        cy.get(DROPDOWN_MODELO).click();
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.get(SELECTOR_DROPDOWN).contains(datos.modelo).click();
             expect(cy.get(DROPDOWN_MODELO).should('have.value', datos.modelo));
        }); 
        cy.screenshot(ssData, {overwrite: true});
        cy.get(BTN_SIGUIENTE).click();
    }

    crearPublicacion_anno(vehiculo, ssData){
        cy.get(DROPDOWN_ANNO).click();
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.get(SELECTOR_DROPDOWN).contains(datos.anno).click();
             expect(cy.get(DROPDOWN_ANNO).should('have.value', datos.anno));
        });
        cy.screenshot(ssData, {overwrite: true});
        cy.get(BTN_SIGUIENTE).click();
    }

    crearPublicacion_transmicion(vehiculo, ssData){
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.get(TRANSMICION_COMBUSTIBLE_OPT).first().contains(datos.transmicion).click();
             cy.screenshot(ssData, {overwrite: true});
             cy.get(BTN_SIGUIENTE).click();
             expect(cy.get(OPT_SELECCIONADAS).should('include.text', datos.transmicion));
        }); 
    }

    crearPublicacion_segmento(vehiculo, ssData){
        cy.get(DROPDOWN_SEGMENTO).click();
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.get(SELECTOR_DROPDOWN).contains(datos.segmento).click();
             expect(cy.get(DROPDOWN_SEGMENTO).should('have.value', datos.segmento));
        });
        cy.screenshot(ssData, {overwrite: true});
        cy.get(BTN_SIGUIENTE).click();
    }

    crearPublicacion_combustible(vehiculo, ssData){
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.get(TRANSMICION_COMBUSTIBLE_OPT).first().contains(datos.combustible).click();
             cy.screenshot(ssData, {overwrite: true});
             cy.get(BTN_SIGUIENTE).click();
             expect(cy.get(OPT_SELECCIONADAS).should('include.text', datos.combustible));
        }); 
    }

    crearPublicacion_insignia(vehiculo, ssData){
        cy.get(DROPDOWN_VERSION).click();
        cy.fixture('vehiculos').then((datosVehiculo) =>{
             const datos = datosVehiculo[vehiculo];
             cy.get(SELECTOR_DROPDOWN).contains(datos.insignia).click();
             expect(cy.get(DROPDOWN_VERSION).should('have.value', datos.insignia));
        });
        cy.screenshot(ssData, {overwrite: true});
        cy.get(BTN_SIGUIENTE).click();
    }

    validar_coincidencias_vehiculos_encontrados(ssData){
        cy.get(COINCIDENCIAS_VEHICULOS_ENCONTRADOS).should('be.visible');
        cy.get(COINCIDENCIAS_VEHICULOS_ENCONTRADOS).its('length').then((len) => {
            expect(len).to.be.greaterThan(0);
        });
        cy.screenshot(ssData, {overwrite: true});
    }
}