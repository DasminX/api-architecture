import { describe, it, expect } from "vitest";
import { IMailService } from "../service/mailService";
import { TSendMailRequestBody } from "../model/sendMailRequestBody";

// Mockujemy serwis - oczywiście nie powinien nigdy zwracać true, ale jest tak tylko dla głupiego zobrazowania, jak bardzo pomaga stworzenie interfejsu w testowaniu
// Oczywiście powinniśmy w nim zrobić różne scenariusze, kiedy ma się wywalać, a kiedy działać.
// Podejrzewam, że można nawet inaczej zrobić tego mocka niż po prostu przez stworzenie klasy na kształt interfejsu, ale mi sie już nie chce xD
// Więcej jest pewnie w docsach Vitest/Jest
class MockMailService implements IMailService {
  public sendMail(credentials: TSendMailRequestBody): Promise<boolean> {
    return Promise.resolve(true);
  }
}

// Dummy test
describe("mailService", () => {
  it("should send mail", () => {
    const mailService = new MockMailService().sendMail({
      sender: "jacek@example.com",
      content:
        "kontent kontent kontent kontent kontent kontent kontent kontent kontent",
    });

    expect(mailService).toBeTruthy();
  });
});
