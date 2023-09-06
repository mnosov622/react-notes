describe("Notes App funcionality", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173");
  });

  it("should add a new note", () => {
    cy.get("#new-note-input").type("New Note");
    cy.get("#add-note-form").submit();
    cy.contains("New Note");
  });

  it("should mark all items as completed when clicked", () => {
    cy.get("li.todo-item label").as("todoItems");

    cy.get("@todoItems").each(($el) => {
      cy.wrap($el).click();
    });

    cy.get("li.todo-item").should("have.class", "checked");
  });

  it("should unmark all items as completed when clicked", () => {
    cy.get("li.todo-item label").as("todoItems");

    cy.get("@todoItems").each(($el) => {
      cy.wrap($el).click();
    });

    cy.wait(1000);

    cy.get("@todoItems").each(($el) => {
      cy.wrap($el).click();
    });

    cy.get("li.todo-item").should("not.have.class", "checked");
  });

  it("should clear completed todos", () => {
    cy.get("li.todo-item label").each(($el) => {
      cy.wrap($el).click();
    });

    cy.get("button.clear-completed").click();

    cy.get("li.todo-item.checked").should("not.exist");

    cy.get("li.todo-item").should("have.length", 0);
  });
});
