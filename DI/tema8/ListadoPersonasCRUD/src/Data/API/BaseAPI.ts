import { injectable } from "inversify";

@injectable()
export class BaseApi {
  private readonly BASE_URL: string =
    "https://juan-eaajbycgctbmbxf4.spaincentral-01.azurewebsites.net";

  public getBaseUrl(endpoint: string): string {
    const url = new URL(endpoint, this.BASE_URL);
    return url.toString();
  }

  public getDefaultHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
    };
  }
}
