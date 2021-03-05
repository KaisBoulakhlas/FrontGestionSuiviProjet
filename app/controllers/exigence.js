class ExigenceController extends BaseController {
    constructor() {
        super();
        this.setBackButtonView('project_details');
        this.displayAllExigences();
    }

    async displayAllExigences(){
        let content = "";
        const container =  document.querySelector("#container-exigences");

        try {

            for (const exigence of await this.model.getAllExigences()) {
                content += `<div class="row" id="exigence-${exigence.id}">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <p>${exigence.description}</p>
                            <p>${exigence.estFonctionnelle === true ? "Fonctionnelle" : "Non fonctionnelle"}</p>
                        </div>
                        <div class="card-action">
                            <a title="Modifier" class="waves-effect waves-light btn"  onclick="exigenceController.editExigence('${exigence.id}')"  style="margin-bottom: 10px;"><i class="material-icons">edit</i></a>
                            <a title="Supprimer" class="waves-effect waves-light btn"  onclick="exigenceController.deleteExigence('${exigence.id}')" style="margin-bottom: 10px;"><i class="material-icons">delete</i></a>
                            <a title="Voir" class="waves-effect waves-light btn"  onclick="exigenceController.showExigence('${exigence.id}')"  style="margin-bottom: 10px;"><i class="material-icons">visibility</i></a>
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

    async deleteExigence(id){
        try {
            const exigence = await this.model.getExigence(id);
            if (exigence === undefined) {
                this.displayServiceError();
                return
            }
            if (exigence === null) {
                this.displayNotFoundError();
                return
            }

            $('#spanDeleteProject').innerText = `Le projet ${exigence.nom}`;
            $('#btnDelete').onclick = async () => {
                if(await this.model.deleteExigence(id) === 204){
                    this.toast(`<span>Supression effectuée</span>`,'green darken-1 rounded');
                    this.displayAllExigences();
                } else if(await this.model.deleteExigence(id) === 404){
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

window.exigenceController = new ExigenceController();
