describe("Notes App funcionality", () => {
  beforeEach(() => {
    // Set up your app's initial state or visit the app's URL
    cy.visit("http://127.0.0.1:5173"); // Replace with your app's URL
  });

  it("should add a new note", () => {
    // Interact with the app to add a new note
    cy.get("#new-note-input").type("New Note");
    cy.get("#add-note-form").submit(); // Trigger form submit event

    // Assert that the new note is displayed
    cy.contains("New Note");
  });
});
