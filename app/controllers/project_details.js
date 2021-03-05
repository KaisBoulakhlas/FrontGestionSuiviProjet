class ProjectDetailsController extends BaseController {
    constructor() {
        super();
        this.setBackButtonView('project');


        if(projectController.selectedProjectDetails){
            self.projectDetails = projectController.selectedProjectDetails;
            window.currentProject = self.projectDetails;
            let dateDebut = new Date(self.projectDetails.dateDebut).toLocaleDateString();
            let dateFinTheorique = new Date(self.projectDetails.dateFinTheorique).toLocaleDateString();
            let dateFinRelle = new Date(self.projectDetails.dateFinReelle).toLocaleDateString();

            $("#name").innerHTML = self.projectDetails.nom;
            $("#user").innerHTML = self.projectDetails.utilisateur.nom + " " + self.projectDetails.utilisateur.prenom;
            $("#date_debut").innerHTML =  dateDebut;
            $("#date_fin_theorique").innerHTML = dateFinTheorique;
            $("#date_fin_relle").innerHTML = dateFinRelle;
        }
    }




}

window.projectDetailsController = new ProjectDetailsController();
