class Projet {
    constructor(id, nom, dateDebut, dateFinTheorique, dateFinReelle,exigences,taches,jalons, utilisateurId){
        this.id = id;
        this.nom = nom;
        this.dateDebut = dateDebut;
        this.utilisateurId = utilisateurId;
        this.exigences = exigences;
        this.taches = taches;
        this.jalons = jalons;
        this.dateFinTheorique = dateFinTheorique;
        this.dateFinReelle = dateFinReelle;
    }

    toString(){
        return `${this.nom}`
    }
}

class Utilisateur {
    constructor(id, trigramme, prenom, nom, mail) {
        this.id = id;
        this.trigramme = trigramme;
        this.prenom = prenom;
        this.nom = nom;
        this.mail = mail;
    };
}

class Exigence {
    constructor(id, description, estFonctionnelle, exigencesNonFonctionnelles,taches, projetId) {
        this.description = description;
        this.estFonctionnelle = estFonctionnelle;
        this.exigencesNonFonctionnelles = exigencesNonFonctionnelles;
        this.taches = taches;
        this.projetId = projetId;
    };
}