import { HomePage } from "../../pages/homePage";
import {SearchByFiltroPage} from '../../pages/searchByFiltroPage';
const searchByFiltroPage = new SearchByFiltroPage();
const homePage = new HomePage();

describe('Pruebas de busqueda por selector de filtros', () => {

    beforeEach(() => {
        cy.visit('https://www.chileautos.cl/');
    });
    
    it('Busqueda por filtro de vehiculo por marca', () => {
        homePage.irPaginaCompra_Todos();
        searchByFiltroPage.selecionarMarcaFiltro('Suzuki');
        //Validación de que la URL contenga el filtro aplicado
        cy.contains('Ir').first().click();
        cy.url().should('include', 'suzuki');
    });
    

});