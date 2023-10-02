import { testUser } from "../fixtures/test-user";
import { resetFirebaseEmulator } from "../support/functions/firebase";

describe("Auth", () => {
  before(() => {
    cy.then(async () => {
      await resetFirebaseEmulator();
    });
  });

  it("Should throw error because the user has not been registered", () => {
    cy.then(async () => {
      cy.visit("/auth/signIn");
      cy.getByTestId("input:email").first().type(testUser.email);
      cy.getByTestId("input:password").first().type(testUser.password);
      cy.getByTestId("button:submit").click();
      cy.contains("El correo o contraseña es incorrecto");
    });
  });

  it("Should register the test user", () => {
    cy.then(async () => {
      cy.visit("/auth/signUp");
      cy.getByTestId("input:name").first().type(testUser.name);
      cy.getByTestId("input:email").first().type(testUser.email);
      cy.getByTestId("input:password").first().type(testUser.password);
      cy.getByTestId("button:to-screen-2").click();
      cy.getByTestId("input:profile-image")
        .eq(1)
        .selectFile("./cypress/fixtures/images/profile-image.jpg", {
          force: true,
        });
      cy.getByTestId("button:submit").click();
      cy.contains("Bienvenido");
    });
  });

  it("Should close session", () => {
    cy.then(async () => {
      cy.visit("/gallery");
      cy.getByTestId("button:sign-out").click({ force: true });
      cy.visit("/auth/signUp");
      cy.getByTestId("input:name").should("be.visible");
    });
  });

  it("Should throw error because already exists a user with the same email", () => {
    cy.then(async () => {
      cy.visit("/auth/signUp");
      cy.getByTestId("input:name").first().type(testUser.name);
      cy.getByTestId("input:email").first().type(testUser.email);
      cy.getByTestId("input:password").first().type(testUser.password);
      cy.getByTestId("button:to-screen-2").click();
      cy.getByTestId("input:profile-image")
        .eq(1)
        .selectFile("./cypress/fixtures/images/profile-image.jpg", {
          force: true,
        });
      cy.getByTestId("button:submit").click();
      cy.contains("Ha ocurrido un error");
    });
  });

  it("Should sign in", () => {
    cy.then(async () => {
      cy.visit("/auth/signIn");
      cy.getByTestId("input:email").first().type(testUser.email);
      cy.getByTestId("input:password").first().type(testUser.password);
      cy.getByTestId("button:submit").click();
      cy.contains("Bienvenido");
    });
  });
});
