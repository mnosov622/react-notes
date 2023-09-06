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

  it("should display 5 completed items after clicking Completed", () => {
    cy.get("li.todo-item label").each(($el) => {
      cy.wrap($el).click();
    });

    cy.contains("button", "Completed").click();

    cy.get("li.todo-item.checked").should("have.length", 5);
  });

  it("should display 0 items after clicking Active", () => {
    cy.get("li.todo-item label").each(($el) => {
      cy.wrap($el).click();
    });

    cy.contains("button", "Active").click();

    cy.get("li.todo-item").should("not.exist");
  });

  it("should add a new item, refresh the page, and check if items are updated", () => {
    const newItemText = "New Todo Item";
    cy.get(".todo-form input").type(newItemText);
    cy.get(".todo-form").submit();

    cy.contains(".todo-item", newItemText).should("be.visible");

    cy.reload();

    cy.contains(".todo-item", newItemText).should("be.visible");
  });

  it("should check and uncheck all labels without changing .items-left value", () => {
    cy.get(".items-left").invoke("text").as("initialText");

    cy.get("li.todo-item label").each(($el) => {
      cy.wrap($el).click();
    });

    cy.get("li.todo-item label").each(($el) => {
      cy.wrap($el).click();
    });

    cy.get("@initialText").then((initialText) => {
      cy.get(".items-left").should("contain", initialText);
    });
  });
});
