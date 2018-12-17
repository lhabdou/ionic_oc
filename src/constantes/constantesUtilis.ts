import { IRole } from './../pages/modeles/roleModel';

export const ENVIRONNEMENT = {

  URL_REST_LOCAL:
  //"https://kamusicompro.herokuapp.com/kamusi",
  //"http://dictionnaire.eu-west-3.elasticbeanstalk.com/kamusi",
"http://localhost:8080/kamusi",

    roleContributeur: { id: 3, role: "CONTRIBUTEUR" } as IRole,
    roleValideur: { id: 2, role: "VALIDEUR" } as IRole,
    roleAdmin: { id: 1, role: "ADMINISTRATEUR" } as IRole,

    valideurs:[{ id: 2, role: "VALIDEUR" } , { id: 1, role: "ADMINISTRATEUR" }] as Array<IRole>,
    inputsDialect: [
      {
        type: "radio",
        label: "Shi Ngazidja",
        value:"ngz",
        checked:true
      },
      {
        type:"radio",
        label: "Shi Ndzuani",
        value:"ndz"
      },
      {
        type:"radio",
        label: "Shi Mwali",
        value:"mwa"
      },
      {
        type:"radio",
        label: "Shi Maore",
        value:"mao"
      },
      {
        type:"radio",
        label: "Suggestion ou Remarque",
        value:"sug"
      }
    ]

}
