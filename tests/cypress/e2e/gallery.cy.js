import { createUserWithEmailAndPassword } from "firebase/auth";
import { testUser } from "../fixtures/test-user";
import { ref, listAll } from "firebase/storage";
import {
  auth,
  storage,
  resetFirebaseEmulator,
} from "../support/functions/firebase";

describe("Gallery", () => {
  before(() => {
    cy.then(async () => {
      await resetFirebaseEmulator();
      await createUserWithEmailAndPassword(
        auth,
        testUser.email,
        testUser.password
      );
    });
  });

  it("Should upload one image", () => {
    cy.then(async () => {
      cy.visit("/gallery");
      cy.getByTestId("input:select-images").selectFile(
        "./cypress/fixtures/images/meme1.webp",
        { force: true }
      );
      cy.getByTestId("card:image")
        .should("have.length", 1)
        .then(async () => {
          const imagesResult = await listAll(
            ref(storage, `users/${auth.currentUser.uid}/images`)
          );
          expect(imagesResult.items).to.have.length(1);
        });
    });
  });

  it("Should upload multiple images", () => {
    cy.then(async () => {
      cy.visit("/gallery");
      cy.getByTestId("input:select-images").selectFile(
        [
          "./cypress/fixtures/images/meme2.jpg",
          "./cypress/fixtures/images/meme3.jpg",
        ],
        { force: true }
      );
      cy.getByTestId("card:image")
        .should("have.length", 3)
        .then(async () => {
          const imagesResult = await listAll(
            ref(storage, `users/${auth.currentUser.uid}/images`)
          );
          expect(imagesResult.items).to.have.length(3);
        });
    });
  });

  it("Should delete the first image", () => {
    cy.then(async () => {
      cy.visit("/gallery");
      cy.getByTestId("card:image").first().click();
      cy.getByTestId("button:more").first().click();
      cy.getByTestId("button:delete").first().click();
      cy.getByTestId("card:image")
        .should("have.length", 2)
        .then(async () => {
          const imagesResult = await listAll(
            ref(storage, `users/${auth.currentUser.uid}/images`)
          );
          expect(imagesResult.items).to.have.length(2);
        });
    });
  });
});
