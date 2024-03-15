import { describe, it, expect } from "vitest";

import { formatZodErrorIssues } from "../../_shared/functions/formatZodErrorIssues";
import { ZodError } from "zod";
import { MailOptions, MailServiceI } from "../service/abstraction";
import { SendMailResponseDto, SendMailResponseFailDto, SendMailResponseSuccessDto } from "../dto/sendMailResponse.dto";
import { sendMailSchema } from "../validator/sendMailSchema";

class MockMailService extends MailServiceI<any> {
  protected createTransport() {}

  sendMail(options: MailOptions): Promise<SendMailResponseDto> {
    try {
      sendMailSchema.parse(options);
      return Promise.resolve(new SendMailResponseSuccessDto());
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
      content: "content content content content content content content content content",
      subject: "New thing",
    });

    expect(mailServiceResponse).toHaveProperty("delivered");
    expect(mailServiceResponse.delivered).toBeTruthy();
  });

  it("should yield an error with invalid sender field if such is invalid", async () => {
    try {
      await mockMailService.sendMail({
        sender: "abc",
        content: "content content content content content content content content content",
        subject: "New thing",
      });

      expect(true).toBe(false);
    } catch (e) {
      const sendMailResponseError = e as SendMailResponseFailDto;
      expect(sendMailResponseError.delivered).toBeFalsy();
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
      const sendMailResponseError = e as SendMailResponseFailDto;
      expect(sendMailResponseError.delivered).toBeFalsy();
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
        content: "content content content content content content content content",
        subject: "New",
      });

      expect(true).toBe(false);
    } catch (e) {
      const sendMailResponseError = e as SendMailResponseFailDto;
      expect(sendMailResponseError.delivered).toBeFalsy();
      expect(sendMailResponseError).toHaveProperty("error");
      if ("error" in sendMailResponseError) {
        expect(sendMailResponseError.error).toContain("subject");
      }
    }
  });
});
