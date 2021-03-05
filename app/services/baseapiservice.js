const serviceBaseUrl = "https://localhost:44354/api";
class BaseAPIService {
    constructor(url) {
        this.url = `${serviceBaseUrl}/${url}`;
        this.headers = new Headers();
    }
}