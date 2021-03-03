let marques = [
  {
    id: 1,
    nom: "Honda",
    creation: 1948,
    activite: "Automobile, Moto, Scooter,Avion à réaction, Moteur à réaction",
    siege: "Japon",
    vehicules: [
      {
        id: 4,
        modele: "Honda Odyssey",
        energie: "Essence",
        annee: 1995,
        puissance: 244,
        lienImg:
          "https://commons.wikimedia.org/wiki/File:2018_Honda_Odyssey_EX-L_3.5L,_front_8.23.19.jpg?uselang=fr",
      },
      {
        id: 5,
        modele: "Honda Stream",
        energie: "Essence",
        annee: 2006,
        puissance: 140,
        lienImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Hondastream2.jpg/280px-Hondastream2.jpg",
      },
    ],
    lienImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/langfr-200px-Honda.svg.png",
  },
  {
    id: 2,
    nom: "Chevrolet",
    creation: 1911,
    activite: "Automobiles",
    vehicules: [
      {
        id: 6,
        modele: "Chevrolet Corvette C8 ",
        energie: "Essence",
        annee: 2019,
        puissance: 495,
        lienImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Chevrolet_Corvette_C8_Stingray_blue.jpg/280px-Chevrolet_Corvette_C8_Stingray_blue.jpg",
      },
      {
        id: 7,
        modele: "Chevrolet Colorado",
        energie: "Essence",
        annee: 2003,
        puissance: 242,
        lienImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Chevrolet_Colorado_extcab.jpg/280px-Chevrolet_Colorado_extcab.jpg",
      },
    ],
    lienImg:
      "https://upload.wikimedia.org/wikipedia/fr/thumb/4/4d/Chevrolet.svg/langfr-280px-Chevrolet.svg.png",
  },
  {
    id: 3,
    nom: "Renault",
    creation: 1899,
    activite: "Automobiles",
    vehicules: [
      {
        id: 8,
        modele: "Renault Captur",
        energie: "Essence",
        annee: 2013,
        puissance: 120,
        lienImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Renault_Captur1.jpg/280px-Renault_Captur1.jpg",
      },
      {
        id: 9,
        modele: "Renault Espace IV",
        energie: "Essence, Diesel",
        annee: 2002,
        puissance: 115,
        lienImg:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2012_Renault_Grand_Espace_2.0.jpg/280px-2012_Renault_Grand_Espace_2.0.jpg",
      },
    ],
    lienImg:
      "https://upload.wikimedia.org/wikipedia/fr/thumb/4/40/RENAULT_LOGO.svg/langfr-1920px-RENAULT_LOGO.svg.png",
  },
];

//{id:,modele:,energie:,annee:,puissance:,lienImg:}
class Constructeur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
async componentDidMount(){
  let response=fetch("http://localhost/VoitureAPI/constructeur.php?id="+this.props.id)
  let data=(await response).json();
  this.setState({infos:await data});
}
  render() {
    if(this.state.infos){
          return (
      <div className="card m-2 p-1 " style={{ width: 18 + "rem" }}>
        <img
          className="card-img-top"
          src={this.state.infos.image}
          alt="Card image cap"
        />
        <div className="card-body d-flex flex-column justify-content-around">
          <h5 className="card-title">{this.state.infos.nom}</h5>
          <p className="card-text">
            La société {this.state.infos.nom} fut fondée en{" "}
            {this.state.infos.creation}.<br /> Elle a pour activité la
            production de : {this.state.infos.activite}{" "}
          </p>

          <button className="btn btn-primary" onClick={this.renderVehicules}>
            Voir les véhicules
          </button>
        </div>
      </div>
    );
    }
    else{
      return (<h2>Chargement...</h2>)
    }

  }

  renderVehicules = () => {
    ReactDOM.render(
      <ListVehicule id={this.props.id} data={this.state.infos.vehicules} />,
      document.querySelector("#root")
    );
  };

  handleChange = (event) => {
    let nouvelleValeur = event.target.value; // la valeur de l'etat Online, Offline ...
    let etatAchanger = event.target.name; // le state que je cherche a modifier (il corespond au name du select ou input ...)
    let changement = {}; //un objet
    changement[etatAchanger] = nouvelleValeur; // l'objet changement contient maintenant la clé du state et la nouvelle valeur
    this.setState(changement); // Modification de l'etat
  };
}

class ListConstructeur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderConstructeur(uneMarque) {
    return (
      <Constructeur id={uneMarque.id} data={uneMarque} key={uneMarque.id} />
    );
  }
  componentDidMount() {
    fetch("http://localhost/VoitureAPI/constructeur.php")
      .then((res) => res.json())
      .then((res) => {
        this.setState({ dataConstructeurs: res });
      });
  }
  render() {
    if (this.state.dataConstructeurs) {
      console.log(this.state.dataConstructeurs);
      return (
        <div className="row d-flex justify-content-around">
          {this.state.dataConstructeurs.map((uneMarque) => {
            console.log(uneMarque);
            return this.renderConstructeur(uneMarque);
          })}
        </div>
      );
    } else {
      return <h2>Chargement</h2>;
    }
  }
}

class ListVehicule extends React.Component {
  constructor(props) {
    super(props);

    this.state = { lesVehicules: this.props.data };
  }

  renderVehicule(unVehicule) {
    console.log("RENDERvehicule : " + unVehicule.id);
    return (
      <Vehicule id={unVehicule.id} data={unVehicule} key={unVehicule.id} />
    );
  }
  render() {
    return (
      <React.Fragment>
        <a href={window.location}>Retour</a>
        <div className="row d-flex justify-content-around">
          {this.state.lesVehicules.map((unVehicule) =>
            this.renderVehicule(unVehicule)
          )}
        </div>
      </React.Fragment>
    );
  }
}

class Vehicule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { infos: this.props.data };
    console.log(this.state.infos);
  }
  render() {
    return (
      <div className="card m-2 p-1 " style={{ width: 18 + "rem" }}>
        <img
          className="card-img-top"
          src={this.state.infos.lienImg}
          alt="Card image cap"
        />
        <div className="card-body d-flex flex-column justify-content-around">
          <h5 className="card-title">{this.state.infos.modele}</h5>
          <p className="card-text"> </p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ListConstructeur />, document.querySelector("#root"));
