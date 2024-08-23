import { it, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import { app } from "../src/app";
import request from "supertest";
import { execSync } from "node:child_process";

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "New transactions",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });

  it("should be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transactions",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie")!;

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    expect(listTransactionsResponse.body).toEqual([
      expect.objectContaining({
        title: "New transactions",
        amount: 5000,
      }),
    ]);
  });

  it("should be able to list a specific transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transactions",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie")!;

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = listTransactionsResponse.body[0].id;

    const transactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(transactionResponse.body).toEqual(
      expect.objectContaining({
        title: "New transactions",
        amount: 5000,
      })
    );
  });

  it("should be able to get the summary", async () => {
    const createCreditTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New transactions",
        amount: 5000,
        type: "credit",
      });

    const cookies = createCreditTransactionResponse.get("Set-Cookie")!;

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies)
      .send({
        title: "New transactions",
        amount: 2000,
        type: "debit",
      });

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200);

    expect(summaryResponse.body).toEqual({
      amount: 3000,
    });
  });
});
