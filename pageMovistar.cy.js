describe('template spec', () => {

  beforeEach(function(){
    cy.viewport(1200, 720)
    cy.visit('https://tiendaonline.movistar.com.ar/')
    cy.url().should('eq','https://tiendaonline.movistar.com.ar/' )
  })

  it('CP001 - Validar cuotas en compra de equipo - A14', () => {
   
   cy.get('.products > ol > li').contains('Galaxy A14').click({ force: true })
   cy.get('#open-installments-modal').click()
   cy.get('#selectBank > ul > li')
        .eq(0).then(($banco) => {
            cy.get($banco).click({ force: true })

          cy.get('#selectCardByBank > ul > li')
          .eq(0).then(($tarjeta) => {
              cy.get($tarjeta).click({ force: true })
              cy.get('#calculate_btn > .btn-primary').click()
              cy.get('#bodyTable').contains('td', '3 cuotas sin interés').should('be.visible')
          })
        })
  })
  
  it('CP002 - Aplicar filtro de equipos - 128GB - $200K-$300K', () => {
    cy.get('[data-value="802"] > a').click()
    cy.get('[data-value="0_1000000"] > a').click()
    cy.get('.price > .filter-title').click()
    cy.get('[data-value="200000_300000"] > a').click()
    cy.wait(5000);
    cy.get('.total-products > p')
    .invoke('text')
    .then((text) => {
      cy.log(text);
    });

  })

  it('CP003 - Validar cuotas en compra de equipo -Cuotas.60 -Equipo.Tercero de la lista -Banco.Credicoop -Tarjeta.Visa ', () => {
      cy.get('.products > ol > li')
      .eq(2)
      .then(($tercerElemento) => {
        cy.log('Texto del tercer elemento: ' + $tercerElemento.text())
        cy.get($tercerElemento).click()
        cy.get('#open-installments-modal').click()
        cy.get('#selectBank > ul > li')
        .eq(18).then(($bancoCredicoop) => {
            cy.get($bancoCredicoop).click({ force: true })

          cy.get('#selectCardByBank > ul > li')
          .eq(2).then(($tarjetaVisa) => {
              cy.get($tarjetaVisa).click({ force: true })
              cy.get('#calculate_btn > .btn-primary').click()

              cy.get('#bodyTable').find('td').each(($td) => {
                cy.wrap($td).should('not.contain', '60 cuotas sin interés de')
              });
          });
        });
  
      })
  })

  it('CP004 - Validar promocion y que hay 2 colores disponibles ', () => {
    cy.get('.products > ol > li').contains('Galaxy A14').click({ force: true });
    cy.get('.percent-discount').as ('discount')
    cy.get('@discount').should('be.visible')
    cy.get('.swatch-attribute-options').should('have.length', 2)

    
  })
})

