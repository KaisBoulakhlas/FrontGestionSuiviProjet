class ExigenceApi extends BaseAPIService{
    constructor() {
        super("Exigences");
    };

    getAll() {
        return fetchJSON(this.url);
    };

    delete(id) {
        this.headers.delete('Content-Type');
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: this.headers });
    };

    getById(id) {
        return fetchJSON(`${this.url}/${id}`);
    };


}