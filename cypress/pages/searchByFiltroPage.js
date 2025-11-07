
const MARCA_FILTRO = '[data-aspect="Marca"]';
const FRAME_SELECTOR_FILTRO = '.multiselect-facets';


export class SearchByFiltroPage {

    //Seleccionar marca en el filtro de busqueda
    selecionarMarcaFiltro(marca) {
        cy.get(MARCA_FILTRO).click();
        cy.get(FRAME_SELECTOR_FILTRO).contains(marca).click();
    }
}