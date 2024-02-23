import { describe, it, expect } from "vitest";
import { IMailService } from "../service/mail/concrete-nodemailer";
import {
  sendMailRequestBodyModel,
  SendMailRequestBodyModelT,
} from "../model/sendMailRequestBody.model";
import { SendMailResponseT } from "../types/sendMailResponse";
import { formatZodErrorIssues } from "../../_shared/functions/formatZodErrorIssues";
import { ZodError } from "zod";

// We're fixing the service - of course it should never return {success: true}, but this is just for a silly illustration of how much
// it helps to create an interface for testing.
// Of course, we should make different scenarios in it, when it should crash and when it should work.
class MockMailService implements IMailService {
  public sendMail(
    credentials: SendMailRequestBodyModelT
  ): Promise<SendMailResponseT> {
    try {
      sendMailRequestBodyModel.parse(credentials);
      return Promise.resolve({ success: true });
    } catch (e) {
      return Promise.reject({
        success: false,
        error: formatZodErrorIssues((e as ZodError).issues),
      });
    }
  }
}

/* TODO, custom transporter deliverable to mail service (for testing and development and prod environments) */

const mockMailService = new MockMailService();

// Dummy test
describe("mailService", () => {
  it("should send mail if valid credentials provided", async () => {
    const mailServiceResponse = await mockMailService.sendMail({
      sender: "josue@example.com",
      content:
        "content content content content content content content content content",
      subject: "New thing",
    });

    expect(mailServiceResponse).toHaveProperty("success");
    expect(mailServiceResponse.success).toBeTruthy();
  });

  it("should yield an error with invalid sender field if such is invalid", async () => {
    try {
      await mockMailService.sendMail({
        sender: "abc",
        content:
          "content content content content content content content content content",
        subject: "New thing",
      });

      expect(true).toBe(false);
    } catch (e) {
      const sendMailResponseError = e as SendMailResponseT;
      expect(sendMailResponseError.success).toBeFalsy();
      expect(sendMailResponseError).toHaveProperty("error");
      if ("error" in sendMailResponseError) {
        expect(sendMailResponseError.error).toContain("sender");
      }
    }
  });

  it("should yield an error with invalid content field if such is invalid", async () => {
    try {
      await mockMailService.sendMail({
        sender: "josue@example.com",
        content: "content",
        subject: "New thing",
      });

      expect(true).toBe(false);
    } catch (e) {
      const sendMailResponseError = e as SendMailResponseT;
      expect(sendMailResponseError.success).toBeFalsy();
      expect(sendMailResponseError).toHaveProperty("error");
      if ("error" in sendMailResponseError) {
        expect(sendMailResponseError.error).toContain("content");
      }
    }
  });

  it("should yield an error with invalid subject field if such is invalid", async () => {
    try {
      await mockMailService.sendMail({
        sender: "josue@example.com",
        content:
          "content content content content content content content content",
        subject: "New",
      });

      expect(true).toBe(false);
    } catch (e) {
      const sendMailResponseError = e as SendMailResponseT;
      expect(sendMailResponseError.success).toBeFalsy();
      expect(sendMailResponseError).toHaveProperty("error");
      if ("error" in sendMailResponseError) {
        expect(sendMailResponseError.error).toContain("subject");
      }
    }
  });
});
