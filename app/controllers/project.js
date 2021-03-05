class ProjectController extends BaseController {
    constructor() {
        super();
        this.displayAllProjects();

    }

    async displayAllProjects(){
        let content = "";
        const container =  document.querySelector("#container");

        try {

            for (const projet of await this.model.getAllProjects()) {
                const dateDebut = projet.dateDebut.toLocaleDateString();
                const dateFinTheorique = projet.dateFinTheorique.toLocaleDateString();
                content += ` <div class="row" id="projet-${projet.id}">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">${projet.nom} dirigé par ${projet.utilisateur.nom}</span>
                            <p>Date de début : ${dateDebut}</p>
                            <p>Date de fin théorique: ${dateFinTheorique}</p>
                        </div>
                        <div class="card-action">
                            <a title="Modifier" class="waves-effect waves-light btn"  onclick="projectController.editProject('${projet.id}')"  style="margin-bottom: 10px;"><i class="material-icons">edit</i></a>
                            <a title="Supprimer" class="waves-effect waves-light btn"  onclick="projectController.deleteProject('${projet.id}')" style="margin-bottom: 10px;"><i class="material-icons">delete</i></a>
                            <a title="Voir" class="waves-effect waves-light btn"  onclick="projectController.showProject('${projet.id}')"  style="margin-bottom: 10px;"><i class="material-icons">visibility</i></a>
                        </div>
                    </div>
                </div>
            </div>`
            }
            container.innerHTML = content;

        } catch(err) {
            console.log(err);
            this.displayServiceError();
        }
    }

    async showProject(id){
        try {
            const projet = await this.model.getProject(id);
            if (projet === undefined) {
                this.displayServiceError();
                return
            }
            if (projet === null) {
                this.displayNotFoundError();
                return
            }

            this.selectedProjectDetails = projet;
            console.log(projet.id);
            navigate("project_details")
        }
        catch (err) {
            console.log(err);
            this.displayServiceError()
        }
    }

    async editProject(id) {
        try {
            const projet = await this.model.getProject(id);
            if (projet === undefined) {
                this.displayServiceError();
                return
            }
            if (projet === null) {
                this.displayNotFoundError();
                return
            }
            this.selectedProject = projet;
            navigate("new_project")
        } catch (err) {
            console.log(err);
            this.displayServiceError()
        }
    }

    async deleteProject(id){
        try {
            const project = await this.model.getProject(id);
            if (project === undefined) {
                this.displayServiceError();
                return
            }
            if (project === null) {
                this.displayNotFoundError();
                return
            }

            console.log(project.nom);

            $('#spanDeleteProject').innerText = `Le projet ${project.nom}`;
            $('#btnDelete').onclick = async () => {
                if(await this.model.delete(id) === 204){
                    this.toast(`<span>Supression effectuée</span>`,'green darken-1 rounded');
                    this.displayAllProjects();
                } else if(await this.model.delete(id) === 404){
                    this.displayNotFoundError();
                } else{
                    this.displayServiceError();
                }
            };
            this.getModal('#modalConfirmDelete').open();

        } catch (err) {
            console.log(err);
            this.displayServiceError()
        }
    }
}

window.projectController = new ProjectController();
