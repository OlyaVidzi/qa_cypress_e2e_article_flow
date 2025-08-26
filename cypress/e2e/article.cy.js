describe('', () => {
  let user;
  const article = {
    title: 'title',
    description: 'description',
    body: 'body',
    tags: ['tag1', 'tag2']
  };

  before(() => {
    cy.visit('/');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;

      cy.register(user.email, user.username, user.password);
    });
  });

  it('should create and delete article', () => {
    cy.visit('/');

    cy.contains('a', 'New Article').click();

    cy.get('[placeholder="Article Title"]').type(article.title);
    cy.get(`[placeholder="What's this article about?"]`).type(article.description);
    cy.get('[placeholder="Write your article (in markdown)"]')
      .type(article.body);
    article.tags.forEach((tag) => {
      cy.get('[placeholder="Enter tags"]').type(`${tag}{enter}`);
    });

    cy.contains('button', 'Publish Article').click();

    cy.contains('.author', user.username.toLowerCase()).should('be.visible');

    cy.contains('button', ' Delete Article').should('be.visible').click();

    cy.url().should('include', '/');
  });
});
