class NewProjetController extends BaseController {
    constructor() {
        super();
        this.getAllUsers();
        this.projet = {};
        if(projectController.selectedProject){
            self.project = projectController.selectedProject;
            projectController.selectedProject = null;
            $("#nom").value = self.project.nom;
            $("#select-users").value = self.project.utilisateur.id;
            $("#title").innerHTML = `Modifier le projet ${self.project.nom}<a title="back" class="waves-effect waves-light btn"  onclick="navigate('project')" style="margin-left: 10px;"><i class="material-icons">backspace</i></a>`;

            console.log(self.project.utilisateur.id);

         //   $(`#select-users option[value=${self.project.utilisateur.id}]`).setAttribute("selected", "selected");
          //  M.FormSelect.init( $('#select-users'));

        }
        this.setBackButtonView('project');
    }

    async getAllUsers(){
        let content = "";
        const select =  document.querySelector("#select-users");
        console.log(await this.model.getAllUsers());
        try {
            for (const user of await this.model.getAllUsers()) {
                content += `<option value="${user.id}">${user.prenom} ${user.nom}</option>`
            }
            select.innerHTML = content;

            M.FormSelect.init(select);

        } catch(err) {
            console.log(err);
            this.displayServiceError();
        }
    }
    async saveProjet() {
        const nom = $("#nom").value;
        const user = $('#select-users').value;

        this.projet.nom = nom;
        this.projet.utilisateurId = user;


        if(nom === ""){
            this.toast("Le champ nom est vide.",'red darken-4');
            return
        }

        if (nom !== "") {

            try {
                if (self.project) {
                    if(self.project.nom === nom){
                        this.toast("Veuillez modifier les valeurs",'red darken-4')
                    } else{
                        self.project.nom = this.projet.nom;
                        self.project.utilisateurId = this.projet.utilisateurId;

                        if (await this.model.update(self.project) === 204) {
                            this.toast( "Le projet a bien été modifé",'green darken-1 rounded');
                            self.project = null;
                            navigate('project')
                        } else {
                            this.displayServiceError()
                        }
                    }
                } else {
                    if (await this.model.insertProjet(this.projet) === 201) {
                        this.toast("Le projet a bien été inséré",'green darken-1 rounded');
                        console.log("err");
                        navigate('project');
                    } else {
                        this.displayServiceError();
                    }
                }
            } catch (err) {
                console.log(err);
                this.displayServiceError();
            }

        }
    }
}

window.newProjetController = new NewProjetController();

