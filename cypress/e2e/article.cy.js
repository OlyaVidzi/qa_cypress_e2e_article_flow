describe('', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);

      cy.visit('/');
    });
  });

  it('should create an article and check it exists', () => {
    cy.task('generateArticle').then((generatedArticle) => {
      cy.createArticle(
        generatedArticle.title,
        generatedArticle.description,
        generatedArticle.body
      );

      cy.contains('a', 'Global Feed').click();
      cy.get('.col-md-9').contains(user.username.toLowerCase())
        .should('be.visible');
      cy.get('.col-md-9').contains(`Article title: ${generatedArticle.title}`)
        .should('be.visible');
    });
  });

  it('should create another article and delete it', () => {
    cy.task('generateArticle').then((generatedArticle) => {
      cy.createArticle(
        generatedArticle.title,
        generatedArticle.description,
        generatedArticle.body
      );

      cy.contains('a', 'Global Feed').click();
      cy.get('.col-md-9').contains(`Article title: ${generatedArticle.title}`)
        .should('be.visible').click();

      cy.contains('button', 'Delete Article').click();

      cy.visit('/');
      cy.contains('a', 'Global Feed').click();
      cy.get('.col-md-9').contains(`Article title: ${generatedArticle.title}`)
        .should('not.exist');
    });
  });
});
