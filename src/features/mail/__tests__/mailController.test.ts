import { describe, it, expect } from "vitest";
import { IMailService } from "../service/mailService";
import { TSendMailRequestBody } from "../model/sendMailRequestBody";
import { TSendMailResponse } from "../types/sendMailResponse";

// We're fixing the service - of course it should never return {success: true}, but this is just for a silly illustration of how much
// it helps to create an interface for testing.
// Of course, we should make different scenarios in it, when it should crash and when it should work.
class MockMailService implements IMailService {
  public sendMail(
    credentials: TSendMailRequestBody
  ): Promise<TSendMailResponse> {
    return Promise.resolve({ success: true });
  }
}

// Dummy test
describe("mailService", () => {
  it("should send mail", () => {
    const mailService = new MockMailService().sendMail({
      sender: "josue@example.com",
      content:
        "content content content content content content content content content",
      subject: "New thing",
    });

    expect(mailService).toBeTruthy();
  });
});
