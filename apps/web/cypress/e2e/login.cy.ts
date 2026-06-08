describe('Página principal', () => {
  it('Carga correctamente', () => {
    cy.visit('http://localhost:5173');

    cy.contains('ESTO NO EXISTE');
  });
});