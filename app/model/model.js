class Model {
    constructor() {
        this.projetApi = new ProjectApi();
        this.utilisateurApi = new UtilisateurAPI();
        this.exigenceApi = new ExigenceApi();
    }

    async getAllProjects() {
        console.log("hello");
        let projets = [];
        for (let projet of await this.projetApi.getAll()) {
            console.log(projet);
            projet.dateDebut = new Date(projet.dateDebut);
            projet.dateFinTheorique = new Date(projet.dateFinTheorique);
            projet.dateFinReelle = new Date(projet.dateFinReelle);
            projets.push(Object.assign(new Projet(),projet));
        }
        return projets
    }

    insertProjet(projet){
        return this.projetApi.insert(projet).then(res => res.status)
    }

    update(projet){
        return this.projetApi.update(projet).then(res => res.status)
    }

    delete(id) {
        return this.projetApi.delete(id).then(res => res.status)
    }

    deleteExigence(id) {
        return this.exigenceApi.delete(id).then(res => res.status)
    }

    async getProject(id) {
        try {
            const projet = Object.assign(new Projet(), await this.projetApi.getById(id));
            return projet;
        } catch (e) {
            if (e === 404) return null;
            return undefined
        }
    }

    async getExigence(id) {
        try {
            const exigence = Object.assign(new Exigence(), await this.exigenceApi.getById(id));
            return exigence;
        } catch (e) {
            if (e === 404) return null;
            return undefined
        }
    }

    async getAllUsers() {
        let users = [];
        for (let user of await this.utilisateurApi.getAll()) {
            users.push(Object.assign(new Utilisateur(),user))
        }
        return users
    }

    async getAllExigences() {
        let exigences = [];
        for (let exigence of await this.exigenceApi.getAll()) {
            exigences.push(Object.assign(new Exigence(),exigence));
        }
        return exigences
    }
}